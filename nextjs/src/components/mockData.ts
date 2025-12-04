import { Poem, Word, Collection, PoemWord } from './types';

export const INITIAL_WORDS: Word[] = [
    { id: '1', text: '晨曦', category: 'nature', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '2', text: '微风', category: 'nature', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '3', text: '破碎', category: 'emotion', partOfSpeech: 'adj', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '4', text: '温柔', category: 'emotion', partOfSpeech: 'adj', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '5', text: '镜头', category: 'movie', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '6', text: '蒙太奇', category: 'movie', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '7', text: '咖啡', category: 'life', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '8', text: '书签', category: 'life', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '9', text: '呼吸', category: 'life', partOfSpeech: 'v', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '10', text: '凝视', category: 'emotion', partOfSpeech: 'v', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '11', text: '绽放', category: 'nature', partOfSpeech: 'v', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '12', text: '荒芜', category: 'nature', partOfSpeech: 'adj', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '13', text: '胶片', category: 'movie', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '14', text: '独白', category: 'movie', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '15', text: '地铁', category: 'life', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '16', text: '雨伞', category: 'life', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '17', text: '瞬间', category: 'life', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '18', text: '永恒', category: 'emotion', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '19', text: '坠落', category: 'emotion', partOfSpeech: 'v', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '20', text: '飞翔', category: 'nature', partOfSpeech: 'v', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '21', text: '深渊', category: 'nature', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '22', text: '回响', category: 'movie', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '23', text: '光影', category: 'movie', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '24', text: '黄昏', category: 'nature', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '25', text: '黎明', category: 'nature', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '26', text: '沉默', category: 'emotion', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '27', text: '喧嚣', category: 'life', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '28', text: '过客', category: 'life', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '29', text: '归人', category: 'life', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now() },
    { id: '30', text: '流浪', category: 'life', partOfSpeech: 'v', tags: [], collectionIds: [], addedAt: Date.now() },
];

export const INITIAL_POEMS: Poem[] = [
    {
        id: 'p1',
        title: '晨间微光',
        createdAt: '2023年10月12日',
        words: [
            { id: 'w1', text: '晨曦', category: 'nature', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now(), x: 100, y: 100, rotation: -2 },
            { id: 'w2', text: '温柔', category: 'emotion', partOfSpeech: 'adj', tags: [], collectionIds: [], addedAt: Date.now(), x: 220, y: 120, rotation: 3 },
            { id: 'w3', text: '地', category: 'life', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now(), x: 340, y: 110, rotation: 0 },
            { id: 'w4', text: '凝视', category: 'emotion', partOfSpeech: 'v', tags: [], collectionIds: [], addedAt: Date.now(), x: 150, y: 220, rotation: -1 },
            { id: 'w5', text: '着', category: 'life', partOfSpeech: 'v', tags: [], collectionIds: [], addedAt: Date.now(), x: 260, y: 230, rotation: 4 },
            { id: 'w6', text: '我', category: 'life', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now(), x: 340, y: 220, rotation: -3 },
        ] as PoemWord[]
    },
    {
        id: 'p2',
        title: '城市边缘',
        createdAt: '2023年10月15日',
        words: [
            { id: 'w7', text: '地铁', category: 'life', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now(), x: 100, y: 100, rotation: 1 },
            { id: 'w8', text: '穿过', category: 'life', partOfSpeech: 'v', tags: [], collectionIds: [], addedAt: Date.now(), x: 220, y: 90, rotation: -1 },
            { id: 'w9', text: '荒芜', category: 'nature', partOfSpeech: 'adj', tags: [], collectionIds: [], addedAt: Date.now(), x: 350, y: 110, rotation: 2 },
            { id: 'w10', text: '的', category: 'life', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now(), x: 120, y: 200, rotation: 0 },
            { id: 'w11', text: '梦境', category: 'emotion', partOfSpeech: 'n', tags: [], collectionIds: [], addedAt: Date.now(), x: 200, y: 210, rotation: -2 },
        ] as PoemWord[]
    }
];

export const INITIAL_COLLECTIONS: Collection[] = [
    {
        id: 'c1',
        name: '常用词',
        icon: 'Star',
        color: '#FFD700',
        type: 'static',
        wordIds: ['1', '2', '4', '7']
    },
    {
        id: 'c2',
        name: '自然风景',
        icon: 'Leaf',
        color: '#6b9e8d',
        type: 'smart',
        rules: [{ field: 'category', operator: 'is', value: 'nature' }]
    }
];
