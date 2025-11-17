-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to generate tsvector from normalized text
CREATE OR REPLACE FUNCTION public.generate_tsvector_from_normalized()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.normalized IS NOT NULL AND NEW.normalized != '' THEN
        -- Use 'simple' configuration for Chinese (no stemming)
        NEW.tsv = to_tsvector('simple', NEW.normalized);
    ELSE
        NEW.tsv = NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to generate tsvector for poetry from text_content
CREATE OR REPLACE FUNCTION public.generate_poetry_tsvector()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.text_content IS NOT NULL AND NEW.text_content != '' THEN
        NEW.tsv = to_tsvector('simple', NEW.text_content);
    ELSE
        NEW.tsv = NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_words_updated_at
    BEFORE UPDATE ON public.words
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_collections_updated_at
    BEFORE UPDATE ON public.collections
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_poetry_updated_at
    BEFORE UPDATE ON public.poetry
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create triggers for tsvector generation
CREATE TRIGGER generate_words_tsvector
    BEFORE INSERT OR UPDATE OF normalized ON public.words
    FOR EACH ROW
    EXECUTE FUNCTION public.generate_tsvector_from_normalized();

CREATE TRIGGER generate_poetry_tsvector
    BEFORE INSERT OR UPDATE OF text_content ON public.poetry
    FOR EACH ROW
    EXECUTE FUNCTION public.generate_poetry_tsvector();

-- Create GIN index for full-text search on words.tsv
CREATE INDEX IF NOT EXISTS idx_words_tsv ON public.words USING GIN(tsv);

-- Create GIN index for full-text search on poetry.tsv
CREATE INDEX IF NOT EXISTS idx_poetry_tsv ON public.poetry USING GIN(tsv);

-- Create trigram index for fuzzy matching on words.text
CREATE INDEX IF NOT EXISTS idx_words_text_trgm ON public.words USING GIN(text gin_trgm_ops);

-- Create trigram index for fuzzy matching on poetry.text_content
CREATE INDEX IF NOT EXISTS idx_poetry_text_content_trgm ON public.poetry USING GIN(text_content gin_trgm_ops);

-- Create index on words.tokens for JSONB queries
CREATE INDEX IF NOT EXISTS idx_words_tokens ON public.words USING GIN(tokens);

-- Create index on collections.metadata for JSONB queries
CREATE INDEX IF NOT EXISTS idx_collections_metadata ON public.collections USING GIN(metadata);

-- Create index on poetry.content for JSONB queries
CREATE INDEX IF NOT EXISTS idx_poetry_content ON public.poetry USING GIN(content);

-- Create index on poetry.metadata for JSONB queries
CREATE INDEX IF NOT EXISTS idx_poetry_metadata ON public.poetry USING GIN(metadata);

-- Function to update collection word_count
CREATE OR REPLACE FUNCTION public.update_collection_word_count()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

-- Trigger to update collection word_count
CREATE TRIGGER update_collection_word_count_trigger
    AFTER INSERT OR DELETE ON public.collection_words
    FOR EACH ROW
    EXECUTE FUNCTION public.update_collection_word_count();

