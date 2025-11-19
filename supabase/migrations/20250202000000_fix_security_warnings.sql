-- Fix security warnings: Function Search Path Mutable
-- This migration fixes all functions to set search_path for security

-- Fix handle_new_user function
-- Note: This function needs access to auth.users (via NEW parameter) and auth schema functions
-- So we include both public and auth in search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
  INSERT INTO public.profiles (auth_uid, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Fix generate_tsvector_from_normalized function
CREATE OR REPLACE FUNCTION public.generate_tsvector_from_normalized()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    IF NEW.normalized IS NOT NULL AND NEW.normalized != '' THEN
        -- Use 'simple' configuration for Chinese (no stemming)
        NEW.tsv = to_tsvector('simple', NEW.normalized);
    ELSE
        NEW.tsv = NULL;
    END IF;
    RETURN NEW;
END;
$$;

-- Fix generate_poetry_tsvector function
CREATE OR REPLACE FUNCTION public.generate_poetry_tsvector()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    IF NEW.text_content IS NOT NULL AND NEW.text_content != '' THEN
        NEW.tsv = to_tsvector('simple', NEW.text_content);
    ELSE
        NEW.tsv = NULL;
    END IF;
    RETURN NEW;
END;
$$;

-- Fix update_collection_word_count function
CREATE OR REPLACE FUNCTION public.update_collection_word_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.collections
        SET word_count = (
            SELECT COUNT(*) FROM public.collection_words
            WHERE collection_id = NEW.collection_id AND deleted_at IS NULL
        )
        WHERE id = NEW.collection_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.collections
        SET word_count = (
            SELECT COUNT(*) FROM public.collection_words
            WHERE collection_id = OLD.collection_id AND deleted_at IS NULL
        )
        WHERE id = OLD.collection_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$;

-- Fix is_user_authenticated function in authenticative schema
-- Note: This function is used by RLS policies, so we need to ensure it exists
CREATE SCHEMA IF NOT EXISTS authenticative;

CREATE OR REPLACE FUNCTION authenticative.is_user_authenticated()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, auth
AS $function$
  SELECT array[(select auth.jwt()->>'aal')] <@ (
    SELECT
      CASE
        WHEN count(id) > 0 THEN array['aal2']
        ELSE array['aal1', 'aal2']
      END as aal
    FROM auth.mfa_factors
    WHERE (auth.uid() = user_id)
    AND status = 'verified'
  );
$function$;

