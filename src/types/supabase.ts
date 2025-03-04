export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      notes: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          content: string
          tags: string[] | null
          user_id: string
          is_favorite: boolean
          color: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          content: string
          tags?: string[] | null
          user_id: string
          is_favorite?: boolean
          color?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          content?: string
          tags?: string[] | null
          user_id?: string
          is_favorite?: boolean
          color?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          username: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          created_at?: string
          username?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          username?: string | null
          avatar_url?: string | null
        }
      }
    }
  }
}