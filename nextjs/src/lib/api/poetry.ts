/**
 * Poetry API - 拼贴诗相关的数据库操作
 * Provides type-safe functions for poetry management
 */

import { SupabaseClient } from '@supabase/supabase-js';
import type { Database, Json } from '@/lib/types';

type Poetry = Database['public']['Tables']['poetry']['Row'];
type PoetryInsert = Database['public']['Tables']['poetry']['Insert'];
type PoetryUpdate = Database['public']['Tables']['poetry']['Update'];

export interface PoetrySearchOptions {
  creatorId?: string;
  visibility?: 'private' | 'shared' | 'public';
  collectionId?: string;
  page?: number;
  pageSize?: number;
  orderBy?: 'created_at' | 'updated_at' | 'title' | 'favorite_count' | 'view_count';
  orderDirection?: 'asc' | 'desc';
}

export interface PoetrySearchResult {
  poetry: Poetry[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PoetryContentBlock {
  type: 'word' | 'text';
  word_id?: string;
  text: string;
  x: number;
  y: number;
  fontSize?: number;
  [key: string]: unknown;
}

/**
 * Get poetry with pagination and filtering
 */
export async function getPoetry(
  client: SupabaseClient<Database>,
  options: PoetrySearchOptions = {}
): Promise<PoetrySearchResult> {
  const {
    creatorId,
    visibility,
    collectionId,
    page = 1,
    pageSize = 20,
    orderBy = 'created_at',
    orderDirection = 'desc',
  } = options;

  let queryBuilder = client
    .from('poetry')
    .select('*', { count: 'exact' })
    .is('deleted_at', null)
    .order(orderBy, { ascending: orderDirection === 'asc' })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (creatorId) {
    queryBuilder = queryBuilder.eq('creator_id', creatorId);
  }

  if (visibility) {
    queryBuilder = queryBuilder.eq('metadata->>visibility', visibility);
  }

  if (collectionId) {
    // Get poetry IDs from poetry_collections junction table
    const { data: poetryIds } = await client
      .from('poetry_collections')
      .select('poetry_id')
      .eq('collection_id', collectionId);

    if (poetryIds && poetryIds.length > 0) {
      const ids = poetryIds.map((p) => p.poetry_id);
      queryBuilder = queryBuilder.in('id', ids);
    } else {
      // Return empty result if no poetry in collection
      return {
        poetry: [],
        total: 0,
        page,
        pageSize,
        totalPages: 0,
      };
    }
  }

  const { data, error, count } = await queryBuilder;

  if (error) {
    throw new Error(`Failed to fetch poetry: ${error.message}`);
  }

  return {
    poetry: data || [],
    total: count || 0,
    page,
    pageSize,
    totalPages: Math.ceil((count || 0) / pageSize),
  };
}

/**
 * Get a single poetry by ID
 */
export async function getPoetryById(
  client: SupabaseClient<Database>,
  poetryId: string
): Promise<Poetry | null> {
  const { data, error } = await client
    .from('poetry')
    .select('*')
    .eq('id', poetryId)
    .is('deleted_at', null)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    throw new Error(`Failed to fetch poetry: ${error.message}`);
  }

  return data;
}

/**
 * Create a new poetry
 */
export async function createPoetry(
  client: SupabaseClient<Database>,
  poetry: PoetryInsert
): Promise<Poetry> {
  const { data, error } = await client
    .from('poetry')
    .insert(poetry)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create poetry: ${error.message}`);
  }

  return data;
}

/**
 * Update a poetry
 */
export async function updatePoetry(
  client: SupabaseClient<Database>,
  poetryId: string,
  updates: PoetryUpdate
): Promise<Poetry> {
  const { data, error } = await client
    .from('poetry')
    .update(updates)
    .eq('id', poetryId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update poetry: ${error.message}`);
  }

  return data;
}

/**
 * Delete a poetry (soft delete)
 */
export async function deletePoetry(
  client: SupabaseClient<Database>,
  poetryId: string
): Promise<void> {
  const { error } = await client
    .from('poetry')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', poetryId);

  if (error) {
    throw new Error(`Failed to delete poetry: ${error.message}`);
  }
}

/**
 * Link poetry to collections
 */
