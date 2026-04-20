-- Board Games topic: separate tables (mirrors games pattern, but uses BoardGameGeek instead of IGDB)
-- Board games table (BGG cache — boardgame-specific fields)
create table if not exists public.boardgames (
    id uuid default uuid_generate_v4() primary key,
    bgg_id integer unique,
    title text not null,
    thumbnail_url text,
    image_url text,
    year_published integer,
    description text,
    min_players integer,
    max_players integer,
    playing_time integer,
    min_playtime integer,
    max_playtime integer,
    min_age integer,
    categories jsonb,
    mechanics jsonb,
    designers jsonb,
    bgg_rating numeric(4, 2),
    bgg_weight numeric(4, 2),
    bgg_fetched boolean default false not null,
    url text
);

create index if not exists idx_boardgames_bgg_id on public.boardgames(bgg_id);

-- Board game lists table (one per user, analogous to game_lists)
create table if not exists public.boardgame_lists (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null unique,
    name text not null default 'My Board Games',
    description text,
    is_public boolean default true not null,
    visible_to_followers boolean default false not null,
    visible_to_following boolean default false not null,
    rating_labels jsonb,
    custom_visibility boolean default false not null,
    bgg_username text,
    last_synced_at timestamptz,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

create index if not exists idx_boardgame_lists_user_id on public.boardgame_lists(user_id);

-- Board game list items (junction: boardgame_list ↔ boardgames)
create table if not exists public.boardgame_list_items (
    id uuid default uuid_generate_v4() primary key,
    boardgame_list_id uuid references public.boardgame_lists(id) on delete cascade not null,
    boardgame_id uuid references public.boardgames(id) on delete cascade not null,
    rating integer check (
        rating >= 1
        and rating <= 10
    ),
    position integer default 0 not null,
    added_at timestamptz default now() not null,
    notes text,
    unique(boardgame_list_id, boardgame_id)
);

create index if not exists idx_boardgame_list_items_boardgame_list_id on public.boardgame_list_items(boardgame_list_id);

create index if not exists idx_boardgame_list_items_boardgame_id on public.boardgame_list_items(boardgame_id);

-- RLS policies
alter table
    public.boardgames enable row level security;

alter table
    public.boardgame_lists enable row level security;

alter table
    public.boardgame_list_items enable row level security;

-- boardgames: anyone can read; authenticated users can insert/update (BGG cache writes)
create policy "Anyone can read boardgames" on public.boardgames for
select
    using (true);

create policy "Authenticated can insert boardgames" on public.boardgames for
insert
    with check (auth.role() = 'authenticated');

create policy "Authenticated can update boardgames" on public.boardgames for
update
    using (auth.role() = 'authenticated');

-- boardgame_lists: owner full access; others read public
create policy "Owner full access boardgame_lists" on public.boardgame_lists for all using (auth.uid() = user_id);

create policy "Public boardgame lists readable" on public.boardgame_lists for
select
    using (is_public = true);

-- boardgame_list_items: owner full access; others can read items of public lists
create policy "Owner full access boardgame_list_items" on public.boardgame_list_items for all using (
    boardgame_list_id in (
        select
            id
        from
            public.boardgame_lists
        where
            user_id = auth.uid()
    )
);

create policy "Public boardgame list items readable" on public.boardgame_list_items for
select
    using (
        boardgame_list_id in (
            select
                id
            from
                public.boardgame_lists
            where
                is_public = true
        )
    );

-- Auto-create boardgame_list for new users
create
or replace function public.handle_new_user_boardgame_list() returns trigger language plpgsql security definer
set
    search_path = public as $ $ begin
insert into
    public.boardgame_lists (user_id, name)
values
    (new.id, 'My Board Games') on conflict (user_id) do nothing;

return new;

end;

$ $;

create trigger on_profile_created_boardgame_list
after
insert
    on public.profiles for each row execute procedure public.handle_new_user_boardgame_list();

-- Backfill: create boardgame_list for existing users who don't have one
insert into
    public.boardgame_lists (user_id, name)
select
    id,
    'My Board Games'
from
    public.profiles on conflict (user_id) do nothing;