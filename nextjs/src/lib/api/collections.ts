/**
 * Collections API - 收藏册相关的数据库操作
 * Provides type-safe functions for collection management
 */

import type { Database } from '@/lib/types';
import type { createSPAClient } from '@/lib/supabase/client';

type Collection = Database['public']['Tables']['collections']['Row'];
type CollectionInsert = Database['public']['Tables']['collections']['Insert'];
type CollectionUpdate = Database['public']['Tables']['collections']['Update'];
type CollectionWord = Database['public']['Tables']['collection_words']['Row'];
type Word = Database['public']['Tables']['words']['Row'];
// type CollectionWordInsert = Database['public']['Tables']['collection_words']['Insert']; // 未使用，已注释

export interface CollectionSearchOptions {
  ownerId?: string;
  visibility?: 'private' | 'shared' | 'public';
  tags?: string[];
  page?: number;
  pageSize?: number;
  orderBy?: 'created_at' | 'updated_at' | 'title' | 'word_count';
  orderDirection?: 'asc' | 'desc';
}

export interface CollectionSearchResult {
  collections: Collection[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CollectionWithWords extends Collection {
  words: Array<{
    id: string;
    text: string;
    normalized: string | null;
    tags: string[] | null;
    position: number;
    notes: string | null;
  }>;
}

/**
 * Get collections with pagination and filtering
 */
export async function getCollections(
  client: ReturnType<typeof createSPAClient>,
  options: CollectionSearchOptions = {}
): Promise<CollectionSearchResult> {
  const {
    ownerId,
    visibility,
    tags,
    page = 1,
    pageSize = 20,
    orderBy = 'created_at',
    orderDirection = 'desc',
  } = options;

  let queryBuilder = client
    .from('collections')
    .select('*', { count: 'exact' })
    .is('deleted_at', null)
    .order(orderBy, { ascending: orderDirection === 'asc' })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (ownerId) {
    queryBuilder = queryBuilder.eq('owner_id', ownerId);
  }

  if (visibility) {
    queryBuilder = queryBuilder.eq('visibility', visibility);
  }

  if (tags && tags.length > 0) {
    queryBuilder = queryBuilder.overlaps('tags', tags);
  }

  const { data, error, count } = await queryBuilder;

  if (error) {
    throw new Error(`Failed to fetch collections: ${error.message}`);
  }

  return {
    collections: data || [],
    total: count || 0,
    page,
    pageSize,
    totalPages: Math.ceil((count || 0) / pageSize),
  };
}

/**
 * Get a single collection by ID
 */
export async function getCollectionById(
  client: ReturnType<typeof createSPAClient>,
  collectionId: string
): Promise<Collection | null> {
  const { data, error } = await client
    .from('collections')
    .select('*')
    .eq('id', collectionId)
    .is('deleted_at', null)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    throw new Error(`Failed to fetch collection: ${error.message}`);
  }

  return data;
}

/**
 * Get collection with words
 */
export async function getCollectionWithWords(
  client: ReturnType<typeof createSPAClient>,
  collectionId: string
): Promise<CollectionWithWords | null> {
  const collection = await getCollectionById(client, collectionId);
  if (!collection) return null;

  const { data: words, error } = await client
    .from('collection_words')
    .select(
      `
      word_id,
      position,
      notes,
      words:word_id (
        id,
        text,
        normalized,
        tags
      )
    `
    )
    .eq('collection_id', collectionId)
    .order('position', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch collection words: ${error.message}`);
  }

  type CollectionWordWithRelation = {
    word_id: string;
    position: number | null;
    notes: string | null;
    words: Word;
  };

  return {
    ...collection,
    words: (words || []).map((cw: CollectionWordWithRelation) => ({
      id: cw.words.id,
      text: cw.words.text,
      normalized: cw.words.normalized,
      tags: cw.words.tags,
      position: cw.position || 0,
      notes: cw.notes,
    })),
  };
}

/**
 * Create a new collection
 */
export async function createCollection(
  client: ReturnType<typeof createSPAClient>,
  collection: CollectionInsert
): Promise<Collection> {
  const { data, error } = await (client
    .from('collections')
    .insert(collection as CollectionInsert)
    .select()
    .single() as Promise<{ data: Collection | null; error: { message: string } | null }>);

  if (error) {
    throw new Error(`Failed to create collection: ${error.message}`);
  }

  return data;
}

/**
 * Update a collection
 */
export async function updateCollection(
  client: ReturnType<typeof createSPAClient>,
  collectionId: string,
  updates: CollectionUpdate
): Promise<Collection> {
  const { data, error } = await client
    .from('collections')
    .update(updates)
    .eq('id', collectionId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update collection: ${error.message}`);
  }

  return data;
}

/**
 * Delete a collection (soft delete)
 */
export async function deleteCollection(
  client: ReturnType<typeof createSPAClient>,
  collectionId: string
): Promise<void> {
  const { error } = await client
    .from('collections')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', collectionId);

  if (error) {
    throw new Error(`Failed to delete collection: ${error.message}`);
  }
}

/**
 * Add a word to a collection
 */
export async function addWordToCollection(
  client: ReturnType<typeof createSPAClient>,
  collectionId: string,
  wordId: string,
  position?: number,
  notes?: string
): Promise<CollectionWord> {
  // Get current max position if not provided
  if (position === undefined) {
    const { data: existing } = await client
      .from('collection_words')
      .select('position')
      .eq('collection_id', collectionId)
      .order('position', { ascending: false })
      .limit(1)
      .single();

    position = existing ? (existing.position || 0) + 1 : 0;
  }

  const { data, error } = await client
    .from('collection_words')
    .insert({
      collection_id: collectionId,
      word_id: wordId,
      position,
      notes: notes || null,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to add word to collection: ${error.message}`);
  }

  return data;
}

/**
 * Remove a word from a collection
 */
export async function removeWordFromCollection(
  client: ReturnType<typeof createSPAClient>,
  collectionId: string,
  wordId: string
): Promise<void> {
  const { error } = await client
    .from('collection_words')
    .delete()
    .eq('collection_id', collectionId)
    .eq('word_id', wordId);

  if (error) {
    throw new Error(`Failed to remove word from collection: ${error.message}`);
  }
}

/**
 * Update word position in collection
 */
export async function updateWordPosition(
  client: ReturnType<typeof createSPAClient>,
  collectionId: string,
  wordId: string,
  newPosition: number
): Promise<void> {
  const { error } = await client
    .from('collection_words')
    .update({ position: newPosition })
    .eq('collection_id', collectionId)
    .eq('word_id', wordId);

  if (error) {
    throw new Error(`Failed to update word position: ${error.message}`);
  }
}

/**
 * Get collections by owner
 */
export async function getCollectionsByOwner(
  client: ReturnType<typeof createSPAClient>,
  ownerId: string,
  options: Omit<CollectionSearchOptions, 'ownerId'> = {}
): Promise<CollectionSearchResult> {
  return getCollections(client, { ...options, ownerId });
}

/**
 * Get public collections
 */
export async function getPublicCollections(
  client: ReturnType<typeof createSPAClient>,
  options: Omit<CollectionSearchOptions, 'visibility'> = {}
): Promise<CollectionSearchResult> {
  return getCollections(client, { ...options, visibility: 'public' });
}

