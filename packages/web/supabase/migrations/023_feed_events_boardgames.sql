ALTER TABLE
    public.feed_events DROP CONSTRAINT IF EXISTS feed_events_content_type_check;

ALTER TABLE
    public.feed_events
ADD
    CONSTRAINT feed_events_content_type_check CHECK (
        content_type IN ('show', 'movie', 'anime', 'game', 'boardgame')
    );