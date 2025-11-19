"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/lib/context/GlobalContext";
import { createSPAClient, createSPASassClient } from "@/lib/supabase/client";
import { getWords, createWord, updateWord } from "@/lib/api/words";
import { getCollections, getCollectionWithWords, createCollection, addWordToCollection } from "@/lib/api/collections";
import { getPoetryByCreator, createPoetryWithContent } from "@/lib/api/poetry";
import { transformWord, transformCollection, transformPoetry, type Folder as FolderType } from "@/lib/utils/dataTransform";
import type { Json, Database } from '@/lib/types';
import { Folder, Tag, Star, Clock, Grid3x3, List, MoreHorizontal, Plus, Calendar, BookOpen, ChevronDown, KeyRound, LogOut, PanelLeftClose, PanelLeft, PanelRightClose, PanelRight, Filter, ArrowUpDown, X, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DraggableWord } from "@/components/DraggableWord";
import { DroppableFolder } from "@/components/DroppableFolder";
import { DroppableTag } from "@/components/DroppableTag";
import { SelectionBox } from "@/components/SelectionBox";
import { WordListItem } from "@/components/WordListItem";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

interface Word {
  id: string;
  text: string;
  categories: string[]; // 为数组，支持多个标签
  color: string;
  rotation: number;
  folder?: string;
  createdAt: number;
}

interface Poem {
  id: string;
  title: string;
  wordIds: string[]; // 使用的词语ID列表
  createdAt: number;
  description?: string;
  folderId?: string; // 关联的收藏册ID
  placedWords?: {
    wordId: string;
    x: number;
    y: number;
    rotation: number;
  }[];
}

