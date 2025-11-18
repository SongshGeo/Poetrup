import { useEffect, useState, useRef } from "react";

interface Position {
  x: number;
  y: number;
}

interface SelectionBoxProps {
  onSelectionChange: (selectedIds: string[]) => void;
  words: Array<{ id: string; element?: HTMLElement }>;
  containerRef: React.RefObject<HTMLElement>;
}

export function SelectionBox({ onSelectionChange, words, containerRef }: SelectionBoxProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPos, setStartPos] = useState<Position>({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState<Position>({ x: 0, y: 0 });
  const selectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      // 只在直接点击容器背景（不是词语卡片或按钮）时开始框选
      const target = e.target as HTMLElement;
      
      // 检查是否点击在词语卡片或其子元素上
      if (target.closest('button[data-word-id]')) {
        return;
      }

      const rect = container.getBoundingClientRect();
      setStartPos({
        x: e.clientX - rect.left + container.scrollLeft,
        y: e.clientY - rect.top + container.scrollTop,
      });
      setCurrentPos({
        x: e.clientX - rect.left + container.scrollLeft,
        y: e.clientY - rect.top + container.scrollTop,
      });
      setIsSelecting(true);
      e.preventDefault(); // 防止文本选择
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isSelecting) return;

      const rect = container.getBoundingClientRect();
      setCurrentPos({
        x: e.clientX - rect.left + container.scrollLeft,
        y: e.clientY - rect.top + container.scrollTop,
      });

      // 检测哪些元素在选择框内
      const selectedIds: string[] = [];
      const selectionRect = getSelectionRect();

      words.forEach((word) => {
        const element = container.querySelector(`[data-word-id="${word.id}"]`);
        if (element) {
          const wordRect = element.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          
          // 转换为相对于容器的坐标
          const relativeWordRect = {
            left: wordRect.left - containerRect.left + container.scrollLeft,
            top: wordRect.top - containerRect.top + container.scrollTop,
            right: wordRect.right - containerRect.left + container.scrollLeft,
            bottom: wordRect.bottom - containerRect.top + container.scrollTop,
          };

          // 检测碰撞
          if (
            selectionRect.left < relativeWordRect.right &&
            selectionRect.right > relativeWordRect.left &&
            selectionRect.top < relativeWordRect.bottom &&
            selectionRect.bottom > relativeWordRect.top
          ) {
            selectedIds.push(word.id);
          }
        }
      });

      onSelectionChange(selectedIds);
    };

    const handleMouseUp = () => {
      setIsSelecting(false);
    };

    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isSelecting, containerRef, words, onSelectionChange]);

  const getSelectionRect = () => {
    const left = Math.min(startPos.x, currentPos.x);
    const top = Math.min(startPos.y, currentPos.y);
    const width = Math.abs(currentPos.x - startPos.x);
    const height = Math.abs(currentPos.y - startPos.y);
    return { left, top, right: left + width, bottom: top + height, width, height };
  };

  if (!isSelecting) return null;

  const rect = getSelectionRect();

  return (
    <div
      ref={selectionRef}
      style={{
        position: 'absolute',
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        border: '2px dashed var(--ink-accent)',
        backgroundColor: 'var(--ink-accent)10',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    />
  );
}