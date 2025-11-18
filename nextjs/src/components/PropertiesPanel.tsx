import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Tag, Clock } from "lucide-react";

interface Word {
  id: string;
  word: string;
  category: string;
  color: string;
}

interface PropertiesPanelProps {
  selectedWord?: Word;
}

export function PropertiesPanel({ selectedWord }: PropertiesPanelProps) {
  if (!selectedWord) {
    return (
      <div className="h-full flex flex-col paper-card border-l">
        <div className="p-4 border-b border-[var(--paper-border)]">
          <h2 className="font-serif" style={{ color: 'var(--paper-text)' }}>词墙属性</h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <div 
              className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
              style={{ backgroundColor: 'var(--paper-border)' }}
            >
              <Tag className="w-8 h-8" style={{ color: 'var(--paper-text-secondary)' }} />
            </div>
            <p 
              className="opacity-60"
              style={{ color: 'var(--paper-text-secondary)' }}
            >
              选择一个词语查看详情
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Generate dynamic creation date based on word id
  const dates = [
    "2024-01-15", "2024-01-12", "2024-01-10", "2024-01-08", 
    "2024-01-05", "2024-01-03", "2023-12-28", "2023-12-25"
  ];
  const creationDate = dates[parseInt(selectedWord.id) % dates.length];
  const usageCount = (parseInt(selectedWord.id) * 3 + 5) % 20 + 3;

  return (
    <div className="h-full flex flex-col paper-card border-l">
      {/* Header */}
      <div className="p-4 border-b border-[var(--paper-border)]">
        <h2 className="font-serif" style={{ color: 'var(--paper-text)' }}>词墙属性</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Word Preview */}
          <div className="text-center py-8">
            <div 
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: selectedWord.color, opacity: 0.2 }}
            >
              <span 
                className="text-2xl font-serif"
                style={{ color: selectedWord.color }}
              >
                {selectedWord.word[0]}
              </span>
            </div>
            <h3 
              className="text-2xl font-serif mb-2"
              style={{ color: 'var(--paper-text)' }}
            >
              {selectedWord.word}
            </h3>
            <Badge 
              variant="secondary"
              style={{
                backgroundColor: 'var(--paper-bg)',
                color: 'var(--paper-text-secondary)'
              }}
            >
              {selectedWord.category}
            </Badge>
          </div>

          <Separator style={{ backgroundColor: 'var(--paper-border)' }} />

          {/* Properties */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 opacity-60">
                <Tag className="w-4 h-4" style={{ color: 'var(--paper-text-secondary)' }} />
                <span style={{ color: 'var(--paper-text-secondary)' }}>标签</span>
              </div>
              <div style={{ color: 'var(--paper-text)' }}>
                {selectedWord.category}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 opacity-60">
                <Calendar className="w-4 h-4" style={{ color: 'var(--paper-text-secondary)' }} />
                <span style={{ color: 'var(--paper-text-secondary)' }}>创建时间</span>
              </div>
              <div style={{ color: 'var(--paper-text)' }}>
                {creationDate}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 opacity-60">
                <Clock className="w-4 h-4" style={{ color: 'var(--paper-text-secondary)' }} />
                <span style={{ color: 'var(--paper-text-secondary)' }}>使用次数</span>
              </div>
              <div style={{ color: 'var(--paper-text)' }}>
                {usageCount} 次
              </div>
            </div>
          </div>

          <Separator style={{ backgroundColor: 'var(--paper-border)' }} />

          {/* Related Works */}
          <div>
            <h4 
              className="mb-3 font-serif"
              style={{ color: 'var(--paper-text)' }}
            >
              我的作品
            </h4>
            <div className="space-y-2">
              <div 
                className="p-3 rounded border cursor-pointer hover:bg-[var(--paper-bg)] transition-colors"
                style={{ borderColor: 'var(--paper-border)' }}
              >
                <div 
                  className="font-serif mb-1"
                  style={{ color: 'var(--paper-text)' }}
                >
                  秋日随想
                </div>
                <div 
                  className="text-sm opacity-60"
                  style={{ color: 'var(--paper-text-secondary)' }}
                >
                  2024-01-10
                </div>
              </div>
              <div 
                className="p-3 rounded border cursor-pointer hover:bg-[var(--paper-bg)] transition-colors"
                style={{ borderColor: 'var(--paper-border)' }}
              >
                <div 
                  className="font-serif mb-1"
                  style={{ color: 'var(--paper-text)' }}
                >
                  城市印象
                </div>
                <div 
                  className="text-sm opacity-60"
                  style={{ color: 'var(--paper-text-secondary)' }}
                >
                  2024-01-08
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}