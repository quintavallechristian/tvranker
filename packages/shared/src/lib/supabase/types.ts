export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1";
  };
  public: {
    Tables: {
      anime_list_items: {
        Row: {
          added_at: string;
          anime_id: string;
          anime_list_id: string;
          id: string;
          notes: string | null;
          position: number;
          rating: number | null;
        };
        Insert: {
          added_at?: string;
          anime_id: string;
          anime_list_id: string;
          id?: string;
          notes?: string | null;
          position?: number;
          rating?: number | null;
        };
        Update: {
          added_at?: string;
          anime_id?: string;
          anime_list_id?: string;
          id?: string;
          notes?: string | null;
          position?: number;
          rating?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "anime_list_items_anime_id_fkey";
            columns: ["anime_id"];
            isOneToOne: false;
            referencedRelation: "animes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "anime_list_items_anime_list_id_fkey";
            columns: ["anime_list_id"];
            isOneToOne: false;
            referencedRelation: "anime_lists";
            referencedColumns: ["id"];
          },
        ];
      };
      anime_lists: {
        Row: {
          created_at: string;
          custom_visibility: boolean;
          description: string | null;
          id: string;
          is_public: boolean;
          name: string;
          rating_labels: Json | null;
          updated_at: string;
          user_id: string;
          visible_to_followers: boolean;
          visible_to_following: boolean;
        };
        Insert: {
          created_at?: string;
          custom_visibility?: boolean;
          description?: string | null;
          id?: string;
          is_public?: boolean;
          name?: string;
          rating_labels?: Json | null;
          updated_at?: string;
          user_id: string;
          visible_to_followers?: boolean;
          visible_to_following?: boolean;
        };
        Update: {
          created_at?: string;
          custom_visibility?: boolean;
          description?: string | null;
          id?: string;
          is_public?: boolean;
          name?: string;
          rating_labels?: Json | null;
          updated_at?: string;
          user_id?: string;
          visible_to_followers?: boolean;
          visible_to_following?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "anime_lists_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      animes: {
        Row: {
          episode_count: number | null;
          first_air_date: string | null;
          id: string;
          imdb_id: string | null;
          mal_id: number | null;
          overview: string | null;
          poster_path: string | null;
          status: string | null;
          title: string;
          tmdb_fetched: boolean;
          tmdb_id: number | null;
          trailer_url: string | null;
          watch_providers: Json | null;
        };
        Insert: {
          episode_count?: number | null;
          first_air_date?: string | null;
          id?: string;
          imdb_id?: string | null;
          mal_id?: number | null;
          overview?: string | null;
          poster_path?: string | null;
          status?: string | null;
          title: string;
          tmdb_fetched?: boolean;
          tmdb_id?: number | null;
          trailer_url?: string | null;
          watch_providers?: Json | null;
        };
        Update: {
          episode_count?: number | null;
          first_air_date?: string | null;
          id?: string;
          imdb_id?: string | null;
          mal_id?: number | null;
          overview?: string | null;
          poster_path?: string | null;
          status?: string | null;
          title?: string;
          tmdb_fetched?: boolean;
          tmdb_id?: number | null;
          trailer_url?: string | null;
          watch_providers?: Json | null;
        };
        Relationships: [];
      };
      feed_events: {
        Row: {
          content_type: string;
          created_at: string;
          event_date: string;
          event_type: string;
          id: string;
          item_id: string;
          item_title: string;
          list_id: string;
          poster_path: string | null;
          rating: number | null;
          user_id: string;
        };
        Insert: {
          content_type: string;
          created_at?: string;
          event_date?: string;
          event_type: string;
          id?: string;
          item_id: string;
          item_title?: string;
          list_id: string;
          poster_path?: string | null;
          rating?: number | null;
          user_id: string;
        };
        Update: {
          content_type?: string;
          created_at?: string;
          event_date?: string;
          event_type?: string;
          id?: string;
          item_id?: string;
          item_title?: string;
          list_id?: string;
          poster_path?: string | null;
          rating?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "feed_events_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      follows: {
        Row: {
          created_at: string;
          follower_id: string;
          following_id: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          follower_id: string;
          following_id: string;
          id?: string;
        };
        Update: {
          created_at?: string;
          follower_id?: string;
          following_id?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_fkey";
            columns: ["follower_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "follows_following_id_fkey";
            columns: ["following_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      game_list_items: {
        Row: {
          added_at: string;
          game_id: string;
          game_list_id: string;
          id: string;
          notes: string | null;
          position: number;
          rating: number | null;
        };
        Insert: {
          added_at?: string;
          game_id: string;
          game_list_id: string;
          id?: string;
          notes?: string | null;
          position?: number;
          rating?: number | null;
        };
        Update: {
          added_at?: string;
          game_id?: string;
          game_list_id?: string;
          id?: string;
          notes?: string | null;
          position?: number;
          rating?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "game_list_items_game_id_fkey";
            columns: ["game_id"];
            isOneToOne: false;
            referencedRelation: "games";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "game_list_items_game_list_id_fkey";
            columns: ["game_list_id"];
            isOneToOne: false;
            referencedRelation: "game_lists";
            referencedColumns: ["id"];
          },
        ];
      };
      game_lists: {
        Row: {
          created_at: string;
          custom_visibility: boolean;
          description: string | null;
          id: string;
          is_public: boolean;
          name: string;
          rating_labels: Json | null;
          updated_at: string;
          user_id: string;
          visible_to_followers: boolean;
          visible_to_following: boolean;
        };
        Insert: {
          created_at?: string;
          custom_visibility?: boolean;
          description?: string | null;
          id?: string;
          is_public?: boolean;
          name?: string;
          rating_labels?: Json | null;
          updated_at?: string;
          user_id: string;
          visible_to_followers?: boolean;
          visible_to_following?: boolean;
        };
        Update: {
          created_at?: string;
          custom_visibility?: boolean;
          description?: string | null;
          id?: string;
          is_public?: boolean;
          name?: string;
          rating_labels?: Json | null;
          updated_at?: string;
          user_id?: string;
          visible_to_followers?: boolean;
          visible_to_following?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "game_lists_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      games: {
        Row: {
          cover_url: string | null;
          first_release_date: string | null;
          genres: Json | null;
          id: string;
          igdb_fetched: boolean;
          igdb_id: number | null;
          overview: string | null;
          platforms: Json | null;
          title: string;
          url: string | null;
        };
        Insert: {
          cover_url?: string | null;
          first_release_date?: string | null;
          genres?: Json | null;
          id?: string;
          igdb_fetched?: boolean;
          igdb_id?: number | null;
          overview?: string | null;
          platforms?: Json | null;
          title: string;
          url?: string | null;
        };
        Update: {
          cover_url?: string | null;
          first_release_date?: string | null;
          genres?: Json | null;
          id?: string;
          igdb_fetched?: boolean;
          igdb_id?: number | null;
          overview?: string | null;
          platforms?: Json | null;
          title?: string;
          url?: string | null;
        };
        Relationships: [];
      };
      list_items: {
        Row: {
          added_at: string;
          id: string;
          list_id: string;
          notes: string | null;
          position: number;
          rating: number | null;
          show_id: string;
        };
        Insert: {
          added_at?: string;
          id?: string;
          list_id: string;
          notes?: string | null;
          position?: number;
          rating?: number | null;
          show_id: string;
        };
        Update: {
          added_at?: string;
          id?: string;
          list_id?: string;
          notes?: string | null;
          position?: number;
          rating?: number | null;
          show_id?: string;
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
      lists: {
        Row: {
          created_at: string;
          custom_visibility: boolean;
          description: string | null;
          id: string;
          is_public: boolean;
          name: string;
          position: number;
          rating_labels: Json | null;
          updated_at: string;
          user_id: string;
          visible_to_followers: boolean;
          visible_to_following: boolean;
        };
        Insert: {
          created_at?: string;
          custom_visibility?: boolean;
          description?: string | null;
          id?: string;
          is_public?: boolean;
          name: string;
          position?: number;
          rating_labels?: Json | null;
          updated_at?: string;
          user_id: string;
          visible_to_followers?: boolean;
          visible_to_following?: boolean;
        };
        Update: {
          created_at?: string;
          custom_visibility?: boolean;
          description?: string | null;
          id?: string;
          is_public?: boolean;
          name?: string;
          position?: number;
          rating_labels?: Json | null;
          updated_at?: string;
          user_id?: string;
          visible_to_followers?: boolean;
          visible_to_following?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "lists_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      movie_list_items: {
        Row: {
          added_at: string;
          id: string;
          movie_id: string;
          movie_list_id: string;
          notes: string | null;
          position: number;
          rating: number | null;
        };
        Insert: {
          added_at?: string;
          id?: string;
          movie_id: string;
          movie_list_id: string;
          notes?: string | null;
          position?: number;
          rating?: number | null;
        };
        Update: {
          added_at?: string;
          id?: string;
          movie_id?: string;
          movie_list_id?: string;
          notes?: string | null;
          position?: number;
          rating?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "movie_list_items_movie_id_fkey";
            columns: ["movie_id"];
            isOneToOne: false;
            referencedRelation: "movies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "movie_list_items_movie_list_id_fkey";
            columns: ["movie_list_id"];
            isOneToOne: false;
            referencedRelation: "movie_lists";
            referencedColumns: ["id"];
          },
        ];
      };
      movie_lists: {
        Row: {
          created_at: string;
          custom_visibility: boolean;
          description: string | null;
          id: string;
          is_public: boolean;
          name: string;
          rating_labels: Json | null;
          updated_at: string;
          user_id: string;
          visible_to_followers: boolean;
          visible_to_following: boolean;
        };
        Insert: {
          created_at?: string;
          custom_visibility?: boolean;
          description?: string | null;
          id?: string;
          is_public?: boolean;
          name?: string;
          rating_labels?: Json | null;
          updated_at?: string;
          user_id: string;
          visible_to_followers?: boolean;
          visible_to_following?: boolean;
        };
        Update: {
          created_at?: string;
          custom_visibility?: boolean;
          description?: string | null;
          id?: string;
          is_public?: boolean;
          name?: string;
          rating_labels?: Json | null;
          updated_at?: string;
          user_id?: string;
          visible_to_followers?: boolean;
          visible_to_following?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "movie_lists_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      movies: {
        Row: {
          id: string;
          imdb_id: string | null;
          overview: string | null;
          poster_path: string | null;
          release_date: string | null;
          runtime: number | null;
          title: string;
          tmdb_fetched: boolean;
          tmdb_id: number | null;
          trailer_url: string | null;
          watch_providers: Json | null;
        };
        Insert: {
          id?: string;
          imdb_id?: string | null;
          overview?: string | null;
          poster_path?: string | null;
          release_date?: string | null;
          runtime?: number | null;
          title: string;
          tmdb_fetched?: boolean;
          tmdb_id?: number | null;
          trailer_url?: string | null;
          watch_providers?: Json | null;
        };
        Update: {
          id?: string;
          imdb_id?: string | null;
          overview?: string | null;
          poster_path?: string | null;
          release_date?: string | null;
          runtime?: number | null;
          title?: string;
          tmdb_fetched?: boolean;
          tmdb_id?: number | null;
          trailer_url?: string | null;
          watch_providers?: Json | null;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          actor_id: string;
          created_at: string;
          id: string;
          read: boolean;
          type: string;
          user_id: string;
        };
        Insert: {
          actor_id: string;
          created_at?: string;
          id?: string;
          read?: boolean;
          type?: string;
          user_id: string;
        };
        Update: {
          actor_id?: string;
          created_at?: string;
          id?: string;
          read?: boolean;
          type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_actor_id_fkey";
            columns: ["actor_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notifications_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          default_is_public: boolean;
          default_visible_to_followers: boolean;
          default_visible_to_following: boolean;
          homepage_widgets: Json | null;
          id: string;
          rating_labels: Json | null;
          username: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          default_is_public?: boolean;
          default_visible_to_followers?: boolean;
          default_visible_to_following?: boolean;
          homepage_widgets?: Json | null;
          id: string;
          rating_labels?: Json | null;
          username: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          default_is_public?: boolean;
          default_visible_to_followers?: boolean;
          default_visible_to_following?: boolean;
          homepage_widgets?: Json | null;
          id?: string;
          rating_labels?: Json | null;
          username?: string;
        };
        Relationships: [];
      };
      show_tags: {
        Row: {
          created_at: string;
          id: string;
          show_id: string;
          tag_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          show_id: string;
          tag_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          show_id?: string;
          tag_id?: string;
          user_id?: string;
        };
        Relationships: [
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
          {
            foreignKeyName: "show_tags_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      shows: {
        Row: {
          episodes_fetched: boolean;
          first_air_date: string | null;
          id: string;
          imdb_id: string | null;
          overview: string | null;
          poster_path: string | null;
          seasons_data: Json | null;
          title: string;
          tmdb_fetched: boolean;
          tmdb_id: number | null;
          trailer_url: string | null;
          watch_providers: Json | null;
        };
        Insert: {
          episodes_fetched?: boolean;
          first_air_date?: string | null;
          id?: string;
          imdb_id?: string | null;
          overview?: string | null;
          poster_path?: string | null;
          seasons_data?: Json | null;
          title: string;
          tmdb_fetched?: boolean;
          tmdb_id?: number | null;
          trailer_url?: string | null;
          watch_providers?: Json | null;
        };
        Update: {
          episodes_fetched?: boolean;
          first_air_date?: string | null;
          id?: string;
          imdb_id?: string | null;
          overview?: string | null;
          poster_path?: string | null;
          seasons_data?: Json | null;
          title?: string;
          tmdb_fetched?: boolean;
          tmdb_id?: number | null;
          trailer_url?: string | null;
          watch_providers?: Json | null;
        };
        Relationships: [];
      };
      tags: {
        Row: {
          color: string;
          created_at: string;
          id: string;
          is_default: boolean;
          name: string;
          user_id: string | null;
        };
        Insert: {
          color?: string;
          created_at?: string;
          id?: string;
          is_default?: boolean;
          name: string;
          user_id?: string | null;
        };
        Update: {
          color?: string;
          created_at?: string;
          id?: string;
          is_default?: boolean;
          name?: string;
          user_id?: string | null;
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
