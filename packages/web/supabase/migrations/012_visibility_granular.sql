-- Migration: Granular list visibility
-- Adds visible_to_followers and visible_to_following columns to lists.
-- Moves the visibility concept from a single boolean to a richer model:
--   - is_public: visible to everyone (previous behavior)
--   - visible_to_followers: visible to users who follow the list owner
--   - visible_to_following: visible to users the list owner follows

alter table public.lists
  add column if not exists visible_to_followers boolean default false not null,
  add column if not exists visible_to_following boolean default false not null;

-- Drop old select policies for lists and list_items, replace with follow-aware ones

drop policy if exists "Public lists are viewable by everyone" on public.lists;
drop policy if exists "List items viewable if list is accessible" on public.list_items;

-- New lists select policy
create policy "Lists are viewable if access granted" on public.lists
  for select using (
    is_public = true
    or auth.uid() = user_id
    or (
      visible_to_followers = true
      and exists (
        select 1 from public.follows
        where follower_id = auth.uid()
          and following_id = lists.user_id
      )
    )
    or (
      visible_to_following = true
      and exists (
        select 1 from public.follows
        where follower_id = lists.user_id
          and following_id = auth.uid()
      )
    )
  );

-- New list_items select policy
create policy "List items viewable if list is accessible" on public.list_items
  for select using (
    exists (
      select 1 from public.lists
      where lists.id = list_items.list_id
        and (
          lists.is_public = true
          or lists.user_id = auth.uid()
          or (
            lists.visible_to_followers = true
            and exists (
              select 1 from public.follows
              where follower_id = auth.uid()
                and following_id = lists.user_id
            )
          )
          or (
            lists.visible_to_following = true
            and exists (
              select 1 from public.follows
              where follower_id = lists.user_id
                and following_id = auth.uid()
            )
          )
        )
    )
  );
