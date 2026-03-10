-- TV Ranker Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (auto-created on user signup)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  avatar_url text,
  created_at timestamptz default now() not null
);

-- Lists table
create table if not exists public.lists (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  description text,
  is_public boolean default false not null,
  position integer default 0 not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Shows table (TMDB cache — tmdb data fetched lazily on detail page)
create table if not exists public.shows (
  id uuid default uuid_generate_v4() primary key,
  tmdb_id integer unique,
  imdb_id text,
  title text not null,
  poster_path text,
  first_air_date date,
  overview text,
  tmdb_fetched boolean default false not null
);

-- List items (junction table)
create table if not exists public.list_items (
  id uuid default uuid_generate_v4() primary key,
  list_id uuid references public.lists(id) on delete cascade not null,
  show_id uuid references public.shows(id) on delete cascade not null,
  rating integer check (rating >= 1 and rating <= 10),
  position integer default 0 not null,
  added_at timestamptz default now() not null,
  notes text,
  unique(list_id, show_id)
);

-- Indexes
create index if not exists idx_lists_user_id on public.lists(user_id);
create index if not exists idx_list_items_list_id on public.list_items(list_id);
create index if not exists idx_list_items_show_id on public.list_items(show_id);
create index if not exists idx_shows_tmdb_id on public.shows(tmdb_id);
create index if not exists idx_shows_imdb_id on public.shows(imdb_id);
create index if not exists idx_profiles_username on public.profiles(username);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.lists enable row level security;
alter table public.shows enable row level security;
alter table public.list_items enable row level security;

-- Profiles policies
create policy "Profiles are viewable by everyone" on public.profiles
  for select using (true);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Lists policies
create policy "Public lists are viewable by everyone" on public.lists
  for select using (is_public = true or auth.uid() = user_id);

create policy "Users can create own lists" on public.lists
  for insert with check (auth.uid() = user_id);

create policy "Users can update own lists" on public.lists
  for update using (auth.uid() = user_id);

create policy "Users can delete own lists" on public.lists
  for delete using (auth.uid() = user_id);

-- Shows policies (readable by all, insertable by authenticated users)
create policy "Shows are viewable by everyone" on public.shows
  for select using (true);

create policy "Authenticated users can insert shows" on public.shows
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update shows" on public.shows
  for update using (auth.role() = 'authenticated');

-- List items policies
create policy "List items viewable if list is accessible" on public.list_items
  for select using (
    exists (
      select 1 from public.lists
      where lists.id = list_items.list_id
      and (lists.is_public = true or lists.user_id = auth.uid())
    )
  );

create policy "Users can manage list items in own lists" on public.list_items
  for insert with check (
    exists (
      select 1 from public.lists
      where lists.id = list_items.list_id
      and lists.user_id = auth.uid()
    )
  );

create policy "Users can update list items in own lists" on public.list_items
  for update using (
    exists (
      select 1 from public.lists
      where lists.id = list_items.list_id
      and lists.user_id = auth.uid()
    )
  );

create policy "Users can delete list items from own lists" on public.list_items
  for delete using (
    exists (
      select 1 from public.lists
      where lists.id = list_items.list_id
      and lists.user_id = auth.uid()
    )
  );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'username',
      split_part(new.email, '@', 1) || '_' || substr(new.id::text, 1, 4)
    ),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

-- Trigger on user creation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at on lists
create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists update_lists_updated_at on public.lists;
create trigger update_lists_updated_at
  before update on public.lists
  for each row execute procedure public.update_updated_at();
