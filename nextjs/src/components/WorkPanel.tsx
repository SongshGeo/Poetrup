import { Grid3x3, List, MoreHorizontal, Plus, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WordCard } from "./WordCard";

interface Word {
  id: string;
  word: string;
  category: string;
  color: string;
}

interface WorkPanelProps {
  selectedWord?: Word;
  onSelectWord?: (word: Word) => void;
  selectedTag?: string;
}

export function WorkPanel({ selectedWord, onSelectWord, selectedTag }: WorkPanelProps) {
  const words: Word[] = [
    { id: "1", word: "夕阳", category: "自然", color: "#d4895c" },
    { id: "2", word: "孤独", category: "心情", color: "#6b7d9e" },
    { id: "3", word: "咖啡", category: "生活", color: "#8b7355" },
    { id: "4", word: "电影院", category: "电影", color: "#9e6b7d" },
    { id: "5", word: "雨天", category: "自然", color: "#7d9e9e" },
    { id: "6", word: "温暖", category: "心情", color: "#d49e5c" },
    { id: "7", word: "书页", category: "生活", color: "#9e8b7d" },
    { id: "8", word: "蒙太奇", category: "电影", color: "#7d6b9e" },
    { id: "9", word: "星空", category: "自然", color: "#5c6b9e" },
    { id: "10", word: "镜头", category: "电影", color: "#9e7d6b" },
    { id: "11", word: "思念", category: "心情", color: "#9e6b8b" },
    { id: "12", word: "月光", category: "自然", color: "#8b9ead" },
    { id: "13", word: "长镜头", category: "电影", color: "#ad8b9e" },
    { id: "14", word: "忧郁", category: "心情", color: "#6b8b9e" },
    { id: "15", word: "海风", category: "自然", color: "#5c9e8b" },
  ];

  // Filter words based on selected tag
  const categoryMap: { [key: string]: string } = {
    movie: "电影",
    mood: "心情",
    nature: "自然",
    life: "生活",
  };

  const filteredWords = selectedTag 
    ? words.filter(w => w.category === categoryMap[selectedTag])
    : words;

  return (
    <div className="h-full flex flex-col paper-bg">
      {/* Header */}
      <div className="p-4 border-b border-[var(--paper-border)] paper-card">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-serif" style={{ color: 'var(--paper-text)' }}>
            词语收藏册
          </h1>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <span style={{ color: 'var(--paper-text-secondary)' }}>排序方式</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="paper-card">
                <DropdownMenuItem>按时间</DropdownMenuItem>
                <DropdownMenuItem>按标签</DropdownMenuItem>
                <DropdownMenuItem>按名称</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex gap-1 border rounded-lg p-1" style={{ borderColor: 'var(--paper-border)' }}>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Grid3x3 className="w-4 h-4" style={{ color: 'var(--ink-accent)' }} />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <List className="w-4 h-4" style={{ color: 'var(--paper-text-secondary)' }} />
              </Button>
            </div>

            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-5 h-5" style={{ color: 'var(--paper-text-secondary)' }} />
            </Button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          {filteredWords.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div 
                className="w-24 h-24 rounded-full mb-6 flex items-center justify-center"
                style={{ backgroundColor: 'var(--paper-border)' }}
              >
                <Grid3x3 className="w-12 h-12" style={{ color: 'var(--paper-text-secondary)' }} />
              </div>
              <h3 
                className="text-xl font-serif mb-2"
                style={{ color: 'var(--paper-text)' }}
              >
                暂无词语
              </h3>
              <p 
                className="opacity-60 mb-6"
                style={{ color: 'var(--paper-text-secondary)' }}
              >
                在这个标签下还没有添加词语
              </p>
              <Button 
                className="gap-2"
                style={{ 
                  backgroundColor: 'var(--ink-accent)',
                  color: 'white'
                }}
              >
                <Plus className="w-4 h-4" />
                添加第一个词
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {filteredWords.map((word) => (
                <WordCard
                  key={word.id}
                  word={word.word}
                  category={word.category}
                  color={word.color}
                  isSelected={selectedWord?.id === word.id}
                  onClick={() => onSelectWord?.(word)}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--paper-border)] paper-card">
        <div className="flex items-center gap-3">
          <Button 
            className="flex-1 gap-2 border"
            variant="outline"
            style={{ 
              borderColor: 'var(--paper-border)',
              color: 'var(--paper-text)'
            }}
          >
            <Plus className="w-4 h-4" />
            添加新的词
          </Button>
          <Button 
            size="icon"
            className="rounded-full h-10 w-10"
            style={{
              backgroundColor: 'var(--ink-accent)',
              color: 'white'
            }}
          >
            <Circle className="w-5 h-5" fill="currentColor" />
          </Button>
        </div>
      </div>
    </div>
  );
}