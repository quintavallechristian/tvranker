-- Migration: Add rating_labels to profiles
-- Run this in Supabase SQL Editor

-- Add rating_labels column: array of 10 strings, index 0 = rating 1, index 9 = rating 10
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS rating_labels jsonb
  DEFAULT '["Unwatchable","Terrible","Bad","Poor","Average","Fine","Good","Great","Excellent","Masterpiece"]'::jsonb;
