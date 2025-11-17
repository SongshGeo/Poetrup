// Edge Function for Chinese text tokenization
// This function tokenizes Chinese text and returns normalized tokens
// For production, you may want to use a more sophisticated tokenization service

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface TokenizeRequest {
  text: string;
  language?: string;
}

interface TokenizeResponse {
  tokens: string[];
  normalized: string;
  original: string;
}

// Simple Chinese tokenization using basic rules
// For production, consider using a proper tokenization service or library
function simpleTokenize(text: string): string[] {
  // Remove punctuation and whitespace
  const cleaned = text.replace(/[，。！？、；：""''（）【】《》\s]+/g, "");
  
  // For MVP: simple character-based tokenization
  // Split into individual characters and filter empty
  const chars = cleaned.split("").filter((c) => c.trim() !== "");
  
  // Group consecutive characters (you can improve this with word dictionary)
  const tokens: string[] = [];
  let currentToken = "";
  
  for (const char of chars) {
    // If character is a common word boundary, push current token
    if (currentToken.length > 0 && Math.random() > 0.7) {
      // Simple heuristic: occasionally break into 2-3 char tokens
      if (currentToken.length >= 2) {
        tokens.push(currentToken);
        currentToken = char;
      } else {
        currentToken += char;
      }
    } else {
      currentToken += char;
    }
  }
  
  if (currentToken.length > 0) {
    tokens.push(currentToken);
  }
  
  // Fallback: if no tokens, return single characters
  return tokens.length > 0 ? tokens : chars;
}

// Alternative: Use external tokenization API (e.g., Baidu, Tencent Cloud)
async function tokenizeWithAPI(text: string): Promise<string[]> {
  // Example: Call an external tokenization service
  // Replace with your actual API endpoint
  try {
    const response = await fetch("https://api.example.com/tokenize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.tokens || [];
    }
  } catch (error) {
    console.error("Tokenization API error:", error);
  }
  
  // Fallback to simple tokenization
  return simpleTokenize(text);
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse request body
    const { text, language = "zh" }: TokenizeRequest = await req.json();

    if (!text || typeof text !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid 'text' field" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Tokenize text
    let tokens: string[];
    
    // For MVP, use simple tokenization
    // For production, switch to tokenizeWithAPI() or a proper library
    tokens = simpleTokenize(text);
    
    // Remove stop words (optional, add your stop words list)
    const stopWords = ["的", "了", "在", "是", "我", "有", "和", "就", "不", "人", "都", "一", "一个", "上", "也", "很", "到", "说", "要", "去", "你", "会", "着", "没有", "看", "好", "自己", "这"];
    tokens = tokens.filter((token) => !stopWords.includes(token));

    // Generate normalized string (space-separated tokens)
    const normalized = tokens.join(" ");

    const response: TokenizeResponse = {
      tokens,
      normalized,
      original: text,
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

