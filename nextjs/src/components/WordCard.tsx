import { Circle } from "lucide-react";

interface WordCardProps {
  word: string;
  category?: string;
  color?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export function WordCard({ 
  word, 
  category, 
  color = "#8b7355", 
  isSelected = false,
  onClick 
}: WordCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        paper-card p-4 rounded-lg transition-all duration-200 
        text-left w-full
        ${isSelected ? 'ring-2 ring-[var(--ink-accent)]' : ''}
      `}
      style={{
        borderColor: isSelected ? 'var(--ink-accent)' : 'var(--paper-border)'
      }}
    >
      <div className="flex items-center gap-3">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: color, opacity: 0.2 }}
        >
          <Circle 
            className="w-5 h-5" 
            style={{ color: color, fill: color }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div 
            className="font-serif truncate"
            style={{ color: 'var(--paper-text)' }}
          >
            {word}
          </div>
          {category && (
            <div 
              className="text-sm opacity-60"
              style={{ color: 'var(--paper-text-secondary)' }}
            >
              {category}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
