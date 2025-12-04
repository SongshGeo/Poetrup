/**
 * Code Transformer Configuration
 * Defines transformation rules and patterns
 */

export const TRANSFORM_CONFIG = {
  // Supabase client patterns to detect
  supabaseClientPatterns: [
    /createClient\s*\(/,
    /createBrowserClient\s*\(/,
    /createServerClient\s*\(/,
  ],

  // Import patterns to replace
  importReplacements: {
    '@supabase/supabase-js': '@/lib/supabase/client',
    '@supabase/ssr': '@/lib/supabase/client',
  },

  // Hook mappings for database operations
  hookMappings: {
    words: {
      hook: 'useWords',
      import: '@/lib/hooks/useWords',
      methods: {
        select: 'words',
        insert: 'addWord',
        update: 'updateWord',
        delete: 'deleteWord',
      },
    },
    collections: {
      hook: 'useCollections',
      import: '@/lib/hooks/useCollections',
      methods: {
        select: 'collections',
        insert: 'addCollection',
        update: 'updateCollection',
        delete: 'deleteCollection',
      },
    },
    poetry: {
      hook: 'usePoetry',
      import: '@/lib/hooks/usePoetry',
      methods: {
        select: 'poetry',
        insert: 'addPoetry',
        update: 'updatePoetry',
        delete: 'deletePoetry',
      },
    },
  },
} as const;

