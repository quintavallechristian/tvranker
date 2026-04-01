-- Add profile-level default visibility settings to profiles table
ALTER TABLE
    profiles
ADD
    COLUMN IF NOT EXISTS default_is_public boolean NOT NULL DEFAULT false,
ADD
    COLUMN IF NOT EXISTS default_visible_to_followers boolean NOT NULL DEFAULT false,
ADD
    COLUMN IF NOT EXISTS default_visible_to_following boolean NOT NULL DEFAULT false;

-- Seed existing users' defaults from their shows list visibility
UPDATE
    profiles p
SET
    default_is_public = l.is_public,
    default_visible_to_followers = l.visible_to_followers,
    default_visible_to_following = l.visible_to_following
FROM
    lists l
WHERE
    l.user_id = p.id;

-- Add custom_visibility flag to all list tables
-- false = inherit from profile defaults; true = use per-list settings
ALTER TABLE
    lists
ADD
    COLUMN IF NOT EXISTS custom_visibility boolean NOT NULL DEFAULT false;

ALTER TABLE
    movie_lists
ADD
    COLUMN IF NOT EXISTS custom_visibility boolean NOT NULL DEFAULT false;

ALTER TABLE
    anime_lists
ADD
    COLUMN IF NOT EXISTS custom_visibility boolean NOT NULL DEFAULT false;

ALTER TABLE
    game_lists
ADD
    COLUMN IF NOT EXISTS custom_visibility boolean NOT NULL DEFAULT false;