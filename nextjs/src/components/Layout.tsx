import React, { useState, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles, LayoutGrid, BookOpen, Home } from 'lucide-react';
import { cn } from '@/components/ui/utils';

import { Sidebar } from '@/components/Sidebar';
import { RightPanel } from '@/components/RightPanel';
import { WordGrid } from '@/components/WordGrid';
import { PoemCanvas } from '@/components/PoemCanvas';
import { CreatePoemDialog } from '@/components/CreatePoemDialog';
import { CreateCollectionDialog } from '@/components/CreateCollectionDialog';
import { Dashboard } from '@/components/Dashboard';
import { WorksGallery } from '@/components/WorksGallery';
import { useAppData } from '@/lib/context/AppDataContext';
import { Poem, PoemWord, Collection } from '@/components/types';

type PageView = 'dashboard' | 'collection' | 'works' | 'editor';

export const Layout = () => {
  // Get data from Context
  const { words: wordsHook, collections: collectionsHook, poetry: poetryHook } = useAppData();
  const words = wordsHook.words;
  const poems = poetryHook.poetry;
  const collections = collectionsHook.collections;
  
  const [currentView, setCurrentView] = useState<PageView>('dashboard');
  const [currentPoemId, setCurrentPoemId] = useState<string | null>(null);
  
  // WordGrid State
  const [selectedWordIds, setSelectedWordIds] = useState<Set<string>>(new Set());
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  
  // Dialogs
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreateCollectionOpen, setIsCreateCollectionOpen] = useState(false);

  // Derived State
  const currentPoem = poems.find(p => p.id === currentPoemId);
  
  const displayedWords = useMemo(() => {
      if (!activeCollectionId) return words;
      
      const collection = collections.find(c => c.id === activeCollectionId);
      if (!collection) return words;
      
      if (collection.type === 'static') {
          return words.filter(w => collection.wordIds?.includes(w.id));
      } else {
          // Smart Collection Logic
          // Simplified: Only supporting one rule for now as per CreateCollectionDialog
          const rule = collection.rules?.[0];
          if (!rule) return words;
          
          return words.filter(w => {
              const valueToCheck = rule.field === 'category' ? w.category : 
                                   rule.field === 'text' ? w.text : '';
                                   
              if (rule.operator === 'is') {
                  return valueToCheck === rule.value;
              } else if (rule.operator === 'contains') {
                  return valueToCheck.includes(rule.value);
              }
              return false;
          });
      }
  }, [words, activeCollectionId, collections]);

  // Handlers
  const toggleWordSelection = (id: string) => {
    const newSet = new Set(selectedWordIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedWordIds(newSet);
  };

  const handleAddWord = async (text: string) => {
      try {
          await wordsHook.addWord({
              text,
              category: 'life', // Default
              partOfSpeech: 'n', // Default
              tags: [],
          });
          
          // Note: Collection update logic would need to be handled separately
          // if we want to auto-add words to active collection
      } catch (error) {
          console.error('Failed to add word:', error);
      }
  };

  const handleCreatePoem = async () => {
      try {
          let initialWordIds: string[] = [];
          
          if (selectedWordIds.size > 0) {
              initialWordIds = Array.from(selectedWordIds);
          } else {
              initialWordIds = words.slice(0, 8).map(w => w.id);
          }

          const selectedWordsList = words.filter(w => initialWordIds.includes(w.id));
          const newPoemWords: PoemWord[] = selectedWordsList.map((w, i) => ({
            ...w,
            x: 100 + (i % 4) * 140 + Math.random() * 20,
            y: 100 + Math.floor(i / 4) * 100 + Math.random() * 20
          }));

          const newPoem: Omit<Poem, 'id' | 'createdAt'> = {
            title: `作品 ${poems.length + 1}`,
            words: newPoemWords,
            styleConfig: { // Default Style Config
                baseSize: 1,
                sizeVariance: 0.5,
                colorVariance: 0.8,
                fontVariance: 0.5,
                roughness: 0.5
            }
          };

          await poetryHook.addPoetry(newPoem);
          
          // Refresh poetry list and find the newly created poem
          // Note: This is a limitation - we'd need to return the created poem ID from the API
          // For now, we'll refresh and use the first poem (assuming newest is first)
          await poetryHook.refresh();
          // The poetry list will be updated via Context, so we can use the updated list
          // Wait a bit for the state to update, then find the newest poem
          setTimeout(() => {
              const updatedPoems = poetryHook.poetry;
              if (updatedPoems && updatedPoems.length > 0) {
                  // Assuming newest is first (based on API order)
                  setCurrentPoemId(updatedPoems[0].id);
              }
          }, 100);
          setCurrentView('editor');
          setSelectedWordIds(new Set());
      } catch (error) {
          console.error('Failed to create poem:', error);
      }
  };

  const updatePoemWords = async (poemId: string, newWords: PoemWord[]) => {
      try {
          await poetryHook.updatePoetry(poemId, { words: newWords });
      } catch (error) {
          console.error('Failed to update poem words:', error);
      }
  };

  const updatePoemConfig = async (poemId: string, updates: Partial<Poem>) => {
      try {
          await poetryHook.updatePoetry(poemId, updates);
      } catch (error) {
          console.error('Failed to update poem config:', error);
      }
  };

  const deletePoem = async (id: string) => {
      try {
          await poetryHook.deletePoetry(id);
          if (currentPoemId === id) {
              setCurrentPoemId(null);
              setCurrentView('works');
          }
      } catch (error) {
          console.error('Failed to delete poem:', error);
      }
  };

  const handleEditPoem = (id: string) => {
      setCurrentPoemId(id);
      setCurrentView('editor');
  };
  
  const handleCreateCollection = async (newCol: Omit<Collection, 'id'>) => {
      try {
          await collectionsHook.addCollection(newCol);
      } catch (error) {
          console.error('Failed to create collection:', error);
      }
  };
  
  const handleAddToCollection = async (wordIds: string[], collectionId: string) => {
      // Note: This requires API support for adding words to collections
      // For now, we'll need to implement this in the collections API
      // This is a placeholder - actual implementation would call collectionsHook methods
      console.log('Add to collection:', wordIds, collectionId);
      setSelectedWordIds(new Set()); // Clear selection
  };

  const handleAddTag = async (wordIds: string[], tag: string) => {
      try {
          // Update each word with the new tag
          await Promise.all(
              wordIds.map(wordId => {
                  const word = words.find(w => w.id === wordId);
                  if (word) {
                      const updatedTags = Array.from(new Set([...word.tags, tag]));
                      return wordsHook.updateWord(wordId, { tags: updatedTags });
                  }
              })
          );
          setSelectedWordIds(new Set()); // Clear selection
      } catch (error) {
          console.error('Failed to add tag:', error);
      }
  };

  // Navigation Helpers
  const isCollection = currentView === 'collection';
  const isEditor = currentView === 'editor';

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen w-full flex flex-col bg-[#f5faf8] overflow-hidden font-sans text-[#1a2e29]">
        {/* Top Bar */}
        <div 
            className="h-16 border-b border-[#c5dfd6]/50 flex items-center justify-between px-6 z-50 relative shrink-0"
            style={{
                background: 'linear-gradient(90deg, rgba(245,250,248,1) 0%, rgba(255,255,255,0.4) 50%, rgba(245,250,248,1) 100%)'
            }}
        >
           <div className="flex items-center gap-8">
               <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentView('dashboard')}>
                   <div className="relative w-8 h-8 flex items-center justify-center">
                       <Sparkles className="h-5 w-5 text-[#6b9e8d] transition-transform group-hover:scale-110" />
                   </div>
                   <span className="font-serif text-xl text-[#1a2e29] tracking-[0.2em]">wordfall</span>
               </div>

               <div className="flex items-center gap-1">
                   <NavButton 
                        active={currentView === 'dashboard'} 
                        onClick={() => setCurrentView('dashboard')} 
                        icon={Home} 
                        label="主页" 
                   />
                   <NavButton 
                        active={currentView === 'collection'} 
                        onClick={() => setCurrentView('collection')} 
                        icon={LayoutGrid} 
                        label="收藏册" 
                   />
                   <NavButton 
                        active={currentView === 'works' || currentView === 'editor'} 
                        onClick={() => setCurrentView('works')} 
                        icon={BookOpen} 
                        label="作品集" 
                   />
               </div>
           </div>

           <div className="flex items-center gap-4">
               <Button 
                  className="rounded-full h-9 px-6 bg-[#6b9e8d] hover:bg-[#5a8d7c] text-white shadow-md border border-[#5a8d7c]/20 font-serif transition-all hover:shadow-lg hover:-translate-y-0.5"
                  onClick={() => setIsCreateDialogOpen(true)}
               >
                   <Plus className="h-4 w-4 mr-2" /> 新建作品
               </Button>
               
               <div className="w-px h-8 bg-[#c5dfd6]/50 mx-2" />

               <div className="flex items-center gap-3">
                   <div className="w-9 h-9 rounded-full bg-[#d6e6f0] flex items-center justify-center text-[#5c7c8d] text-xs font-bold border border-white shadow-sm">
                       TE
                   </div>
               </div>
           </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden relative">
            {/* Sidebar: Only show in Collection or Editor */}
            {(isCollection || isEditor) && (
                <Sidebar 
                    words={words}
                    activeFilters={[]}
                    toggleFilter={() => {}}
                    viewMode={isEditor ? 'works' : 'discovery'}
                    poems={poems}
                    currentPoemId={currentPoemId}
                    setCurrentPoemId={(id) => { setCurrentPoemId(id); setCurrentView('editor'); }}
                    collections={collections}
                    activeCollectionId={activeCollectionId}
                    onSelectCollection={setActiveCollectionId}
                    onOpenCreateCollection={() => setIsCreateCollectionOpen(true)}
                    onAddToCollection={handleAddToCollection}
                />
            )}
            
            {/* Central View */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {currentView === 'dashboard' && (
                    <Dashboard 
                        words={words} 
                        poems={poems} 
                        navigateTo={setCurrentView} 
                    />
                )}

                {currentView === 'collection' && (
                    <WordGrid 
                        words={displayedWords} // Pass filtered words
                        selectedWordIds={selectedWordIds}
                        toggleWordSelection={toggleWordSelection}
                        onAddWord={handleAddWord}
                        collections={collections}
                        onAddToCollection={handleAddToCollection}
                        onAddTag={handleAddTag}
                        activeCollectionId={activeCollectionId}
                    />
                )}

                {currentView === 'works' && (
                    <WorksGallery 
                        poems={poems}
                        setCurrentPoemId={setCurrentPoemId}
                        deletePoem={deletePoem}
                        onEdit={handleEditPoem}
                    />
                )}

                {currentView === 'editor' && (
                    <PoemCanvas 
                        currentPoem={currentPoem}
                        updatePoemWords={updatePoemWords}
                        updatePoemConfig={updatePoemConfig}
                    />
                )}
            </div>
            
            {/* RightPanel: Only show in Collection or Editor */}
            {(isCollection || isEditor) && (
                <RightPanel 
                    viewMode={isEditor ? 'works' : 'discovery'}
                    words={words}
                    poems={poems}
                    currentPoemId={currentPoemId}
                    deletePoem={deletePoem}
                />
            )}
        </div>

        <CreatePoemDialog 
            open={isCreateDialogOpen} 
            onOpenChange={setIsCreateDialogOpen} 
            onCreate={handleCreatePoem}
            wordsCount={words.length}
        />
        
        <CreateCollectionDialog 
            open={isCreateCollectionOpen}
            onOpenChange={setIsCreateCollectionOpen}
            onCreate={handleCreateCollection}
        />
      </div>
    </DndProvider>
  );
};

const NavButton = ({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: React.ComponentType<{ className?: string }>, label: string }) => (
    <Button 
        variant="ghost" 
        className={cn(
            "h-9 px-4 rounded-full text-[#1a2e29]/70 hover:text-[#1a2e29] hover:bg-white/50 font-serif gap-2 transition-all",
            active && "bg-white text-[#6b9e8d] shadow-sm"
        )}
        onClick={onClick}
    >
        <Icon className="h-4 w-4" />
        <span className="text-sm tracking-wide">{label}</span>
    </Button>
);