export async function linkPoetryToCollections(
  client: SupabaseClient<Database>,
  poetryId: string,
  collectionIds: string[]
): Promise<void> {
  const links = collectionIds.map((collectionId) => ({
    poetry_id: poetryId,
    collection_id: collectionId,
  }));

  const { error } = await client.from('poetry_collections').insert(links);

  if (error) {
    throw new Error(`Failed to link poetry to collections: ${error.message}`);
  }
}

/**
 * Unlink poetry from a collection
 */
export async function unlinkPoetryFromCollection(
  client: SupabaseClient<Database>,
  poetryId: string,
  collectionId: string
): Promise<void> {
  const { error } = await client
    .from('poetry_collections')
    .delete()
    .eq('poetry_id', poetryId)
    .eq('collection_id', collectionId);

  if (error) {
    throw new Error(`Failed to unlink poetry from collection: ${error.message}`);
  }
}

/**
 * Get poetry by creator
 */
export async function getPoetryByCreator(
  client: SupabaseClient<Database>,
  creatorId: string,
  options: Omit<PoetrySearchOptions, 'creatorId'> = {}
): Promise<PoetrySearchResult> {
  return getPoetry(client, { ...options, creatorId });
}

/**
 * Get public poetry
 */
export async function getPublicPoetry(
  client: SupabaseClient<Database>,
  options: Omit<PoetrySearchOptions, 'visibility'> = {}
): Promise<PoetrySearchResult> {
  return getPoetry(client, { ...options, visibility: 'public' });
}

/**
 * Increment poetry view count
 */
export async function incrementPoetryViews(
  client: SupabaseClient<Database>,
  poetryId: string
): Promise<void> {
  const poetry = await getPoetryById(client, poetryId);
  if (poetry) {
    await updatePoetry(client, poetryId, {
      view_count: (poetry.view_count || 0) + 1,
    });
  }
}

/**
 * Toggle favorite status for poetry
 */
export async function togglePoetryFavorite(
  client: SupabaseClient<Database>,
  poetryId: string,
  profileId: string
): Promise<boolean> {
  // Check if already favorited
  const { data: existing } = await client
    .from('favorites')
    .select('id')
    .eq('poetry_id', poetryId)
    .eq('profile_id', profileId)
    .single();

  if (existing) {
    // Remove favorite
    const { error } = await client
      .from('favorites')
      .delete()
      .eq('poetry_id', poetryId)
      .eq('profile_id', profileId);

    if (error) {
      throw new Error(`Failed to remove favorite: ${error.message}`);
    }

    // Decrement favorite count
    const poetry = await getPoetryById(client, poetryId);
    if (poetry) {
      await updatePoetry(client, poetryId, {
        favorite_count: Math.max(0, (poetry.favorite_count || 0) - 1),
      });
    }

    return false;
  } else {
    // Add favorite
    const { error } = await client.from('favorites').insert({
      poetry_id: poetryId,
      profile_id: profileId,
    });

    if (error) {
      throw new Error(`Failed to add favorite: ${error.message}`);
    }

    // Increment favorite count
    const poetry = await getPoetryById(client, poetryId);
    if (poetry) {
      await updatePoetry(client, poetryId, {
        favorite_count: (poetry.favorite_count || 0) + 1,
      });
    }

    return true;
  }
}

/**
 * Check if poetry is favorited by user
 */
export async function isPoetryFavorited(
  client: SupabaseClient<Database>,
  poetryId: string,
  profileId: string
): Promise<boolean> {
  const { data, error } = await client
    .from('favorites')
    .select('id')
    .eq('poetry_id', poetryId)
    .eq('profile_id', profileId)
    .single();

  return !!data && !error;
}

/**
 * Extract text content from poetry content blocks
 */
export function extractTextFromContent(content: PoetryContentBlock[]): string {
  return content
    .map((block) => block.text)
    .filter((text) => text && text.trim())
    .join(' ');
}

/**
 * Create poetry with content blocks
 */
export async function createPoetryWithContent(
  client: SupabaseClient<Database>,
  poetryData: Omit<PoetryInsert, 'text_content' | 'content'> & {
    content: PoetryContentBlock[];
  }
): Promise<Poetry> {
  const textContent = extractTextFromContent(poetryData.content);

  return createPoetry(client, {
    ...poetryData,
    content: poetryData.content as Json,
    text_content: textContent,
  });
}

