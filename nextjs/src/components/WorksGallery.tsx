import React from 'react';
import { Poem } from '@/components/types';
import { Edit2, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorksGalleryProps {
    poems: Poem[];
    setCurrentPoemId: (id: string) => void;
    deletePoem: (id: string) => void;
    onEdit: (id: string) => void;
}

export const WorksGallery = ({ poems, deletePoem, onEdit }: WorksGalleryProps) => {
    return (
        <div className="flex-1 h-full bg-[#f5faf8] overflow-y-auto p-8 font-serif">
             <div className="mb-10 flex items-end justify-between">
                <div>
                    <h1 className="text-3xl text-[#1a2e29] mb-2">作品集</h1>
                    <p className="text-[#4a6961]/60 text-sm tracking-wide">在这里珍藏你的每一个灵感瞬间</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {poems.map(poem => (
                    <div key={poem.id} className="group relative bg-white rounded-[4px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 aspect-[3/4] flex flex-col border border-[#c5dfd6]/30">
                         {/* Paper texture effect */}
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 pointer-events-none" />
                         
                         {/* Header */}
                         <div className="p-6 pb-0 relative z-10 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                             <div className="text-xs text-[#1a2e29]/40 font-sans flex items-center gap-1">
                                 <Calendar className="h-3 w-3" />
                                 {poem.createdAt}
                             </div>
                             <div className="flex gap-1">
                                 <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-[#6b9e8d]/10 text-[#1a2e29]/60" onClick={() => onEdit(poem.id)}>
                                     <Edit2 className="h-3 w-3" />
                                 </Button>
                                 <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-[#d4183d]/10 text-[#d4183d]/60" onClick={() => deletePoem(poem.id)}>
                                     <Trash2 className="h-3 w-3" />
                                 </Button>
                             </div>
                         </div>

                         {/* Content Preview (Mini Canvas) */}
                         <div className="flex-1 relative p-8 overflow-hidden cursor-pointer" onClick={() => onEdit(poem.id)}>
                              {/* Simple layout simulation: Render words roughly where they might be, 
                                  scaled down. Assuming original canvas ~800x600. 
                                  We map 800->100%, 600->100% roughly.
                              */}
                              {poem.words.map((word, i) => {
                                  // Normalize somewhat for preview. 
                                  // Mock normalization if coordinates are large.
                                  // Let's just use a flow layout for beauty if coordinates are messy, 
                                  // OR try absolute. Let's try absolute but scaled.
                                  // Assuming words x,y are screen coords.
                                  const scale = 0.3; 
                                  return (
                                      <div 
                                        key={i}
                                        className="absolute whitespace-nowrap text-[#1a2e29] font-serif"
                                        style={{
                                            left: (word.x * scale),
                                            top: (word.y * scale),
                                            fontSize: '0.9rem',
                                            transform: `rotate(${Math.random() * 10 - 5}deg)`
                                        }}
                                      >
                                          {word.text}
                                      </div>
                                  );
                              })}
                              
                              {/* Fallback center title if empty or scattered */}
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                                  <span className="text-4xl font-serif">{poem.title[0]}</span>
                              </div>
                         </div>

                         {/* Footer */}
                         <div className="p-6 pt-0 relative z-10 mt-auto">
                             <div className="h-px w-8 bg-[#1a2e29]/20 mb-3" />
                             <h3 className="text-lg text-[#1a2e29] font-serif tracking-wide">{poem.title}</h3>
                             <p className="text-xs text-[#1a2e29]/40 mt-1">{poem.words.length} 个词语</p>
                         </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
