import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { Check, List, Grid, Sparkles, Wand2, FolderPlus, Tag, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '@/components/ui/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Word, Collection } from '@/components/types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

interface WordGridProps {
    words: Word[];
    selectedWordIds: Set<string>;
    toggleWordSelection: (id: string) => void;
    onAddWord: (text: string) => void;
    collections: Collection[];
    onAddToCollection: (wordIds: string[], collectionId: string) => void;
    onAddTag: (wordIds: string[], tag: string) => void;
    activeCollectionId: string | null;
}

export const WordGrid = ({ 
    words, 
    selectedWordIds, 
    toggleWordSelection, 
    onAddWord,
    collections,
    onAddToCollection,
    onAddTag,
    activeCollectionId
}: WordGridProps) => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [inputValue, setInputValue] = useState('');
  const [tagInputValue, setTagInputValue] = useState('');
  
  // Visual Customization: 0=Small (Default), 1=Medium, 2=Large
  const [cardSize, setCardSize] = useState<0 | 1 | 2>(0); 
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [activeFilters] = useState<string[]>([]);

  // Selection Box State
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionBox, setSelectionBox] = useState<{ startX: number, startY: number, currentX: number, currentY: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Filtering Logic
  const filteredWords = useMemo(() => {
     return words.filter(w => {
        const matchesSearch = w.text.includes(inputValue);
        const matchesFilter = activeFilters.length === 0 || activeFilters.includes(w.category) || activeFilters.includes(w.partOfSpeech);
        const matchesTags = activeTags.length === 0 || activeTags.some(t => w.tags?.includes(t));
        return matchesSearch && matchesFilter && matchesTags;
     });
  }, [words, inputValue, activeFilters, activeTags]);

  // Generate stable random rotations
  const rotations = useMemo(() => {
      const rots: Record<string, number> = {};
      words.forEach(w => {
          rots[w.id] = Math.random() * 3 - 1.5; // Slightly more natural rotation
      });
      return rots;
  }, [words]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && inputValue.trim()) {
          onAddWord(inputValue.trim());
          setInputValue('');
      }
  };

  const toggleTag = (tag: string) => {
      if (activeTags.includes(tag)) {
          setActiveTags(activeTags.filter(t => t !== tag));
      } else {
          setActiveTags([...activeTags, tag]);
      }
  };

  // Selection Box Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('input')) return;
      if ((e.target as HTMLElement).closest('[data-word-card]')) return;

      if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left + containerRef.current.scrollLeft;
          const y = e.clientY - rect.top + containerRef.current.scrollTop;
          setIsSelecting(true);
          setSelectionBox({ startX: x, startY: y, currentX: x, currentY: y });
      }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
      if (!isSelecting || !selectionBox || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left + containerRef.current.scrollLeft;
      const y = e.clientY - rect.top + containerRef.current.scrollTop;

      setSelectionBox({ ...selectionBox, currentX: x, currentY: y });
      
      const boxLeft = Math.min(selectionBox.startX, x);
      const boxRight = Math.max(selectionBox.startX, x);
      const boxTop = Math.min(selectionBox.startY, y);
      const boxBottom = Math.max(selectionBox.startY, y);

      filteredWords.forEach(word => {
          const el = wordRefs.current.get(word.id);
          if (el) {
              const elRect = el.getBoundingClientRect();
              const containerRect = containerRef.current!.getBoundingClientRect();
              
              const elLeft = elRect.left - containerRect.left + containerRef.current!.scrollLeft;
              const elTop = elRect.top - containerRect.top + containerRef.current!.scrollTop;
              const elRight = elLeft + elRect.width;
              const elBottom = elTop + elRect.height;

              const intersects = !(boxLeft > elRight || boxRight < elLeft || boxTop > elBottom || boxBottom < elTop);
              
              if (intersects && !selectedWordIds.has(word.id)) {
                  toggleWordSelection(word.id);
              }
          }
      });
  };

  const handleMouseUp = () => {
      setIsSelecting(false);
      setSelectionBox(null);
  };

  const activeCollection = collections.find(c => c.id === activeCollectionId);

  // Pre-defined "Inspiration" tags
  const inspirationTags = ['隐喻', '比喻', '类比', '拟人', '对比'];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f5faf8] overflow-hidden border-l border-[#c5dfd6]/30 font-serif relative">
       {/* Header Area */}
       <div className="p-8 pb-2">
           <div className="flex items-start gap-4 mb-8">
               <div className="w-11 h-11 rounded-xl bg-[#6b9e8d]/10 shrink-0 flex items-center justify-center">
                   {activeCollection ? (
                       <Sparkles className="h-5 w-5 text-[#6b9e8d]" /> 
                   ) : (
                       <Grid className="h-5 w-5 text-[#6b9e8d]" />
                   )}
               </div>
               <div>
                   <h1 className="text-xl text-[#1a2e29] tracking-wide mb-1">
                       {activeCollection ? activeCollection.name : '所有词语'}
                   </h1>
                   <p className="text-xs text-[#4a6961] tracking-wider opacity-60">
                       {activeCollection?.type === 'smart' ? '智能筛选中' : '输入词语以添加，或使用 AI 联想更多灵感'}
                   </p>
               </div>
           </div>

           <div className="relative mb-6">
               <div className="absolute inset-0 bg-[#e8f4f0] rounded-2xl border border-[#c5dfd6]" />
               <div className="relative flex items-center h-12 px-4">
                   <Input 
                     placeholder="输入一个词语，按回车添加..." 
                     className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 h-full text-[#1a2e29] placeholder:text-[#1a2e29]/30 tracking-widest text-sm px-0"
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     onKeyDown={handleKeyDown}
                   />
                   <div className="flex items-center gap-2">
                       {inputValue && (
                           <Button 
                                size="sm" 
                                className="h-7 bg-[#6b9e8d] hover:bg-[#5a8d7c] text-white text-xs rounded-lg px-3"
                                onClick={() => { onAddWord(inputValue); setInputValue(''); }}
                           >
                               添加
                           </Button>
                       )}
                       <div className="w-px h-4 bg-[#c5dfd6]" />
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-[#6b9e8d] hover:bg-[#c5dfd6]/50 rounded-xl" title="AI 联想">
                          <Wand2 className="h-4 w-4" />
                       </Button>
                   </div>
               </div>
           </div>

           <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
               {inspirationTags.map(tag => {
                   const isActive = activeTags.includes(tag);
                   return (
                       <Button 
                            key={tag} 
                            variant="ghost" 
                            onClick={() => toggleTag(tag)}
                            className={cn(
                                "h-7 rounded-full text-xs px-4 transition-all duration-200 border",
                                isActive 
                                    ? "bg-[#6b9e8d] text-white border-[#6b9e8d] shadow-sm" 
                                    : "bg-[#f8f5ed]/80 border-[#e6dcd0] hover:bg-[#f0ebe0]"
                            )}
                            style={!isActive ? {
                                color: tag === '隐喻' ? '#9e6b7d' : tag === '比喻' ? '#d4895c' : tag === '类比' ? '#7d9e9e' : tag === '拟人' ? '#9e6b8b' : '#8b7355',
                                borderColor: tag === '隐喻' ? 'rgba(158,107,125,0.19)' : tag === '比喻' ? 'rgba(212,137,92,0.19)' : tag === '类比' ? 'rgba(125,158,158,0.19)' : tag === '拟人' ? 'rgba(158,107,139,0.19)' : 'rgba(139,115,85,0.19)',
                            } : undefined}
                       >
                           {tag}
                       </Button>
                   );
               })}
           </div>
       </div>

       {/* Toolbar */}
       <div className="px-8 py-2 flex justify-between items-center border-b border-[#c5dfd6]/10 mb-2">
            <span className="text-xs text-[#4a6961] opacity-60 tracking-wider">{filteredWords.length} 个词语碎片</span>
            <div className="flex items-center gap-3">
                
                {/* Size Slider Controls */}
                {view === 'grid' && (
                    <div className="flex items-center gap-2 mr-4 group">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 text-[#4a6961]/50 hover:text-[#4a6961]"
                            onClick={() => setCardSize(s => Math.max(0, s - 1) as 0 | 1 | 2)}
                            disabled={cardSize === 0}
                        >
                            <ZoomOut className="h-3 w-3" />
                        </Button>
                        <input 
                            type="range" 
                            min="0" 
                            max="2" 
                            step="1"
                            value={cardSize}
                            onChange={(e) => setCardSize(parseInt(e.target.value) as 0 | 1 | 2)}
                            className="w-16 h-1 bg-[#c5dfd6] rounded-lg appearance-none cursor-pointer accent-[#6b9e8d] opacity-50 group-hover:opacity-100 transition-opacity"
                        />
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 text-[#4a6961]/50 hover:text-[#4a6961]"
                            onClick={() => setCardSize(s => Math.min(2, s + 1) as 0 | 1 | 2)}
                            disabled={cardSize === 2}
                        >
                            <ZoomIn className="h-3 w-3" />
                        </Button>
                    </div>
                )}

                <div className="w-px h-4 bg-[#c5dfd6] self-center" />

                <div className="flex gap-1 bg-[#e8f4f0]/50 rounded-lg p-0.5">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className={cn("h-7 w-7 rounded-md", view === 'grid' ? "bg-white shadow-sm text-[#6b9e8d]" : "text-[#4a6961]")}
                        onClick={() => setView('grid')}
                    >
                        <Grid className="h-3 w-3" />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className={cn("h-7 w-7 rounded-md", view === 'list' ? "bg-white shadow-sm text-[#6b9e8d]" : "text-[#4a6961]")}
                        onClick={() => setView('list')}
                    >
                        <List className="h-3 w-3" />
                    </Button>
                </div>
            </div>
       </div>

       {/* Content with Drag Selection */}
       <div 
            ref={containerRef}
            className="flex-1 overflow-y-auto p-8 pt-4 custom-scrollbar relative select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
       >
           {/* Selection Box Overlay */}
           {isSelecting && selectionBox && (
               <div 
                    className="absolute bg-[#6b9e8d]/20 border border-[#6b9e8d] z-50 pointer-events-none"
                    style={{
                        left: Math.min(selectionBox.startX, selectionBox.currentX),
                        top: Math.min(selectionBox.startY, selectionBox.currentY),
                        width: Math.abs(selectionBox.currentX - selectionBox.startX),
                        height: Math.abs(selectionBox.currentY - selectionBox.startY),
                    }}
               />
           )}

           {filteredWords.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-[#1a2e29]/30 mt-10">
                  <div className="w-24 h-24 mb-6 rounded-full bg-[#6b9e8d]/5 flex items-center justify-center">
                      <Sparkles className="h-10 w-10 text-[#6b9e8d]/30" />
                  </div>
                  <p className="text-lg font-serif mb-2">暂无结果</p>
                  <p className="text-xs max-w-[300px] text-center text-[#4a6961]/50 leading-relaxed">
                      尝试清除筛选条件，或添加新的词语
                  </p>
              </div>
           ) : (
                 <div className={cn(
                     "transition-all duration-300",
                     view === 'grid' ? "flex flex-wrap gap-3 content-start items-center" : "grid grid-cols-1 gap-2"
                 )}>
                    {filteredWords.map(word => {
                        const isSelected = selectedWordIds.has(word.id);
                        const rotation = rotations[word.id] || 0;
                        
                        return (
                            <DraggableWord
                                key={word.id}
                                word={word}
                                view={view}
                                isSelected={isSelected}
                                rotation={rotation}
                                toggleSelection={() => toggleWordSelection(word.id)}
                                selectedIds={Array.from(selectedWordIds)}
                                setRef={(el) => {
                                    if (el) wordRefs.current.set(word.id, el);
                                    else wordRefs.current.delete(word.id);
                                }}
                                cardSize={cardSize}
                            />
                        );
                    })}
                 </div>
           )}
       </div>

       {/* Bottom Floating Action Bar for Selection */}
       <div className={cn(
           "absolute bottom-8 left-0 w-full flex justify-center transition-all duration-500 z-30 pointer-events-none",
           selectedWordIds.size > 0 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
       )}>
            <div className="bg-[#1a2e29] text-white shadow-xl w-auto min-w-[300px] rounded-full pointer-events-auto flex items-center justify-between px-6 py-3 gap-4">
                 <span className="text-sm font-sans text-white/70">已选 {selectedWordIds.size} 个词语</span>
                 
                 <div className="h-4 w-px bg-white/20" />
                 
                 <div className="flex items-center gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                             <Button variant="ghost" size="sm" className="h-8 text-white hover:bg-white/10 hover:text-white gap-2">
                                 <FolderPlus className="h-4 w-4" />
                                 加入收藏
                             </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56 p-0 mb-2">
                            <Command>
                                <CommandInput placeholder="搜索收藏册..." />
                                <CommandList>
                                    <CommandEmpty>无收藏册</CommandEmpty>
                                    <CommandGroup heading="收藏册">
                                        {collections.filter(c => c.type === 'static').map(c => (
                                            <CommandItem 
                                                key={c.id}
                                                onSelect={() => {
                                                    onAddToCollection(Array.from(selectedWordIds), c.id);
                                                }}
                                            >
                                                {c.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger asChild>
                             <Button variant="ghost" size="sm" className="h-8 text-white hover:bg-white/10 hover:text-white gap-2">
                                 <Tag className="h-4 w-4" />
                                 打标签
                             </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-4 mb-2">
                            <div className="flex gap-2">
                                <Input 
                                    placeholder="输入标签..." 
                                    className="h-8 text-sm" 
                                    value={tagInputValue}
                                    onChange={e => setTagInputValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && tagInputValue) {
                                            onAddTag(Array.from(selectedWordIds), tagInputValue);
                                            setTagInputValue('');
                                        }
                                    }}
                                />
                                <Button 
                                    size="sm" 
                                    className="h-8"
                                    onClick={() => {
                                        if (tagInputValue) {
                                            onAddTag(Array.from(selectedWordIds), tagInputValue);
                                            setTagInputValue('');
                                        }
                                    }}
                                >
                                    确定
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                 </div>
            </div>
       </div>
    </div>
  );
};

interface DraggableWordProps {
    word: Word;
    view: 'grid' | 'list';
    isSelected: boolean;
    rotation: number;
    toggleSelection: () => void;
    selectedIds: string[];
    setRef: (el: HTMLDivElement | null) => void;
    cardSize: 0 | 1 | 2;
}

const DraggableWord = ({ word, view, isSelected, rotation, toggleSelection, selectedIds, setRef, cardSize }: DraggableWordProps) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'WORD',
        item: () => {
            const idsToDrag = isSelected ? selectedIds : [word.id];
            return { id: word.id, ids: idsToDrag };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [word.id, isSelected, selectedIds]);

    const ref = useRef<HTMLDivElement>(null);
    drag(ref);

    useEffect(() => {
        if (ref.current) {
            setRef(ref.current);
        }
    }, [setRef]);

    // Dynamic Styles based on Card Size
    const paddingClass = useMemo(() => {
        if (view === 'list') return "px-4 py-2";
        switch(cardSize) {
            case 0: return "px-3.5 py-1.5"; // Old Default (Smallest now)
            case 1: return "px-5 py-2.5";   // New Medium
            case 2: return "px-6 py-3.5";   // Largest
            default: return "px-3.5 py-1.5";
        }
    }, [cardSize, view]);

    const textSize = useMemo(() => {
        if (view === 'list') return "text-base";
        switch (cardSize) {
            case 0: return "text-sm";  // Old Default (Smallest now)
            case 1: return "text-base"; // New Medium
            case 2: return "text-xl";   // Largest
            default: return "text-sm";
        }
    }, [cardSize, view]);

    // Category Background Tint (Subtle "Paper Color")
    const paperColorClass = useMemo(() => {
        if (view === 'list') return "bg-white";
        switch(word.category) {
            case 'nature': return "bg-[#fcfcfc] hover:bg-[#faf5f2]"; // Warm white
            case 'emotion': return "bg-[#fcfcfc] hover:bg-[#f7f5f5]"; 
            case 'life': return "bg-[#fcfcfc] hover:bg-[#f2f6f7]";
            default: return "bg-white";
        }
    }, [word.category, view]);

    // Category Indicator (Bottom Border) - only visible in Grid view
    const indicatorClass = useMemo(() => {
        if (view === 'list') return "";
        switch(word.category) {
            case 'nature': return "border-b-2 border-b-[#ad8b7d]/30";
            case 'emotion': return "border-b-2 border-b-[#ad9e8b]/30";
            case 'movie': return "border-b-2 border-b-[#7d8b9e]/30";
            case 'life': return "border-b-2 border-b-[#5c6b7d]/30";
            default: return "border-b-2 border-b-gray-100";
        }
    }, [word.category, view]);

    return (
        <div 
            ref={ref}
            data-word-card
            onClick={toggleSelection}
            style={{ 
                transform: view === 'grid' ? `rotate(${rotation}deg)` : 'none',
                opacity: isDragging ? 0.5 : 1
            }}
            className={cn(
                "relative rounded-sm transition-all cursor-grab active:cursor-grabbing group select-none overflow-hidden",
                "hover:-translate-y-0.5 hover:shadow-md duration-200",
                isSelected 
                  ? "ring-1 ring-[#6b9e8d] z-10 shadow-sm" 
                  : "shadow-sm hover:shadow-md",
                // List View vs Grid View Structure
                view === 'grid' 
                   ? cn(
                       "inline-flex flex-col items-center justify-center border border-transparent",
                       paddingClass,
                       paperColorClass,
                       indicatorClass
                   )
                   : "flex items-center justify-between w-full bg-white border border-[#e5e5e5] rounded-lg h-14"
            )}
        >
            {view === 'grid' ? (
                <>
                   <span className={cn("font-serif text-[#1a2e29] tracking-wide leading-tight", textSize)}>
                       {word.text}
                   </span>
                   
                   {/* Tags only shown in Large Mode */}
                   {cardSize === 2 && (
                       <div className="flex gap-1 flex-wrap mt-2 justify-center opacity-70">
                           <span className="text-[10px] text-[#1a2e29]/50">{getCategoryLabel(word.category)}</span>
                           {word.tags?.map(t => (
                               <span key={t} className="text-[10px] text-[#1a2e29]/50">#{t}</span>
                           ))}
                       </div>
                   )}
                   
                   {isSelected && (
                        <div className="absolute -top-1 -right-1 text-[#6b9e8d] bg-white rounded-full shadow-sm p-0.5 scale-75">
                            <Check className="h-3 w-3" />
                        </div>
                   )}
                </>
            ) : (
                // List View
                <>
                    <div className="flex items-center gap-4 px-4">
                        <div className={cn(
                            "w-1 h-8 rounded-full",
                            getCategoryColor(word.category) 
                        )} />
                        <span className="font-serif text-[#1a2e29] text-base tracking-wide">{word.text}</span>
                        <div className="flex gap-1">
                            {word.tags?.map(t => (
                                <span key={t} className="text-[10px] bg-black/5 text-[#1a2e29]/50 px-1.5 py-0.5 rounded-full">{t}</span>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2 items-center px-4">
                         <CategoryTag category={word.category} />
                         {isSelected && <Check className="h-4 w-4 text-[#6b9e8d]" />}
                    </div>
                </>
            )}
        </div>
    );
};

const getCategoryColor = (cat: string) => {
    switch(cat) {
        case 'nature': return "bg-[#ad8b7d]";
        case 'emotion': return "bg-[#ad9e8b]";
        case 'movie': return "bg-[#7d8b9e]";
        case 'life': return "bg-[#5c6b7d]";
        default: return "bg-gray-300";
    }
};

const getCategoryBgColor = (cat: string) => {
    switch(cat) {
        case 'nature': return "bg-[#ad8b7d]/10 text-[#ad8b7d]";
        case 'emotion': return "bg-[#ad9e8b]/10 text-[#ad9e8b]";
        case 'movie': return "bg-[#7d8b9e]/10 text-[#7d8b9e]";
        case 'life': return "bg-[#5c6b7d]/10 text-[#5c6b7d]";
        default: return "bg-gray-100 text-gray-500";
    }
};

const getCategoryLabel = (cat: string) => {
    const map: Record<string, string> = {
        'nature': '自然',
        'emotion': '心情',
        'movie': '电影',
        'life': '生活',
        'n': '名词',
        'v': '动词',
        'adj': '形容词',
        'adv': '副词'
    };
    return map[cat] || cat;
};

const CategoryTag = ({ category, isSecondary }: { category: string, isSecondary?: boolean }) => (
    <div className={cn(
        "px-2 py-0.5 rounded text-[10px] font-serif tracking-wider",
        isSecondary ? "bg-black/5 text-[#1a2e29]/40" : getCategoryBgColor(category)
    )}>
        {getCategoryLabel(category)}
    </div>
);
