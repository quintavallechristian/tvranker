-- Tags system migration
-- Adds user-personal tags that can be assigned to shows
-- 5 default (immutable) tags are seeded for all users

-- Tags table
-- is_default=true + user_id=null → built-in, not editable/deletable
-- is_default=false + user_id=<uid> → user's custom tag
-- color: one of the 10 palette keys (blue|green|pink|yellow|orange|purple|red|teal|indigo|slate)
create table if not exists public.tags (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  color text not null default 'slate',
  is_default boolean default false not null,
  created_at timestamptz default now() not null,
  constraint default_tags_no_user check (
    (is_default = true and user_id is null) or
    (is_default = false and user_id is not null)
  ),
  constraint tags_color_valid check (
    color in ('blue','green','pink','yellow','orange','purple','red','teal','indigo','slate')
  )
);

-- Unique name per user (custom tags)
create unique index if not exists tags_user_name_unique
  on public.tags(user_id, name)
  where user_id is not null;

-- Unique name among default tags
create unique index if not exists tags_default_name_unique
  on public.tags(name)
  where is_default = true;

-- Show tags junction: user assigns a tag to a show
create table if not exists public.show_tags (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  show_id uuid references public.shows(id) on delete cascade not null,
  tag_id uuid references public.tags(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  unique(user_id, show_id, tag_id)
);

-- Indexes
create index if not exists idx_tags_user_id on public.tags(user_id);
create index if not exists idx_show_tags_user_show on public.show_tags(user_id, show_id);
create index if not exists idx_show_tags_tag_id on public.show_tags(tag_id);

-- Seed default tags with their fixed colors
insert into public.tags (name, color, is_default) values
  ('serie tv',     'blue',   true),
  ('reality',      'pink',   true),
  ('documentario', 'green',  true),
  ('cartoni animati', 'yellow', true),
  ('anime',        'orange', true)
on conflict do nothing;

-- RLS
alter table public.tags enable row level security;
alter table public.show_tags enable row level security;

-- Tags policies
create policy "Default tags and own tags are viewable" on public.tags
  for select using (is_default = true or auth.uid() = user_id);

create policy "Users can create own tags" on public.tags
  for insert with check (auth.uid() = user_id and is_default = false);

create policy "Users can delete own tags" on public.tags
  for delete using (auth.uid() = user_id and is_default = false);

-- Show tags policies
create policy "Users can view own show tags" on public.show_tags
  for select using (auth.uid() = user_id);

create policy "Users can insert own show tags" on public.show_tags
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own show tags" on public.show_tags
  for delete using (auth.uid() = user_id);
