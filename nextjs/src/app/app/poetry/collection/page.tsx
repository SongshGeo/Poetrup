"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobal } from '@/lib/context/GlobalContext';
import { createSPAClient } from '@/lib/supabase/client';
import { getWords } from '@/lib/api/words';
import { getCollections } from '@/lib/api/collections';
import { getPoetryByCreator, deletePoetry } from '@/lib/api/poetry';
import { transformWord, transformPoetry } from '@/lib/utils/dataTransform';
import { toast } from 'sonner';
import { ArrowLeft, Calendar, Folder, FileText, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TornWordCard } from '@/components/TornWordCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Word {
  id: string;
  text: string;
  categories: string[];
  color: string;
  rotation: number;
  folder?: string;
  createdAt: number;
}

interface Poem {
  id: string;
  title: string;
  wordIds: string[];
  createdAt: number;
  description?: string;
  folderId?: string;
  placedWords?: {
    wordId: string;
    x: number;
    y: number;
    rotation: number;
  }[];
}

export default function PoemCollectionPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useGlobal();
  const [loading, setLoading] = useState(true);
  const [, setProfileId] = useState<string | null>(null);
  
  const [poems, setPoems] = useState<Poem[]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [folders, setFolders] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  
  // Load data from Supabase
  useEffect(() => {
    async function loadData() {
      if (userLoading || !user?.id) return;
      
      setLoading(true);
      try {
        const client = createSPAClient();
        
        // Get user profile
        const { data: profile, error: profileError } = await client
          .from('profiles')
          .select('id')
          .eq('auth_uid', user.id)
          .single();
        
        if (profileError || !profile) {
          console.error('Failed to load profile:', profileError);
          toast.error('无法加载用户信息');
          setLoading(false);
          return;
        }
        
        // Type assertion to fix TypeScript inference issue
        const profileData = profile as { id: string } | null;
        if (!profileData) {
          toast.error('无法加载用户信息');
          setLoading(false);
          return;
        }
        
        setProfileId(profileData.id);
        
        // Load words
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const wordsResult = await getWords(client as any, { 
          page: 1, 
          pageSize: 1000,
          orderBy: 'created_at',
          orderDirection: 'desc'
        });
        
        const transformedWords = wordsResult.words.map(dbWord => transformWord(dbWord));
        setWords(transformedWords);
        
        // Load collections (folders)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const collectionsResult = await getCollections(client as any, {
          page: 1,
          pageSize: 100,
          orderBy: 'created_at',
          orderDirection: 'desc'
        });
        
        const transformedFolders = collectionsResult.collections.map(dbCollection => ({
          id: dbCollection.id,
          name: dbCollection.title,
        }));
        setFolders(transformedFolders);
        
        // Load poetry
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const poetryResult = await getPoetryByCreator(client as any, profileData.id, {
          page: 1,
          pageSize: 100,
          orderBy: 'created_at',
          orderDirection: 'desc'
        });
        
        // Transform poetry and extract word IDs from content
        const transformedPoems = poetryResult.poetry.map((dbPoetry) => {
          let wordIds: string[] = [];
          if (dbPoetry.content) {
            try {
              const content = dbPoetry.content as unknown;
              if (Array.isArray(content)) {
                wordIds = content
                  .filter((block: unknown): block is { type: string; word_id?: string } => 
                    typeof block === 'object' && block !== null && 'type' in block && 'word_id' in block
                  )
                  .filter((block) => block.type === 'word' && block.word_id)
                  .map((block) => block.word_id as string);
              }
            } catch (e) {
              console.warn('Failed to parse poetry content:', e);
            }
          }
          return transformPoetry(dbPoetry, wordIds);
        });
        
        setPoems(transformedPoems);
        if (transformedPoems.length > 0) {
          setSelectedPoem(transformedPoems[0]);
        }
        
      } catch (error) {
        console.error('Error loading data:', error);
        const errorMessage = error instanceof Error ? error.message : '请稍后重试';
        toast.error('加载数据失败', {
          description: errorMessage
        });
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [user, userLoading]);
  
  const handleBack = () => {
    router.push('/app');
  };
  
  const handleEdit = (poem: Poem) => {
    router.push(`/app/poetry/edit/${poem.id}`);
  };
  
  const handleDelete = async (poemId: string) => {
    try {
      const client = createSPAClient();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await deletePoetry(client as any, poemId);
      
      // Update poems state
      const updatedPoems = poems.filter(p => p.id !== poemId);
      setPoems(updatedPoems);
      
      // Update selectedPoem if the deleted poem was selected
      if (selectedPoem?.id === poemId) {
        setSelectedPoem(updatedPoems.length > 0 ? updatedPoems[0] : null);
      }
      
      toast.success('作品已删除');
    } catch (error) {
      console.error('Error deleting poetry:', error);
      const errorMessage = error instanceof Error ? error.message : '请稍后重试';
      toast.error('删除失败', {
        description: errorMessage
      });
    }
  };
  
  if (loading || userLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // 按时间排序作品
  const sortedPoems = [...poems].sort((a, b) => b.createdAt - a.createdAt);

  // 获取作品使用的词语
  const getPoemWords = (poem: Poem) => {
    return poem.wordIds
      .map(id => words.find(w => w.id === id))
      .filter(Boolean) as Word[];
  };

  return (
    <div className="h-screen w-screen overflow-hidden paper-bg">
      {/* Top Navigation Bar */}
      <div className="h-16 border-b border-[var(--paper-border)] paper-card flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg btn-hover"
            onClick={handleBack}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: 'var(--paper-text)' }} />
          </Button>
          <h1 className="text-xl font-serif" style={{ color: 'var(--paper-text)' }}>
            我的作品集
          </h1>
          <Badge
            variant="secondary"
            className="rounded-full"
            style={{
              backgroundColor: 'var(--paper-bg)',
              color: 'var(--paper-text-secondary)',
              borderColor: 'var(--paper-border)',
            }}
          >
            {poems.length} 个作品
          </Badge>
        </div>
      </div>

      <div className="h-[calc(100vh-4rem)] grid grid-cols-[320px_1fr_360px]">
        {/* Left Panel - Poem List */}
        <div className="h-full flex flex-col paper-card border-r border-[var(--paper-border)] overflow-hidden">
          <div className="p-4 border-b border-[var(--paper-border)]">
            <h2 className="font-serif" style={{ color: 'var(--paper-text)' }}>
              所有作品
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto smooth-scroll p-4 space-y-2">
            {sortedPoems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
                <FileText className="w-12 h-12 mb-3" style={{ color: 'var(--paper-text-secondary)' }} />
                <p style={{ color: 'var(--paper-text-secondary)' }}>
                  还没有作品
                </p>
              </div>
            ) : (
              sortedPoems.map(poem => {
                const isSelected = selectedPoem?.id === poem.id;
                const folder = folders.find(f => f.id === poem.folderId);
                
                return (
                  <div
                    key={poem.id}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      isSelected ? 'shadow-md' : 'hover:shadow-sm'
                    }`}
                    style={{
                      backgroundColor: isSelected ? 'var(--paper-bg)' : 'transparent',
                      borderColor: isSelected ? 'var(--ink-accent)' : 'var(--paper-border)',
                    }}
                    onClick={() => setSelectedPoem(poem)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 
                          className="font-serif mb-1 truncate"
                          style={{ color: 'var(--paper-text)' }}
                        >
                          {poem.title}
                        </h3>
                        {poem.description && (
                          <p 
                            className="text-xs mb-2 opacity-70 line-clamp-2"
                            style={{ color: 'var(--paper-text-secondary)' }}
                          >
                            {poem.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--paper-text-secondary)' }}>
                          <span>{poem.wordIds.length} 词</span>
                          {folder && (
                            <>
                              <span>·</span>
                              <span>{folder.name}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-lg opacity-0 group-hover:opacity-100"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="paper-card">
                          <DropdownMenuItem onClick={() => handleEdit(poem)}>
                            <Edit className="w-4 h-4 mr-2" style={{ color: 'var(--ink-accent)' }} />
                            编辑
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => {
                              if (confirm(`确定要删除作品「${poem.title}」吗？`)) {
                                handleDelete(poem.id);
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" style={{ color: '#ef4444' }} />
                            <span style={{ color: '#ef4444' }}>删除</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Center Panel - Poem Preview */}
        <div className="h-full flex flex-col paper-bg overflow-hidden">
          {selectedPoem ? (
            <>
              <div className="p-4 border-b border-[var(--paper-border)] glass-panel">
                <h2 className="text-2xl font-serif mb-1" style={{ color: 'var(--paper-text)' }}>
                  {selectedPoem.title}
                </h2>
                {selectedPoem.description && (
                  <p className="text-sm opacity-70" style={{ color: 'var(--paper-text-secondary)' }}>
                    {selectedPoem.description}
                  </p>
                )}
              </div>

              <div className="flex-1 overflow-hidden p-8">
                <div 
                  className="w-full h-full rounded-2xl border-2 relative overflow-hidden shadow-lg"
                  style={{
                    backgroundColor: '#faf8f5',
                    borderColor: 'var(--paper-border)',
                    backgroundImage: `
                      linear-gradient(rgba(139, 115, 85, 0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(139, 115, 85, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '25px 25px',
                  }}
                >
                  {/* 放置的词语卡片（只读预览） */}
                  {selectedPoem.placedWords?.map((placedWord, index) => {
                    const word = words.find(w => w.id === placedWord.wordId);
                    if (!word) return null;

                    return (
                      <div
                        key={`${placedWord.wordId}-${index}`}
                        className="absolute"
                        style={{
                          left: `${placedWord.x}px`,
                          top: `${placedWord.y}px`,
                          pointerEvents: 'none',
                        }}
                      >
                        <TornWordCard
                          text={word.text}
                          color={word.color}
                          rotation={placedWord.rotation}
                        />
                      </div>
                    );
                  })}

                  {/* 如果没有放置的词语，显示提示 */}
                  {(!selectedPoem.placedWords || selectedPoem.placedWords.length === 0) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center opacity-40">
                        <FileText className="w-16 h-16 mx-auto mb-3" style={{ color: 'var(--paper-text-secondary)' }} />
                        <p style={{ color: 'var(--paper-text-secondary)' }}>
                          这个作品还没有编辑内容
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center opacity-40">
                <FileText className="w-20 h-20 mx-auto mb-4" style={{ color: 'var(--paper-text-secondary)' }} />
                <p style={{ color: 'var(--paper-text-secondary)' }}>
                  选择一个作品查看
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Poem Properties */}
        <div className="h-full flex flex-col paper-card border-l border-[var(--paper-border)] overflow-hidden">
          {selectedPoem ? (
            <>
              <div className="p-4 border-b border-[var(--paper-border)]">
                <h2 className="font-serif mb-1" style={{ color: 'var(--paper-text)' }}>
                  作品信息
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto smooth-scroll p-4 space-y-4">
                {/* 基本信息 */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider opacity-50 mb-2 font-serif" style={{ color: 'var(--paper-text)' }}>
                    基本信息
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" style={{ color: 'var(--paper-text-secondary)' }} />
                      <span style={{ color: 'var(--paper-text-secondary)' }}>创建时间</span>
                    </div>
                    <p style={{ color: 'var(--paper-text)' }}>
                      {new Date(selectedPoem.createdAt).toLocaleString('zh-CN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>

                    {selectedPoem.folderId && (
                      <>
                        <div className="flex items-center gap-2 mt-3">
                          <Folder className="w-4 h-4" style={{ color: 'var(--paper-text-secondary)' }} />
                          <span style={{ color: 'var(--paper-text-secondary)' }}>所属收藏册</span>
                        </div>
                        <p style={{ color: 'var(--paper-text)' }}>
                          {folders.find(f => f.id === selectedPoem.folderId)?.name || '未知'}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <Separator style={{ backgroundColor: 'var(--paper-border)' }} />

                {/* 使用的词语 */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider opacity-50 mb-3 font-serif" style={{ color: 'var(--paper-text)' }}>
                    使用的词语 ({selectedPoem.wordIds.length})
                  </h3>
                  <div className="space-y-2">
                    {getPoemWords(selectedPoem).map(word => (
                      <div
                        key={word.id}
                        className="p-2 rounded-lg border"
                        style={{
                          backgroundColor: 'var(--paper-bg)',
                          borderColor: 'var(--paper-border)',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span style={{ color: 'var(--paper-text)' }}>{word.text}</span>
                          <div className="flex gap-1">
                            {word.categories.map(cat => (
                              <Badge
                                key={cat}
                                variant="secondary"
                                className="text-xs"
                                style={{
                                  backgroundColor: word.color + '20',
                                  color: word.color,
                                  borderColor: word.color + '40',
                                }}
                              >
                                {cat}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator style={{ backgroundColor: 'var(--paper-border)' }} />

                {/* 操作按钮 */}
                <div className="space-y-2">
                  <Button
                    className="w-full gap-2 btn-hover rounded-xl"
                    style={{
                      backgroundColor: 'var(--ink-accent)',
                      color: '#fff',
                    }}
                    onClick={() => handleEdit(selectedPoem)}
                  >
                    <Edit className="w-4 h-4" />
                    编辑作品
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-2 btn-hover rounded-xl"
                    style={{
                      borderColor: '#ef4444',
                      color: '#ef4444',
                    }}
                    onClick={() => {
                      if (confirm(`确定要删除作品「${selectedPoem.title}」吗？`)) {
                        handleDelete(selectedPoem.id);
                        setSelectedPoem(sortedPoems[0]?.id !== selectedPoem.id ? sortedPoems[0] : null);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                    删除作品
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6">
              <p className="text-center opacity-60" style={{ color: 'var(--paper-text-secondary)' }}>
                选择作品以查看详情
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
