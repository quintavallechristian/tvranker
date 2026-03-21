-- Migration: Follows system
-- Allows users to follow other users

create table if not exists public.follows (
  id uuid default uuid_generate_v4() primary key,
  follower_id uuid references public.profiles(id) on delete cascade not null,
  following_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  unique(follower_id, following_id),
  check(follower_id != following_id)
);

-- Indexes
create index if not exists idx_follows_follower_id on public.follows(follower_id);
create index if not exists idx_follows_following_id on public.follows(following_id);

-- Row Level Security
alter table public.follows enable row level security;

-- Anyone can read follows
create policy "Follows are viewable by everyone" on public.follows
  for select using (true);

-- Users can only insert their own follows
create policy "Users can follow others" on public.follows
  for insert with check (auth.uid() = follower_id);

-- Users can only delete their own follows
create policy "Users can unfollow" on public.follows
  for delete using (auth.uid() = follower_id);
