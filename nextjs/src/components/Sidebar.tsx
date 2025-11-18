import { Folder, Tag, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  onSelectTag?: (tag: string) => void;
  selectedTag?: string;
}

export function Sidebar({ onSelectTag, selectedTag }: SidebarProps) {
  const tags = [
    { id: "movie", name: "电影", icon: Tag },
    { id: "mood", name: "心情", icon: Tag },
    { id: "nature", name: "自然", icon: Tag },
    { id: "life", name: "生活", icon: Tag },
  ];

  const folders = [
    { id: "favorites", name: "收藏夹", icon: Star },
    { id: "recent", name: "最近使用", icon: Clock },
    { id: "all", name: "所有内容", icon: Folder },
  ];

  return (
    <div className="h-full flex flex-col paper-card border-r">
      {/* Header */}
      <div className="p-4 border-b border-[var(--paper-border)]">
        <h2 className="font-serif" style={{ color: 'var(--paper-text)' }}>文件系统</h2>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-6">
          {/* Files Section */}
          <div>
            <h3 className="mb-3 opacity-60 font-serif" style={{ color: 'var(--paper-text)' }}>
              文件
            </h3>
            <div className="space-y-1">
              {folders.map((folder) => {
                const Icon = folder.icon;
                return (
                  <Button
                    key={folder.id}
                    variant="ghost"
                    className="w-full justify-start gap-2 hover:bg-[var(--paper-bg)]"
                    style={{ color: 'var(--paper-text)' }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{folder.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Tags Section */}
          <div>
            <h3 className="mb-3 opacity-60 font-serif" style={{ color: 'var(--paper-text)' }}>
              标签
            </h3>
            <div className="space-y-1">
              {tags.map((tag) => {
                const Icon = tag.icon;
                const isSelected = selectedTag === tag.id;
                return (
                  <Button
                    key={tag.id}
                    variant={isSelected ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2 hover:bg-[var(--paper-bg)]"
                    style={{ 
                      color: isSelected ? 'var(--ink-accent)' : 'var(--paper-text)',
                      backgroundColor: isSelected ? 'var(--paper-bg)' : 'transparent'
                    }}
                    onClick={() => onSelectTag?.(tag.id)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tag.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}