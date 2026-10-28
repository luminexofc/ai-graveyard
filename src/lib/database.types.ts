export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  __InternalSupabase: { PostgrestVersion: "14.18" };
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          is_buried: boolean;
          buried_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          is_buried?: boolean;
          buried_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          is_buried?: boolean;
          buried_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      submissions: {
        Row: {
          id: string;
          category_id: string;
          title: string;
          source_url: string | null;
          platform: string | null;
          image_url: string | null;
          vote_score: number;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          title: string;
          source_url?: string | null;
          platform?: string | null;
          image_url?: string | null;
          vote_score?: number;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          title?: string;
          source_url?: string | null;
          platform?: string | null;
          image_url?: string | null;
          vote_score?: number;
          status?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "submissions_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      votes: {
        Row: {
          id: string;
          submission_id: string;
          voter_token: string;
          value: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          submission_id: string;
          voter_token: string;
          value: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          submission_id?: string;
          voter_token?: string;
          value?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "votes_submission_id_fkey";
            columns: ["submission_id"];
            isOneToOne: false;
            referencedRelation: "submissions";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};