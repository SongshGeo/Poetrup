# Chinese Tokenization Edge Function

This Edge Function provides Chinese text tokenization for the poetry app.

## Usage

```bash
# Deploy the function
supabase functions deploy tokenize-chinese

# Test locally
supabase functions serve tokenize-chinese
```

## API

### POST /tokenize-chinese

Tokenizes Chinese text and returns normalized tokens.

**Request:**
```json
{
  "text": "秋天的风",
  "language": "zh"
}
```

**Response:**
```json
{
  "tokens": ["秋天", "风"],
  "normalized": "秋天 风",
  "original": "秋天的风"
}
```

## Implementation Notes

- Currently uses a simple character-based tokenization algorithm
- For production, consider:
  1. Using a proper Chinese tokenization library (e.g., jieba via external API)
  2. Integrating with cloud NLP services (Baidu, Tencent Cloud, Alibaba Cloud)
  3. Using a dedicated tokenization microservice

## Python Alternative (for reference)

If you prefer Python for tokenization, you can create a separate service:

```python
import jieba
import jieba.analyse

def tokenize_chinese(text: str):
    # Use jieba for tokenization
    tokens = jieba.cut_for_search(text)
    tokens = [w for w in tokens if w.strip() and len(w.strip()) > 0]
    normalized = ' '.join(tokens)
    return {
        'tokens': list(tokens),
        'normalized': normalized,
        'original': text
    }
```

You can deploy this as a separate service (e.g., on Cloud Run, AWS Lambda) and call it from the Edge Function.

