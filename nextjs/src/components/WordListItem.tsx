import { Tag, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Word {
  id: string;
  text: string;
  categories: string[];
  color: string;
  rotation: number;
  folder?: string;
  createdAt: number;
}

interface WordListItemProps {
  word: Word;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export function WordListItem({ word, isSelected, onClick }: WordListItemProps) {
  return (
    <div
      className="flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-300 btn-hover"
      style={{
        borderColor: isSelected ? 'var(--ink-accent)' : 'var(--paper-border)',
        backgroundColor: isSelected ? `var(--ink-accent)10` : 'transparent'
      }}
      onClick={onClick}
    >
      {/* 词语名称列 */}
      <div className="flex-1 min-w-0 pr-4">
        <h3
          className="font-serif text-lg"
          style={{ color: 'var(--paper-text)' }}
        >
          {word.text}
        </h3>
      </div>

      {/* 标签列 */}
      <div className="flex-[2] min-w-0 px-4">
        <div className="flex flex-wrap gap-2">
          {word.categories.map(category => (
            <Badge
              key={category}
              variant="secondary"
              className="rounded-full px-2 py-0.5 text-xs"
              style={{
                backgroundColor: `${word.color}15`,
                color: word.color,
                border: `1px solid ${word.color}30`
              }}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* 创建时间列 */}
      <div className="flex items-center gap-2 text-sm opacity-60 w-32 justify-end" style={{ color: 'var(--paper-text-secondary)' }}>
        <Calendar className="w-4 h-4" />
        <span>{new Date(word.createdAt).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}</span>
      </div>
    </div>
  );
}