import React from 'react';
import { useDrop } from 'react-dnd';
import { DraggableWord } from './DraggableWord';
import { Poem, PoemWord, PoemStyleConfig } from '@/components/types';
import { Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface PoemCanvasProps {
    currentPoem: Poem | undefined;
    updatePoemWords: (id: string, words: PoemWord[]) => void;
    updatePoemConfig: (id: string, updates: Partial<Poem>) => void;
}

export const PoemCanvas = ({ currentPoem, updatePoemWords, updatePoemConfig }: PoemCanvasProps) => {
  
  const moveWord = (id: string, x: number, y: number) => {
      if (!currentPoem) return;
      const newWords = currentPoem.words.map(w => {
          if (w.id === id) {
              return { ...w, x, y };
          }
          return w;
      });
      updatePoemWords(currentPoem.id, newWords);
  };

  const [, drop] = useDrop(() => ({
    accept: 'poem-word',
    drop: (item: { id: string; x: number; y: number }, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta && currentPoem) {
         const newX = Math.round(item.x + delta.x);
         const newY = Math.round(item.y + delta.y);
         moveWord(item.id, newX, newY);
         return undefined;
      }
    },
  }), [currentPoem]);

  const handleConfigChange = (key: keyof PoemStyleConfig, value: number) => {
      if (!currentPoem) return;
      const newConfig = { 
          ...(currentPoem.styleConfig || { 
              baseSize: 1, 
              sizeVariance: 0.5, 
              colorVariance: 0.8, 
              fontVariance: 0.5, 
              roughness: 0.5 
          }), 
          [key]: value 
      };
      updatePoemConfig(currentPoem.id, { styleConfig: newConfig });
  };

  if (!currentPoem) return <div className="flex-1 bg-[#f5faf8] flex items-center justify-center text-[#1a2e29]/30 font-serif">请选择一个作品</div>;

  const config = currentPoem.styleConfig || {
      baseSize: 1,
      sizeVariance: 0.5,
      colorVariance: 0.8,
      fontVariance: 0.5,
      roughness: 0.5
  };

  return (
    <div ref={drop as (node: HTMLDivElement | null) => void} className="flex-1 relative bg-[#f5faf8] overflow-hidden">
       <div className="absolute inset-0 pointer-events-none opacity-10" style={{
           backgroundImage: 'radial-gradient(#6b9e8d 1px, transparent 1px)',
           backgroundSize: '20px 20px'
       }}></div>
       
       {/* Title of the poem */}
       <div className="absolute top-8 left-8 z-10">
           <h1 className="text-3xl font-serif text-[#1a2e29] tracking-wide">{currentPoem.title}</h1>
           <p className="text-sm text-[#1a2e29]/40 mt-2 font-serif">{currentPoem.createdAt}</p>
       </div>

       {/* Style Controls */}
       <div className="absolute top-8 right-8 z-20">
           <Popover>
               <PopoverTrigger asChild>
                   <Button variant="outline" className="h-10 w-10 p-0 rounded-full bg-white border-[#c5dfd6] shadow-sm hover:bg-[#f5faf8]">
                       <Settings2 className="h-5 w-5 text-[#4a6961]" />
                   </Button>
               </PopoverTrigger>
               <PopoverContent className="w-72 p-4" align="end">
                   <div className="space-y-4">
                       <h4 className="font-serif text-sm font-medium text-[#1a2e29] mb-2">拼贴风格设置</h4>
                       
                       <div className="space-y-3">
                           <ControlSlider 
                               label="基础大小" 
                               value={config.baseSize} 
                               min={0.5} 
                               max={2.0} 
                               step={0.1}
                               onChange={(v) => handleConfigChange('baseSize', v)}
                           />
                           <ControlSlider 
                               label="大小随机度" 
                               value={config.sizeVariance} 
                               min={0} 
                               max={1} 
                               step={0.1}
                               onChange={(v) => handleConfigChange('sizeVariance', v)}
                           />
                           <ControlSlider 
                               label="颜色丰富度" 
                               value={config.colorVariance} 
                               min={0} 
                               max={1} 
                               step={0.1}
                               onChange={(v) => handleConfigChange('colorVariance', v)}
                           />
                           <ControlSlider 
                               label="字体随机度" 
                               value={config.fontVariance} 
                               min={0} 
                               max={1} 
                               step={0.1}
                               onChange={(v) => handleConfigChange('fontVariance', v)}
                           />
                           <ControlSlider 
                               label="粗糙质感" 
                               value={config.roughness} 
                               min={0} 
                               max={1} 
                               step={0.1}
                               onChange={(v) => handleConfigChange('roughness', v)}
                           />
                       </div>
                   </div>
               </PopoverContent>
           </Popover>
       </div>

       {currentPoem.words.map((word, index) => (
           <DraggableWord key={`${word.id}-${index}`} word={word} styleConfig={config} />
       ))}
    </div>
  );
};

const ControlSlider = ({ label, value, min, max, step, onChange }: { label: string, value: number, min: number, max: number, step: number, onChange: (v: number) => void }) => (
    <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
            <span className="text-xs text-[#4a6961]">{label}</span>
            <span className="text-[10px] text-[#4a6961]/50 font-mono">{value.toFixed(1)}</span>
        </div>
        <input 
            type="range" 
            min={min} 
            max={max} 
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#e8f4f0] rounded-lg appearance-none cursor-pointer accent-[#6b9e8d]"
        />
    </div>
);
