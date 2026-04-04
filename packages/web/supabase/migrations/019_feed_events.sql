-- Feed events: track when users add/rate items in their lists
-- Used to build a social feed for followers
CREATE TABLE IF NOT EXISTS feed_events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    event_type text NOT NULL,
    -- 'add_item' | 'rate_item'
    content_type text NOT NULL,
    -- 'show' | 'movie' | 'anime' | 'game'
    item_id uuid NOT NULL,
    -- FK to shows/movies/animes/games (not enforced, polymorphic)
    list_id uuid NOT NULL,
    -- FK to lists/movie_lists/anime_lists/game_lists (not enforced, polymorphic)
    item_title text NOT NULL DEFAULT '',
    -- Denormalized for fast feed rendering
    poster_path text,
    -- TMDB relative path or full IGDB URL (nullable)
    rating integer,
    -- Only for rate_item events (1-10)
    event_date date NOT NULL DEFAULT CURRENT_DATE,
    -- For same-day dedup/override
    created_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT feed_events_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE,
    CONSTRAINT feed_events_event_type_check CHECK (event_type IN ('add_item', 'rate_item')),
    CONSTRAINT feed_events_content_type_check CHECK (
        content_type IN ('show', 'movie', 'anime', 'game')
    ),
    CONSTRAINT feed_events_rating_check CHECK (
        rating IS NULL
        OR (
            rating >= 1
            AND rating <= 10
        )
    ),
    -- One event per user/item/day: rating overwrites add via UPSERT
    CONSTRAINT feed_events_user_item_day_unique UNIQUE (user_id, content_type, item_id, event_date)
);

ALTER TABLE
    feed_events ENABLE ROW LEVEL SECURITY;

-- Anyone can read feed events (feed is public for followed users)
DO $ $ BEGIN IF NOT EXISTS (
    SELECT
        1
    FROM
        pg_policies
    WHERE
        tablename = 'feed_events'
        AND policyname = 'feed_events_select'
) THEN CREATE POLICY "feed_events_select" ON feed_events FOR
SELECT
    USING (true);

END IF;

END $ $;

DO $ $ BEGIN IF NOT EXISTS (
    SELECT
        1
    FROM
        pg_policies
    WHERE
        tablename = 'feed_events'
        AND policyname = 'feed_events_insert'
) THEN CREATE POLICY "feed_events_insert" ON feed_events FOR
INSERT
    WITH CHECK (auth.uid() = user_id);

END IF;

END $ $;

DO $ $ BEGIN IF NOT EXISTS (
    SELECT
        1
    FROM
        pg_policies
    WHERE
        tablename = 'feed_events'
        AND policyname = 'feed_events_update'
) THEN CREATE POLICY "feed_events_update" ON feed_events FOR
UPDATE
    USING (auth.uid() = user_id);

END IF;

END $ $;

-- Feed query: events from followed users, recent first
CREATE INDEX IF NOT EXISTS feed_events_user_created_idx ON feed_events(user_id, created_at DESC);

-- Cleanup: delete old events (optional, can add a cron job later)
-- For now keep everything