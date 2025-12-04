/**
 * AST Helper Functions
 * Utility functions for working with TypeScript AST
 */

import { SourceFile, VariableDeclaration, CallExpression, ImportDeclaration } from 'ts-morph';

/**
 * Find all variable declarations that match a pattern
 */
export function findVariableDeclarations(
  sourceFile: SourceFile,
  pattern: RegExp
): VariableDeclaration[] {
  const declarations: VariableDeclaration[] = [];
  
  sourceFile.forEachDescendant((node) => {
    if (node.getKindName() === 'VariableDeclaration') {
      const varDecl = node as VariableDeclaration;
      const initializer = varDecl.getInitializer();
      
      if (initializer && initializer.getKindName() === 'CallExpression') {
        const callExpr = initializer as CallExpression;
        const expression = callExpr.getExpression();
        const text = expression.getText();
        
        if (pattern.test(text)) {
          declarations.push(varDecl);
        }
      }
    }
  });
  
  return declarations;
}

/**
 * Find all import declarations that match a pattern
 */
export function findImportDeclarations(
  sourceFile: SourceFile,
  moduleSpecifierPattern: RegExp
): ImportDeclaration[] {
  const imports: ImportDeclaration[] = [];
  
  sourceFile.getImportDeclarations().forEach((importDecl) => {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();
    if (moduleSpecifierPattern.test(moduleSpecifier)) {
      imports.push(importDecl);
    }
  });
  
  return imports;
}

/**
 * Check if a file needs transformation
 */
export function needsTransformation(sourceFile: SourceFile): boolean {
  const content = sourceFile.getFullText();
  
  // Check for Supabase client patterns
  const hasClientPattern = TRANSFORM_CONFIG.supabaseClientPatterns.some(pattern =>
    pattern.test(content)
  );
  
  // Check for database query patterns
  const hasQueryPattern = /supabase\.from\(/.test(content);
  
  return hasClientPattern || hasQueryPattern;
}

import { TRANSFORM_CONFIG } from '../config';

