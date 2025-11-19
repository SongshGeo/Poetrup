/**
 * Data Transformation Utilities
 * Converts between database types and frontend types
 */

import type { LucideIcon } from 'lucide-react';
import { Database } from '@/lib/types';

type WordRow = Database['public']['Tables']['words']['Row'];
type CollectionRow = Database['public']['Tables']['collections']['Row'];
type PoetryRow = Database['public']['Tables']['poetry']['Row'];

// Frontend types (matching the existing interface definitions)
export interface Word {
  id: string;
  text: string;
  categories: string[]; // tags from database
  color: string; // from metadata or default
  rotation: number; // from metadata or random
  folder?: string; // collection id if in a collection
  createdAt: number; // timestamp from created_at
}

export interface Folder {
  id: string;
  name: string; // title from database
  icon: LucideIcon; // Lucide icon component (required)
  wordIds: string[];
}

export interface Poem {
  id: string;
  title: string;
  wordIds: string[];
  createdAt: number;
  description?: string;
  folderId?: string; // collection id
  placedWords?: {
    wordId: string;
    x: number;
    y: number;
    rotation: number;
  }[];
}

/**
 * Convert database word to frontend word
 */
export function transformWord(
  dbWord: WordRow,
  color?: string,
  rotation?: number
): Word {
  // Get color from metadata or use default
  const metadata = dbWord.metadata as { color?: string; rotation?: number } | null;
  const wordColor =
    color ||
    metadata?.color ||
    getDefaultColorForWord(dbWord.text);

  // Get rotation from metadata or generate random
  const wordRotation =
    rotation !== undefined
      ? rotation
      : metadata?.rotation ||
        generateRotationForWord(dbWord.id);

  return {
    id: dbWord.id,
    text: dbWord.text,
    categories: dbWord.tags || [],
    color: wordColor,
    rotation: wordRotation,
    createdAt: new Date(dbWord.created_at).getTime(),
  };
}

/**
 * Convert database collection to frontend folder
 */
export function transformCollection(
  dbCollection: CollectionRow,
  wordIds: string[] = [],
  icon: LucideIcon
): Folder {
  return {
    id: dbCollection.id,
    name: dbCollection.title,
    icon,
    wordIds,
  };
}

/**
 * Convert database poetry to frontend poem
 */
export function transformPoetry(
  dbPoetry: PoetryRow,
  wordIds: string[] = []
): Poem {
  // Extract placed words from content if available
  let placedWords: Poem['placedWords'] = undefined;
  if (dbPoetry.content) {
    try {
      const content = dbPoetry.content as unknown;
      if (Array.isArray(content)) {
        const validBlocks = content
          .filter((block: unknown): block is { type: string; word_id?: string; x?: number; y?: number; rotation?: number } => 
            typeof block === 'object' && block !== null && 'type' in block
          )
          .filter((block) => block.type === 'word' && block.word_id);
        
        placedWords = validBlocks.map((block) => ({
          wordId: block.word_id as string,
          x: block.x || 0,
          y: block.y || 0,
          rotation: block.rotation || 0,
        }));
      }
    } catch (e) {
      console.warn('Failed to parse poetry content:', e);
    }
  }

  // Extract folder/collection ID from metadata or poetry_collections
  const metadata = dbPoetry.metadata as { folderId?: string } | null;
  const folderId = metadata?.folderId || undefined;

  return {
    id: dbPoetry.id,
    title: dbPoetry.title,
    wordIds,
    createdAt: new Date(dbPoetry.created_at).getTime(),
    description: dbPoetry.description || undefined,
    folderId,
    placedWords,
  };
}

/**
 * Generate default color for a word based on its text
 */
function getDefaultColorForWord(text: string): string {
  // Simple hash function to generate consistent colors
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate color from hash
  const hue = Math.abs(hash) % 360;
  const saturation = 40 + (Math.abs(hash) % 30); // 40-70%
  const lightness = 50 + (Math.abs(hash) % 20); // 50-70%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * Generate consistent rotation for a word based on its ID
 */
function generateRotationForWord(wordId: string): number {
  // Simple hash to generate rotation between -3 and 3 degrees
  let hash = 0;
  for (let i = 0; i < wordId.length; i++) {
    hash = wordId.charCodeAt(i) + ((hash << 5) - hash);
  }
  return ((Math.abs(hash) % 60) - 30) / 10; // -3 to 3 degrees
}

