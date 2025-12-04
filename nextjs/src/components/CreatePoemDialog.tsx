import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Folder, Clock, FileText } from 'lucide-react';
import { cn } from '@/components/ui/utils';

interface CreatePoemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (source: 'collection' | 'recent' | 'all') => void;
  wordsCount: number;
}

export const CreatePoemDialog = ({ open, onOpenChange, onCreate, wordsCount }: CreatePoemDialogProps) => {
  const [selectedSource, setSelectedSource] = useState<'collection' | 'recent' | 'all'>('all');

  const handleCreate = () => {
      onCreate(selectedSource);
      onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-[#f5faf8] border-[#c5dfd6]">
        <DialogHeader>
          <DialogTitle className="text-[#1a2e29] font-serif text-xl">新建诗词作品</DialogTitle>
          <DialogDescription className="text-sm text-[#1a2e29]/50">选择一个词语收藏册作为素材来源</DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
            <div className="text-xs text-[#1a2e29]/50 mb-4 uppercase tracking-wider">选择收藏册</div>
            <div className="space-y-3">
                <div 
                    onClick={() => setSelectedSource('collection')}
                    className={cn(
                        "flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all",
                        selectedSource === 'collection' 
                        ? "bg-white border-[#6b9e8d] shadow-sm" 
                        : "bg-white/50 border-transparent hover:bg-white"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <Folder className="h-5 w-5 text-[#1a2e29]/70" />
                        <span className="font-serif text-[#1a2e29]">收藏夹</span>
                    </div>
                    <span className="text-sm text-[#1a2e29]/50">{wordsCount} 个词语</span>
                </div>

                <div 
                    onClick={() => setSelectedSource('recent')}
                    className={cn(
                        "flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all",
                        selectedSource === 'recent' 
                        ? "bg-white border-[#6b9e8d] shadow-sm" 
                        : "bg-white/50 border-transparent hover:bg-white"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-[#1a2e29]/70" />
                        <span className="font-serif text-[#1a2e29]">最近使用</span>
                    </div>
                    <span className="text-sm text-[#1a2e29]/50">0 个词语</span>
                </div>

                <div 
                    onClick={() => setSelectedSource('all')}
                    className={cn(
                        "flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all",
                        selectedSource === 'all' 
                        ? "bg-white border-[#6b9e8d] shadow-sm" 
                        : "bg-white/50 border-transparent hover:bg-white"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-[#1a2e29]/70" />
                        <span className="font-serif text-[#1a2e29]">所有内容</span>
                    </div>
                    <span className="text-sm text-[#1a2e29]/50">{wordsCount} 个词语</span>
                </div>
            </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-transparent bg-white hover:bg-gray-50 text-[#1a2e29]">取消</Button>
          <Button onClick={handleCreate} className="bg-[#6b9e8d] hover:bg-[#5a8d7c] text-white">+ 创建作品</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
