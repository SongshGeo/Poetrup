-- Seed data for Poetry MVP
-- Note: This script assumes you have at least one user in auth.users
-- If you don't have users, create one through Supabase Auth first, then run this migration

-- Helper function to get the first available user's profile ID
-- If no profile exists, create one for the first auth user
DO $$
DECLARE
  test_user_id UUID;
  test_profile_id UUID;
  word_ids UUID[] := ARRAY[]::UUID[];
  collection_ids UUID[] := ARRAY[]::UUID[];
  poetry_ids UUID[] := ARRAY[]::UUID[];
BEGIN
  -- Get the first auth user (or use a specific one)
  SELECT id INTO test_user_id FROM auth.users LIMIT 1;
  
  -- If no user exists, skip seed data insertion (user can run this later after creating a user)
  IF test_user_id IS NULL THEN
    RAISE NOTICE 'No users found in auth.users. Skipping seed data.';
    RAISE NOTICE 'To create seed data later, create a user first through Supabase Auth, then run this migration again.';
    RETURN;
  END IF;

  -- Create or get profile for test user
  INSERT INTO public.profiles (auth_uid, username, display_name, bio)
  VALUES (
    test_user_id,
    'test_user',
    '测试用户',
    '这是一个测试用户，用于演示拼贴诗应用的功能。'
  )
  ON CONFLICT (auth_uid) DO UPDATE SET
    username = EXCLUDED.username,
    display_name = EXCLUDED.display_name
  RETURNING id INTO test_profile_id;

  -- If profile already exists, get its ID
  IF test_profile_id IS NULL THEN
    SELECT id INTO test_profile_id FROM public.profiles WHERE auth_uid = test_user_id;
  END IF;

  -- ============================================
  -- INSERT SAMPLE WORDS (Chinese vocabulary)
  -- ============================================
  WITH inserted_words AS (
    INSERT INTO public.words (text, normalized, tokens, language, creator_id, tags, source)
    VALUES
      -- Nature words
      ('秋天', '秋天', '["秋天"]'::jsonb, 'zh', test_profile_id, ARRAY['自然', '季节'], 'seed'),
      ('风', '风', '["风"]'::jsonb, 'zh', test_profile_id, ARRAY['自然', '天气'], 'seed'),
      ('云', '云', '["云"]'::jsonb, 'zh', test_profile_id, ARRAY['自然', '天空'], 'seed'),
      ('海', '海', '["海"]'::jsonb, 'zh', test_profile_id, ARRAY['自然', '水'], 'seed'),
      ('山', '山', '["山"]'::jsonb, 'zh', test_profile_id, ARRAY['自然', '地理'], 'seed'),
      ('树', '树', '["树"]'::jsonb, 'zh', test_profile_id, ARRAY['自然', '植物'], 'seed'),
      ('花', '花', '["花"]'::jsonb, 'zh', test_profile_id, ARRAY['自然', '植物'], 'seed'),
      ('月', '月', '["月"]'::jsonb, 'zh', test_profile_id, ARRAY['自然', '天空'], 'seed'),
      ('星', '星', '["星"]'::jsonb, 'zh', test_profile_id, ARRAY['自然', '天空'], 'seed'),
      ('雨', '雨', '["雨"]'::jsonb, 'zh', test_profile_id, ARRAY['自然', '天气'], 'seed'),
      
      -- Emotion words
      ('思念', '思念', '["思念"]'::jsonb, 'zh', test_profile_id, ARRAY['情感'], 'seed'),
      ('温柔', '温柔', '["温柔"]'::jsonb, 'zh', test_profile_id, ARRAY['情感', '性格'], 'seed'),
      ('孤独', '孤独', '["孤独"]'::jsonb, 'zh', test_profile_id, ARRAY['情感'], 'seed'),
      ('希望', '希望', '["希望"]'::jsonb, 'zh', test_profile_id, ARRAY['情感'], 'seed'),
      ('梦想', '梦想', '["梦想"]'::jsonb, 'zh', test_profile_id, ARRAY['情感', '理想'], 'seed'),
      
      -- Time words
      ('清晨', '清晨', '["清晨"]'::jsonb, 'zh', test_profile_id, ARRAY['时间'], 'seed'),
      ('黄昏', '黄昏', '["黄昏"]'::jsonb, 'zh', test_profile_id, ARRAY['时间'], 'seed'),
      ('夜晚', '夜晚', '["夜晚"]'::jsonb, 'zh', test_profile_id, ARRAY['时间'], 'seed'),
      ('过去', '过去', '["过去"]'::jsonb, 'zh', test_profile_id, ARRAY['时间'], 'seed'),
      ('未来', '未来', '["未来"]'::jsonb, 'zh', test_profile_id, ARRAY['时间'], 'seed'),
      
      -- Action/Abstract words
      ('飞翔', '飞翔', '["飞翔"]'::jsonb, 'zh', test_profile_id, ARRAY['动作'], 'seed'),
      ('等待', '等待', '["等待"]'::jsonb, 'zh', test_profile_id, ARRAY['动作'], 'seed'),
      ('寻找', '寻找', '["寻找"]'::jsonb, 'zh', test_profile_id, ARRAY['动作'], 'seed'),
      ('回忆', '回忆', '["回忆"]'::jsonb, 'zh', test_profile_id, ARRAY['抽象'], 'seed'),
      ('自由', '自由', '["自由"]'::jsonb, 'zh', test_profile_id, ARRAY['抽象', '理想'], 'seed'),
      
      -- Place words
      ('故乡', '故乡', '["故乡"]'::jsonb, 'zh', test_profile_id, ARRAY['地点'], 'seed'),
      ('远方', '远方', '["远方"]'::jsonb, 'zh', test_profile_id, ARRAY['地点'], 'seed'),
      ('城市', '城市', '["城市"]'::jsonb, 'zh', test_profile_id, ARRAY['地点'], 'seed'),
      ('田野', '田野', '["田野"]'::jsonb, 'zh', test_profile_id, ARRAY['地点', '自然'], 'seed'),
      ('小巷', '小巷', '["小巷"]'::jsonb, 'zh', test_profile_id, ARRAY['地点'], 'seed')
    RETURNING id
  )
  SELECT array_agg(id) INTO word_ids FROM inserted_words;

  -- ============================================
  -- INSERT SAMPLE COLLECTIONS
  -- ============================================
  WITH inserted_collections AS (
    INSERT INTO public.collections (title, description, owner_id, visibility, tags, metadata)
    VALUES
      (
        '自然诗集',
        '收集了关于自然风光的词语，适合创作描绘大自然的拼贴诗。',
        test_profile_id,
        'public',
        ARRAY['自然', '风景'],
        '{"theme": "nature", "color": "green"}'::jsonb
      ),
      (
        '情感词汇',
        '表达各种情感的词语集合，用于创作抒情诗。',
        test_profile_id,
        'shared',
        ARRAY['情感', '抒情'],
        '{"theme": "emotion", "color": "blue"}'::jsonb
      ),
      (
        '时间与记忆',
        '关于时间和回忆的词语，适合创作怀旧主题的诗歌。',
        test_profile_id,
        'private',
        ARRAY['时间', '回忆'],
        '{"theme": "memory", "color": "purple"}'::jsonb
      ),
      (
        '城市印象',
        '描绘城市生活的词语，适合创作现代都市主题的诗歌。',
        test_profile_id,
        'public',
        ARRAY['城市', '现代'],
        '{"theme": "urban", "color": "gray"}'::jsonb
      )
    RETURNING id
  )
  SELECT array_agg(id) INTO collection_ids FROM inserted_collections;

  -- ============================================
  -- LINK WORDS TO COLLECTIONS
  -- ============================================
  -- Link nature words to "自然诗集"
  INSERT INTO public.collection_words (collection_id, word_id, position)
  SELECT collection_ids[1], id, row_number() OVER ()
  FROM unnest(word_ids) AS id
  WHERE id IN (
    SELECT id FROM public.words WHERE tags && ARRAY['自然']
    LIMIT 10
  );

  -- Link emotion words to "情感词汇"
  INSERT INTO public.collection_words (collection_id, word_id, position)
  SELECT collection_ids[2], id, row_number() OVER ()
  FROM unnest(word_ids) AS id
  WHERE id IN (
    SELECT id FROM public.words WHERE tags && ARRAY['情感']
    LIMIT 5
  );

  -- Link time words to "时间与记忆"
  INSERT INTO public.collection_words (collection_id, word_id, position)
  SELECT collection_ids[3], id, row_number() OVER ()
  FROM unnest(word_ids) AS id
  WHERE id IN (
    SELECT id FROM public.words WHERE tags && ARRAY['时间']
    LIMIT 5
  );

  -- Link place words to "城市印象"
  INSERT INTO public.collection_words (collection_id, word_id, position)
  SELECT collection_ids[4], id, row_number() OVER ()
  FROM unnest(word_ids) AS id
  WHERE id IN (
    SELECT id FROM public.words WHERE tags && ARRAY['地点', '城市']
    LIMIT 5
  );

  -- ============================================
  -- INSERT SAMPLE POETRY
  -- ============================================
  WITH inserted_poetry AS (
    INSERT INTO public.poetry (title, description, creator_id, content, text_content, metadata)
    VALUES
      (
        '秋天的风',
        '一首关于秋天和风的短诗',
        test_profile_id,
        jsonb_build_array(
          jsonb_build_object('type', 'word', 'word_id', (SELECT id FROM public.words WHERE text = '秋天' AND creator_id = test_profile_id LIMIT 1), 'text', '秋天', 'x', 100, 'y', 150, 'fontSize', 24),
          jsonb_build_object('type', 'word', 'word_id', (SELECT id FROM public.words WHERE text = '风' AND creator_id = test_profile_id LIMIT 1), 'text', '风', 'x', 200, 'y', 150, 'fontSize', 24),
          jsonb_build_object('type', 'text', 'text', '吹过', 'x', 150, 'y', 200, 'fontSize', 18),
          jsonb_build_object('type', 'word', 'word_id', (SELECT id FROM public.words WHERE text = '树' AND creator_id = test_profile_id LIMIT 1), 'text', '树', 'x', 250, 'y', 200, 'fontSize', 20)
        ),
        '秋天的风吹过树',
        '{"visibility": "public", "theme": "nature"}'::jsonb
      ),
      (
        '思念的夜晚',
        '一首关于思念和夜晚的抒情诗',
        test_profile_id,
        jsonb_build_array(
          jsonb_build_object('type', 'word', 'word_id', (SELECT id FROM public.words WHERE text = '思念' AND creator_id = test_profile_id LIMIT 1), 'text', '思念', 'x', 120, 'y', 100, 'fontSize', 22),
          jsonb_build_object('type', 'text', 'text', '在', 'x', 220, 'y', 100, 'fontSize', 16),
          jsonb_build_object('type', 'word', 'word_id', (SELECT id FROM public.words WHERE text = '夜晚' AND creator_id = test_profile_id LIMIT 1), 'text', '夜晚', 'x', 260, 'y', 100, 'fontSize', 22),
          jsonb_build_object('type', 'word', 'word_id', (SELECT id FROM public.words WHERE text = '月' AND creator_id = test_profile_id LIMIT 1), 'text', '月', 'x', 190, 'y', 180, 'fontSize', 28),
          jsonb_build_object('type', 'word', 'word_id', (SELECT id FROM public.words WHERE text = '星' AND creator_id = test_profile_id LIMIT 1), 'text', '星', 'x', 250, 'y', 180, 'fontSize', 20)
        ),
        '思念在夜晚月星',
        '{"visibility": "shared", "theme": "emotion"}'::jsonb
      ),
      (
        '自由飞翔',
        '一首关于自由和梦想的诗歌',
        test_profile_id,
        jsonb_build_array(
          jsonb_build_object('type', 'word', 'word_id', (SELECT id FROM public.words WHERE text = '自由' AND creator_id = test_profile_id LIMIT 1), 'text', '自由', 'x', 100, 'y', 120, 'fontSize', 26),
          jsonb_build_object('type', 'word', 'word_id', (SELECT id FROM public.words WHERE text = '飞翔' AND creator_id = test_profile_id LIMIT 1), 'text', '飞翔', 'x', 200, 'y', 120, 'fontSize', 26),
          jsonb_build_object('type', 'text', 'text', '向', 'x', 150, 'y', 200, 'fontSize', 18),
          jsonb_build_object('type', 'word', 'word_id', (SELECT id FROM public.words WHERE text = '梦想' AND creator_id = test_profile_id LIMIT 1), 'text', '梦想', 'x', 180, 'y', 200, 'fontSize', 24),
          jsonb_build_object('type', 'word', 'word_id', (SELECT id FROM public.words WHERE text = '未来' AND creator_id = test_profile_id LIMIT 1), 'text', '未来', 'x', 250, 'y', 200, 'fontSize', 22)
        ),
        '自由飞翔向梦想未来',
        '{"visibility": "public", "theme": "ideal"}'::jsonb
      )
    RETURNING id
  )
  SELECT array_agg(id) INTO poetry_ids FROM inserted_poetry;

  -- Link poetry to collections
  INSERT INTO public.poetry_collections (poetry_id, collection_id)
  VALUES
    (poetry_ids[1], collection_ids[1]), -- 秋天的风 -> 自然诗集
    (poetry_ids[2], collection_ids[2]), -- 思念的夜晚 -> 情感词汇
    (poetry_ids[3], collection_ids[2]); -- 自由飞翔 -> 情感词汇

  RAISE NOTICE 'Seed data created successfully!';
  RAISE NOTICE 'Test user profile ID: %', test_profile_id;
  RAISE NOTICE 'Created % words, % collections, % poetry', array_length(word_ids, 1), array_length(collection_ids, 1), array_length(poetry_ids, 1);
END $$;

