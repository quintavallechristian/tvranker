-- Video Games topic: separate tables (mirrors anime pattern, but uses IGDB instead of TMDB)
-- Games table (IGDB cache — game-specific fields)
create table if not exists public.games (
    id uuid default uuid_generate_v4() primary key,
    igdb_id integer unique,
    title text not null,
    cover_url text,
    first_release_date date,
    overview text,
    platforms jsonb,
    genres jsonb,
    igdb_fetched boolean default false not null,
    url text
);

create index if not exists idx_games_igdb_id on public.games(igdb_id);

-- Game lists table (one per user, analogous to anime_lists)
create table if not exists public.game_lists (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null unique,
    name text not null default 'My Games',
    description text,
    is_public boolean default true not null,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

create index if not exists idx_game_lists_user_id on public.game_lists(user_id);

-- Game list items (junction: game_list ↔ games)
create table if not exists public.game_list_items (
    id uuid default uuid_generate_v4() primary key,
    game_list_id uuid references public.game_lists(id) on delete cascade not null,
    game_id uuid references public.games(id) on delete cascade not null,
    rating integer check (
        rating >= 1
        and rating <= 10
    ),
    position integer default 0 not null,
    added_at timestamptz default now() not null,
    notes text,
    unique(game_list_id, game_id)
);

create index if not exists idx_game_list_items_game_list_id on public.game_list_items(game_list_id);

create index if not exists idx_game_list_items_game_id on public.game_list_items(game_id);

-- RLS policies
alter table
    public.games enable row level security;

alter table
    public.game_lists enable row level security;

alter table
    public.game_list_items enable row level security;

-- games: anyone can read; authenticated users can insert/update (IGDB cache writes)
create policy "Anyone can read games" on public.games for
select
    using (true);

create policy "Authenticated can insert games" on public.games for
insert
    with check (auth.role() = 'authenticated');

create policy "Authenticated can update games" on public.games for
update
    using (auth.role() = 'authenticated');

-- game_lists: owner full access; others read public
create policy "Owner full access game_lists" on public.game_lists for all using (auth.uid() = user_id);

create policy "Public game lists readable" on public.game_lists for
select
    using (is_public = true);

-- game_list_items: owner full access; others can read items of public lists
create policy "Owner full access game_list_items" on public.game_list_items for all using (
    game_list_id in (
        select
            id
        from
            public.game_lists
        where
            user_id = auth.uid()
    )
);

create policy "Public game list items readable" on public.game_list_items for
select
    using (
        game_list_id in (
            select
                id
            from
                public.game_lists
            where
                is_public = true
        )
    );

-- Auto-create game_list for new users
create
or replace function public.handle_new_user_game_list() returns trigger language plpgsql security definer
set
    search_path = public as $ $ begin
insert into
    public.game_lists (user_id, name)
values
    (new.id, 'My Games') on conflict (user_id) do nothing;

return new;

end;

$ $;

create trigger on_profile_created_game_list
after
insert
    on public.profiles for each row execute procedure public.handle_new_user_game_list();

-- Backfill: create game_list for existing users who don't have one
insert into
    public.game_lists (user_id, name)
select
    id,
    'My Games'
from
    public.profiles on conflict (user_id) do nothing;