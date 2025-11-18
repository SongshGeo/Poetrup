# API 工具函数使用指南

本目录包含拼贴诗项目的所有 API 工具函数，提供类型安全的数据库操作。

## 文件结构

- `words.ts` - 词语相关操作
- `collections.ts` - 收藏册相关操作
- `poetry.ts` - 拼贴诗相关操作
- `index.ts` - 统一导出

## 使用方式

### 在客户端组件中使用

```typescript
'use client';

import { createSPAClient } from '@/lib/supabase/client';
import { getWords, createWord } from '@/lib/api/words';

export default function WordsPage() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    async function loadWords() {
      const client = createSPAClient();
      const result = await getWords(client, {
        page: 1,
        pageSize: 20,
        language: 'zh',
      });
      setWords(result.words);
    }
    loadWords();
  }, []);

  const handleCreateWord = async (text: string) => {
    const client = createSPAClient();
    const { user } = await client.auth.getUser();
    
    // 需要先获取用户的 profile_id
    const { data: profile } = await client
      .from('profiles')
      .select('id')
      .eq('auth_uid', user.id)
      .single();

    await createWord(client, {
      text,
      language: 'zh',
      creator_id: profile.id,
      normalized: text, // 实际应该调用分词 API
      tokens: [text], // 实际应该调用分词 API
    });
  };

  return (
    // ... UI
  );
}
```

### 在服务器组件中使用

```typescript
import { createSSRClient } from '@/lib/supabase/server';
import { getCollections } from '@/lib/api/collections';

export default async function CollectionsPage() {
  const client = await createSSRClient();
  const result = await getCollections(client, {
    visibility: 'public',
    page: 1,
    pageSize: 10,
  });

  return (
    <div>
      {result.collections.map((collection) => (
        <div key={collection.id}>{collection.title}</div>
      ))}
    </div>
  );
}
```

## API 函数列表

### Words API (`words.ts`)

- `getWords()` - 获取词语列表（支持搜索、过滤、分页）
- `getWordById()` - 根据 ID 获取单个词语
- `createWord()` - 创建新词语
- `updateWord()` - 更新词语
- `deleteWord()` - 删除词语（软删除）
- `searchWords()` - 全文搜索词语
- `getWordsByTags()` - 根据标签获取词语
- `getWordsByCreator()` - 根据创建者获取词语
- `incrementWordUsage()` - 增加词语使用次数

### Collections API (`collections.ts`)

- `getCollections()` - 获取收藏册列表
- `getCollectionById()` - 根据 ID 获取单个收藏册
- `getCollectionWithWords()` - 获取收藏册及其包含的词语
- `createCollection()` - 创建新收藏册
- `updateCollection()` - 更新收藏册
- `deleteCollection()` - 删除收藏册（软删除）
- `addWordToCollection()` - 添加词语到收藏册
- `removeWordFromCollection()` - 从收藏册移除词语
- `updateWordPosition()` - 更新词语在收藏册中的位置
- `getCollectionsByOwner()` - 根据所有者获取收藏册
- `getPublicCollections()` - 获取公开收藏册

### Poetry API (`poetry.ts`)

- `getPoetry()` - 获取拼贴诗列表
- `getPoetryById()` - 根据 ID 获取单个拼贴诗
- `createPoetry()` - 创建新拼贴诗
- `createPoetryWithContent()` - 创建拼贴诗（自动提取文本内容）
- `updatePoetry()` - 更新拼贴诗
- `deletePoetry()` - 删除拼贴诗（软删除）
- `linkPoetryToCollections()` - 将拼贴诗关联到收藏册
- `unlinkPoetryFromCollection()` - 取消拼贴诗与收藏册的关联
- `getPoetryByCreator()` - 根据创建者获取拼贴诗
- `getPublicPoetry()` - 获取公开拼贴诗
- `incrementPoetryViews()` - 增加拼贴诗浏览次数
- `togglePoetryFavorite()` - 切换收藏状态
- `isPoetryFavorited()` - 检查是否已收藏
- `extractTextFromContent()` - 从内容块中提取文本

## 类型定义

所有函数都使用从 `@/lib/types` 导入的类型定义，确保类型安全：

```typescript
import type { Database } from '@/lib/types';

type Word = Database['public']['Tables']['words']['Row'];
type WordInsert = Database['public']['Tables']['words']['Insert'];
type WordUpdate = Database['public']['Tables']['words']['Update'];
```

## 错误处理

所有 API 函数在出错时会抛出包含错误信息的 Error：

```typescript
try {
  const word = await createWord(client, wordData);
} catch (error) {
  console.error('Failed to create word:', error.message);
  // 处理错误
}
```

## 注意事项

1. **认证要求**：大部分操作需要用户已登录，RLS 策略会自动处理权限
2. **Profile 创建**：创建词语/收藏册/拼贴诗前，确保用户有对应的 profile
3. **软删除**：删除操作是软删除（设置 `deleted_at`），数据不会真正删除
4. **分页**：所有列表查询都支持分页，默认每页 20 条
5. **搜索**：词语搜索支持全文搜索和模糊匹配

