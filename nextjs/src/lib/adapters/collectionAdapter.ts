/**
 * Collection Adapter - Converts between database types and frontend types
 * Handles data transformation for Collection entities
 */

import { Collection } from '@/components/types';
import type { Database, Json } from '@/lib/types';

type DBCollection = Database['public']['Tables']['collections']['Row'];
type CollectionInsert = Database['public']['Tables']['collections']['Insert'];
type CollectionUpdate = Database['public']['Tables']['collections']['Update'];

/**
 * Convert database collection to frontend collection
 */
export function adaptCollectionFromAPI(
  dbCollection: DBCollection,
  wordIds: string[] = []
): Collection {
  // Extract icon and color from metadata
  const metadata = dbCollection.metadata as { icon?: string; color?: string } | null;
  const icon = metadata?.icon || 'Folder';
  const color = metadata?.color || '#6b9e8d';

  // Determine collection type based on metadata or default to static
  const type: Collection['type'] = (metadata as { type?: 'static' | 'smart' } | null)?.type || 'static';

  // Extract rules if it's a smart collection
  const rules = type === 'smart' 
    ? (metadata as { rules?: Collection['rules'] } | null)?.rules || []
    : undefined;

  return {
    id: dbCollection.id,
    name: dbCollection.title,
    icon,
    color,
    type,
    rules,
    wordIds,
  };
}

/**
 * Convert frontend collection to database insert format
 */
export function adaptCollectionToAPI(
  collection: Omit<Collection, 'id'>,
  userId: string
): CollectionInsert {
  return {
    title: collection.name,
    owner_id: userId,
    visibility: 'private',
    metadata: {
      icon: collection.icon,
      color: collection.color,
      type: collection.type,
      rules: collection.rules,
    } as Json,
  };
}

/**
 * Convert frontend collection updates to database update format
 */
export function adaptCollectionUpdateToAPI(updates: Partial<Collection>): CollectionUpdate {
  const result: CollectionUpdate = {};
  if (updates.name !== undefined) result.title = updates.name;
  if (updates.icon !== undefined || updates.color !== undefined || updates.type !== undefined || updates.rules !== undefined) {
    result.metadata = {
      icon: updates.icon,
      color: updates.color,
      type: updates.type,
      rules: updates.rules,
    } as Json;
  }
  return result;
}

