/**
 * AppDataContext - Provides global data state management
 * Centralizes words, collections, and poetry data access
 */

'use client';

import { createContext, useContext } from 'react';
import { useWords } from '@/lib/hooks/useWords';
import { useCollections } from '@/lib/hooks/useCollections';
import { usePoetry } from '@/lib/hooks/usePoetry';

interface AppDataContextType {
  words: ReturnType<typeof useWords>;
  collections: ReturnType<typeof useCollections>;
  poetry: ReturnType<typeof usePoetry>;
}

const AppDataContext = createContext<AppDataContextType | null>(null);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const words = useWords();
  const collections = useCollections();
  const poetry = usePoetry();

  return (
    <AppDataContext.Provider value={{ words, collections, poetry }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider');
  }
  return context;
}

