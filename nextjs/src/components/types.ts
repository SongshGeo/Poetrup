export interface Word {
    id: string;
    text: string;
    category: string;
    partOfSpeech: string;
    tags: string[];
    collectionIds: string[];
    addedAt: number;
}

export interface PoemWord extends Word {
    x: number;
    y: number;
    rotation?: number;
    
    // Visual customizations
    fontFamily?: string;
    fontSize?: number;
    color?: string;
    backgroundColor?: string;
    style?: 'normal' | 'italic';
    weight?: 'normal' | 'bold';
    opacity?: number;
    zIndex?: number;
}

export interface PoemStyleConfig {
    baseSize: number; // 1.0 = default (around 14-16px base)
    sizeVariance: number; // 0.0 to 1.0 (how much sizes differ)
    colorVariance: number; // 0.0 to 1.0 (how often to use varied paper colors)
    fontVariance: number; // 0.0 to 1.0 (how often to use varied fonts)
    roughness: number; // 0.0 to 1.0 (border radius and rotation messiness)
}

export interface Poem {
    id: string;
    title: string;
    createdAt: string;
    words: PoemWord[];
    styleConfig?: PoemStyleConfig;
}

export type CollectionType = 'static' | 'smart';

export interface CollectionRule {
    field: 'text' | 'category' | 'tag';
    operator: 'contains' | 'is';
    value: string;
}

export interface Collection {
    id: string;
    name: string;
    icon: string; 
    color: string;
    type: CollectionType;
    rules?: CollectionRule[];
    wordIds?: string[]; 
}
