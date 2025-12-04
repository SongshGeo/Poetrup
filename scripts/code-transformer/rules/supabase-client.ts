/**
 * Supabase Client Transformation Rule
 * Replaces Supabase client initialization with unified createSPAClient
 */

import { SourceFile, VariableDeclaration, CallExpression } from 'ts-morph';
import { findVariableDeclarations, findImportDeclarations } from '../utils/ast-helpers';
import { TRANSFORM_CONFIG } from '../config';

export function transformSupabaseClient(sourceFile: SourceFile): void {
  // Find and replace import statements
  const imports = findImportDeclarations(
    sourceFile,
    /@supabase\/(supabase-js|ssr)/
  );

  imports.forEach((importDecl) => {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();
    
    // Replace import
    if (moduleSpecifier.includes('supabase-js') || moduleSpecifier.includes('ssr')) {
      importDecl.setModuleSpecifier('@/lib/supabase/client');
      
      // Update named imports
      const namedImports = importDecl.getNamedImports();
      namedImports.forEach((namedImport) => {
        const name = namedImport.getName();
        if (name === 'createClient' || name === 'createBrowserClient' || name === 'createServerClient') {
          namedImport.setName('createSPAClient');
        }
      });
    }
  });

  // Find and replace variable declarations
  TRANSFORM_CONFIG.supabaseClientPatterns.forEach((pattern) => {
    const declarations = findVariableDeclarations(sourceFile, pattern);
    
    declarations.forEach((varDecl) => {
      const initializer = varDecl.getInitializer();
      
      if (initializer && initializer.getKindName() === 'CallExpression') {
        const callExpr = initializer as CallExpression;
        const expression = callExpr.getExpression();
        
        // Replace the call expression
        callExpr.replaceWithText('createSPAClient()');
      }
    });
  });
}

