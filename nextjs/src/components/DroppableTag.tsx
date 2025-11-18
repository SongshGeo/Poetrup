import { useRef } from "react";
import { useDrop } from "react-dnd";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface DroppableTagProps {
  tag: {
    id: string;
    name: string;
    icon: LucideIcon;
  };
  isSelected: boolean;
  isSidebarCollapsed: boolean;
  onClick: () => void;
  onDrop: (tagId: string, wordIds: string[]) => void;
  index: number;
  wordCount: number;
  categoryName: string;
}

const ITEM_TYPE = 'WORD';

export function DroppableTag({ 
  tag, 
  isSelected, 
  isSidebarCollapsed,
  onClick, 
  onDrop,
  index,
  wordCount,
  categoryName
}: DroppableTagProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = tag.icon;

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: { index: number; wordId?: string; wordIds?: string[] }) => {
      // 处理单个词语或多个词语的拖放
      const wordIds = item.wordIds || (item.wordId ? [item.wordId] : []);
      if (wordIds.length > 0) {
        onDrop(categoryName, wordIds);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  drop(ref);

  return (
    <div ref={ref}>
      <Button
        variant={isSelected ? "secondary" : "ghost"}
        className={`w-full ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-start'} gap-3 hover:bg-[var(--paper-bg)] btn-hover rounded-lg h-11 stagger-item transition-all duration-300`}
        style={{ 
          color: isSelected ? 'var(--ink-accent)' : 'var(--paper-text)',
          backgroundColor: isOver && canDrop 
            ? 'var(--ink-accent)20' 
            : isSelected 
              ? 'var(--paper-bg)' 
              : 'transparent',
          borderColor: isOver && canDrop ? 'var(--ink-accent)' : 'transparent',
          borderWidth: isOver && canDrop ? '2px' : '0px',
          fontWeight: isSelected ? '600' : '400',
          animationDelay: `${(index + 3) * 0.1}s`,
        }}
        onClick={onClick}
        title={isSidebarCollapsed ? tag.name : undefined}
      >
        <Icon className="w-4 h-4" />
        {!isSidebarCollapsed && <span>{tag.name}</span>}
        {!isSidebarCollapsed && (
          <span className="ml-auto text-xs opacity-50">
            {wordCount}
          </span>
        )}
      </Button>
    </div>
  );
}