-- Migration: Single list per user
-- Each user gets exactly ONE list, auto-created on signup.

-- 1. Backfill: create a list for users that have none
INSERT INTO public.lists (user_id, name, description, is_public, position)
SELECT p.id, 'My List', NULL, true, 0
FROM public.profiles p
LEFT JOIN public.lists l ON l.user_id = p.id
WHERE l.id IS NULL;

-- 2. For users with multiple lists, merge all items into the first list (lowest position)
-- First, identify the "primary" list per user (lowest position)
WITH primary_list AS (
  SELECT DISTINCT ON (user_id) id AS primary_id, user_id
  FROM public.lists
  ORDER BY user_id, position ASC, created_at ASC
),
-- Items that need to be moved to the primary list
items_to_move AS (
  SELECT li.id AS item_id, li.show_id, li.rating, li.position, li.notes, li.added_at,
         pl.primary_id AS target_list_id
  FROM public.list_items li
  JOIN public.lists l ON l.id = li.list_id
  JOIN primary_list pl ON pl.user_id = l.user_id
  WHERE li.list_id != pl.primary_id
)
-- Move items, skipping duplicates (same show already in primary list)
INSERT INTO public.list_items (list_id, show_id, rating, position, notes, added_at)
SELECT itm.target_list_id, itm.show_id,
       itm.rating,
       -- Offset position to avoid conflicts: start after max existing position
       itm.position + COALESCE(
         (SELECT MAX(li2.position) + 1 FROM public.list_items li2 WHERE li2.list_id = itm.target_list_id),
         0
       ),
       itm.notes, itm.added_at
FROM items_to_move itm
WHERE NOT EXISTS (
  SELECT 1 FROM public.list_items existing
  WHERE existing.list_id = itm.target_list_id
    AND existing.show_id = itm.show_id
)
ON CONFLICT (list_id, show_id) DO NOTHING;

-- 3. Delete surplus lists (keep only the primary one per user)
DELETE FROM public.lists
WHERE id NOT IN (
  SELECT DISTINCT ON (user_id) id
  FROM public.lists
  ORDER BY user_id, position ASC, created_at ASC
);

-- 4. Add unique constraint: one list per user
ALTER TABLE public.lists ADD CONSTRAINT lists_user_id_unique UNIQUE (user_id);

-- 5. Update the handle_new_user trigger to also create a default list
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'username',
      split_part(new.email, '@', 1) || '_' || substr(new.id::text, 1, 4)
    ),
    new.raw_user_meta_data ->> 'avatar_url'
  );

  -- Auto-create the single list for the new user
  INSERT INTO public.lists (user_id, name, is_public, position)
  VALUES (new.id, 'My List', true, 0);

  RETURN new;
END;
$$;
