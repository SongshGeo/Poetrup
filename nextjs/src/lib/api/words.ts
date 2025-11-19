/**
 * Words API - 词语相关的数据库操作
 * Provides type-safe functions for word management
 */

import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/types';

type Word = Database['public']['Tables']['words']['Row'];
type WordInsert = Database['public']['Tables']['words']['Insert'];
type WordUpdate = Database['public']['Tables']['words']['Update'];

export interface WordSearchOptions {
  query?: string;
  language?: string;
  tags?: string[];
  creatorId?: string;
  page?: number;
  pageSize?: number;
  orderBy?: 'created_at' | 'updated_at' | 'usage_count' | 'text';
  orderDirection?: 'asc' | 'desc';
}

export interface WordSearchResult {
  words: Word[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Get words with pagination and filtering
 */
export async function getWords(
  client: SupabaseClient<Database, "public", Database["public"]>,
  options: WordSearchOptions = {}
): Promise<WordSearchResult> {
  const {
    query,
    language,
    tags,
    creatorId,
    page = 1,
    pageSize = 20,
    orderBy = 'created_at',
    orderDirection = 'desc',
  } = options;

  let queryBuilder = client
    .from('words')
    .select('*', { count: 'exact' })
    .is('deleted_at', null)
    .order(orderBy, { ascending: orderDirection === 'asc' })
    .range((page - 1) * pageSize, page * pageSize - 1);

  // Apply filters
  if (language) {
    queryBuilder = queryBuilder.eq('language', language);
  }

  if (creatorId) {
    queryBuilder = queryBuilder.eq('creator_id', creatorId);
  }

  if (tags && tags.length > 0) {
    queryBuilder = queryBuilder.overlaps('tags', tags);
  }

  // Full-text search
  if (query) {
    queryBuilder = queryBuilder.or(
      `text.ilike.%${query}%,normalized.ilike.%${query}%`
    );
  }

  const { data, error, count } = await queryBuilder;

  if (error) {
    throw new Error(`Failed to fetch words: ${error.message}`);
  }

  return {
    words: data || [],
    total: count || 0,
    page,
    pageSize,
    totalPages: Math.ceil((count || 0) / pageSize),
  };
}

/**
 * Get a single word by ID
 */
export async function getWordById(
  client: SupabaseClient<Database, "public", Database["public"]>,
  wordId: string
): Promise<Word | null> {
  const { data, error } = await client
    .from('words')
    .select('*')
    .eq('id', wordId)
    .is('deleted_at', null)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    throw new Error(`Failed to fetch word: ${error.message}`);
  }

  return data;
}

/**
 * Create a new word
 */
export async function createWord(
  client: SupabaseClient<Database, "public", Database["public"]>,
  word: WordInsert
): Promise<Word> {
  const { data, error } = await client
    .from('words')
    .insert(word)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create word: ${error.message}`);
  }

  return data;
}

/**
 * Update a word
 */
export async function updateWord(
  client: SupabaseClient<Database, "public", Database["public"]>,
  wordId: string,
  updates: WordUpdate
): Promise<Word> {
  const { data, error } = await client
    .from('words')
    .update(updates)
    .eq('id', wordId)
    .select();

  if (error) {
    throw new Error(`Failed to update word: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new Error('Word not found or no changes made');
  }

  return data[0];
}

/**
 * Delete a word (soft delete)
 */
export async function deleteWord(
  client: SupabaseClient<Database, "public", Database["public"]>,
  wordId: string
): Promise<void> {
  const { error } = await client
    .from('words')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', wordId);

  if (error) {
    throw new Error(`Failed to delete word: ${error.message}`);
  }
}

/**
 * Search words using full-text search
 */
export async function searchWords(
  client: SupabaseClient<Database, "public", Database["public"]>,
  searchQuery: string,
  options: Omit<WordSearchOptions, 'query'> = {}
): Promise<WordSearchResult> {
  return getWords(client, { ...options, query: searchQuery });
}

/**
 * Get words by tags
 */
export async function getWordsByTags(
  client: SupabaseClient<Database, "public", Database["public"]>,
  tags: string[],
  options: Omit<WordSearchOptions, 'tags'> = {}
): Promise<WordSearchResult> {
  return getWords(client, { ...options, tags });
}

/**
 * Get words by creator
 */
export async function getWordsByCreator(
  client: SupabaseClient<Database, "public", Database["public"]>,
  creatorId: string,
  options: Omit<WordSearchOptions, 'creatorId'> = {}
): Promise<WordSearchResult> {
  return getWords(client, { ...options, creatorId });
}

/**
 * Increment word usage count
 */
export async function incrementWordUsage(
  client: SupabaseClient<Database, "public", Database["public"]>,
  wordId: string
): Promise<void> {
  const { error } = await client.rpc('increment_word_usage', {
    word_id: wordId,
  });

  // If RPC doesn't exist, use update
  if (error && error.code === '42883') {
    const { data: word } = await getWordById(client, wordId);
    if (word) {
      await updateWord(client, wordId, {
        usage_count: (word.usage_count || 0) + 1,
      });
    }
  } else if (error) {
    throw new Error(`Failed to increment usage: ${error.message}`);
  }
}

