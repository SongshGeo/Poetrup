import React from 'react';
import { useDrop } from 'react-dnd';
import { Button } from '@/components/ui/button';
import { cn } from '@/components/ui/utils';
import { Folder, FileText, Tag, Plus, Film, Heart, Leaf, Coffee, Type, Hash, Bookmark, Star, Zap, Sparkles } from 'lucide-react';
import { Word, Poem, Collection } from '@/components/types';

interface SidebarProps {
  words: Word[];
  activeFilters: string[];
  toggleFilter: (filter: string) => void;
  viewMode: 'discovery' | 'works';
  poems: Poem[];
  currentPoemId: string | null;
  setCurrentPoemId: (id: string) => void;
  collections: Collection[];
  activeCollectionId: string | null;
  onSelectCollection: (id: string | null) => void;
  onOpenCreateCollection: () => void;
  onAddToCollection: (wordIds: string[], collectionId: string) => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
    Folder, Bookmark, Star, Heart, Tag, Zap, Hash, Sparkles
};

export const Sidebar = ({ 
    words, 
    activeFilters, 
    toggleFilter, 
    viewMode, 
    poems, 
    currentPoemId, 
    setCurrentPoemId,
    collections,
    activeCollectionId,
    onSelectCollection,
    onOpenCreateCollection,
    onAddToCollection
}: SidebarProps) => {
  
  if (viewMode === 'works') {
      return (
        <div className="w-[260px] h-full bg-[#f5faf8] border-r border-[#c5dfd6]/30 flex flex-col p-6 overflow-y-auto font-serif">
            <div className="mb-4 px-2 flex items-center justify-between">
                <span className="text-xs font-medium text-[#1a2e29]/50 uppercase tracking-widest">所有作品</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-[#6b9e8d] hover:bg-[#6b9e8d]/10"><Plus className="h-3 w-3" /></Button>
            </div>
            <div className="space-y-3">
                {poems.map(poem => (
                    <div 
                        key={poem.id} 
                        className={cn(
                            "p-4 rounded-lg border cursor-pointer transition-all duration-200",
                            currentPoemId === poem.id 
                            ? "bg-white border-[#6b9e8d] shadow-sm" 
                            : "bg-white/40 border-transparent hover:bg-white hover:border-[#c5dfd6]/50"
                        )}
                        onClick={() => setCurrentPoemId(poem.id)}
                    >
                        <h3 className="font-serif text-[#1a2e29] text-base mb-1.5">{poem.title}</h3>
                        <p className="text-xs text-[#1a2e29]/40 font-sans flex items-center gap-2">
                            <span>{poem.words.length} 词</span>
                            <span className="w-0.5 h-0.5 rounded-full bg-[#1a2e29]/30" />
                            <span>{poem.createdAt}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
      );
  }

  const categories = [
    { id: 'n', label: 'n.', count: 0, icon: Type },
    { id: 'v', label: 'v.', count: 0, icon: Type },
    { id: 'adj', label: 'adj.', count: 0, icon: Type },
    { id: 'adv', label: 'adv.', count: 0, icon: Type },
    { id: 'movie', label: '电影', count: 0, icon: Film },
    { id: 'emotion', label: '心情', count: 0, icon: Heart },
    { id: 'nature', label: '自然', count: 0, icon: Leaf },
    { id: 'life', label: '生活', count: 0, icon: Coffee },
  ];

  return (
    <div className="w-[260px] h-full bg-[#f5faf8] border-r border-[#c5dfd6]/30 flex flex-col p-6 overflow-y-auto font-serif">
      {/* Collection Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="text-xs font-medium text-[#1a2e29]/50 uppercase tracking-widest">收藏册</span>
           <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-[#6b9e8d] hover:bg-[#6b9e8d]/10"
                onClick={onOpenCreateCollection}
           >
               <Plus className="h-3 w-3" />
           </Button>
        </div>
        
        <div className="space-y-1">
          <NavItem 
             icon={FileText} 
             label="所有内容" 
             count={words.length} 
             active={activeCollectionId === null} 
             onClick={() => onSelectCollection(null)}
          />
           {collections.map(col => {
               const Icon = ICON_MAP[col.icon] || Folder;
               return (
                   <DroppableNavItem 
                        key={col.id}
                        icon={Icon}
                        label={col.name}
                        count={col.wordIds?.length || (col.rules ? '?' : 0)}
                        active={activeCollectionId === col.id}
                        onClick={() => onSelectCollection(col.id)}
                        color={col.color}
                        isSmart={col.type === 'smart'}
                        collectionId={col.id}
                        onDrop={(item) => onAddToCollection(item.ids, col.id)}
                        disabled={col.type === 'smart'} // Smart collections are auto-managed
                   />
               );
           })}
        </div>
      </div>

      {/* Tags Section */}
      <div>
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="text-xs font-medium text-[#1a2e29]/50 uppercase tracking-widest">标���分类</span>
        </div>

        <div className="space-y-1">
          {categories.map((cat) => (
            <Button 
              key={cat.id}
              variant="ghost" 
              onClick={() => toggleFilter(cat.id)}
              className={cn(
                  "w-full justify-between text-[#1a2e29] hover:bg-[#e8f4f0] h-11 rounded-lg px-3 font-normal",
                  activeFilters.includes(cat.id) && "bg-[#e8f4f0] text-[#6b9e8d]"
              )}
            >
              <div className="flex items-center gap-3">
                 <cat.icon className={cn("h-4 w-4", activeFilters.includes(cat.id) ? "text-[#6b9e8d]" : "text-[#1a2e29]/70")} />
                 <span className="text-sm tracking-wide">{cat.label}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ 
    icon: Icon, 
    label, 
    count, 
    active, 
    onClick,
    isSmart 
}: { 
    icon: React.ComponentType<{ className?: string }>, 
    label: string, 
    count: number | string, 
    active: boolean, 
    onClick: () => void,
    isSmart?: boolean
}) => (
    <Button 
        variant="ghost" 
        className={cn(
            "w-full justify-between text-[#1a2e29] hover:bg-[#e8f4f0] h-11 rounded-lg px-3 font-normal",
            active && "bg-[#e8f4f0]"
        )}
        onClick={onClick}
    >
        <div className="flex items-center gap-3">
            <Icon 
                className={cn("h-4 w-4", active ? "text-[#1a2e29]" : "text-[#1a2e29]/70")}
            />
            <span className="text-sm tracking-wide flex items-center gap-1">
                {label}
                {isSmart && <Sparkles className="h-2 w-2 text-[#6b9e8d]" />}
            </span>
        </div>
        <span className="text-xs opacity-40 font-sans">{count}</span>
    </Button>
);

interface DroppableNavItemProps {
    collectionId?: string;
    onDrop: (item: { ids: string[] }) => void;
    disabled?: boolean;
    [key: string]: unknown;
}

const DroppableNavItem = (props: DroppableNavItemProps) => {
    const { onDrop, disabled, ...rest } = props;
    
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'WORD',
        canDrop: () => !disabled,
        drop: (item: { ids: string[] }) => {
            if (!disabled) {
                onDrop(item);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), [onDrop, disabled]);

    return (
        <div ref={drop as (node: HTMLDivElement | null) => void} className={cn("rounded-lg transition-all", isOver && canDrop ? "ring-2 ring-[#6b9e8d] bg-[#e8f4f0] scale-105 z-10" : "")}>
            <NavItem {...rest as { icon: React.ComponentType<{ className?: string }>; label: string; count: string | number; active: boolean; onClick: () => void; color?: string; isSmart?: boolean }} />
        </div>
    );
}
