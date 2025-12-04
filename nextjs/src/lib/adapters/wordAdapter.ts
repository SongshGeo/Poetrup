/**
 * Word Adapter - Converts between database types and frontend types
 * Handles data transformation for Word entities
 */

import { Word } from '@/components/types';
import type { Database, Json } from '@/lib/types';

type DBWord = Database['public']['Tables']['words']['Row'];
type WordInsert = Database['public']['Tables']['words']['Insert'];
type WordUpdate = Database['public']['Tables']['words']['Update'];

/**
 * Convert database word to frontend word
 */
export function adaptWordFromAPI(dbWord: DBWord, collectionIds: string[] = []): Word {
  // Extract metadata
  const metadata = (dbWord.metadata as Json) || {};
  const category = typeof metadata === 'object' && metadata !== null && 'category' in metadata
    ? String(metadata.category)
    : (dbWord.tags?.[0] || 'life');
  const partOfSpeech = typeof metadata === 'object' && metadata !== null && 'partOfSpeech' in metadata
    ? String(metadata.partOfSpeech)
    : 'n';

  return {
    id: dbWord.id,
    text: dbWord.text,
    category,
    partOfSpeech,
    tags: dbWord.tags || [],
    collectionIds,
    addedAt: new Date(dbWord.created_at).getTime(),
  };
}

/**
 * Convert frontend word to database insert format
 */
export function adaptWordToAPI(word: Omit<Word, 'id' | 'addedAt' | 'collectionIds'> | Word, userId: string): WordInsert {
  return {
    text: word.text,
    tags: word.tags,
    creator_id: userId,
    language: 'zh', // Default to Chinese
    metadata: {
      category: word.category,
      partOfSpeech: word.partOfSpeech,
    } as Json,
  };
}

/**
 * Convert frontend word updates to database update format
 */
export function adaptWordUpdateToAPI(updates: Partial<Word>): WordUpdate {
  const result: WordUpdate = {};
  if (updates.text !== undefined) result.text = updates.text;
  if (updates.tags !== undefined) result.tags = updates.tags;
  
  // Update metadata if category or partOfSpeech changed
  if (updates.category !== undefined || updates.partOfSpeech !== undefined) {
    result.metadata = {
      category: updates.category,
      partOfSpeech: updates.partOfSpeech,
    } as Json;
  }
  
  return result;
}

