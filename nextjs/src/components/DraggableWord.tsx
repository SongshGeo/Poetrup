import React, { useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { PoemWord, PoemStyleConfig } from '@/components/types';
import { cn } from '@/components/ui/utils';

interface DraggableWordProps {
  word: PoemWord;
  styleConfig?: PoemStyleConfig;
}

// Helper to generate stable random numbers from a string ID
const seededRandom = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    const x = Math.sin(hash) * 10000;
    return x - Math.floor(x);
};

export const DraggableWord = ({ word, styleConfig }: DraggableWordProps) => {
  // Default config if none provided
  const config = styleConfig || {
      baseSize: 1,
      sizeVariance: 0.5,
      colorVariance: 0.8,
      fontVariance: 0.5,
      roughness: 0.5
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'poem-word',
    item: { id: word.id, type: 'poem-word', x: word.x, y: word.y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [word.id, word.x, word.y]);

  // Generate stable visual properties based on word ID + Config
  const visualStyle = useMemo(() => {
      const r1 = seededRandom(word.id);
      const r2 = seededRandom(word.id + 'bg');
      const r3 = seededRandom(word.id + 'font');
      const r4 = seededRandom(word.id + 'rot');
      const r5 = seededRandom(word.id + 'shadow');

      // 1. Background Color (Paper textures/colors)
      // If colorVariance is low, we stick to white/off-white
      const bgColors = [
          '#ffffff', // White
          '#fdfbf7', // Off-white (Cream)
          '#f2f0eb', // Newsprint
          '#e8e4dc', // Old paper
          '#fafafa', // Bright white
          '#1a1a1a', // Black paper (inverted)
          '#2c3e50', // Navy paper
          '#8b4513', // Kraft paper (rare)
      ];
      
      let bgIndex = 0;
      let isDarkBg = false;

      // Apply variance threshold
      if (r2 < config.colorVariance) {
           // Skew distribution towards light colors
          bgIndex = r2 > 0.9 ? Math.floor(r2 * bgColors.length) : Math.floor(r2 * 5); 
          const bgColor = bgColors[bgIndex];
          isDarkBg = ['#1a1a1a', '#2c3e50', '#8b4513'].includes(bgColor);
      }

      const bgColor = bgColors[bgIndex];

      // 2. Font Family
      const fonts = [
          'font-serif',
          'font-sans',
          'font-mono',
      ];
      // If fontVariance is low, use serif
      const font = r3 < config.fontVariance ? fonts[Math.floor(r3 * fonts.length)] : 'font-serif';

      // 3. Rotation
      // Roughness controls rotation range
      const rotationRange = config.roughness * 10; // 0 to 10 degrees
      const rotation = (r4 * rotationRange) - (rotationRange / 2);

      // 4. Font Size
      // Base size * (1 +/- variance)
      // variance factor determines spread
      const sizeFactor = 0.8 + (r1 * 0.4 * config.sizeVariance); // Random spread based on variance
      const scale = config.baseSize * sizeFactor;

      // 5. Shadow
      const shadowClass = r5 > 0.5 && config.roughness > 0.3 ? "shadow-md" : "shadow-sm";
      
      // 6. Border Radius
      const borderRadius = config.roughness > 0.5 ? '2px' : '4px';

      return {
          bgColor,
          color: isDarkBg ? '#ffffff' : '#1a2e29',
          font,
          rotation,
          scale,
          shadowClass,
          isDarkBg,
          borderRadius
      };
  }, [word.id, config]);

  return (
    <div 
      ref={drag as (node: HTMLDivElement | null) => void}
      style={{ 
          left: word.x, 
          top: word.y,
          position: 'absolute',
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
          transform: `rotate(${visualStyle.rotation}deg) scale(${visualStyle.scale})`,
          backgroundColor: visualStyle.bgColor,
          color: visualStyle.color,
          zIndex: isDragging ? 100 : 1,
          borderRadius: visualStyle.borderRadius
      }}
      className={cn(
          "px-3 py-1.5 transition-all select-none border border-black/5",
          visualStyle.shadowClass,
          "hover:shadow-xl hover:scale-105 hover:z-50", 
          visualStyle.font
      )}
    >
      {/* Texture Overlay for "Paper" feel */}
      {!visualStyle.isDarkBg && (
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-black" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }} 
          />
      )}
      
      <span className="relative tracking-wide leading-tight font-medium whitespace-nowrap">
          {word.text}
      </span>
    </div>
  );
};
