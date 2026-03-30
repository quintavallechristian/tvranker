-- Anime & Cartoons topic: separate tables (mirrors movies pattern)
-- Anime table (TMDB cache — anime-specific fields)
create table if not exists public.animes (
    id uuid default uuid_generate_v4() primary key,
    tmdb_id integer unique,
    mal_id integer,
    imdb_id text,
    title text not null,
    poster_path text,
    first_air_date date,
    overview text,
    episode_count integer,
    status text,
    tmdb_fetched boolean default false not null,
    trailer_url text,
    watch_providers jsonb
);

create index if not exists idx_animes_tmdb_id on public.animes(tmdb_id);

create index if not exists idx_animes_mal_id on public.animes(mal_id);

create index if not exists idx_animes_imdb_id on public.animes(imdb_id);

-- Anime lists table (one per user, analogous to movie_lists)
create table if not exists public.anime_lists (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null unique,
    name text not null default 'My Anime',
    description text,
    is_public boolean default true not null,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

create index if not exists idx_anime_lists_user_id on public.anime_lists(user_id);

-- Anime list items (junction: anime_list ↔ animes)
create table if not exists public.anime_list_items (
    id uuid default uuid_generate_v4() primary key,
    anime_list_id uuid references public.anime_lists(id) on delete cascade not null,
    anime_id uuid references public.animes(id) on delete cascade not null,
    rating integer check (
        rating >= 1
        and rating <= 10
    ),
    position integer default 0 not null,
    added_at timestamptz default now() not null,
    notes text,
    unique(anime_list_id, anime_id)
);

create index if not exists idx_anime_list_items_anime_list_id on public.anime_list_items(anime_list_id);

create index if not exists idx_anime_list_items_anime_id on public.anime_list_items(anime_id);

-- RLS policies
alter table
    public.animes enable row level security;

alter table
    public.anime_lists enable row level security;

alter table
    public.anime_list_items enable row level security;

-- animes: anyone can read; authenticated users can insert/update (TMDB cache writes)
create policy "Anyone can read animes" on public.animes for
select
    using (true);

create policy "Authenticated can insert animes" on public.animes for
insert
    with check (auth.role() = 'authenticated');

create policy "Authenticated can update animes" on public.animes for
update
    using (auth.role() = 'authenticated');

-- anime_lists: owner full access; others read public
create policy "Owner full access anime_lists" on public.anime_lists for all using (auth.uid() = user_id);

create policy "Public anime lists readable" on public.anime_lists for
select
    using (is_public = true);

-- anime_list_items: owner full access; others can read items of public lists
create policy "Owner full access anime_list_items" on public.anime_list_items for all using (
    anime_list_id in (
        select
            id
        from
            public.anime_lists
        where
            user_id = auth.uid()
    )
);

create policy "Public anime list items readable" on public.anime_list_items for
select
    using (
        anime_list_id in (
            select
                id
            from
                public.anime_lists
            where
                is_public = true
        )
    );

-- Auto-create anime_list for new users
create
or replace function public.handle_new_user_anime_list() returns trigger language plpgsql security definer
set
    search_path = public as $ $ begin
insert into
    public.anime_lists (user_id, name)
values
    (new.id, 'My Anime') on conflict (user_id) do nothing;

return new;

end;

$ $;

create trigger on_profile_created_anime_list
after
insert
    on public.profiles for each row execute procedure public.handle_new_user_anime_list();

-- Backfill: create anime_list for existing users who don't have one
insert into
    public.anime_lists (user_id, name)
select
    id,
    'My Anime'
from
    public.profiles on conflict (user_id) do nothing;