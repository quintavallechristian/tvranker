-- Movies feature: separate tables for movies vs TV shows
-- Movies table (TMDB cache — similar to shows but with movie-specific fields)
create table if not exists public.movies (
    id uuid default uuid_generate_v4() primary key,
    tmdb_id integer unique,
    imdb_id text,
    title text not null,
    poster_path text,
    release_date date,
    overview text,
    runtime integer,
    -- minutes
    tmdb_fetched boolean default false not null,
    trailer_url text,
    watch_providers jsonb
);

create index if not exists idx_movies_tmdb_id on public.movies(tmdb_id);

create index if not exists idx_movies_imdb_id on public.movies(imdb_id);

-- Movie lists table (one per user, analogous to lists)
create table if not exists public.movie_lists (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null unique,
    name text not null default 'My Movies',
    description text,
    is_public boolean default true not null,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

create index if not exists idx_movie_lists_user_id on public.movie_lists(user_id);

-- Movie list items (junction: movie_list ↔ movies)
create table if not exists public.movie_list_items (
    id uuid default uuid_generate_v4() primary key,
    movie_list_id uuid references public.movie_lists(id) on delete cascade not null,
    movie_id uuid references public.movies(id) on delete cascade not null,
    rating integer check (
        rating >= 1
        and rating <= 10
    ),
    position integer default 0 not null,
    added_at timestamptz default now() not null,
    notes text,
    unique(movie_list_id, movie_id)
);

create index if not exists idx_movie_list_items_movie_list_id on public.movie_list_items(movie_list_id);

create index if not exists idx_movie_list_items_movie_id on public.movie_list_items(movie_id);

-- RLS policies
alter table
    public.movies enable row level security;

alter table
    public.movie_lists enable row level security;

alter table
    public.movie_list_items enable row level security;

-- movies: anyone can read; authenticated users can insert/update (TMDB cache writes)
create policy "Anyone can read movies" on public.movies for
select
    using (true);

create policy "Authenticated can insert movies" on public.movies for
insert
    with check (auth.role() = 'authenticated');

create policy "Authenticated can update movies" on public.movies for
update
    using (auth.role() = 'authenticated');

-- movie_lists: owner full access; others read public
create policy "Owner full access movie_lists" on public.movie_lists for all using (auth.uid() = user_id);

create policy "Public movie lists readable" on public.movie_lists for
select
    using (is_public = true);

-- movie_list_items: owner full access; others can read items of public lists
create policy "Owner full access movie_list_items" on public.movie_list_items for all using (
    movie_list_id in (
        select
            id
        from
            public.movie_lists
        where
            user_id = auth.uid()
    )
);

create policy "Public movie list items readable" on public.movie_list_items for
select
    using (
        movie_list_id in (
            select
                id
            from
                public.movie_lists
            where
                is_public = true
        )
    );

-- Auto-create movie_list for new users (mirror of existing list trigger)
create
or replace function public.handle_new_user_movie_list() returns trigger language plpgsql security definer
set
    search_path = public as $ $ begin
insert into
    public.movie_lists (user_id, name)
values
    (new.id, 'My Movies') on conflict (user_id) do nothing;

return new;

end;

$ $;

-- Trigger fires after any profile insert (signup)
create trigger on_profile_created_movie_list
after
insert
    on public.profiles for each row execute procedure public.handle_new_user_movie_list();

-- Backfill: create movie_list for existing users who don't have one
insert into
    public.movie_lists (user_id, name)
select
    id,
    'My Movies'
from
    public.profiles on conflict (user_id) do nothing;