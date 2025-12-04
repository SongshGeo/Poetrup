/**
 * usePoetry Hook - Manages poetry data and operations
 * Provides unified interface for poetry management
 */

import { useState, useEffect, useCallback } from 'react';
import { useGlobal } from '@/lib/context/GlobalContext';
import { createSPAClient } from '@/lib/supabase/client';
import {
  getPoetryByCreator,
  createPoetry,
  updatePoetry,
  deletePoetry,
} from '@/lib/api/poetry';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/types';
import {
  adaptPoetryFromAPI,
  adaptPoetryToAPI,
  adaptPoetryUpdateToAPI,
} from '@/lib/adapters/poetryAdapter';
import { Poem } from '@/components/types';
import { toast } from 'sonner';

export function usePoetry() {
  const { user } = useGlobal();
  const [poetry, setPoetry] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPoetry = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      const supabase = createSPAClient();
      const result = await getPoetryByCreator(supabase as unknown as SupabaseClient<Database>, user.id, { pageSize: 1000 });
      setPoetry(result.poetry.map(adaptPoetryFromAPI));
    } catch (err) {
      const message = err instanceof Error ? err.message : '加载作品失败';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addPoetry = useCallback(async (poem: Omit<Poem, 'id' | 'createdAt'>) => {
    if (!user) return;
    try {
      const supabase = createSPAClient();
      const poetryData = adaptPoetryToAPI(poem as Poem, user.id);
      await createPoetry(supabase as unknown as SupabaseClient<Database>, poetryData);
      await loadPoetry();
      toast.success('作品创建成功');
    } catch (err) {
      const message = err instanceof Error ? err.message : '创建作品失败';
      toast.error(message);
      throw err;
    }
  }, [user, loadPoetry]);

  const updatePoetryById = useCallback(async (poetryId: string, updates: Partial<Poem>) => {
    if (!user) return;
    try {
      const supabase = createSPAClient();
      await updatePoetry(supabase as unknown as SupabaseClient<Database>, poetryId, adaptPoetryUpdateToAPI(updates));
      await loadPoetry();
      toast.success('作品更新成功');
    } catch (err) {
      const message = err instanceof Error ? err.message : '更新作品失败';
      toast.error(message);
      throw err;
    }
  }, [user, loadPoetry]);

  const removePoetry = useCallback(async (poetryId: string) => {
    if (!user) return;
    try {
      const supabase = createSPAClient();
      await deletePoetry(supabase as unknown as SupabaseClient<Database>, poetryId);
      await loadPoetry();
      toast.success('作品删除成功');
    } catch (err) {
      const message = err instanceof Error ? err.message : '删除作品失败';
      toast.error(message);
      throw err;
    }
  }, [user, loadPoetry]);

  useEffect(() => {
    loadPoetry();
  }, [loadPoetry]);

  return {
    poetry,
    loading,
    error,
    addPoetry,
    updatePoetry: updatePoetryById,
    deletePoetry: removePoetry,
    refresh: loadPoetry,
  };
}

