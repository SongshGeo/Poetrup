/**
 * Poetry Adapter - Converts between database types and frontend types
 * Handles data transformation for Poetry entities
 */

import { Poem, PoemWord, PoemStyleConfig } from '@/components/types';
import type { Database } from '@/lib/types';

type DBPoetry = Database['public']['Tables']['poetry']['Row'];
type PoetryInsert = Database['public']['Tables']['poetry']['Insert'];
type PoetryUpdate = Database['public']['Tables']['poetry']['Update'];

/**
 * Convert database poetry to frontend poem
 */
export function adaptPoetryFromAPI(dbPoetry: DBPoetry): Poem {
  const content = dbPoetry.content as {
    words?: Array<{
      wordId?: string;
      id?: string;
      text?: string;
      x?: number;
      y?: number;
      rotation?: number;
      category?: string;
      fontFamily?: string;
      fontSize?: number;
      color?: string;
      backgroundColor?: string;
      style?: 'normal' | 'italic';
      weight?: 'normal' | 'bold';
      opacity?: number;
      zIndex?: number;
    }>;
    styleConfig?: PoemStyleConfig;
  } | null;

  const words: PoemWord[] = (content?.words || []).map((w) => ({
    id: w.wordId || w.id || '',
    text: w.text || '',
    category: w.category || 'life',
    partOfSpeech: 'n',
    tags: [],
    collectionIds: [],
    addedAt: Date.now(),
    x: w.x || 0,
    y: w.y || 0,
    rotation: w.rotation || 0,
    fontFamily: w.fontFamily,
    fontSize: w.fontSize,
    color: w.color,
    backgroundColor: w.backgroundColor,
    style: w.style,
    weight: w.weight,
    opacity: w.opacity,
    zIndex: w.zIndex,
  }));

  return {
    id: dbPoetry.id,
    title: dbPoetry.title || '未命名作品',
    createdAt: new Date(dbPoetry.created_at).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    words,
    styleConfig: content?.styleConfig || {
      baseSize: 1,
      sizeVariance: 0.5,
      colorVariance: 0.8,
      fontVariance: 0.5,
      roughness: 0.5,
    },
  };
}

/**
 * Convert frontend poem to database insert format
 */
export function adaptPoetryToAPI(poem: Poem, userId: string): PoetryInsert {
  const content = {
    words: poem.words.map((w) => ({
      wordId: w.id,
      text: w.text,
      x: w.x,
      y: w.y,
      rotation: w.rotation,
      category: w.category,
      fontFamily: w.fontFamily,
      fontSize: w.fontSize,
      color: w.color,
      backgroundColor: w.backgroundColor,
      style: w.style,
      weight: w.weight,
      opacity: w.opacity,
      zIndex: w.zIndex,
    })),
    styleConfig: poem.styleConfig,
  };

  return {
    title: poem.title,
    creator_id: userId,
    content: content as unknown as Database['public']['Tables']['poetry']['Row']['content'],
    text_content: poem.words.map((w) => w.text).join(' '),
  };
}

/**
 * Convert frontend poem updates to database update format
 */
export function adaptPoetryUpdateToAPI(updates: Partial<Poem>): PoetryUpdate {
  const result: PoetryUpdate = {};
  if (updates.title !== undefined) result.title = updates.title;
  if (updates.words !== undefined || updates.styleConfig !== undefined) {
    const content = {
      words: updates.words?.map((w) => ({
        wordId: w.id,
        text: w.text,
        x: w.x,
        y: w.y,
        rotation: w.rotation,
        category: w.category,
        fontFamily: w.fontFamily,
        fontSize: w.fontSize,
        color: w.color,
        backgroundColor: w.backgroundColor,
        style: w.style,
        weight: w.weight,
        opacity: w.opacity,
        zIndex: w.zIndex,
      })),
      styleConfig: updates.styleConfig,
    };
    result.content = content as unknown as Database['public']['Tables']['poetry']['Row']['content'];
    if (updates.words) {
      result.text_content = updates.words.map((w) => w.text).join(' ');
    }
  }
  return result;
}

