import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Check } from "lucide-react";
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

interface DraggableWordProps {
  word: Word;
  index: number;
  selectedWord: Word | undefined;
  setSelectedWord: (word: Word) => void;
  selectedWords: string[];
  handleWordClick: (word: Word, e: React.MouseEvent) => void;
  moveWord: (dragIndex: number, hoverIndex: number) => void;
}

const ITEM_TYPE = 'WORD';

export function DraggableWord({ 
  word, 
  index, 
  selectedWord,
  setSelectedWord,
  selectedWords,
  handleWordClick,
  moveWord 
}: DraggableWordProps) {
  const ref = useRef<HTMLButtonElement>(null);
  
  const isSelected = selectedWord?.id === word.id;
  const isMultiSelected = selectedWords.includes(word.id);

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: () => {
      // 如果当前词语在多选列表中，拖拽所有多选的词语
      if (selectedWords.includes(word.id) && selectedWords.length > 0) {
        return { 
          index, 
          wordId: word.id, 
          wordIds: selectedWords 
        };
      }
      // 否则只拖拽当前词语
      return { 
        index, 
        wordId: word.id, 
        wordIds: [word.id] 
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (item: { index: number }) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveWord(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <button
      ref={ref}
      onClick={(e) => handleWordClick(word, e)}
      data-word-id={word.id}
      className="torn-card px-3 py-2 rounded-lg text-left stagger-item group inline-block relative"
      style={{
        borderColor: isSelected ? word.color : 'var(--paper-border)',
        borderWidth: isSelected ? '2px' : '1px',
        transform: `rotate(${word.rotation}deg)`,
        animationDelay: `${index * 0.05}s`,
        width: 'fit-content',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        backgroundColor: isMultiSelected ? `${word.color}10` : 'transparent',
      }}
    >
      {isMultiSelected && (
        <div 
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ 
            backgroundColor: word.color,
            border: '2px solid white',
            zIndex: 10
          }}
        >
          <Check className="w-3 h-3" style={{ color: 'white' }} />
        </div>
      )}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div 
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: word.color }}
          />
          <div className="font-serif transition-colors duration-300" style={{ 
            color: 'var(--paper-text)',
            fontWeight: '500',
            fontSize: '15px'
          }}>
            {word.text}
          </div>
        </div>
        {word.categories.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {word.categories.map(category => (
              <span 
                key={category}
                className="text-xs px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: `${word.color}15`,
                  color: word.color,
                  fontSize: '11px'
                }}
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}