/**
 * useWords Hook - Manages word data and operations
 * Provides unified interface for word management
 */

import { useState, useEffect, useCallback } from 'react';
import { useGlobal } from '@/lib/context/GlobalContext';
import { createSPAClient } from '@/lib/supabase/client';
import { getWords, createWord, updateWord, deleteWord } from '@/lib/api/words';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/types';
import { adaptWordFromAPI, adaptWordToAPI, adaptWordUpdateToAPI } from '@/lib/adapters/wordAdapter';
import { Word } from '@/components/types';
import { toast } from 'sonner';

export function useWords() {
  const { user } = useGlobal();
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWords = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      const supabase = createSPAClient();
      
      // First, get the profile ID from auth_uid
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('auth_uid', user.id)
        .single();
      
      if (profileError || !profile) {
        throw new Error('无法加载用户档案');
      }
      
      const profileId = (profile as { id: string }).id;
      
      // Use profile.id (not user.id) to query words
      const result = await getWords(supabase as unknown as SupabaseClient<Database>, { creatorId: profileId, pageSize: 1000 });
      
      // Get collection IDs for each word
      const wordIds = result.words.map(w => w.id);
      const { data: collectionWords } = await supabase
        .from('collection_words')
        .select('word_id, collection_id')
        .in('word_id', wordIds);
      
      // Build a map of word_id -> collection_ids[]
      const wordCollectionMap = new Map<string, string[]>();
      if (collectionWords) {
        for (const cw of collectionWords as Array<{ word_id: string; collection_id: string }>) {
          const existing = wordCollectionMap.get(cw.word_id) || [];
          existing.push(cw.collection_id);
          wordCollectionMap.set(cw.word_id, existing);
        }
      }
      
      // Adapt words with their collection IDs
      setWords(result.words.map(word => adaptWordFromAPI(word, wordCollectionMap.get(word.id) || [])));
    } catch (err) {
      const message = err instanceof Error ? err.message : '加载词语失败';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addWord = useCallback(async (word: Omit<Word, 'id' | 'addedAt' | 'collectionIds'>) => {
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
      const wordData = adaptWordToAPI(word, profileId);
      await createWord(supabase as unknown as SupabaseClient<Database>, wordData);
      await loadWords();
      toast.success('词语添加成功');
    } catch (err) {
      const message = err instanceof Error ? err.message : '添加词语失败';
      toast.error(message);
      throw err;
    }
  }, [user, loadWords]);

  const updateWordById = useCallback(async (wordId: string, updates: Partial<Word>) => {
    if (!user) return;
    try {
      const supabase = createSPAClient();
      await updateWord(supabase as unknown as SupabaseClient<Database>, wordId, adaptWordUpdateToAPI(updates));
      await loadWords();
      toast.success('词语更新成功');
    } catch (err) {
      const message = err instanceof Error ? err.message : '更新词语失败';
      toast.error(message);
      throw err;
    }
  }, [user, loadWords]);

  const removeWord = useCallback(async (wordId: string) => {
    if (!user) return;
    try {
      const supabase = createSPAClient();
      await deleteWord(supabase as unknown as SupabaseClient<Database>, wordId);
      await loadWords();
      toast.success('词语删除成功');
    } catch (err) {
      const message = err instanceof Error ? err.message : '删除词语失败';
      toast.error(message);
      throw err;
    }
  }, [user, loadWords]);

  useEffect(() => {
    loadWords();
  }, [loadWords]);

  return {
    words,
    loading,
    error,
    addWord,
    updateWord: updateWordById,
    deleteWord: removeWord,
    refresh: loadWords,
  };
}

