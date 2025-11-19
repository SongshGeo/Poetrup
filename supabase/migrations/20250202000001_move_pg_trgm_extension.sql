-- Fix security warning: Extension in Public
-- Move pg_trgm extension from public schema to extensions schema
-- 
-- IMPORTANT: This migration may cause brief downtime as it drops and recreates indexes.
-- The indexes will be automatically recreated, but queries using trigram matching
-- may be slower during the migration.

-- Set search_path to include extensions schema for the entire migration
SET LOCAL search_path = public, extensions;

-- Create extensions schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS extensions;

-- Step 1: Drop indexes that depend on pg_trgm
-- These will be recreated after moving the extension
DROP INDEX IF EXISTS public.idx_words_text_trgm;
DROP INDEX IF EXISTS public.idx_poetry_text_content_trgm;

-- Step 2: Drop the extension from public schema
-- This will also drop any dependent objects (like operator classes)
DROP EXTENSION IF EXISTS pg_trgm CASCADE;

-- Step 3: Create the extension in extensions schema
CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA extensions;

-- Step 4: Recreate the indexes
-- Note: gin_trgm_ops is now in extensions schema
-- search_path is already set at the beginning of this migration
CREATE INDEX IF NOT EXISTS idx_words_text_trgm 
ON public.words 
USING GIN(text gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_poetry_text_content_trgm 
ON public.poetry 
USING GIN(text_content gin_trgm_ops);

-- Grant usage on extensions schema to authenticated users
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO anon;

