/**
 * Code Transformer - Main transformation logic
 * Transforms Figma-generated code to use unified API layer
 */

import { Project, SourceFile } from 'ts-morph';
import { transformSupabaseClient } from './rules/supabase-client';
import { transformDatabaseQueries } from './rules/database-queries';
import { transformDataOperations } from './rules/data-operations';
import { needsTransformation } from './utils/ast-helpers';

/**
 * Transform a single file
 */
export function transformFile(filePath: string): string {
  const project = new Project({
    tsConfigFilePath: undefined, // Use default TypeScript config
    skipAddingFilesFromTsConfig: true,
  });
  
  try {
    const sourceFile = project.addSourceFileAtPath(filePath);
    
    // Check if file needs transformation
    if (!needsTransformation(sourceFile)) {
      return sourceFile.getFullText();
    }
    
    // Apply all transformation rules
    transformSupabaseClient(sourceFile);
    transformDatabaseQueries(sourceFile);
    transformDataOperations(sourceFile);
    
    return sourceFile.getFullText();
  } catch (error) {
    console.error(`Error transforming file ${filePath}:`, error);
    throw error;
  }
}

/**
 * Transform file from command line
 */
if (require.main === module) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: tsx transformer.ts <file-path>');
    process.exit(1);
  }
  
  try {
    const transformed = transformFile(filePath);
    console.log(transformed);
  } catch (error) {
    console.error('Transformation failed:', error);
    process.exit(1);
  }
}

