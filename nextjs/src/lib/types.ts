export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      collection_words: {
        Row: {
          collection_id: string
          created_at: string
          id: string
          notes: string | null
          position: number | null
          word_id: string
        }
        Insert: {
          collection_id: string
          created_at?: string
          id?: string
          notes?: string | null
          position?: number | null
          word_id: string
        }
        Update: {
          collection_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          position?: number | null
          word_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_words_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_words_word_id_fkey"
            columns: ["word_id"]
            isOneToOne: false
            referencedRelation: "words"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          cover_url: string | null
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          owner_id: string
          tags: string[] | null
          title: string
          updated_at: string
          visibility: string
          word_count: number | null
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          owner_id: string
          tags?: string[] | null
          title: string
          updated_at?: string
          visibility?: string
          word_count?: number | null
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          owner_id?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          visibility?: string
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "collections_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          collection_id: string | null
          created_at: string
          id: string
          poetry_id: string | null
          profile_id: string
        }
        Insert: {
          collection_id?: string | null
          created_at?: string
          id?: string
          poetry_id?: string | null
          profile_id: string
        }
        Update: {
          collection_id?: string | null
          created_at?: string
          id?: string
          poetry_id?: string | null
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_poetry_id_fkey"
            columns: ["poetry_id"]
            isOneToOne: false
            referencedRelation: "poetry"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      poetry: {
        Row: {
          content: Json
          cover_url: string | null
          created_at: string
          creator_id: string
          deleted_at: string | null
          description: string | null
          favorite_count: number | null
          id: string
          metadata: Json | null
          text_content: string | null
          title: string
          tsv: unknown
          updated_at: string
          view_count: number | null
        }
        Insert: {
          content?: Json
          cover_url?: string | null
          created_at?: string
          creator_id: string
          deleted_at?: string | null
          description?: string | null
          favorite_count?: number | null
          id?: string
          metadata?: Json | null
          text_content?: string | null
          title: string
          tsv?: unknown
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          content?: Json
          cover_url?: string | null
          created_at?: string
          creator_id?: string
          deleted_at?: string | null
          description?: string | null
          favorite_count?: number | null
          id?: string
          metadata?: Json | null
          text_content?: string | null
          title?: string
          tsv?: unknown
          updated_at?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "poetry_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      poetry_collections: {
        Row: {
          collection_id: string
          created_at: string
          id: string
          poetry_id: string
        }
        Insert: {
          collection_id: string
          created_at?: string
          id?: string
          poetry_id: string
        }
        Update: {
          collection_id?: string
          created_at?: string
          id?: string
          poetry_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "poetry_collections_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "poetry_collections_poetry_id_fkey"
            columns: ["poetry_id"]
            isOneToOne: false
            referencedRelation: "poetry"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          auth_uid: string
          avatar_url: string | null
          bio: string | null
          created_at: string
          deleted_at: string | null
          display_name: string | null
          id: string
          metadata: Json | null
          updated_at: string
          username: string | null
        }
        Insert: {
          auth_uid: string
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          deleted_at?: string | null
          display_name?: string | null
          id?: string
          metadata?: Json | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          auth_uid?: string
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          deleted_at?: string | null
          display_name?: string | null
          id?: string
          metadata?: Json | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      todo_list: {
        Row: {
          created_at: string
          description: string | null
          done: boolean
          done_at: string | null
          id: number
          owner: string
          title: string
          urgent: boolean
        }
        Insert: {
          created_at?: string
          description?: string | null
          done?: boolean
          done_at?: string | null
          id?: number
          owner: string
          title: string
          urgent?: boolean
        }
        Update: {
          created_at?: string
          description?: string | null
          done?: boolean
          done_at?: string | null
          id?: number
          owner?: string
          title?: string
          urgent?: boolean
        }
        Relationships: []
      }
      words: {
        Row: {
          created_at: string
          creator_id: string | null
          deleted_at: string | null
          id: string
          language: string | null
          metadata: Json | null
          normalized: string | null
          source: string | null
          tags: string[] | null
          text: string
          tokens: Json | null
          tsv: unknown
          updated_at: string
          usage_count: number | null
        }
        Insert: {
          created_at?: string
          creator_id?: string | null
          deleted_at?: string | null
          id?: string
          language?: string | null
          metadata?: Json | null
          normalized?: string | null
          source?: string | null
          tags?: string[] | null
          text: string
          tokens?: Json | null
          tsv?: unknown
          updated_at?: string
          usage_count?: number | null
        }
        Update: {
          created_at?: string
          creator_id?: string | null
          deleted_at?: string | null
          id?: string
          language?: string | null
          metadata?: Json | null
          normalized?: string | null
          source?: string | null
          tags?: string[] | null
          text?: string
          tokens?: Json | null
          tsv?: unknown
          updated_at?: string
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "words_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