export default function PoetryPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useGlobal();
  const [selectedTag, setSelectedTag] = useState<string | null>("movie");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<Word | undefined>();
  const [selectedWords, setSelectedWords] = useState<string[]>([]); // For multi-select
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);
  const [sortBy, setSortBy] = useState<'time' | 'category' | 'name'>('time');
  const [isAddTagDialogOpen, setIsAddTagDialogOpen] = useState(false);
  const [isAddFolderDialogOpen, setIsAddFolderDialogOpen] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  
  // Data loading states
  const [, setLoading] = useState(true);
  const [profileId, setProfileId] = useState<string | null>(null);

  // 视图模式
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 筛选相关状态
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  type FilterRule = {
    id: string;
    type: 'regex' | 'startsWith' | 'endsWith' | 'contains' | 'length';
    value: string;
    minLength: string;
    maxLength: string;
  };
  const [filterRules, setFilterRules] = useState<FilterRule[]>([]);

  // 添加词语状态
  const [newWordInput, setNewWordInput] = useState("");
  
  // 作品相关状态
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [isPoemDialogOpen, setIsPoemDialogOpen] = useState(false);
  const [isCreatePoemDialogOpen, setIsCreatePoemDialogOpen] = useState(false);
  const [selectedFolderForPoem, setSelectedFolderForPoem] = useState<string | null>(null);
  
  // 视图模式：home（主页）、poem-edit（作品编辑）、poem-collection（作品集）
  // 注意：在 Next.js 中，路由由文件系统处理，这里保持为 'home' 模式
  // const [editingPoem, setEditingPoem] = useState<Poem | null>(null); // 未使用，已移除

  const [tags, setTags] = useState([
    { id: "movie", name: "电影", icon: Tag },
    { id: "mood", name: "心情", icon: Tag },
    { id: "nature", name: "自然", icon: Tag },
    { id: "life", name: "生活", icon: Tag },
  ]);
  const [folders, setFolders] = useState<FolderType[]>([
    { id: "favorites", name: "收藏夹", icon: Star, wordIds: [] as string[] },
    { id: "recent", name: "最近使用", icon: Clock, wordIds: [] as string[] },
    { id: "all", name: "所有内容", icon: Folder, wordIds: [] as string[] },
  ]);

  const [words, setWords] = useState<Word[]>([]);

  const [categoryMap, setCategoryMap] = useState<{ [key: string]: string }>({
    movie: "电影",
    mood: "心情",
    nature: "自然",
    life: "生活",
  });

  // 作品数据 - 每个作品包含使用的词语ID
  const [poems, setPoems] = useState<Poem[]>([]);
  
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
          .select('id, metadata')
          .eq('auth_uid', user.id)
          .single();
        
        if (profileError || !profile) {
          console.error('Failed to load profile:', profileError);
          toast.error('无法加载用户信息');
          setLoading(false);
          return;
        }
        
        // Type assertion to fix TypeScript inference issue
        const profileData = profile as { id: string; metadata: unknown } | null;
        if (!profileData) {
          toast.error('无法加载用户信息');
          setLoading(false);
          return;
        }
        
        setProfileId(profileData.id);
        
        // Load custom tags from profile metadata
        if (profileData.metadata && typeof profileData.metadata === 'object' && 'tags' in profileData.metadata) {
          const savedTags = (profileData.metadata as { tags?: Array<{ id?: string; name: string }> }).tags;
          if (Array.isArray(savedTags) && savedTags.length > 0) {
            const loadedTags = savedTags.map((tag) => ({
              id: tag.id || tag.name.toLowerCase().replace(/\s+/g, '-'),
              name: tag.name,
              icon: Tag,
            }));
            // Merge with default tags, avoiding duplicates
            const defaultTags = [
              { id: "movie", name: "电影", icon: Tag },
              { id: "mood", name: "心情", icon: Tag },
              { id: "nature", name: "自然", icon: Tag },
              { id: "life", name: "生活", icon: Tag },
            ];
            const allTags = [...defaultTags];
            loadedTags.forEach((tag) => {
              if (!allTags.find(t => t.id === tag.id)) {
                allTags.push(tag);
              }
            });
            setTags(allTags);
            // Update categoryMap
            const newCategoryMap: { [key: string]: string } = {};
            allTags.forEach(tag => {
              newCategoryMap[tag.id] = tag.name;
            });
            setCategoryMap(newCategoryMap);
          }
        }
        
        // Load words
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const wordsResult = await getWords(client as any, { 
          page: 1, 
          pageSize: 1000, // Load all words for now
          orderBy: 'created_at',
          orderDirection: 'desc'
        });
        
        const transformedWords = wordsResult.words.map(dbWord => transformWord(dbWord));
        setWords(transformedWords);
        
        // Load collections
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const collectionsResult = await getCollections(client as any, {
          ownerId: profileData.id,
          page: 1,
          pageSize: 100,
          orderBy: 'created_at',
          orderDirection: 'desc'
        });
        
        // Load word IDs for each collection
        const collectionsWithWords = await Promise.all(
          collectionsResult.collections.map(async (collection) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const collectionWithWords = await getCollectionWithWords(client as any, collection.id);
            const wordIds = collectionWithWords?.words.map(w => w.id) || [];
            return transformCollection(collection, wordIds, Folder);
          })
        );
        
        // Add default folders
        const defaultFolders: typeof folders = [
          { id: "all", name: "所有内容", icon: Folder, wordIds: transformedWords.map(w => w.id) },
          { id: "recent", name: "最近使用", icon: Clock, wordIds: [] },
          ...collectionsWithWords,
        ];
        setFolders(defaultFolders);
        
        // Load poetry
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const poetryResult = await getPoetryByCreator(client as any, profileData.id, {
          page: 1,
          pageSize: 100,
          orderBy: 'created_at',
          orderDirection: 'desc'
        });
        
        // Transform poetry and extract word IDs from content
        const transformedPoems = await Promise.all(
          poetryResult.poetry.map(async (dbPoetry) => {
            // Extract word IDs from content blocks
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
          })
        );
        
        setPoems(transformedPoems);
        
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

  // 计算词语被引用的次数
  const getWordReferenceCount = useCallback((wordId: string) => {
    return poems.filter(poem => poem.wordIds.includes(wordId)).length;
  }, [poems]);

  // 获取使用了某个词语的作品列表
  const getPoemsUsingWord = useCallback((wordId: string) => {
    return poems.filter(poem => poem.wordIds.includes(wordId));
  }, [poems]);

  // 处理文件夹点击
  const handleFolderClick = (folderId: string) => {
    setSelectedFolder(folderId);
    setSelectedTag(null); // 取消标签选择
  };

  // 处理标签点击
  const handleTagClick = (tagId: string) => {
    setSelectedTag(tagId);
    setSelectedFolder(null); // 取消文件夹选择
  };

  // 应用筛选条件 - 所有规则必须同时满足（AND 逻辑）
  const applyFilters = (word: typeof words[0]): boolean => {
    if (filterRules.length === 0) return true;

    return filterRules.every(rule => {
      try {
        switch (rule.type) {
          case 'regex':
            if (!rule.value) return true;
            return new RegExp(rule.value).test(word.text);
          case 'startsWith':
            if (!rule.value) return true;
            return word.text.startsWith(rule.value);
          case 'endsWith':
            if (!rule.value) return true;
            return word.text.endsWith(rule.value);
          case 'contains':
            if (!rule.value) return true;
            return word.text.includes(rule.value);
          case 'length':
            const minLen = rule.minLength ? parseInt(rule.minLength) : 0;
            const maxLen = rule.maxLength ? parseInt(rule.maxLength) : Infinity;
            return word.text.length >= minLen && word.text.length <= maxLen;
          default:
            return true;
        }
      } catch {
        // 正则表达式错误时，返回 true
        return true;
      }
    });
  };

  // 根据选择过滤词语
  const filteredWords = words
    .filter(w => {
      // 如果选中了收藏册，根据收藏册过滤
      if (selectedFolder) {
        const folder = folders.find(f => f.id === selectedFolder);
        if (folder) {
          // 如果是"所有内容"收藏册，显示所有词语
          if (folder.id === 'all') {
            return true;
          }
          // 否则只显示该收藏册中的词语
          return folder.wordIds?.includes(w.id) || false;
        }
      }
      // 如果选中了标签，根据标签过滤
      if (selectedTag) {
        return w.categories.includes(categoryMap[selectedTag]);
      }
      // 都没选中，显示所有词语
      return true;
    })
    .filter(applyFilters); // 筛选条件过滤

  // 排序词语
  const sortedWords = [...filteredWords].sort((a, b) => {
    switch (sortBy) {
      case 'time':
        return b.createdAt - a.createdAt; // 最新的在前
      case 'category':
        return a.categories[0].localeCompare(b.categories[0], 'zh-CN'); // 按中文拼音排序
      case 'name':
        return a.text.localeCompare(b.text, 'zh-CN'); // 按中文拼音排序
      default:
        return 0;
    }
  });

  // 获��排序方式的显示文本
  // 获取排序方式的显示文本（未使用，已注释）
  // const getSortText = () => { ... }

  // 获取当前标题（未使用，已注释）
  // const getCurrentTitle = () => { ... }

  // 获取当前选中的集合信息
  const getCurrentCollection = () => {
    if (selectedFolder) {
      return folders.find(f => f.id === selectedFolder);
    }
    if (selectedTag) {
      return tags.find(t => t.id === selectedTag);
    }
    return null;
  };

  // 获取集合的显示名称
  const getCollectionName = () => {
    if (selectedFolder) {
      const folder = folders.find(f => f.id === selectedFolder);
      return folder?.name || "";
    }
    if (selectedTag) {
      return categoryMap[selectedTag] || "";
    }
    return "";
  };

  // 处理创建新标签
  const handleCreateTag = async () => {
    if (!newTagName.trim() || !profileId) return;
    
    const newTag = {
      id: newTagName.toLowerCase().replace(/\s+/g, '-'),
      name: newTagName.trim(),
      icon: Tag,
    };
    
    // Check if tag already exists
    if (tags.find(t => t.id === newTag.id || t.name === newTag.name)) {
      toast.error('标签已存在');
      return;
    }
    
    try {
      const client = createSPAClient();
      
      // Get current profile metadata
      const { data: profile, error: profileError } = await client
        .from('profiles')
        .select('metadata')
        .eq('id', profileId)
        .single();
      
      if (profileError || !profile) {
        throw new Error('无法加载用户信息');
      }
      
      // Type assertion to fix TypeScript inference issue
      const profileDataForUpdate = profile as { metadata: unknown } | null;
      if (!profileDataForUpdate) {
        throw new Error('无法加载用户信息');
      }
      
      // Update metadata with new tag
      const currentMetadata = (profileDataForUpdate.metadata as { tags?: Array<{ id: string; name: string }> }) || {};
      const currentTags = Array.isArray(currentMetadata.tags) ? currentMetadata.tags : [];
      
      // Add new tag if it doesn't exist
      if (!currentTags.find((t) => t.id === newTag.id || t.name === newTag.name)) {
        currentTags.push({
          id: newTag.id,
          name: newTag.name,
        });
      }
      
      // Update profile metadata
      // Note: Type assertion needed because Supabase's update type inference can fail with complex JSONB
      const updateData: Database['public']['Tables']['profiles']['Update'] = {
        metadata: {
          ...currentMetadata,
          tags: currentTags,
        } as Json,
      };
      // Type assertion needed due to Supabase SSR client type inference limitation with JSONB fields
      // The client.from('profiles').update() chain has a type inference issue that causes it to be inferred as 'never'
      // We use a double type assertion to work around this limitation
      const profilesTable = client.from('profiles') as unknown as {
        update: (value: Database['public']['Tables']['profiles']['Update']) => {
          eq: (column: string, value: string) => Promise<{ error: { message: string } | null; data: unknown }>;
        };
      };
      const { error: updateError } = await profilesTable.update(updateData).eq('id', profileId);
      
      if (updateError) {
        throw updateError;
      }
      
      // Update local state
      setTags([...tags, newTag]);
      setCategoryMap(prev => ({
        ...prev,
        [newTag.id]: newTag.name,
      }));
      setNewTagName("");
      setIsAddTagDialogOpen(false);
      
      toast.success(`标签「${newTag.name}」已创建`);
    } catch (error) {
      console.error('Error creating tag:', error);
      const errorMessage = error instanceof Error ? error.message : '请稍后重试';
      toast.error('创建标签失败', {
        description: errorMessage
      });
    }
  };

  // 处理创建新文件夹
  const handleCreateFolder = async () => {
    if (!newFolderName.trim() || !profileId) return;
    
    try {
      const client = createSPAClient();
      
      // Create collection in database
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dbCollection = await createCollection(client as any, {
        title: newFolderName.trim(),
        owner_id: profileId,
        visibility: 'private',
        tags: [],
      });
      
      // Transform to frontend format
      const newFolder = transformCollection(dbCollection, [], Folder);
      
      // Add to folders list
      setFolders(prev => [...prev, newFolder]);
      
      toast.success(`「${newFolderName.trim()}」已创建`);
      setNewFolderName("");
      setIsAddFolderDialogOpen(false);
    } catch (error) {
      console.error('Error creating collection:', error);
      const errorMessage = error instanceof Error ? error.message : '请稍后重试';
      toast.error('创建收藏册失败', {
        description: errorMessage
      });
    }
  };

  // 处理拖拽排序
  const moveWord = useCallback((dragIndex: number, hoverIndex: number) => {
    const newWords = [...sortedWords];
    const [removed] = newWords.splice(dragIndex, 1);
    newWords.splice(hoverIndex, 0, removed);
    
    // 更新原始 words 数组的顺序
    // 注意这里简化处理，实际应用中可能需要更复杂的逻辑
    setWords(newWords);
  }, [sortedWords]);

  // 处理添加新词语
  const handleAddWord = useCallback(async () => {
    if (!newWordInput.trim() || !profileId) return;

    // 去除前后空格
    const inputText = newWordInput.trim();
    
    // 解析标签（#标签名）
    const tagRegex = /#([^\s#]+)/g;
    const parsedTags: string[] = [];
    let match;
    
    while ((match = tagRegex.exec(inputText)) !== null) {
      parsedTags.push(match[1]);
    }
    
    // 移除标签，只保留词语文本
    const wordText = inputText.replace(/#[^\s#]+/g, '').trim();
    
    // 验证1: 检查是否只有标签没有词语
    if (!wordText) {
      toast.error('请输入词语内容', {
        description: '不能只输入标签哦 😊'
      });
      return;
    }
    
    // 验证2: 检查是否包含空格（多个词语）
    if (wordText.includes(' ')) {
      toast.error('只能输入一个词语', {
        description: '词语中不能包含空格'
      });
      return;
    }
    
    // 验证3: 检查特殊符号（允许中文、英文、数字）
    const validTextRegex = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
    if (!validTextRegex.test(wordText)) {
      toast.error('词语包含特殊符号', {
        description: '仅支持中文、英文、数字'
      });
      return;
    }
    
    // 验证4: 检查是否重复
    const isDuplicate = words.some(w => w.text === wordText);
    if (isDuplicate) {
      toast.error(`「${wordText}」已存在`, {
        description: '该词语已经在收藏册中了'
      });
      return;
    }
    
    // 使用用户输入的标签名（不做映射），如果没有标签则默认"生活"
    const categories = parsedTags.length > 0 ? parsedTags : ['生活'];
    
    // 将新标签添加到标签列表（如果不存在）
    // Note: Tags created from word input are temporary and not saved to database
    // They will only persist if the user explicitly creates them via the tag creation dialog
    parsedTags.forEach(tagName => {
      const tagExists = tags.some(t => t.name === tagName);
      if (!tagExists) {
        const newTag = {
          id: tagName.toLowerCase().replace(/\s+/g, '-'),
          name: tagName,
          icon: Tag
        };
        setTags(prev => [...prev, newTag]);
        setCategoryMap(prev => ({
          ...prev,
          [newTag.id]: newTag.name,
        }));
      }
    });
    
    // 生成随机颜色
    const colors = ['#d4895c', '#6b7d9e', '#8b7355', '#9e6b7d', '#7d9e9e', '#d49e5c', '#9e8b7d', '#7d6b9e', '#5c6b9e', '#9e7d6b', '#9e6b8b', '#8b9ead'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomRotation = Math.random() * 6 - 3;
    
    try {
      const client = createSPAClient();
      
      // Create word in database
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dbWord = await createWord(client as any, {
        text: wordText,
        tags: categories,
        creator_id: profileId,
        language: 'zh',
        metadata: {
          color: randomColor,
          rotation: randomRotation,
        } as { color: string; rotation: number },
      });
      
      // Transform to frontend format
      const newWord = transformWord(dbWord, randomColor, randomRotation);
      
      // Add to words list
      setWords(prev => [newWord, ...prev]);
      
      // If word is added to a collection (not "all"), add it to that collection
      if (selectedFolder && selectedFolder !== 'all') {
        try {
          const { addWordToCollection } = await import('@/lib/api/collections');
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await addWordToCollection(client as any, selectedFolder, dbWord.id);
          // Update folder wordIds
          setFolders(prev => prev.map(f => 
            f.id === selectedFolder 
              ? { ...f, wordIds: [...f.wordIds, dbWord.id] }
              : f
          ));
        } catch (e) {
          console.warn('Failed to add word to collection:', e);
        }
      }
      
      // Success toast
      toast.success(`「${wordText}」已添加`, {
        description: categories.length > 1 
          ? `标签：${categories.join('、')}` 
          : `标签：${categories[0]}`
      });
      
      // Clear input
      setNewWordInput('');
    } catch (error) {
      console.error('Error creating word:', error);
      const errorMessage = error instanceof Error ? error.message : '请稍后重试';
      toast.error('添加词语失败', {
        description: errorMessage
      });
    }
  }, [newWordInput, selectedFolder, words, tags, profileId]);

  // 处理词语点击（支持多选）
  const handleWordClick = useCallback((word: Word, e: React.MouseEvent) => {
    const isMultiSelect = e.shiftKey; // 使用 Shift 键进行多选
    
    if (isMultiSelect) {
      // 多选模式
      setSelectedWords(prev => {
        // 如果当前有单选的词语，但多选列表为空，先将单选词语加入多选列表
        const baseSelection = prev.length === 0 && selectedWord && selectedWord.id !== word.id 
          ? [selectedWord.id] 
          : prev;
        
        if (baseSelection.includes(word.id)) {
          // 如果已选中，则取消选中
          return baseSelection.filter(id => id !== word.id);
        } else {
          // 如果未选中，则添加到选中列表
          return [...baseSelection, word.id];
        }
      });
    } else {
      // 单选模式
      setSelectedWord(word);
      setSelectedWords([]); // 清空多选
    }
  }, [selectedWord]);

  // 处理拖放到收藏册
  const handleDropToFolder = useCallback(async (folderId: string, wordIds: string[]) => {
    // 跳过虚拟的 "all" 收藏册
    if (folderId === 'all') {
      toast.info('"所有内容" 是虚拟收藏册，无法添加词语');
      return;
    }
    
    try {
      const client = createSPAClient();
      
      // 批量添加词语到收藏册
      const addPromises = wordIds.map(wordId => 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        addWordToCollection(client as any, folderId, wordId).catch(error => {
          console.warn(`Failed to add word ${wordId} to collection ${folderId}:`, error);
          return null; // 继续处理其他词语
        })
      );
      
      await Promise.all(addPromises);
      
      // 更新本地状态
      setFolders(prev => prev.map(folder => {
        if (folder.id === folderId) {
          // 添加词语ID到收藏册，避免重复
          const newWordIds = [...new Set([...folder.wordIds, ...wordIds])];
          return { ...folder, wordIds: newWordIds };
        }
        return folder;
      }));
      
      // 清空多选状态
      setSelectedWords([]);
      
      // 显示成功提示
      toast.success(`已将 ${wordIds.length} 个词语添加到收藏册`);
    } catch (error) {
      console.error('Error adding words to collection:', error);
      const errorMessage = error instanceof Error ? error.message : '请稍后重试';
      toast.error('添加词语到收藏册失败', {
        description: errorMessage
      });
    }
  }, []);

  // 处理拖放到标签（添加/移除标签）
  const handleDropToTag = useCallback(async (categoryName: string, wordIds: string[]) => {
    try {
      const client = createSPAClient();
      
      // 批量更新词语的标签
      const updatePromises = wordIds.map(async (wordId) => {
        const word = words.find(w => w.id === wordId);
        if (!word) return;
        
        // 检查词语是否已经有这个标签
        const hasCategory = word.categories.includes(categoryName);
        let newTags: string[];
        
        if (hasCategory) {
          // 如果已有该标签，则移除
          newTags = word.categories.filter(cat => cat !== categoryName);
        } else {
          // 如果没有该标签，则添加
          newTags = [...word.categories, categoryName];
        }
        
        // 更新数据库
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await updateWord(client as any, wordId, {
          tags: newTags,
        });
      });
      
      await Promise.all(updatePromises);
      
      // 更新本地状态
      setWords(prev => prev.map(word => {
        if (wordIds.includes(word.id)) {
          // 检查词语是否已经有这个标签
          const hasCategory = word.categories.includes(categoryName);
          if (hasCategory) {
            // 如果已有该标签，则移除
            return { 
              ...word, 
              categories: word.categories.filter(cat => cat !== categoryName)
            };
          } else {
            // 如果没有该标签，则添加
            return { 
              ...word, 
              categories: [...word.categories, categoryName]
            };
          }
        }
        return word;
      }));
      
      // 清空多选状态
      setSelectedWords([]);
      
      // 显示成功提示
      toast.success(`已${wordIds.some(id => words.find(w => w.id === id)?.categories.includes(categoryName)) ? '移除' : '添加'}标签`);
    } catch (error) {
      console.error('Error updating word tags:', error);
      const errorMessage = error instanceof Error ? error.message : '请稍后重试';
      toast.error('更新标签失败', {
        description: errorMessage
      });
    }
  }, [words]);

  // 注意：作品集和编辑视图由独立的页面处理（/app/poetry/collection 和 /app/poetry/edit/[id]）
  // 这里只显示主工作区

  return (
    <DndProvider backend={HTML5Backend}>
      {/* SVG Filters for paper cut effects */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          {/* Subtle irregular edge for paper cut effect */}
          <filter id="paper-cut-edge">
            <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="2" result="noise" seed="5"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
      </svg>

      <div className="h-screen w-screen overflow-hidden paper-bg">
        {/* Top Navigation Bar */}
        <div className="h-16 border-b border-[var(--paper-border)] paper-card flex items-center justify-between px-6 slide-in-down">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6" style={{ color: 'var(--ink-accent)' }} />
            <h1 className="text-xl font-serif" style={{ color: 'var(--paper-text)' }}>
              拼贴诗
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="gap-2 btn-hover rounded-xl"
              style={{ 
                color: 'var(--paper-text)',
              }}
              onClick={() => router.push('/app/poetry/collection')}
            >
              <BookMarked className="w-4 h-4" />
              作品集
            </Button>
            
            <Button
              className="gap-2 btn-hover rounded-xl"
              style={{ 
                backgroundColor: 'var(--ink-accent)',
                color: '#fff',
                fontWeight: '500'
              }}
              onClick={() => {
                setIsCreatePoemDialogOpen(true);
                // 默认选择当前选中的收藏册
                setSelectedFolderForPoem(selectedFolder);
              }}
            >
              <Plus className="w-4 h-4" />
              新建作品
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[var(--paper-bg)] transition-all duration-300 btn-hover" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <Avatar className="h-8 w-8">
                  <AvatarFallback 
                    className="font-serif"
                    style={{ 
                      backgroundColor: '#7dd3fc', 
                      color: '#0c4a6e',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    {user ? (() => {
                      const parts = user.email.split('@')[0].split(/[._-]/);
                      return parts.length > 1
                        ? (parts[0][0] + parts[1][0]).toUpperCase()
                        : parts[0].slice(0, 2).toUpperCase();
                    })() : '??'}
                  </AvatarFallback>
                </Avatar>
                <span 
                  className="hidden sm:inline-block max-w-[120px] truncate text-sm"
                  style={{ color: 'var(--paper-text)' }}
                  title={user?.email || 'Loading...'}
                >
                  {user ? user.email.split('@')[0] : 'Loading...'}
                </span>
                <ChevronDown className="w-4 h-4 hidden sm:block" style={{ color: 'var(--paper-text-secondary)' }} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 paper-card">
                <DropdownMenuLabel className="pb-3">
                  <div className="text-xs opacity-60" style={{ color: 'var(--paper-text-secondary)' }}>
                    Signed in as
                  </div>
                  <div className="mt-1" style={{ color: 'var(--paper-text)', fontWeight: '500' }}>
                    {user?.email || 'Loading...'}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator style={{ backgroundColor: 'var(--paper-border)' }} />
                <DropdownMenuItem 
                  className="gap-3 py-3 cursor-pointer"
                  onClick={() => router.push('/app/user-settings')}
                >
                  <KeyRound className="w-4 h-4" style={{ color: 'var(--paper-text-secondary)' }} />
                  <span style={{ color: 'var(--paper-text)' }}>Change Password</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="gap-3 py-3 cursor-pointer"
                  onClick={async () => {
                    try {
                      const client = await createSPASassClient();
                      await client.logout();
                    } catch (error) {
                      console.error('Error logging out:', error);
                    }
                  }}
                >
                  <LogOut className="w-4 h-4" style={{ color: '#ef4444' }} />
                  <span style={{ color: '#ef4444' }}>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="h-[calc(100vh-4rem)] grid" style={{ 
          gridTemplateColumns: (() => {
            const leftCol = isSidebarCollapsed ? '80px' : '300px';
            const rightCol = isRightPanelCollapsed ? '80px' : '360px';
            return `${leftCol} 1fr ${rightCol}`;
          })(),
          transition: 'grid-template-columns 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {/* Left Sidebar - File System */}
          <div className="h-full flex flex-col paper-card border-r slide-in-left" style={{ overflow: 'hidden' }}>
            <div className="flex-1 overflow-auto smooth-scroll">
              <div className={`space-y-6 ${isSidebarCollapsed ? 'p-3' : 'p-6'}`} style={{ transition: 'padding 0.3s ease' }}>
                {/* Files Section */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    {!isSidebarCollapsed && (
                      <h3 className="text-xs uppercase tracking-wider opacity-50 font-serif" style={{ color: 'var(--paper-text)' }}>
                        收藏册
                      </h3>
                    )}
                    <div className="flex items-center gap-1">
                      {!isSidebarCollapsed && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-lg h-8 w-8 btn-hover"
                          onClick={() => setIsAddFolderDialogOpen(true)}
                          title="添加新收藏册"
                        >
                          <Plus className="w-4 h-4" style={{ color: 'var(--ink-accent)' }} />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg h-8 w-8 btn-hover"
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                      >
                        {isSidebarCollapsed ? (
                          <PanelLeft className="w-4 h-4" style={{ color: 'var(--paper-text-secondary)' }} />
                        ) : (
                          <PanelLeftClose className="w-4 h-4" style={{ color: 'var(--paper-text-secondary)' }} />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {folders.map((folder, index) => (
                      <DroppableFolder
                        key={folder.id}
                        folder={folder}
                        isSelected={selectedFolder === folder.id}
                        isSidebarCollapsed={isSidebarCollapsed}
                        onClick={() => handleFolderClick(folder.id)}
                        onDrop={handleDropToFolder}
                        index={index}
                        wordCount={folder.id === 'all' ? words.length : folder.wordIds?.length || 0}
                      />
                    ))}
                  </div>
                </div>

                {/* Tags Section */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    {!isSidebarCollapsed && (
                      <h3 className="text-xs uppercase tracking-wider opacity-50 font-serif" style={{ color: 'var(--paper-text)' }}>
                        标签分类
                      </h3>
                    )}
                    <div className="flex items-center gap-1">
                      {!isSidebarCollapsed && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-lg h-8 w-8 btn-hover"
                          onClick={() => setIsAddTagDialogOpen(true)}
                          title="添加新标签"
                        >
                          <Plus className="w-4 h-4" style={{ color: 'var(--ink-accent)' }} />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    {tags.map((tag, index) => (
                      <DroppableTag
                        key={tag.id}
                        tag={tag}
                        isSelected={selectedTag === tag.id}
                        isSidebarCollapsed={isSidebarCollapsed}
                        onClick={() => handleTagClick(tag.id)}
                        onDrop={handleDropToTag}
                        index={index}
                        wordCount={words.filter(w => w.categories.includes(categoryMap[tag.id])).length}
                        categoryName={categoryMap[tag.id]}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Panel - Work Area */}
          <div className="h-full flex flex-col paper-bg fade-in">
            <div className="px-4 py-3 border-b border-[var(--paper-border)] glass-panel">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <p className="text-sm opacity-60" style={{ color: 'var(--paper-text-secondary)' }}>
                    {filteredWords.length} 个词语碎片
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {/* 排序按钮 */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-lg btn-hover"
                        title="排序"
                      >
                        <ArrowUpDown className="w-4 h-4" style={{ color: 'var(--paper-text-secondary)' }} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="paper-card">
                      <DropdownMenuItem onClick={() => setSortBy('time')} className={sortBy === 'time' ? 'bg-[var(--paper-bg)]' : ''}>
                        <Clock className="w-4 h-4 mr-2" style={{ color: sortBy === 'time' ? 'var(--ink-accent)' : 'var(--paper-text-secondary)' }} />
                        <span style={{ color: sortBy === 'time' ? 'var(--ink-accent)' : 'var(--paper-text)' }}>按时间</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy('category')} className={sortBy === 'category' ? 'bg-[var(--paper-bg)]' : ''}>
                        <Tag className="w-4 h-4 mr-2" style={{ color: sortBy === 'category' ? 'var(--ink-accent)' : 'var(--paper-text-secondary)' }} />
                        <span style={{ color: sortBy === 'category' ? 'var(--ink-accent)' : 'var(--paper-text)' }}>按标签</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy('name')} className={sortBy === 'name' ? 'bg-[var(--paper-bg)]' : ''}>
                        <BookOpen className="w-4 h-4 mr-2" style={{ color: sortBy === 'name' ? 'var(--ink-accent)' : 'var(--paper-text-secondary)' }} />
                        <span style={{ color: sortBy === 'name' ? 'var(--ink-accent)' : 'var(--paper-text)' }}>按名称</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* 筛选按钮 */}
                  {filterRules.length > 0 ? (
                    <Button 
                      variant="outline"
                      className="h-8 px-3 rounded-lg btn-hover gap-1.5"
                      title="筛选"
                      onClick={() => setIsFilterDialogOpen(true)}
                      style={{
                        backgroundColor: `var(--ink-accent)15`,
                        borderColor: `var(--ink-accent)30`,
                        color: 'var(--ink-accent)'
                      }}
                    >
                      <Filter className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">{filterRules.length} 个规则应用中</span>
                    </Button>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-lg btn-hover"
                      title="筛选"
                      onClick={() => setIsFilterDialogOpen(true)}
                    >
                      <Filter className="w-4 h-4" style={{ color: 'var(--paper-text-secondary)' }} />
                    </Button>
                  )}

                  {/* 视图按钮 */}
                  <div className="flex gap-0.5 border rounded-lg p-0.5" style={{ borderColor: 'var(--paper-border)' }}>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 rounded-md transition-all" 
                      title="网格视图"
                      onClick={() => setViewMode('grid')}
                      style={viewMode === 'grid' ? { 
                        backgroundColor: '#d4895c20',
                        boxShadow: '0 0 0 1px #d4895c40'
                      } : {}}
                    >
                      <Grid3x3 
                        className="w-3.5 h-3.5 transition-colors" 
                        style={{ color: viewMode === 'grid' ? 'var(--ink-accent)' : 'var(--paper-text-secondary)' }} 
                      />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 rounded-md transition-all" 
                      title="列表视图"
                      onClick={() => setViewMode('list')}
                      style={viewMode === 'list' ? { 
                        backgroundColor: '#d4895c20',
                        boxShadow: '0 0 0 1px #d4895c40'
                      } : {}}
                    >
                      <List 
                        className="w-3.5 h-3.5 transition-colors" 
                        style={{ color: viewMode === 'list' ? 'var(--ink-accent)' : 'var(--paper-text-secondary)' }} 
                      />
                    </Button>
                  </div>

                  {/* 选项按钮 */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-lg btn-hover"
                    title="更多选项"
                  >
                    <MoreHorizontal className="w-4 h-4" style={{ color: 'var(--paper-text-secondary)' }} />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto smooth-scroll" ref={wordsContainerRef} style={{ position: 'relative' }}>
              {viewMode === 'grid' ? (
                <>
                  <SelectionBox
                    onSelectionChange={setSelectedWords}
                    words={sortedWords}
                    containerRef={wordsContainerRef}
                  />
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {sortedWords.map((word, index) => (
                        <DraggableWord
                          key={word.id}
                          word={word}
                          selectedWord={selectedWord}
                          setSelectedWord={setSelectedWord}
                          index={index}
                          moveWord={moveWord}
                          handleWordClick={handleWordClick}
                          selectedWords={selectedWords}
                        />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-6">
                  {/* 表头 */}
                  <div className="flex items-center px-4 pb-3 mb-3 border-b" style={{ borderColor: 'var(--paper-border)' }}>
                    <div className="flex-1 pr-4">
                      <span className="text-xs uppercase tracking-wider opacity-50 font-serif" style={{ color: 'var(--paper-text)' }}>
                        词语
                      </span>
                    </div>
                    <div className="flex-[2] px-4">
                      <span className="text-xs uppercase tracking-wider opacity-50 font-serif" style={{ color: 'var(--paper-text)' }}>
                        标签
                      </span>
                    </div>
                    <div className="w-32 text-right">
                      <span className="text-xs uppercase tracking-wider opacity-50 font-serif" style={{ color: 'var(--paper-text)' }}>
                        创建时间
                      </span>
                    </div>
                  </div>
                  
                  {/* 列表内容 */}
                  <div className="space-y-3">
                    {sortedWords.map((word) => (
                      <WordListItem
                        key={word.id}
                        word={word}
                        isSelected={selectedWord?.id === word.id || selectedWords.includes(word.id)}
                        onClick={(e) => handleWordClick(word, e)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-[var(--paper-border)] glass-panel">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <Input
                    value={newWordInput}
                    onChange={(e) => setNewWordInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddWord();
                      }
                    }}
                    placeholder="输入词语，可用 #标签 添加标签..."
                    className="h-12 pr-10 rounded-xl border-2 text-sm transition-all"
                    style={{
                      borderColor: newWordInput ? 'var(--ink-accent)' : 'var(--paper-border)',
                      backgroundColor: 'var(--paper-bg)',
                      color: 'var(--paper-text)'
                    }}
                  />
                  {newWordInput && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg"
                      onClick={() => setNewWordInput('')}
                    >
                      <X className="w-4 h-4" style={{ color: 'var(--paper-text-secondary)' }} />
                    </Button>
                  )}
                </div>
                <Button 
                  size="icon"
                  className="rounded-full h-12 w-12 btn-hover transition-all"
                  style={{
                    backgroundColor: newWordInput ? 'var(--ink-accent)' : 'var(--paper-border)',
                    color: 'white',
                    cursor: newWordInput ? 'pointer' : 'not-allowed',
                    opacity: newWordInput ? 1 : 0.5
                  }}
                  onClick={handleAddWord}
                  disabled={!newWordInput.trim()}
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
              {newWordInput.includes('#') && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {(() => {
                    const tagRegex = /#([^\s#]+)/g;
                    const tags: string[] = [];
                    let match;
                    while ((match = tagRegex.exec(newWordInput)) !== null) {
                      tags.push(match[1]);
                    }
                    return tags.map((tag, i) => (
                      <Badge 
                        key={i}
                        variant="secondary"
                        className="text-xs px-2 py-0.5"
                        style={{
                          backgroundColor: `var(--ink-accent)15`,
                          color: 'var(--ink-accent)',
                          border: `1px solid var(--ink-accent)30`
                        }}
                      >
                        #{tag}
                      </Badge>
                    ));
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Properties */}
          <div className="h-full flex flex-col paper-card border-l slide-in-right" style={{ overflow: 'hidden' }}>
            {isRightPanelCollapsed ? (
              <div className={`${isSidebarCollapsed ? 'p-3' : 'p-6'}`} style={{ transition: 'padding 0.3s ease' }}>
                <div className="flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg h-8 w-8 btn-hover"
                    onClick={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
                  >
                    <PanelRight className="w-4 h-4" style={{ color: 'var(--paper-text-secondary)' }} />
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-[var(--paper-border)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-serif word-reveal" style={{ color: 'var(--paper-text)' }}>
                        {selectedWord ? '词语属性' : (selectedTag || selectedFolder) ? '集合属性' : '属性面板'}
                      </h2>
                      <p className="text-xs opacity-60 mt-1" style={{ color: 'var(--paper-text-secondary)' }}>
                        {selectedWord ? '详细信息' : (selectedTag || selectedFolder) ? '当前选择' : '选择查看'}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-lg h-8 w-8 btn-hover"
                      onClick={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
                    >
                      <PanelRightClose className="w-4 h-4" style={{ color: 'var(--paper-text-secondary)' }} />
                    </Button>
                  </div>
                </div>

                {selectedWord ? (
                  <div className="flex-1 overflow-auto smooth-scroll">
                    <div className="p-6 space-y-6">
                      <div className="text-center py-6 fade-in">
                        <div 
                          className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center float-animation"
                          style={{ 
                            backgroundColor: selectedWord.color, 
                            opacity: 0.15,
                            border: `3px solid ${selectedWord.color}40`
                          }}
                        >
                          <span 
                            className="text-4xl font-serif"
                            style={{ color: selectedWord.color, fontWeight: '600' }}
                          >
                            {selectedWord.text[0]}
                          </span>
                        </div>
                        <h3 
                          className="text-3xl font-serif mb-3"
                          style={{ color: 'var(--paper-text)' }}
                        >
                          {selectedWord.text}
                        </h3>
                      </div>

                      <Separator style={{ backgroundColor: 'var(--paper-border)', opacity: 0.5 }} />

                      <div className="space-y-5">
                        <div className="space-y-2 fade-in" style={{ animationDelay: '0.1s' }}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 opacity-60">
                              <Tag className="w-4 h-4" style={{ color: 'var(--paper-text-secondary)' }} />
                              <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--paper-text-secondary)' }}>标签分类</span>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 rounded-full btn-hover"
                                >
                                  <Plus className="w-3 h-3" style={{ color: 'var(--ink-accent)' }} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="paper-card">
                                <DropdownMenuLabel className="text-xs opacity-60" style={{ color: 'var(--paper-text-secondary)' }}>
                                  添加标签
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator style={{ backgroundColor: 'var(--paper-border)' }} />
                                {Object.entries(categoryMap)
                                  .filter(([, categoryName]) => !selectedWord.categories.includes(categoryName))
                                  .map(([tagId, categoryName]) => (
                                    <DropdownMenuItem
                                      key={tagId}
                                      onClick={() => {
                                        setWords(prev => prev.map(w => 
                                          w.id === selectedWord.id 
                                            ? { ...w, categories: [...w.categories, categoryName] }
                                            : w
                                        ));
                                        setSelectedWord(prev => prev ? { ...prev, categories: [...prev.categories, categoryName] } : undefined);
                                      }}
                                      className="cursor-pointer"
                                    >
                                      <span style={{ color: 'var(--paper-text)' }}>{categoryName}</span>
                                    </DropdownMenuItem>
                                  ))}
                                {Object.entries(categoryMap).filter(([, categoryName]) => !selectedWord.categories.includes(categoryName)).length === 0 && (
                                  <div className="px-2 py-1.5 text-xs opacity-60" style={{ color: 'var(--paper-text-secondary)' }}>
                                    已添加所有标签
                                  </div>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {selectedWord.categories.map(category => (
                              <Badge
                                key={category}
                                variant="secondary"
                                className="rounded-full px-3 py-1 group cursor-pointer hover:opacity-80 transition-opacity"
                                style={{
                                  backgroundColor: `${selectedWord.color}15`,
                                  color: selectedWord.color,
                                  border: `1px solid ${selectedWord.color}30`
                                }}
                                onClick={() => {
                                  // 移除标签
                                  setWords(prev => prev.map(w => 
                                    w.id === selectedWord.id 
                                      ? { ...w, categories: w.categories.filter(c => c !== category) }
                                      : w
                                  ));
                                  setSelectedWord(prev => prev ? { ...prev, categories: prev.categories.filter(c => c !== category) } : undefined);
                                }}
                              >
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2 fade-in" style={{ animationDelay: '0.2s' }}>
                          <div className="flex items-center gap-2 opacity-60">
                            <Calendar className="w-4 h-4" style={{ color: 'var(--paper-text-secondary)' }} />
                            <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--paper-text-secondary)' }}>创建时间</span>
                          </div>
                          <div style={{ color: 'var(--paper-text)' }}>
                            {new Date(selectedWord.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="space-y-2 fade-in" style={{ animationDelay: '0.3s' }}>
                          <div className="flex items-center gap-2 opacity-60">
                            <Clock className="w-4 h-4" style={{ color: 'var(--paper-text-secondary)' }} />
                            <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--paper-text-secondary)' }}>使用统计</span>
                          </div>
                          <div style={{ color: 'var(--paper-text)' }}>
                            被引用 {getWordReferenceCount(selectedWord.id)} 次
                          </div>
                        </div>
                      </div>

                      <Separator style={{ backgroundColor: 'var(--paper-border)', opacity: 0.5 }} />

                      <div className="fade-in" style={{ animationDelay: '0.4s' }}>
                        <h4 
                          className="mb-4 font-serif flex items-center gap-2"
                          style={{ color: 'var(--paper-text)' }}
                        >
                          <Star className="w-4 h-4" style={{ color: 'var(--ink-accent)' }} />
                          相关作品 ({getPoemsUsingWord(selectedWord.id).length})
                        </h4>
                        <div className="space-y-3">
                          {getPoemsUsingWord(selectedWord.id).length > 0 ? (
                            getPoemsUsingWord(selectedWord.id).map((poem, index) => (
                              <div 
                                key={poem.id}
                                className="p-4 rounded-xl border cursor-pointer hover:bg-[var(--paper-bg)] transition-all duration-300 btn-hover stagger-item"
                                style={{ 
                                  borderColor: 'var(--paper-border)',
                                  animationDelay: `${0.5 + index * 0.1}s`
                                }}
                                onClick={() => {
                                  setSelectedPoem(poem);
                                  setIsPoemDialogOpen(true);
                                }}
                              >
                                <div 
                                  className="font-serif mb-1"
                                  style={{ color: 'var(--paper-text)' }}
                                >
                                  {poem.title}
                                </div>
                                <div 
                                  className="text-xs opacity-60 mb-2"
                                  style={{ color: 'var(--paper-text-secondary)' }}
                                >
                                  {poem.description}
                                </div>
                                <div 
                                  className="text-xs opacity-60 flex items-center gap-2"
                                  style={{ color: 'var(--paper-text-secondary)' }}
                                >
                                  <Clock className="w-3 h-3" />
                                  {new Date(poem.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div 
                              className="text-center py-8 text-xs opacity-60"
                              style={{ color: 'var(--paper-text-secondary)' }}
                            >
                              还没有作品使用这个词语
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (selectedTag || selectedFolder) ? (
                  <div className="flex-1 overflow-auto smooth-scroll">
                    <div className="p-6 space-y-6">
                      <div className="text-center py-6 fade-in">
                        {(() => {
                          const collection = getCurrentCollection();
                          if (!collection) return null;
                          const Icon = collection.icon;
                          return (
                            <>
                              <div 
                                className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center float-animation"
                                style={{ 
                                  backgroundColor: 'var(--ink-accent)', 
                                  opacity: 0.1,
                                  border: `3px solid var(--ink-accent)40`
                                }}
                              >
                                <Icon className="w-12 h-12" style={{ color: 'var(--ink-accent)' }} />
                              </div>
                              <h3 
                                className="text-3xl font-serif mb-3"
                                style={{ color: 'var(--paper-text)' }}
                              >
                                {getCollectionName()}
                              </h3>
                              <Badge 
                                variant="secondary"
                                className="rounded-full px-4 py-1"
                                style={{
                                  backgroundColor: `var(--ink-accent)15`,
                                  color: 'var(--ink-accent)',
                                  border: `1px solid var(--ink-accent)30`
                                }}
                              >
                                {selectedTag ? '标签' : '文件夹'}
                              </Badge>
                            </>
                          );
                        })()}
                      </div>

                      <Separator style={{ backgroundColor: 'var(--paper-border)', opacity: 0.5 }} />

                      <div className="space-y-5">
                        <div className="space-y-2 fade-in" style={{ animationDelay: '0.1s' }}>
                          <div className="flex items-center gap-2 opacity-60">
                            <Folder className="w-4 h-4" style={{ color: 'var(--paper-text-secondary)' }} />
                            <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--paper-text-secondary)' }}>词语数量</span>
                          </div>
                          <div className="font-serif" style={{ color: 'var(--paper-text)' }}>
                            {filteredWords.length} 个词语
                          </div>
                        </div>

                        <div className="space-y-2 fade-in" style={{ animationDelay: '0.2s' }}>
                          <div className="flex items-center gap-2 opacity-60">
                            <Calendar className="w-4 h-4" style={{ color: 'var(--paper-text-secondary)' }} />
                            <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--paper-text-secondary)' }}>创建时间</span>
                          </div>
                          <div style={{ color: 'var(--paper-text)' }}>
                            2024年1月1日
                          </div>
                        </div>

                        <div className="space-y-2 fade-in" style={{ animationDelay: '0.3s' }}>
                          <div className="flex items-center gap-2 opacity-60">
                            <Clock className="w-4 h-4" style={{ color: 'var(--paper-text-secondary)' }} />
                            <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--paper-text-secondary)' }}>最后修改</span>
                          </div>
                          <div style={{ color: 'var(--paper-text)' }}>
                            今天
                          </div>
                        </div>
                      </div>

                      <Separator style={{ backgroundColor: 'var(--paper-border)', opacity: 0.5 }} />

                      <div className="fade-in" style={{ animationDelay: '0.4s' }}>
                        <h4 
                          className="mb-4 font-serif flex items-center gap-2"
                          style={{ color: 'var(--paper-text)' }}
                        >
                          <Tag className="w-4 h-4" style={{ color: 'var(--ink-accent)' }} />
                          词语分类统计
                        </h4>
                        <div className="space-y-2">
                          {Object.entries(
                            filteredWords.reduce((acc, word) => {
                              acc[word.categories[0]] = (acc[word.categories[0]] || 0) + 1;
                              return acc;
                            }, {} as Record<string, number>)
                          ).map(([category, count], index) => (
                            <div 
                              key={category}
                              className="flex items-center justify-between p-3 rounded-lg border stagger-item"
                              style={{ 
                                borderColor: 'var(--paper-border)',
                                animationDelay: `${0.5 + index * 0.1}s`
                              }}
                            >
                              <span className="font-serif" style={{ color: 'var(--paper-text)' }}>
                                {category}
                              </span>
                              <Badge variant="secondary">
                                {count}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center p-8">
                    <div className="text-center space-y-6 fade-in">
                      <div 
                        className="w-20 h-20 rounded-full mx-auto flex items-center justify-center float-animation"
                        style={{ backgroundColor: 'var(--paper-border)' }}
                      >
                        <Tag className="w-10 h-10" style={{ color: 'var(--paper-text-secondary)', opacity: 0.5 }} />
                      </div>
                      <div>
                        <p 
                          className="opacity-60 text-sm"
                          style={{ color: 'var(--paper-text-secondary)' }}
                        >
                          选择标签或文件夹
                        </p>
                        <p 
                          className="opacity-40 text-xs mt-1"
                          style={{ color: 'var(--paper-text-secondary)' }}
                        >
                          查看集合属性
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add Tag Dialog */}
      <Dialog open={isAddTagDialogOpen} onOpenChange={setIsAddTagDialogOpen}>
        <DialogContent className="paper-card">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif" style={{ color: 'var(--paper-text)' }}>
              添加新标签
            </DialogTitle>
            <DialogDescription className="text-sm opacity-60" style={{ color: 'var(--paper-text-secondary)' }}>
              为你的词语碎片创建一个新的标签分类。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Label className="text-sm opacity-60" style={{ color: 'var(--paper-text-secondary)' }}>
              标签名称
            </Label>
            <Input
              className="w-full"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="例如：旅行"
            />
          </div>
          <DialogFooter>
            <Button
              className="flex-1 gap-2 border btn-hover h-12 rounded-xl"
              variant="outline"
              style={{ 
                borderColor: 'var(--paper-border)',
                color: 'var(--paper-text)',
                fontWeight: '500'
              }}
              onClick={() => setIsAddTagDialogOpen(false)}
            >
              取消
            </Button>
            <Button
              className="flex-1 gap-2 border btn-hover h-12 rounded-xl"
              variant="outline"
              style={{ 
                borderColor: 'var(--paper-border)',
                color: 'var(--paper-text)',
                fontWeight: '500'
              }}
              onClick={handleCreateTag}
            >
              添加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Folder Dialog */}
      <Dialog open={isAddFolderDialogOpen} onOpenChange={setIsAddFolderDialogOpen}>
        <DialogContent className="paper-card">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif" style={{ color: 'var(--paper-text)' }}>
              添加新收藏册
            </DialogTitle>
            <DialogDescription className="text-sm opacity-60" style={{ color: 'var(--paper-text-secondary)' }}>
              为你的词语碎片创建一个新的收藏��。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Label className="text-sm opacity-60" style={{ color: 'var(--paper-text-secondary)' }}>
              收藏册名称
            </Label>
            <Input
              className="w-full"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="例如：我的旅行"
            />
          </div>
          <DialogFooter>
            <Button
              className="flex-1 gap-2 border btn-hover h-12 rounded-xl"
              variant="outline"
              style={{ 
                borderColor: 'var(--paper-border)',
                color: 'var(--paper-text)',
                fontWeight: '500'
              }}
              onClick={() => setIsAddFolderDialogOpen(false)}
            >
              取消
            </Button>
            <Button
              className="flex-1 gap-2 border btn-hover h-12 rounded-xl"
              variant="outline"
              style={{ 
                borderColor: 'var(--paper-border)',
                color: 'var(--paper-text)',
                fontWeight: '500'
              }}
              onClick={handleCreateFolder}
            >
              添加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogContent className="paper-card">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif" style={{ color: 'var(--paper-text)' }}>
              筛选词语
            </DialogTitle>
            <DialogDescription className="text-sm opacity-60" style={{ color: 'var(--paper-text-secondary)' }}>
              使用不同的筛选条件来过滤词语碎片。
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <Label className="text-sm opacity-60" style={{ color: 'var(--paper-text-secondary)' }}>
                筛选规则 ({filterRules.length})
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 btn-hover"
                    style={{ color: 'var(--ink-accent)' }}
                  >
                    <Plus className="w-4 h-4" />
                    添加规则
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="paper-card">
                  <DropdownMenuItem
                    onClick={() => {
                      setFilterRules([...filterRules, {
                        id: Date.now().toString(),
                        type: 'contains',
                        value: '',
                        minLength: '',
                        maxLength: ''
                      }]);
                    }}
                  >
                    <span style={{ color: 'var(--paper-text)' }}>包含...</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setFilterRules([...filterRules, {
                        id: Date.now().toString(),
                        type: 'startsWith',
                        value: '',
                        minLength: '',
                        maxLength: ''
                      }]);
                    }}
                  >
                    <span style={{ color: 'var(--paper-text)' }}>以...开头</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setFilterRules([...filterRules, {
                        id: Date.now().toString(),
                        type: 'endsWith',
                        value: '',
                        minLength: '',
                        maxLength: ''
                      }]);
                    }}
                  >
                    <span style={{ color: 'var(--paper-text)' }}>以...结尾</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setFilterRules([...filterRules, {
                        id: Date.now().toString(),
                        type: 'regex',
                        value: '',
                        minLength: '',
                        maxLength: ''
                      }]);
                    }}
                  >
                    <span style={{ color: 'var(--paper-text)' }}>正则表达式</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setFilterRules([...filterRules, {
                        id: Date.now().toString(),
                        type: 'length',
                        value: '',
                        minLength: '',
                        maxLength: ''
                      }]);
                    }}
                  >
                    <span style={{ color: 'var(--paper-text)' }}>长度范围</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {filterRules.length === 0 && (
              <div className="text-center py-8 opacity-50" style={{ color: 'var(--paper-text-secondary)' }}>
                <Filter className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">暂无筛选规则</p>
                <p className="text-xs mt-1">点击&ldquo;添加规则&rdquo;开始筛选</p>
              </div>
            )}

            {filterRules.map((rule, index) => (
              <div key={rule.id} className="p-4 rounded-lg border space-y-3" style={{ borderColor: 'var(--paper-border)', backgroundColor: 'var(--paper-bg)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-serif" style={{ color: 'var(--paper-text)' }}>
                    规则 {index + 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 btn-hover"
                    onClick={() => {
                      setFilterRules(filterRules.filter(r => r.id !== rule.id));
                    }}
                  >
                    <X className="w-3 h-3" style={{ color: 'var(--paper-text-secondary)' }} />
                  </Button>
                </div>

                <div>
                  <Label className="text-xs opacity-60 mb-1 block" style={{ color: 'var(--paper-text-secondary)' }}>
                    筛选类型
                  </Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between btn-hover text-sm h-9"
                        style={{ 
                          borderColor: 'var(--paper-border)',
                          color: 'var(--paper-text)'
                        }}
                      >
                        <span>
                          {rule.type === 'regex' && '正则表达式'}
                          {rule.type === 'startsWith' && '以...开头'}
                          {rule.type === 'endsWith' && '以...结尾'}
                          {rule.type === 'contains' && '包含...'}
                          {rule.type === 'length' && '长度范围'}
                        </span>
                        <ChevronDown className="w-3 h-3 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="paper-card">
                      <DropdownMenuItem onClick={() => {
                        setFilterRules(filterRules.map(r => r.id === rule.id ? { ...r, type: 'contains' } : r));
                      }}>
                        <span style={{ color: 'var(--paper-text)' }}>包含...</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        setFilterRules(filterRules.map(r => r.id === rule.id ? { ...r, type: 'startsWith' } : r));
                      }}>
                        <span style={{ color: 'var(--paper-text)' }}>以...开头</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        setFilterRules(filterRules.map(r => r.id === rule.id ? { ...r, type: 'endsWith' } : r));
                      }}>
                        <span style={{ color: 'var(--paper-text)' }}>以...结尾</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        setFilterRules(filterRules.map(r => r.id === rule.id ? { ...r, type: 'regex' } : r));
                      }}>
                        <span style={{ color: 'var(--paper-text)' }}>正���表达式</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        setFilterRules(filterRules.map(r => r.id === rule.id ? { ...r, type: 'length' } : r));
                      }}>
                        <span style={{ color: 'var(--paper-text)' }}>长度范围</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {rule.type !== 'length' && (
                  <div>
                    <Label className="text-xs opacity-60 mb-1 block" style={{ color: 'var(--paper-text-secondary)' }}>
                      筛选值
                    </Label>
                    <Input
                      className="w-full h-9 text-sm"
                      value={rule.value}
                      onChange={(e) => {
                        setFilterRules(filterRules.map(r => r.id === rule.id ? { ...r, value: e.target.value } : r));
                      }}
                      placeholder={
                        rule.type === 'regex' ? '输入正则表达式' :
                        rule.type === 'startsWith' ? '输入开头文本' :
                        rule.type === 'endsWith' ? '输入结尾文本' :
                        '输入关键词'
                      }
                    />
                  </div>
                )}

                {rule.type === 'length' && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs opacity-60 mb-1 block" style={{ color: 'var(--paper-text-secondary)' }}>
                        最小长度
                      </Label>
                      <Input
                        className="w-full h-9 text-sm"
                        type="number"
                        value={rule.minLength}
                        onChange={(e) => {
                          setFilterRules(filterRules.map(r => r.id === rule.id ? { ...r, minLength: e.target.value } : r));
                        }}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-xs opacity-60 mb-1 block" style={{ color: 'var(--paper-text-secondary)' }}>
                        最大长度
                      </Label>
                      <Input
                        className="w-full h-9 text-sm"
                        type="number"
                        value={rule.maxLength}
                        onChange={(e) => {
                          setFilterRules(filterRules.map(r => r.id === rule.id ? { ...r, maxLength: e.target.value } : r));
                        }}
                        placeholder="∞"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <div className="flex gap-2 w-full">
              <Button
                className="flex-1 gap-2 border btn-hover h-12 rounded-xl"
                variant="outline"
                style={{ 
                  borderColor: 'var(--paper-border)',
                  color: 'var(--paper-text-secondary)',
                  fontWeight: '500'
                }}
                onClick={() => {
                  setFilterRules([]);
                }}
              >
                清除全部
              </Button>
              <Button
                className="flex-1 gap-2 border btn-hover h-12 rounded-xl"
                variant="outline"
                style={{ 
                  borderColor: 'var(--ink-accent)',
                  backgroundColor: `var(--ink-accent)10`,
                  color: 'var(--ink-accent)',
                  fontWeight: '500'
                }}
                onClick={() => {
                  setIsFilterDialogOpen(false);
                }}
              >
                应用 ({filterRules.length} 个规则)
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 作品详情弹窗 */}
      <Dialog open={isPoemDialogOpen} onOpenChange={setIsPoemDialogOpen}>
        <DialogContent 
          className="max-w-2xl border-2 rounded-2xl shadow-xl"
          style={{ 
            backgroundColor: 'var(--paper-bg)',
            borderColor: 'var(--paper-border)',
          }}
        >
          <DialogHeader>
            <DialogTitle 
              className="font-serif text-2xl mb-2"
              style={{ color: 'var(--paper-text)' }}
            >
              {selectedPoem?.title}
            </DialogTitle>
            <DialogDescription style={{ color: 'var(--paper-text-secondary)' }}>
              {selectedPoem?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* 创建时间 */}
            <div className="flex items-center gap-2 text-sm opacity-60" style={{ color: 'var(--paper-text-secondary)' }}>
              <Calendar className="w-4 h-4" />
              创建于 {selectedPoem && new Date(selectedPoem.createdAt).toLocaleDateString()}
            </div>

            {/* 词语卡片展示区 */}
            <div>
              <h4 className="mb-4 font-serif flex items-center gap-2" style={{ color: 'var(--paper-text)' }}>
                <BookOpen className="w-4 h-4" style={{ color: 'var(--ink-accent)' }} />
                使用的词语 ({selectedPoem?.wordIds.length || 0})
              </h4>
              <div className="relative min-h-[200px] p-6 rounded-xl border-2 border-dashed" style={{ borderColor: 'var(--paper-border)', backgroundColor: 'var(--paper-bg-light)' }}>
                {selectedPoem?.wordIds.map((wordId) => {
                  const word = words.find(w => w.id === wordId);
                  if (!word) return null;
                  
                  return (
                    <div
                      key={word.id}
                      className="inline-block m-2 px-4 py-2 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all"
                      style={{
                        backgroundColor: word.color,
                        transform: `rotate(${word.rotation}deg)`,
                        color: '#fff',
                        fontWeight: '500',
                      }}
                      onClick={() => {
                        setSelectedWord(word);
                        setIsPoemDialogOpen(false);
                      }}
                    >
                      {word.text}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <DialogFooter>
            <div className="flex gap-3 w-full">
              <Button
                className="flex-1 gap-2 border btn-hover h-12 rounded-xl"
                variant="outline"
                style={{ 
                  borderColor: 'var(--paper-border)',
                  color: 'var(--paper-text)',
                  fontWeight: '500'
                }}
                onClick={() => setIsPoemDialogOpen(false)}
              >
                关闭
              </Button>
              <Button
                className="flex-1 gap-2 btn-hover h-12 rounded-xl"
                style={{ 
                  backgroundColor: 'var(--ink-accent)',
                  color: '#fff',
                  fontWeight: '500'
                }}
                onClick={() => {
                  if (selectedPoem) {
                    router.push(`/app/poetry/edit/${selectedPoem.id}`);
                    setIsPoemDialogOpen(false);
                  }
                }}
              >
                <BookOpen className="w-4 h-4" />
                打开作品
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 新建作品对话框 */}
      <Dialog open={isCreatePoemDialogOpen} onOpenChange={setIsCreatePoemDialogOpen}>
        <DialogContent 
          className="max-w-md border-2 rounded-2xl shadow-xl"
          style={{ 
            backgroundColor: 'var(--paper-bg)',
            borderColor: 'var(--paper-border)',
          }}
        >
          <DialogHeader>
            <DialogTitle 
              className="font-serif text-2xl mb-2"
              style={{ color: 'var(--paper-text)' }}
            >
              新建诗词作品
            </DialogTitle>
            <DialogDescription style={{ color: 'var(--paper-text-secondary)' }}>
              选择一个词语收藏册作为素材来源
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Label 
              className="mb-3 block"
              style={{ color: 'var(--paper-text)' }}
            >
              选择收藏册
            </Label>
            <div className="space-y-2 max-h-[300px] overflow-auto smooth-scroll">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedFolderForPoem === folder.id ? 'ring-2' : ''
                  }`}
                  style={{
                    borderColor: selectedFolderForPoem === folder.id ? 'var(--ink-accent)' : 'var(--paper-border)',
                    backgroundColor: selectedFolderForPoem === folder.id ? 'var(--paper-bg-light)' : 'transparent',
                  }}
                  onClick={() => setSelectedFolderForPoem(folder.id)}
                >
                  <div className="flex items-center gap-2">
                    <folder.icon 
                      className="w-4 h-4" 
                      style={{ color: 'var(--ink-accent)' }}
                    />
                    <span 
                      className="font-medium"
                      style={{ color: 'var(--paper-text)' }}
                    >
                      {folder.name}
                    </span>
                    <span 
                      className="ml-auto text-sm"
                      style={{ color: 'var(--paper-text-secondary)' }}
                    >
                      {folder.wordIds.length} 个词语
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <div className="flex gap-3 w-full">
              <Button
                className="flex-1 gap-2 border btn-hover h-12 rounded-xl"
                variant="outline"
                style={{ 
                  borderColor: 'var(--paper-border)',
                  color: 'var(--paper-text)',
                  fontWeight: '500'
                }}
                onClick={() => {
                  setIsCreatePoemDialogOpen(false);
                  setSelectedFolderForPoem(null);
                }}
              >
                取消
              </Button>
              <Button
                className="flex-1 gap-2 btn-hover h-12 rounded-xl"
                style={{ 
                  backgroundColor: 'var(--ink-accent)',
                  color: '#fff',
                  fontWeight: '500'
                }}
                disabled={!selectedFolderForPoem || !profileId}
                onClick={async () => {
                  if (!selectedFolderForPoem || !profileId) return;
                  
                  try {
                    const client = createSPAClient();
                    
                    // Create poem in database first
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const dbPoem = await createPoetryWithContent(client as any, {
                      title: '未命名作品',
                      creator_id: profileId,
                      description: '',
                      content: [], // Empty content for new poem
                      metadata: {
                        folderId: selectedFolderForPoem,
                      } as Json,
                    });
                    
                    // Transform to frontend format
                    const newPoem = transformPoetry(dbPoem, []);
                    newPoem.folderId = selectedFolderForPoem;
                    
                    // Add to local state
                    setPoems([newPoem, ...poems]);
                    setIsCreatePoemDialogOpen(false);
                    setSelectedFolderForPoem(null);
                    
                    // Navigate to edit page
                    router.push(`/app/poetry/edit/${dbPoem.id}`);
                  } catch (error) {
                    console.error('Error creating poem:', error);
                    const errorMessage = error instanceof Error ? error.message : '请稍后重试';
                    toast.error('创建作品失败', {
                      description: errorMessage
                    });
                  }
                }}
              >
                <Plus className="w-4 h-4" />
                创建作品
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--paper-bg)',
            color: 'var(--paper-text)',
            border: '2px solid var(--paper-border)',
            fontFamily: 'inherit',
          },
        }}
      />
    </DndProvider>
  );
}