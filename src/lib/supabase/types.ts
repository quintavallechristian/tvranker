export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          avatar_url: string | null;
          rating_labels: string[] | null;
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          avatar_url?: string | null;
          rating_labels?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          avatar_url?: string | null;
          rating_labels?: string[] | null;
        };
        Relationships: [];
      };
      lists: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          is_public: boolean;
          position: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          is_public?: boolean;
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          is_public?: boolean;
          position?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lists_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      shows: {
        Row: {
          id: string;
          tmdb_id: number | null;
          imdb_id: string | null;
          title: string;
          poster_path: string | null;
          first_air_date: string | null;
          overview: string | null;
          tmdb_fetched: boolean;
        };
        Insert: {
          id?: string;
          tmdb_id?: number | null;
          imdb_id?: string | null;
          title: string;
          poster_path?: string | null;
          first_air_date?: string | null;
          overview?: string | null;
          tmdb_fetched?: boolean;
        };
        Update: {
          tmdb_id?: number | null;
          imdb_id?: string | null;
          title?: string;
          poster_path?: string | null;
          first_air_date?: string | null;
          overview?: string | null;
          tmdb_fetched?: boolean;
        };
        Relationships: [];
      };
      list_items: {
        Row: {
          id: string;
          list_id: string;
          show_id: string;
          rating: number | null;
          position: number;
          added_at: string;
          notes: string | null;
        };
        Insert: {
          id?: string;
          list_id: string;
          show_id: string;
          rating?: number | null;
          position?: number;
          added_at?: string;
          notes?: string | null;
        };
        Update: {
          rating?: number | null;
          position?: number;
          notes?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "list_items_list_id_fkey";
            columns: ["list_id"];
            isOneToOne: false;
            referencedRelation: "lists";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "list_items_show_id_fkey";
            columns: ["show_id"];
            isOneToOne: false;
            referencedRelation: "shows";
            referencedColumns: ["id"];
          },
        ];
      };
      tags: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          color: string;
          is_default: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          color?: string;
          is_default?: boolean;
          created_at?: string;
        };
        Update: {
          name?: string;
          color?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tags_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      show_tags: {
        Row: {
          id: string;
          user_id: string;
          show_id: string;
          tag_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          show_id: string;
          tag_id: string;
          created_at?: string;
        };
        Update: Record<string, never>;
        Relationships: [
          {
            foreignKeyName: "show_tags_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "show_tags_show_id_fkey";
            columns: ["show_id"];
            isOneToOne: false;
            referencedRelation: "shows";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "show_tags_tag_id_fkey";
            columns: ["tag_id"];
            isOneToOne: false;
            referencedRelation: "tags";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

// Convenience types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type List = Database["public"]["Tables"]["lists"]["Row"];
export type Show = Database["public"]["Tables"]["shows"]["Row"];
export type ListItem = Database["public"]["Tables"]["list_items"]["Row"];
export type Tag = Database["public"]["Tables"]["tags"]["Row"];
export type ShowTag = Database["public"]["Tables"]["show_tags"]["Row"];

export type ListWithItems = List & {
  list_items: (ListItem & { shows: Show })[];
};

export type ListWithCount = List & {
  item_count: number;
};
