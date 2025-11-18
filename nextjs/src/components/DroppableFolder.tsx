import { useRef } from "react";
import { useDrop } from "react-dnd";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface DroppableFolderProps {
  folder: {
    id: string;
    name: string;
    icon: LucideIcon;
    wordIds: string[];
  };
  isSelected: boolean;
  isSidebarCollapsed: boolean;
  onClick: () => void;
  onDrop: (folderId: string, wordIds: string[]) => void;
  index: number;
  wordCount?: number;
}

const ITEM_TYPE = 'WORD';

export function DroppableFolder({ 
  folder, 
  isSelected, 
  isSidebarCollapsed,
  onClick, 
  onDrop,
  index,
  wordCount
}: DroppableFolderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = folder.icon;

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: { index: number; wordId?: string; wordIds?: string[] }) => {
      // 处理单个词语或多个词语的拖放
      const wordIds = item.wordIds || (item.wordId ? [item.wordId] : []);
      if (wordIds.length > 0) {
        onDrop(folder.id, wordIds);
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
        className={`w-full ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-start'} gap-3 hover:bg-[var(--paper-bg)] btn-hover stagger-item rounded-lg h-11 transition-all duration-300`}
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
          animationDelay: `${index * 0.1}s`,
        }}
        onClick={onClick}
        title={isSidebarCollapsed ? folder.name : undefined}
      >
        <Icon className="w-4 h-4" />
        {!isSidebarCollapsed && <span>{folder.name}</span>}
        {!isSidebarCollapsed && wordCount !== undefined && (
          <span className="ml-auto text-xs opacity-50">
            {wordCount}
          </span>
        )}
      </Button>
    </div>
  );
}