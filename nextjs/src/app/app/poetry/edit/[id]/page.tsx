"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, BookOpen, Calendar, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { TornWordCard } from "@/components/TornWordCard";

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

interface PlacedWord {
  wordId: string;
  x: number;
  y: number;
  rotation: number;
}

interface Folder {
  id: string;
  name: string;
  wordIds: string[];
}

export default function PoemEditPage() {
  const router = useRouter();
  const params = useParams();
  const poemId = params.id as string;
  
  // TODO: 从 Supabase API 获取数据
  const [poem, setPoem] = useState<Poem | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [poemTitle, setPoemTitle] = useState("");
  const [poemDescription, setPoemDescription] = useState("");
  
  const [placedWords, setPlacedWords] = useState<PlacedWord[]>([]);
  
  useEffect(() => {
    // TODO: 从 API 加载 poem, words, folders
    // 临时创建一个示例 poem 用于测试
    const mockPoem: Poem = {
      id: poemId,
      title: '未命名作品',
      wordIds: [],
      createdAt: Date.now(),
      description: '',
    };
    setPoem(mockPoem);
    setPoemTitle(mockPoem.title);
    setPoemDescription(mockPoem.description || "");
    setPlacedWords([]);
  }, [poemId]);
  
  const handleBack = () => {
    router.push('/app/poetry');
  };
  
  const handleUpdate = (updatedPoem: Poem) => {
    // TODO: 调用 API 更新
    setPoem(updatedPoem);
    router.push('/app/poetry');
  };
  
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  
  if (!poem) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // 获取已使用的词语
  const usedWords = words.filter(w => poem.wordIds.includes(w.id));
  
  // 获取当前作品关联的收藏册
  const currentFolder = folders.find(f => f.id === poem.folderId);
  
  // 获取可用的词语（来自关联的收藏册，并排除已放置在画布上的词语）
  const placedWordIds = placedWords.map(pw => pw.wordId);
  const folderWordIds = currentFolder?.wordIds || [];
  const availableWords = words.filter(w => 
    folderWordIds.includes(w.id) && !placedWordIds.includes(w.id)
  );
  
  // 为每个词语生成固定的旋转角度（基于词语ID）
  const getWordRotation = (wordId: string) => {
    const charSum = wordId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (charSum % 7) - 3; // -3 到 +3 度之间的旋转
  };

  const handleSave = () => {
    const updatedPoem: Poem = {
      ...poem,
      title: poemTitle,
      description: poemDescription,
      wordIds: placedWords.map(pw => pw.wordId),
      placedWords: placedWords, // 保存词语位置信息
    };
    handleUpdate(updatedPoem);
    handleBack();
  };

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: 'var(--paper-bg-light)' }}>
      {/* 顶部导航栏 */}
      <div 
        className="h-16 border-b flex items-center justify-between px-6"
        style={{ 
          backgroundColor: 'var(--paper-bg)',
          borderColor: 'var(--paper-border)'
        }}
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={handleBack}
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </Button>
          <Separator orientation="vertical" className="h-6" style={{ backgroundColor: 'var(--paper-border)' }} />
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" style={{ color: 'var(--ink-accent)' }} />
            <h1 className="font-serif text-lg" style={{ color: 'var(--paper-text)' }}>
              {poemTitle || '未命名作品'}
            </h1>
          </div>
        </div>
        <Button
          className="gap-2 btn-hover h-10 rounded-xl px-6"
          style={{ 
            backgroundColor: 'var(--ink-accent)',
            color: '#fff',
            fontWeight: '500'
          }}
          onClick={handleSave}
        >
          保存
        </Button>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧：可用词语列表 */}
        <div 
          className="w-64 border-r overflow-auto smooth-scroll"
          style={{ 
            backgroundColor: 'var(--paper-bg)',
            borderColor: 'var(--paper-border)'
          }}
        >
          <div className="p-4">
            <h3 
              className="font-serif mb-2 flex items-center gap-2"
              style={{ color: 'var(--paper-text)' }}
            >
              <FileText className="w-4 h-4" style={{ color: 'var(--ink-accent)' }} />
              可用词语 ({availableWords.length})
            </h3>
            {currentFolder && (
              <p 
                className="text-xs mb-4 opacity-60"
                style={{ color: 'var(--paper-text)' }}
              >
                来自「{currentFolder.name}」收藏册
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {availableWords.map((word) => (
                <TornWordCard
                  key={word.id}
                  text={word.text}
                  color={word.color}
                  rotation={getWordRotation(word.id)}
                  className="hover:shadow-xl transition-all inline-block"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('wordId', word.id);
                    // 记录鼠标在卡片内的偏移量
                    const rect = e.currentTarget.getBoundingClientRect();
                    const offsetX = e.clientX - rect.left;
                    const offsetY = e.clientY - rect.top;
                    e.dataTransfer.setData('offsetX', offsetX.toString());
                    e.dataTransfer.setData('offsetY', offsetY.toString());
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 中间：A4 画布 */}
        <div className="flex-1 overflow-auto smooth-scroll p-8">
          <div className="flex justify-center">
            <div
              className="relative shadow-2xl"
              style={{
                width: '794px',  // A4 宽度（约）
                height: '1123px', // A4 高度（约）
                backgroundColor: '#fff',
                backgroundImage: `
                  linear-gradient(0deg, transparent 24px, rgba(0,0,0,.05) 25px, transparent 26px),
                  linear-gradient(90deg, transparent 24px, rgba(0,0,0,.05) 25px, transparent 26px)
                `,
                backgroundSize: '25px 25px',
              }}
              onDrop={(e) => {
                e.preventDefault();
                const wordId = e.dataTransfer.getData('wordId');
                const moveIndex = e.dataTransfer.getData('moveIndex');
                const rect = e.currentTarget.getBoundingClientRect();
                
                // 获取拖拽偏移量
                const offsetX = parseFloat(e.dataTransfer.getData('offsetX') || '0');
                const offsetY = parseFloat(e.dataTransfer.getData('offsetY') || '0');
                
                // 计算词语位置（鼠标位置减去偏移量，得到卡片左上角应该在的位置）
                const x = e.clientX - rect.left - offsetX;
                const y = e.clientY - rect.top - offsetY;
                
                if (moveIndex !== '') {
                  // 移动已存在的词语
                  const index = parseInt(moveIndex);
                  const newPlacedWords = [...placedWords];
                  newPlacedWords[index] = {
                    ...newPlacedWords[index],
                    x,
                    y,
                  };
                  setPlacedWords(newPlacedWords);
                } else if (wordId) {
                  // 添加新词语
                  setPlacedWords([...placedWords, {
                    wordId,
                    x,
                    y,
                    rotation: Math.random() * 6 - 3,
                  }]);
                }
                
                // 重置拖动状态
                setDraggingIndex(null);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              {/* 空状态提示 */}
              {placedWords.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center opacity-30">
                    <BookOpen className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--ink-accent)' }} />
                    <p className="text-lg font-serif" style={{ color: 'var(--paper-text)' }}>
                      从左侧拖拽词语到这里
                    </p>
                    <p className="text-sm mt-2" style={{ color: 'var(--paper-text-secondary)' }}>
                      开始创作你的拼贴诗
                    </p>
                  </div>
                </div>
              )}
              
              {/* 放置的词语卡片 */}
              {placedWords.map((placedWord, index) => {
                const word = words.find(w => w.id === placedWord.wordId);
                if (!word) return null;

                const isDragging = draggingIndex === index;
                const isOtherDragging = draggingIndex !== null && !isDragging;

                return (
                  <div
                    key={`${placedWord.wordId}-${index}`}
                    className={`absolute ${isOtherDragging ? 'pointer-events-none' : ''} ${isDragging ? 'opacity-50' : ''}`}
                    style={{
                      left: `${placedWord.x}px`,
                      top: `${placedWord.y}px`,
                    }}
                  >
                    <TornWordCard
                      text={word.text}
                      color={word.color}
                      rotation={placedWord.rotation}
                      className="group hover:shadow-2xl transition-shadow"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('moveIndex', index.toString());
                        // 记录鼠标在卡片内的偏移量
                        const rect = e.currentTarget.getBoundingClientRect();
                        const offsetX = e.clientX - rect.left;
                        const offsetY = e.clientY - rect.top;
                        e.dataTransfer.setData('offsetX', offsetX.toString());
                        e.dataTransfer.setData('offsetY', offsetY.toString());
                        setDraggingIndex(index);
                      }}
                      onDragEnd={() => {
                        setDraggingIndex(null);
                      }}
                      onDoubleClick={() => {
                        // 双击旋转词语
                        const newPlacedWords = [...placedWords];
                        newPlacedWords[index] = {
                          ...newPlacedWords[index],
                          rotation: (newPlacedWords[index].rotation + 15) % 360 - 180,
                        };
                        setPlacedWords(newPlacedWords);
                      }}
                    >
                      <button
                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        onClick={() => {
                          setPlacedWords(placedWords.filter((_, i) => i !== index));
                        }}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </TornWordCard>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 右侧：作品属性 */}
        <div 
          className="w-80 border-l overflow-auto smooth-scroll"
          style={{ 
            backgroundColor: 'var(--paper-bg)',
            borderColor: 'var(--paper-border)'
          }}
        >
          <div className="p-6 space-y-6">
            <div>
              <h3 
                className="font-serif mb-4 flex items-center gap-2"
                style={{ color: 'var(--paper-text)' }}
              >
                <BookOpen className="w-4 h-4" style={{ color: 'var(--ink-accent)' }} />
                作品属性
              </h3>
            </div>

            <Separator style={{ backgroundColor: 'var(--paper-border)', opacity: 0.5 }} />

            {/* 标题 */}
            <div className="space-y-2">
              <Label 
                className="text-xs uppercase tracking-wider flex items-center gap-2"
                style={{ color: 'var(--paper-text-secondary)' }}
              >
                <FileText className="w-3 h-3" />
                标题
              </Label>
              <Input
                value={poemTitle}
                onChange={(e) => setPoemTitle(e.target.value)}
                placeholder="输入作品标题"
                className="w-full"
                style={{
                  borderColor: 'var(--paper-border)',
                  backgroundColor: 'var(--paper-bg-light)',
                }}
              />
            </div>

            {/* 描述 */}
            <div className="space-y-2">
              <Label 
                className="text-xs uppercase tracking-wider flex items-center gap-2"
                style={{ color: 'var(--paper-text-secondary)' }}
              >
                <FileText className="w-3 h-3" />
                描述
              </Label>
              <Textarea
                value={poemDescription}
                onChange={(e) => setPoemDescription(e.target.value)}
                placeholder="输入作品描述"
                className="w-full min-h-[100px]"
                style={{
                  borderColor: 'var(--paper-border)',
                  backgroundColor: 'var(--paper-bg-light)',
                }}
              />
            </div>

            {/* 创建时间 */}
            <div className="space-y-2">
              <Label 
                className="text-xs uppercase tracking-wider flex items-center gap-2"
                style={{ color: 'var(--paper-text-secondary)' }}
              >
                <Calendar className="w-3 h-3" />
                创建时间
              </Label>
              <div className="text-sm" style={{ color: 'var(--paper-text)' }}>
                {new Date(poem.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* 使用词语统计 */}
            <div className="space-y-2">
              <Label 
                className="text-xs uppercase tracking-wider flex items-center gap-2"
                style={{ color: 'var(--paper-text-secondary)' }}
              >
                使用词语
              </Label>
              <div className="text-sm" style={{ color: 'var(--paper-text)' }}>
                {placedWords.length} 个
              </div>
            </div>

            <Separator style={{ backgroundColor: 'var(--paper-border)', opacity: 0.5 }} />

            {/* 使用提示 */}
            <div className="space-y-2">
              <Label 
                className="text-xs uppercase tracking-wider"
                style={{ color: 'var(--paper-text-secondary)' }}
              >
                操作提示
              </Label>
              <div className="space-y-1 text-xs" style={{ color: 'var(--paper-text-secondary)' }}>
                <p>• 从左侧拖拽词语到画布</p>
                <p>• 拖动词语可移动位置</p>
                <p>• 双击词语可旋转角度</p>
                <p>• 悬停显示删除按钮</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
