import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Folder, Star, Heart, Tag, Zap, Hash, Sparkles, Leaf, Coffee, Film, Bookmark } from 'lucide-react';
import { cn } from '@/components/ui/utils';
import { Collection, CollectionType } from '@/components/types';

interface CreateCollectionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCreate: (collection: Omit<Collection, 'id'>) => void;
}

const ICONS = [
    { name: 'Folder', icon: Folder },
    { name: 'Star', icon: Star },
    { name: 'Heart', icon: Heart },
    { name: 'Tag', icon: Tag },
    { name: 'Zap', icon: Zap },
    { name: 'Hash', icon: Hash },
    { name: 'Sparkles', icon: Sparkles },
    { name: 'Leaf', icon: Leaf },
    { name: 'Coffee', icon: Coffee },
    { name: 'Film', icon: Film },
    { name: 'Bookmark', icon: Bookmark },
];

const COLORS = [
    '#6b9e8d', // Default Green
    '#FFD700', // Yellow
    '#d4183d', // Red
    '#d4895c', // Orange
    '#5c7c8d', // Blue
    '#9e6b7d', // Pink/Purple
    '#1a2e29', // Dark
];

export const CreateCollectionDialog = ({ open, onOpenChange, onCreate }: CreateCollectionDialogProps) => {
    const [name, setName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('Folder');
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [type, setType] = useState<CollectionType>('static');
    
    // Smart Rule State
    const [ruleField, setRuleField] = useState('category');
    const [ruleOperator, setRuleOperator] = useState('is');
    const [ruleValue, setRuleValue] = useState('');

    const handleSubmit = () => {
        if (!name) return;

        const newCollection: Omit<Collection, 'id'> = {
            name,
            icon: selectedIcon,
            color: selectedColor,
            type,
            wordIds: [],
            rules: type === 'smart' ? [{ 
                field: ruleField as 'text' | 'category' | 'tag', 
                operator: ruleOperator as 'contains' | 'is', 
                value: ruleValue 
            }] : undefined
        };

        onCreate(newCollection);
        onOpenChange(false);
        resetForm();
    };

    const resetForm = () => {
        setName('');
        setSelectedIcon('Folder');
        setSelectedColor(COLORS[0]);
        setType('static');
        setRuleField('category');
        setRuleOperator('is');
        setRuleValue('');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] font-sans">
                <DialogHeader>
                    <DialogTitle className="font-serif text-xl text-[#1a2e29]">创建新收藏册</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">名称</Label>
                        <Input 
                            id="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="例如：灵感碎片"
                            className="col-span-3" 
                        />
                    </div>
                    
                    <div className="grid gap-2">
                        <Label>图标</Label>
                        <div className="flex flex-wrap gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                            {ICONS.map((item) => (
                                <Button
                                    key={item.name}
                                    variant="ghost"
                                    size="icon"
                                    className={cn(
                                        "h-8 w-8 rounded-full transition-all",
                                        selectedIcon === item.name ? "bg-white shadow-sm scale-110 ring-2 ring-[#6b9e8d]" : "hover:bg-white/50"
                                    )}
                                    onClick={() => setSelectedIcon(item.name)}
                                >
                                    <item.icon className="h-4 w-4 text-[#1a2e29]/70" style={{ color: selectedIcon === item.name ? selectedColor : undefined }} />
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>颜色</Label>
                        <div className="flex gap-2">
                            {COLORS.map(color => (
                                <div
                                    key={color}
                                    className={cn(
                                        "w-6 h-6 rounded-full cursor-pointer transition-transform hover:scale-110",
                                        selectedColor === color ? "ring-2 ring-offset-2 ring-[#1a2e29]/20 scale-110" : ""
                                    )}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setSelectedColor(color)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>类型</Label>
                        <Select value={type} onValueChange={(v: CollectionType) => setType(v)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="static">普通收藏册 (手动添加)</SelectItem>
                                <SelectItem value="smart">智能收藏册 (自动筛选)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {type === 'smart' && (
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
                            <div className="text-xs font-medium text-slate-500">当满足以下条件时自动加入：</div>
                            <div className="flex gap-2">
                                <Select value={ruleField} onValueChange={setRuleField}>
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="text">内容</SelectItem>
                                        <SelectItem value="category">分类</SelectItem>
                                    </SelectContent>
                                </Select>
                                
                                <Select value={ruleOperator} onValueChange={setRuleOperator}>
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="is">是</SelectItem>
                                        <SelectItem value="contains">包含</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Input 
                                placeholder={ruleField === 'category' ? "例如: nature" : "例如: 风"}
                                value={ruleValue}
                                onChange={(e) => setRuleValue(e.target.value)}
                            />
                            <div className="text-[10px] text-slate-400">
                                {ruleField === 'category' ? '可用分类: nature, emotion, movie, life' : ''}
                            </div>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>取消</Button>
                    <Button onClick={handleSubmit} className="bg-[#6b9e8d] hover:bg-[#5a8d7c] text-white">创建</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
