import React from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash2, Edit, Calendar, Tag, Clock, Grid } from 'lucide-react';
import { Word, Poem } from '@/components/types';

interface RightPanelProps {
    viewMode: 'discovery' | 'works';
    words: Word[];
    poems: Poem[];
    currentPoemId: string | null;
    deletePoem: (id: string) => void;
}

export const RightPanel = ({ viewMode, words, poems, currentPoemId, deletePoem }: RightPanelProps) => {
  
  const currentPoem = poems.find(p => p.id === currentPoemId);
  
  if (viewMode === 'works' && currentPoem) {
     return (
        <div className="w-[300px] h-full bg-[#f5faf8] border-l border-[#c5dfd6]/30 flex flex-col p-6 overflow-y-auto font-serif">
          <div className="flex items-center justify-between mb-10">
             <h2 className="text-[#1a2e29] text-lg tracking-wide">作品信息</h2>
             <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4 text-[#1a2e29]/60" /></Button>
          </div>

          <div className="mb-8">
              <div className="text-xs text-[#4a6961] mb-4 uppercase tracking-widest opacity-60">基本信息</div>
              <div className="space-y-6">
                  <div className="flex items-start gap-3 opacity-80">
                      <Calendar className="h-4 w-4 text-[#4a6961] mt-1" />
                      <div>
                          <div className="text-xs text-[#4a6961] mb-1">创建时间</div>
                          <div className="text-sm text-[#1a2e29]">{currentPoem.createdAt}</div>
                      </div>
                  </div>
                  <div className="flex items-start gap-3 opacity-80">
                      <FolderIcon className="h-4 w-4 text-[#4a6961] mt-1" />
                      <div>
                          <div className="text-xs text-[#4a6961] mb-1">所属收藏册</div>
                          <div className="text-sm text-[#1a2e29]">收藏夹</div>
                      </div>
                  </div>
              </div>
          </div>

          <div className="mb-8 flex-1">
              <div className="text-xs text-[#4a6961] mb-4 uppercase tracking-widest opacity-60">使用的词汇 ({currentPoem.words.length})</div>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {currentPoem.words.map((word, idx) => (
                      <div key={`${word.id}-${idx}`} className="flex items-center justify-between bg-white/60 px-3 py-2.5 rounded-lg border border-[#c5dfd6]/40">
                          <span className="text-[#1a2e29] text-sm">{word.text}</span>
                          <span className="text-[10px] bg-[#6b9e8d]/10 text-[#6b9e8d] px-2 py-0.5 rounded-full">{word.category}</span>
                      </div>
                  ))}
              </div>
          </div>

          <div className="mt-auto flex flex-col gap-3">
             <Button className="w-full bg-[#6b9e8d] hover:bg-[#5a8d7c] text-white h-10 rounded-lg shadow-sm transition-all">
                <Edit className="h-4 w-4 mr-2" /> 编辑作品
             </Button>
             <Button 
                variant="outline" 
                className="w-full border-[#d4183d]/20 text-[#d4183d] hover:bg-[#d4183d]/5 h-10 rounded-lg bg-transparent"
                onClick={() => deletePoem(currentPoem.id)}
             >
                <Trash2 className="h-4 w-4 mr-2" /> 删除作品
             </Button>
          </div>
        </div>
     );
  }

  // Default panel for discovery mode
  return (
    <div className="w-[300px] h-full bg-[#f5faf8] border-l border-[#c5dfd6]/30 flex flex-col p-6 overflow-y-auto font-serif">
        <div className="flex items-center justify-between mb-12">
            <h2 className="text-[#1a2e29] text-lg tracking-wide">集合属性</h2>
            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4 text-[#1a2e29]/60" /></Button>
        </div>

        <div className="flex flex-col items-center mb-12">
            <div className="w-28 h-28 rounded-full bg-[#6b9e8d]/10 mb-6 flex items-center justify-center text-[#6b9e8d]">
                 <Grid className="h-12 w-12 opacity-80" />
            </div>
            <h1 className="text-3xl text-[#1a2e29] mb-2 tracking-wide">心情</h1>
            <div className="px-3 py-1 rounded-full bg-[#6b9e8d]/10 text-[#6b9e8d] text-xs tracking-wide">
                标签
            </div>
        </div>

        <div className="w-full h-px bg-[#c5dfd6]/50 mb-8" />

        <div className="space-y-8 mb-8">
             <div className="flex items-center gap-4 opacity-80">
                 <Grid className="h-4 w-4 text-[#4a6961]" />
                 <div className="flex-1 flex justify-between items-center">
                     <span className="text-xs text-[#4a6961] uppercase tracking-widest">词语数量</span>
                     <span className="text-sm text-[#1a2e29] font-sans">{words.length} 个词语</span>
                 </div>
             </div>

             <div className="flex items-center gap-4 opacity-80">
                 <Calendar className="h-4 w-4 text-[#4a6961]" />
                 <div className="flex-1 flex justify-between items-center">
                     <span className="text-xs text-[#4a6961] uppercase tracking-widest">创建时间</span>
                     <span className="text-sm text-[#1a2e29] font-sans">2024年1月1日</span>
                 </div>
             </div>

             <div className="flex items-center gap-4 opacity-80">
                 <Clock className="h-4 w-4 text-[#4a6961]" />
                 <div className="flex-1 flex justify-between items-center">
                     <span className="text-xs text-[#4a6961] uppercase tracking-widest">最后修改</span>
                     <span className="text-sm text-[#1a2e29] font-sans">今天</span>
                 </div>
             </div>
        </div>
        
        <div className="w-full h-px bg-[#c5dfd6]/50 mb-8" />

        <div>
             <div className="flex items-center gap-2 mb-6">
                 <Tag className="h-4 w-4 text-[#1a2e29]" />
                 <span className="text-base text-[#1a2e29] tracking-wide">词语分类统计</span>
             </div>
             <div className="space-y-3">
                 <StatItem label="心情" count={17} />
                 <StatItem label="自然" count={7} />
                 <StatItem label="电影" count={4} />
                 <StatItem label="生活" count={2} />
             </div>
        </div>
    </div>
  );
};

const StatItem = ({ label, count }: { label: string, count: number }) => (
    <div className="flex items-center justify-between p-3 rounded-xl border border-[#c5dfd6] bg-[#f5faf8] hover:bg-white transition-colors">
        <span className="text-base text-[#1a2e29] pl-1">{label}</span>
        <span className="text-xs bg-[#f0f5f3] px-2.5 py-0.5 rounded-md text-[#1a2e29] font-sans">{count}</span>
    </div>
);

const FolderIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>
    </svg>
);
