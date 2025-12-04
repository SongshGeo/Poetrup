/**
 * Word Adapter - Converts between database types and frontend types
 * Handles data transformation for Word entities
 */

import { Word } from '@/components/types';
import type { Database } from '@/lib/types';

type DBWord = Database['public']['Tables']['words']['Row'];
type WordInsert = Database['public']['Tables']['words']['Insert'];
type WordUpdate = Database['public']['Tables']['words']['Update'];

/**
 * Convert database word to frontend word
 */
export function adaptWordFromAPI(dbWord: DBWord): Word {
  return {
    id: dbWord.id,
    text: dbWord.text,
    category: dbWord.tags?.[0] || 'life',
    partOfSpeech: 'n',
    tags: dbWord.tags || [],
    collectionIds: [],
    addedAt: new Date(dbWord.created_at).getTime(),
  };
}

/**
 * Convert frontend word to database insert format
 */
export function adaptWordToAPI(word: Word, userId: string): WordInsert {
  return {
    text: word.text,
    tags: word.tags,
    creator_id: userId,
  };
}

/**
 * Convert frontend word updates to database update format
 */
export function adaptWordUpdateToAPI(updates: Partial<Word>): WordUpdate {
  const result: WordUpdate = {};
  if (updates.text !== undefined) result.text = updates.text;
  if (updates.tags !== undefined) result.tags = updates.tags;
  return result;
}

