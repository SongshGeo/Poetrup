-- Create storage buckets for poetry app
-- Note: Buckets are created in the storage schema

-- Avatars bucket (public, for user profile pictures)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Collection covers bucket (public, for collection cover images)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'collection-covers',
  'collection-covers',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- User uploads bucket (private, for original user-uploaded images)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'user-uploads',
  'user-uploads',
  false,
  52428800, -- 50MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Exports bucket (private, for exported files with TTL)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'exports',
  'exports',
  false,
  104857600, -- 100MB
  ARRAY['application/pdf', 'application/zip', 'image/png', 'image/jpeg']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- STORAGE POLICIES
-- ============================================

-- Avatars: Users can upload/update/delete their own avatar
CREATE POLICY "avatars_upload_own"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid() IS NOT NULL AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "avatars_read_public"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "avatars_update_own"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' AND
  auth.uid() IS NOT NULL AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "avatars_delete_own"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars' AND
  auth.uid() IS NOT NULL AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Collection covers: Collection owners can upload/update/delete covers
CREATE POLICY "collection_covers_upload_owner"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'collection-covers' AND
  auth.uid() IS NOT NULL AND
  EXISTS (
    SELECT 1 FROM public.collections c
    JOIN public.profiles p ON p.id = c.owner_id
    WHERE p.auth_uid = auth.uid()
      AND (storage.foldername(name))[1] = c.id::text
  )
);

CREATE POLICY "collection_covers_read_public"
ON storage.objects FOR SELECT
USING (bucket_id = 'collection-covers');

CREATE POLICY "collection_covers_update_owner"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'collection-covers' AND
  auth.uid() IS NOT NULL AND
  EXISTS (
    SELECT 1 FROM public.collections c
    JOIN public.profiles p ON p.id = c.owner_id
    WHERE p.auth_uid = auth.uid()
      AND (storage.foldername(name))[1] = c.id::text
  )
);

CREATE POLICY "collection_covers_delete_owner"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'collection-covers' AND
  auth.uid() IS NOT NULL AND
  EXISTS (
    SELECT 1 FROM public.collections c
    JOIN public.profiles p ON p.id = c.owner_id
    WHERE p.auth_uid = auth.uid()
      AND (storage.foldername(name))[1] = c.id::text
  )
);

-- User uploads: Users can only access their own uploads
CREATE POLICY "user_uploads_upload_own"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'user-uploads' AND
  auth.uid() IS NOT NULL AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "user_uploads_read_own"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'user-uploads' AND
  auth.uid() IS NOT NULL AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "user_uploads_update_own"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'user-uploads' AND
  auth.uid() IS NOT NULL AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "user_uploads_delete_own"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'user-uploads' AND
  auth.uid() IS NOT NULL AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Exports: Users can only access their own exports
CREATE POLICY "exports_upload_own"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'exports' AND
  auth.uid() IS NOT NULL AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "exports_read_own"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'exports' AND
  auth.uid() IS NOT NULL AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "exports_delete_own"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'exports' AND
  auth.uid() IS NOT NULL AND
  (storage.foldername(name))[1] = auth.uid()::text
);

