-- RLS Policies for Poetry MVP
-- Note: RLS is already enabled in the core schema migration
-- These policies control access based on ownership and visibility

-- ============================================
-- PROFILES POLICIES
-- ============================================
-- Users can only read/update their own profile
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (
    auth.uid() IS NOT NULL AND auth.uid() = auth_uid
  );

CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND auth.uid() = auth_uid
  );

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (
    auth.uid() = auth_uid
  ) WITH CHECK (
    auth.uid() = auth_uid
  );

-- ============================================
-- WORDS POLICIES
-- ============================================
-- Anyone authenticated can read words (for search/exploration)
CREATE POLICY "words_select_authenticated" ON public.words
  FOR SELECT USING (
    auth.uid() IS NOT NULL AND deleted_at IS NULL
  );

-- Users can insert words (must set creator_id to their profile)
CREATE POLICY "words_insert_authenticated" ON public.words
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND
    creator_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid())
  );

-- Users can only update/delete words they created
CREATE POLICY "words_update_creator" ON public.words
  FOR UPDATE USING (
    creator_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid())
  ) WITH CHECK (
    creator_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid())
  );

CREATE POLICY "words_delete_creator" ON public.words
  FOR DELETE USING (
    creator_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid())
  );

-- ============================================
-- COLLECTIONS POLICIES
-- ============================================
-- Read: public collections OR own collections OR shared collections (if visibility = 'shared')
CREATE POLICY "collections_select_visible" ON public.collections
  FOR SELECT USING (
    deleted_at IS NULL AND (
      visibility = 'public' OR
      owner_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid()) OR
      (visibility = 'shared' AND auth.uid() IS NOT NULL)
    )
  );

-- Insert: authenticated users can create collections (must set owner_id to their profile)
CREATE POLICY "collections_insert_authenticated" ON public.collections
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND
    owner_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid())
  );

-- Update/Delete: only owner can modify
CREATE POLICY "collections_update_owner" ON public.collections
  FOR UPDATE USING (
    owner_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid())
  ) WITH CHECK (
    owner_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid())
  );

CREATE POLICY "collections_delete_owner" ON public.collections
  FOR DELETE USING (
    owner_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid())
  );

-- ============================================
-- COLLECTION_WORDS POLICIES
-- ============================================
-- Read: if you can read the collection, you can read its words
CREATE POLICY "collection_words_select_collection_visible" ON public.collection_words
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.collections c
      WHERE c.id = collection_words.collection_id
        AND c.deleted_at IS NULL
        AND (
          c.visibility = 'public' OR
          c.owner_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid()) OR
          (c.visibility = 'shared' AND auth.uid() IS NOT NULL)
        )
    )
  );

-- Insert/Update/Delete: only collection owner can modify
CREATE POLICY "collection_words_modify_owner" ON public.collection_words
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.collections c
      WHERE c.id = collection_words.collection_id
        AND c.owner_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid())
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.collections c
      WHERE c.id = collection_words.collection_id
        AND c.owner_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid())
    )
  );

-- ============================================
-- POETRY POLICIES
-- ============================================
-- Read: public poetry OR own poetry OR shared poetry (if metadata.visibility = 'shared')
CREATE POLICY "poetry_select_visible" ON public.poetry
  FOR SELECT USING (
    deleted_at IS NULL AND (
      (metadata->>'visibility') = 'public' OR
      creator_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid()) OR
      ((metadata->>'visibility') = 'shared' AND auth.uid() IS NOT NULL)
    )
  );

-- Insert: authenticated users can create poetry (must set creator_id to their profile)
CREATE POLICY "poetry_insert_authenticated" ON public.poetry
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND
    creator_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid())
  );

-- Update/Delete: only creator can modify
CREATE POLICY "poetry_update_creator" ON public.poetry
  FOR UPDATE USING (
    creator_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid())
  ) WITH CHECK (
    creator_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid())
  );

CREATE POLICY "poetry_delete_creator" ON public.poetry
  FOR DELETE USING (
    creator_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid())
  );

-- ============================================
-- POETRY_COLLECTIONS POLICIES
-- ============================================
-- Read: if you can read the poetry and collection
CREATE POLICY "poetry_collections_select_visible" ON public.poetry_collections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.poetry p
      WHERE p.id = poetry_collections.poetry_id
        AND p.deleted_at IS NULL
        AND (
          (p.metadata->>'visibility') = 'public' OR
          p.creator_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid()) OR
          ((p.metadata->>'visibility') = 'shared' AND auth.uid() IS NOT NULL)
        )
    ) AND EXISTS (
      SELECT 1 FROM public.collections c
      WHERE c.id = poetry_collections.collection_id
        AND c.deleted_at IS NULL
        AND (
          c.visibility = 'public' OR
          c.owner_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid()) OR
          (c.visibility = 'shared' AND auth.uid() IS NOT NULL)
        )
    )
  );

-- Insert/Update/Delete: only poetry creator or collection owner can modify
CREATE POLICY "poetry_collections_modify_owner" ON public.poetry_collections
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.poetry p
      WHERE p.id = poetry_collections.poetry_id
        AND p.creator_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid())
    ) OR EXISTS (
      SELECT 1 FROM public.collections c
      WHERE c.id = poetry_collections.collection_id
        AND c.owner_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid())
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.poetry p
      WHERE p.id = poetry_collections.poetry_id
        AND p.creator_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid())
    ) OR EXISTS (
      SELECT 1 FROM public.collections c
      WHERE c.id = poetry_collections.collection_id
        AND c.owner_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid())
    )
  );

-- ============================================
-- FAVORITES POLICIES
-- ============================================
-- Users can only read their own favorites
CREATE POLICY "favorites_select_own" ON public.favorites
  FOR SELECT USING (
    auth.uid() IS NOT NULL AND
    profile_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid())
  );

-- Users can only insert their own favorites
CREATE POLICY "favorites_insert_own" ON public.favorites
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND
    profile_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid())
  );

-- Users can only delete their own favorites
CREATE POLICY "favorites_delete_own" ON public.favorites
  FOR DELETE USING (
    profile_id = (SELECT id FROM public.profiles WHERE auth_uid = auth.uid())
  );

