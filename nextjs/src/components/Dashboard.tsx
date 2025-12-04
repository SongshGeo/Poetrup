import React from 'react';
import { Word, Poem } from '@/components/types';
import { FileText, Sparkles, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardProps {
    words: Word[];
    poems: Poem[];
    navigateTo: (view: 'collection' | 'works' | 'dashboard') => void;
}

export const Dashboard = ({ words, poems, navigateTo }: DashboardProps) => {
    return (
        <div className="flex-1 h-full bg-[#f5faf8] overflow-y-auto p-8 font-serif">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl text-[#1a2e29] mb-2">早安，诗人</h1>
                <p className="text-[#4a6961]/60 text-sm tracking-wide">今天是你与文字共处的第 12 天</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl border border-[#c5dfd6]/40 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigateTo('collection')}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-[#e8f4f0] text-[#6b9e8d]">
                            <FileText className="h-6 w-6" />
                        </div>
                        <span className="text-xs text-[#6b9e8d] bg-[#e8f4f0] px-2 py-1 rounded-full">+5 本周</span>
                    </div>
                    <div className="text-4xl text-[#1a2e29] mb-1 font-sans">{words.length}</div>
                    <div className="text-[#4a6961]/60 text-sm">收藏词语</div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#c5dfd6]/40 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigateTo('works')}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-[#fff0f3] text-[#d4895c]">
                            <Sparkles className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="text-4xl text-[#1a2e29] mb-1 font-sans">{poems.length}</div>
                    <div className="text-[#4a6961]/60 text-sm">创作作品</div>
                </div>

                <div className="bg-gradient-to-br from-[#6b9e8d] to-[#5a8d7c] p-6 rounded-2xl shadow-lg text-white flex flex-col justify-between">
                    <div className="flex items-center gap-2 opacity-80">
                        <Calendar className="h-5 w-5" />
                        <span className="text-xs tracking-widest uppercase">每日灵感</span>
                    </div>
                    <div className="text-center py-4">
                        <div className="text-3xl mb-2 font-serif">&quot; 晨曦 &quot;</div>
                        <div className="text-white/60 text-xs">n. 早晨的阳光</div>
                    </div>
                    <Button 
                        variant="secondary" 
                        className="w-full bg-white/20 hover:bg-white/30 text-white border-none"
                        onClick={() => navigateTo('collection')}
                    >
                        去联想
                    </Button>
                </div>
            </div>

            {/* Recent Works Preview */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl text-[#1a2e29]">最近创作</h2>
                    <Button variant="ghost" className="text-[#6b9e8d]" onClick={() => navigateTo('works')}>查看全部</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {poems.slice(0, 3).map(poem => (
                        <div key={poem.id} className="bg-white aspect-[4/3] rounded-xl border border-[#c5dfd6]/50 p-6 relative group hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md">
                            <div className="absolute top-4 right-4 text-xs text-[#1a2e29]/30 font-sans">{poem.createdAt}</div>
                            <h3 className="text-lg text-[#1a2e29] mb-4">{poem.title}</h3>
                            <div className="flex flex-wrap gap-2 content-start h-full max-h-[120px] overflow-hidden mask-image-linear-to-b">
                                {poem.words.slice(0, 6).map((w, i) => (
                                    <span key={i} className="text-sm text-[#4a6961] bg-[#f5faf8] px-2 py-1 rounded">
                                        {w.text}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
