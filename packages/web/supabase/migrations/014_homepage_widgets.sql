-- Homepage widget configuration per user
-- Stored as JSONB array of widget objects: [{id, type, colSpan}]
ALTER TABLE
    public.profiles
ADD
    COLUMN IF NOT EXISTS homepage_widgets jsonb;