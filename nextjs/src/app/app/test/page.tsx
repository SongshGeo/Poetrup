'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useGlobal } from '@/lib/context/GlobalContext';
import { createSPAClient } from '@/lib/supabase/client';
import { getWords, getWordsByCreator } from '@/lib/api/words';
import { getCollections, getCollectionsByOwner } from '@/lib/api/collections';
import { getPoetry, getPoetryByCreator } from '@/lib/api/poetry';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';

export default function TestPage() {
  const { user, loading: userLoading } = useGlobal();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [stats, setStats] = useState({
    words: { total: 0, myWords: 0 },
    collections: { total: 0, myCollections: 0 },
    poetry: { total: 0, myPoetry: 0 },
  });

  const loadData = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setError('');

    try {
      const client = createSPAClient();

      // Get user's profile
      const { data: profile } = await client
        .from('profiles')
        .select('id')
        .eq('auth_uid', user.id)
        .single();

      if (!profile) {
        setError('Profile not found. Please create a profile first.');
        setLoading(false);
        return;
      }

      // Type assertion to fix TypeScript inference issue
      const profileData = profile as { id: string } | null;
      if (!profileData) {
        setError('Profile not found. Please create a profile first.');
        setLoading(false);
        return;
      }

      // Load all words
      const allWords = await getWords(client, { page: 1, pageSize: 1 });
      const myWords = await getWordsByCreator(client, profileData.id, { page: 1, pageSize: 1 });

      // Load all collections
      const allCollections = await getCollections(client, { page: 1, pageSize: 1 });
      const myCollections = await getCollectionsByOwner(client, profileData.id, { page: 1, pageSize: 1 });

      // Load all poetry
      const allPoetry = await getPoetry(client, { page: 1, pageSize: 1 });
      const myPoetry = await getPoetryByCreator(client, profileData.id, { page: 1, pageSize: 1 });

      setStats({
        words: {
          total: allWords.total,
          myWords: myWords.total,
        },
        collections: {
          total: allCollections.total,
          myCollections: myCollections.total,
        },
        poetry: {
          total: allPoetry.total,
          myPoetry: myPoetry.total,
        },
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
      setError(errorMessage);
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !userLoading && user?.id) {
      loadData();
    }
  }, [mounted, userLoading, user?.id, loadData]);

  // Show loading until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">
              Please log in to test the API functions.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">API 测试页面</h1>
        <Button onClick={loadData} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          刷新数据
        </Button>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Words Stats */}
        <Card>
          <CardHeader>
            <CardTitle>词语 (Words)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">总数:</span>
                <span className="font-semibold">{stats.words.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">我的:</span>
                <span className="font-semibold">{stats.words.myWords}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collections Stats */}
        <Card>
          <CardHeader>
            <CardTitle>收藏册 (Collections)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">总数:</span>
                <span className="font-semibold">{stats.collections.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">我的:</span>
                <span className="font-semibold">{stats.collections.myCollections}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Poetry Stats */}
        <Card>
          <CardHeader>
            <CardTitle>拼贴诗 (Poetry)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">总数:</span>
                <span className="font-semibold">{stats.poetry.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">我的:</span>
                <span className="font-semibold">{stats.poetry.myPoetry}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Status */}
      <Card>
        <CardHeader>
          <CardTitle>API 状态</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">数据库连接:</span>
              <span className={`font-semibold ${error ? 'text-red-600' : 'text-green-600'}`}>
                {error ? '❌ 失败' : '✅ 正常'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">用户认证:</span>
              <span className="font-semibold text-green-600">✅ 已登录</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Profile:</span>
              <span className={`font-semibold ${error && error.includes('Profile') ? 'text-red-600' : 'text-green-600'}`}>
                {error && error.includes('Profile') ? '❌ 未找到' : '✅ 已创建'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
          <span className="ml-2 text-gray-600">加载中...</span>
        </div>
      )}
    </div>
  );
}

