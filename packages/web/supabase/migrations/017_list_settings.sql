-- Migration: Per-list settings (rating_labels + granular visibility)
-- Adds rating_labels to all list tables so each list type can override
-- the profile-level defaults. Adds visible_to_followers / visible_to_following
-- to movie_lists, anime_lists, game_lists (already present on lists).

-- 1. rating_labels on each list table (nullable — null means "use profile default")
alter table public.lists
  add column if not exists rating_labels jsonb;

alter table public.movie_lists
  add column if not exists rating_labels jsonb;

alter table public.anime_lists
  add column if not exists rating_labels jsonb;

alter table public.game_lists
  add column if not exists rating_labels jsonb;

-- 2. Granular visibility on movie_lists, anime_lists, game_lists
alter table public.movie_lists
  add column if not exists visible_to_followers boolean default false not null,
  add column if not exists visible_to_following boolean default false not null;

alter table public.anime_lists
  add column if not exists visible_to_followers boolean default false not null,
  add column if not exists visible_to_following boolean default false not null;

alter table public.game_lists
  add column if not exists visible_to_followers boolean default false not null,
  add column if not exists visible_to_following boolean default false not null;

-- 3. Update RLS select policies for movie_lists to support follow-aware visibility
drop policy if exists "Public movie lists readable" on public.movie_lists;

create policy "Movie lists are viewable if access granted" on public.movie_lists
  for select using (
    is_public = true
    or auth.uid() = user_id
    or (
      visible_to_followers = true
      and exists (
        select 1 from public.follows
        where follower_id = auth.uid()
          and following_id = movie_lists.user_id
      )
    )
    or (
      visible_to_following = true
      and exists (
        select 1 from public.follows
        where follower_id = movie_lists.user_id
          and following_id = auth.uid()
      )
    )
  );

-- Update movie_list_items select policy to use the new visibility model
drop policy if exists "Public movie list items readable" on public.movie_list_items;

create policy "Movie list items viewable if list accessible" on public.movie_list_items
  for select using (
    exists (
      select 1 from public.movie_lists
      where movie_lists.id = movie_list_items.movie_list_id
        and (
          movie_lists.is_public = true
          or movie_lists.user_id = auth.uid()
          or (
            movie_lists.visible_to_followers = true
            and exists (
              select 1 from public.follows
              where follower_id = auth.uid()
                and following_id = movie_lists.user_id
            )
          )
          or (
            movie_lists.visible_to_following = true
            and exists (
              select 1 from public.follows
              where follower_id = movie_lists.user_id
                and following_id = auth.uid()
            )
          )
        )
    )
  );

-- 4. Update RLS select policies for anime_lists
drop policy if exists "Public anime lists readable" on public.anime_lists;

create policy "Anime lists are viewable if access granted" on public.anime_lists
  for select using (
    is_public = true
    or auth.uid() = user_id
    or (
      visible_to_followers = true
      and exists (
        select 1 from public.follows
        where follower_id = auth.uid()
          and following_id = anime_lists.user_id
      )
    )
    or (
      visible_to_following = true
      and exists (
        select 1 from public.follows
        where follower_id = anime_lists.user_id
          and following_id = auth.uid()
      )
    )
  );

drop policy if exists "Public anime list items readable" on public.anime_list_items;

create policy "Anime list items viewable if list accessible" on public.anime_list_items
  for select using (
    exists (
      select 1 from public.anime_lists
      where anime_lists.id = anime_list_items.anime_list_id
        and (
          anime_lists.is_public = true
          or anime_lists.user_id = auth.uid()
          or (
            anime_lists.visible_to_followers = true
            and exists (
              select 1 from public.follows
              where follower_id = auth.uid()
                and following_id = anime_lists.user_id
            )
          )
          or (
            anime_lists.visible_to_following = true
            and exists (
              select 1 from public.follows
              where follower_id = anime_lists.user_id
                and following_id = auth.uid()
            )
          )
        )
    )
  );

-- 5. Update RLS select policies for game_lists
drop policy if exists "Public game lists readable" on public.game_lists;

create policy "Game lists are viewable if access granted" on public.game_lists
  for select using (
    is_public = true
    or auth.uid() = user_id
    or (
      visible_to_followers = true
      and exists (
        select 1 from public.follows
        where follower_id = auth.uid()
          and following_id = game_lists.user_id
      )
    )
    or (
      visible_to_following = true
      and exists (
        select 1 from public.follows
        where follower_id = game_lists.user_id
          and following_id = auth.uid()
      )
    )
  );

drop policy if exists "Public game list items readable" on public.game_list_items;

create policy "Game list items viewable if list accessible" on public.game_list_items
  for select using (
    exists (
      select 1 from public.game_lists
      where game_lists.id = game_list_items.game_list_id
        and (
          game_lists.is_public = true
          or game_lists.user_id = auth.uid()
          or (
            game_lists.visible_to_followers = true
            and exists (
              select 1 from public.follows
              where follower_id = auth.uid()
                and following_id = game_lists.user_id
            )
          )
          or (
            game_lists.visible_to_following = true
            and exists (
              select 1 from public.follows
              where follower_id = game_lists.user_id
                and following_id = auth.uid()
            )
          )
        )
    )
  );
