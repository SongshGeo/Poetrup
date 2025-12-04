/**
 * useCollections Hook - Manages collection data and operations
 * Provides unified interface for collection management
 */

import { useState, useEffect, useCallback } from 'react';
import { useGlobal } from '@/lib/context/GlobalContext';
import { createSPAClient } from '@/lib/supabase/client';
import {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection,
  getCollectionWithWords,
} from '@/lib/api/collections';
import {
  adaptCollectionFromAPI,
  adaptCollectionToAPI,
  adaptCollectionUpdateToAPI,
} from '@/lib/adapters/collectionAdapter';
import { Collection } from '@/components/types';
import { toast } from 'sonner';

export function useCollections() {
  const { user } = useGlobal();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCollections = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      const supabase = createSPAClient();
      
      // Get profile ID
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('auth_uid', user.id)
        .single();
      
      if (profileError || !profile) {
        throw new Error('无法加载用户档案');
      }
      
      const profileId = (profile as { id: string }).id;
      const result = await getCollections(supabase, { ownerId: profileId, pageSize: 1000 });

      // Load word IDs for each collection
      const collectionsWithWords = await Promise.all(
        result.collections.map(async (col) => {
          const collectionWithWords = await getCollectionWithWords(supabase, col.id);
          return adaptCollectionFromAPI(
            col,
            collectionWithWords?.words?.map((w) => w.id) || []
          );
        })
      );

      setCollections(collectionsWithWords);
    } catch (err) {
      const message = err instanceof Error ? err.message : '加载收藏册失败';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addCollection = useCallback(async (collection: Omit<Collection, 'id'>) => {
    if (!user) return;
    try {
      const supabase = createSPAClient();
      
      // Get profile ID
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('auth_uid', user.id)
        .single();
      
      if (profileError || !profile) {
        throw new Error('无法加载用户档案');
      }
      
      const profileId = (profile as { id: string }).id;
      const collectionData = adaptCollectionToAPI(collection, profileId);
      await createCollection(supabase, collectionData);
      await loadCollections();
      toast.success('收藏册创建成功');
    } catch (err) {
      const message = err instanceof Error ? err.message : '创建收藏册失败';
      toast.error(message);
      throw err;
    }
  }, [user, loadCollections]);

  const updateCollectionById = useCallback(
    async (collectionId: string, updates: Partial<Collection>) => {
      if (!user) return;
      try {
        const supabase = createSPAClient();
        await updateCollection(supabase, collectionId, adaptCollectionUpdateToAPI(updates));
        await loadCollections();
        toast.success('收藏册更新成功');
      } catch (err) {
        const message = err instanceof Error ? err.message : '更新收藏册失败';
        toast.error(message);
        throw err;
      }
    },
    [user, loadCollections]
  );

  const removeCollection = useCallback(async (collectionId: string) => {
    if (!user) return;
    try {
      const supabase = createSPAClient();
      await deleteCollection(supabase, collectionId);
      await loadCollections();
      toast.success('收藏册删除成功');
    } catch (err) {
      const message = err instanceof Error ? err.message : '删除收藏册失败';
      toast.error(message);
      throw err;
    }
  }, [user, loadCollections]);

  useEffect(() => {
    loadCollections();
  }, [loadCollections]);

  return {
    collections,
    loading,
    error,
    addCollection,
    updateCollection: updateCollectionById,
    deleteCollection: removeCollection,
    refresh: loadCollections,
  };
}

