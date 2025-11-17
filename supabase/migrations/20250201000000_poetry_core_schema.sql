-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create profiles table (user profiles linked to auth.users)
-- Note: Using gen_random_uuid() which is built-in PostgreSQL 13+ (no extension needed)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_uid UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT,
    display_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- Create words table (vocabulary words with Chinese tokenization support)
CREATE TABLE IF NOT EXISTS public.words (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text TEXT NOT NULL,
    normalized TEXT, -- Space-separated tokens for tsvector
    tokens JSONB, -- Array of tokens for recommendations and statistics
    language TEXT DEFAULT 'zh',
    tsv TSVECTOR, -- Full-text search vector
    creator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    source TEXT DEFAULT 'user_input',
    tags TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}'::jsonb,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- Create collections table (word collections/albums)
CREATE TABLE IF NOT EXISTS public.collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    visibility TEXT NOT NULL DEFAULT 'private' CHECK (visibility IN ('private', 'shared', 'public')),
    cover_url TEXT,
    tags TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}'::jsonb, -- UI layout/theme settings
    word_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- Create collection_words junction table (words in collections with position)
CREATE TABLE IF NOT EXISTS public.collection_words (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collection_id UUID NOT NULL REFERENCES public.collections(id) ON DELETE CASCADE,
    word_id UUID NOT NULL REFERENCES public.words(id) ON DELETE CASCADE,
    position INTEGER DEFAULT 0, -- For ordering words in collection
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(collection_id, word_id)
);

-- Create poetry table (collage poems)
CREATE TABLE IF NOT EXISTS public.poetry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    creator_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of blocks: {type, word_id, text, x, y, ...}
    text_content TEXT, -- Extracted text for search
    tsv TSVECTOR, -- Full-text search vector
    cover_url TEXT,
    metadata JSONB DEFAULT '{}'::jsonb, -- Contains visibility, theme, etc.
    favorite_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

-- Create poetry_collections junction table (poems linked to collections)
CREATE TABLE IF NOT EXISTS public.poetry_collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    poetry_id UUID NOT NULL REFERENCES public.poetry(id) ON DELETE CASCADE,
    collection_id UUID NOT NULL REFERENCES public.collections(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(poetry_id, collection_id)
);

-- Create favorites table (user favorites)
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    poetry_id UUID REFERENCES public.poetry(id) ON DELETE CASCADE,
    collection_id UUID REFERENCES public.collections(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(profile_id, poetry_id, collection_id),
    CHECK (
        (poetry_id IS NOT NULL AND collection_id IS NULL) OR
        (poetry_id IS NULL AND collection_id IS NOT NULL)
    )
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_auth_uid ON public.profiles(auth_uid);
CREATE INDEX IF NOT EXISTS idx_words_creator_id ON public.words(creator_id);
CREATE INDEX IF NOT EXISTS idx_words_language ON public.words(language);
CREATE INDEX IF NOT EXISTS idx_words_normalized ON public.words(normalized);
CREATE INDEX IF NOT EXISTS idx_collections_owner_id ON public.collections(owner_id);
CREATE INDEX IF NOT EXISTS idx_collections_visibility ON public.collections(visibility);
CREATE INDEX IF NOT EXISTS idx_collection_words_collection_id ON public.collection_words(collection_id);
CREATE INDEX IF NOT EXISTS idx_collection_words_word_id ON public.collection_words(word_id);
CREATE INDEX IF NOT EXISTS idx_collection_words_position ON public.collection_words(collection_id, position);
CREATE INDEX IF NOT EXISTS idx_poetry_creator_id ON public.poetry(creator_id);
CREATE INDEX IF NOT EXISTS idx_poetry_collections_poetry_id ON public.poetry_collections(poetry_id);
CREATE INDEX IF NOT EXISTS idx_poetry_collections_collection_id ON public.poetry_collections(collection_id);
CREATE INDEX IF NOT EXISTS idx_favorites_profile_id ON public.favorites(profile_id);
CREATE INDEX IF NOT EXISTS idx_favorites_poetry_id ON public.favorites(poetry_id);
CREATE INDEX IF NOT EXISTS idx_favorites_collection_id ON public.favorites(collection_id);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.words ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poetry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poetry_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

