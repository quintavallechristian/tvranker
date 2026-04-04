-- Add poster_path column to feed_events (for card thumbnails in the feed UI)
ALTER TABLE
    feed_events
ADD
    COLUMN IF NOT EXISTS poster_path text;