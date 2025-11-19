interface TornWordCardProps {
  text: string;
  color?: string;
  rotation?: number;
  className?: string;
  style?: React.CSSProperties;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDoubleClick?: () => void;
  children?: React.ReactNode;
}

export function TornWordCard({
  text,
  color: _color = "#8b7355", // eslint-disable-line @typescript-eslint/no-unused-vars
  rotation = 0,
  className = "",
  style = {},
  draggable = false,
  onDragStart,
  onDoubleClick,
  children,
}: TornWordCardProps) {
  // 根据词语长度计算卡片尺寸
  const textLength = text.length;
  const paddingX = textLength <= 2 ? 'px-4' : textLength <= 4 ? 'px-5' : 'px-6';
  const paddingY = 'py-2.5';

  return (
    <div
      className={`paper-cut-card cursor-move select-none relative inline-block ${paddingX} ${paddingY} ${className}`}
      style={{
        ...style,
        transform: `rotate(${rotation}deg)`,
        width: 'fit-content',
      }}
      draggable={draggable}
      onDragStart={onDragStart}
      onDoubleClick={onDoubleClick}
    >
      {/* 词语文本 */}
      <span className="relative z-10 whitespace-nowrap">
        {text}
      </span>
      
      {/* 子元素（如删除按钮） */}
      {children}
    </div>
  );
}