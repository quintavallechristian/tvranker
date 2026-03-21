-- Migration: Default list visibility to public for new users
-- Update the handle_new_user trigger so new users get a public list by default.

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

  -- Auto-create the single list for the new user (public by default)
  INSERT INTO public.lists (user_id, name, is_public, position)
  VALUES (new.id, 'My List', true, 0);

  RETURN new;
END;
$$;
