export type EpisodeInfo = {
  episode_number: number;
  name: string;
  runtime: number | null;
};

export type SeasonInfo = {
  season_number: number;
  name: string;
  episode_count: number;
  air_date: string | null;
  episodes?: EpisodeInfo[];
};

export type WatchProvider = {
  provider_id: number;
  provider_name: string;
  logo_path: string;
};

export type WatchProviderRegion = Record<
  string,
  { flatrate?: WatchProvider[]; buy?: WatchProvider[]; rent?: WatchProvider[] }
>;

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          avatar_url: string | null;
          rating_labels: string[] | null;
          homepage_widgets: Record<string, unknown>[] | null;
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          avatar_url?: string | null;
          rating_labels?: string[] | null;
          homepage_widgets?: Record<string, unknown>[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          avatar_url?: string | null;
          rating_labels?: string[] | null;
          homepage_widgets?: Record<string, unknown>[] | null;
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
          visible_to_followers: boolean;
          visible_to_following: boolean;
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
          visible_to_followers?: boolean;
          visible_to_following?: boolean;
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          is_public?: boolean;
          visible_to_followers?: boolean;
          visible_to_following?: boolean;
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
          episodes_fetched: boolean;
          seasons_data: SeasonInfo[] | null;
          trailer_url: string | null;
          watch_providers: WatchProviderRegion | null;
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
          episodes_fetched?: boolean;
          seasons_data?: SeasonInfo[] | null;
          trailer_url?: string | null;
          watch_providers?: WatchProviderRegion | null;
        };
        Update: {
          tmdb_id?: number | null;
          imdb_id?: string | null;
          title?: string;
          poster_path?: string | null;
          first_air_date?: string | null;
          overview?: string | null;
          tmdb_fetched?: boolean;
          episodes_fetched?: boolean;
          seasons_data?: SeasonInfo[] | null;
          trailer_url?: string | null;
          watch_providers?: WatchProviderRegion | null;
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
      follows: {
        Row: {
          id: string;
          follower_id: string;
          following_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          follower_id: string;
          following_id: string;
          created_at?: string;
        };
        Update: Record<string, never>;
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
      notifications: {
        Row: {
          id: string;
          user_id: string;
          actor_id: string;
          type: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          actor_id: string;
          type?: string;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          read?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notifications_actor_id_fkey";
            columns: ["actor_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      movies: {
        Row: {
          id: string;
          tmdb_id: number | null;
          imdb_id: string | null;
          title: string;
          poster_path: string | null;
          release_date: string | null;
          overview: string | null;
          runtime: number | null;
          tmdb_fetched: boolean;
          trailer_url: string | null;
          watch_providers: WatchProviderRegion | null;
        };
        Insert: {
          id?: string;
          tmdb_id?: number | null;
          imdb_id?: string | null;
          title: string;
          poster_path?: string | null;
          release_date?: string | null;
          overview?: string | null;
          runtime?: number | null;
          tmdb_fetched?: boolean;
          trailer_url?: string | null;
          watch_providers?: WatchProviderRegion | null;
        };
        Update: {
          tmdb_id?: number | null;
          imdb_id?: string | null;
          title?: string;
          poster_path?: string | null;
          release_date?: string | null;
          overview?: string | null;
          runtime?: number | null;
          tmdb_fetched?: boolean;
          trailer_url?: string | null;
          watch_providers?: WatchProviderRegion | null;
        };
        Relationships: [];
      };
      movie_lists: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name?: string;
          description?: string | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          is_public?: boolean;
          updated_at?: string;
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
      movie_list_items: {
        Row: {
          id: string;
          movie_list_id: string;
          movie_id: string;
          rating: number | null;
          position: number;
          added_at: string;
          notes: string | null;
        };
        Insert: {
          id?: string;
          movie_list_id: string;
          movie_id: string;
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
            foreignKeyName: "movie_list_items_movie_list_id_fkey";
            columns: ["movie_list_id"];
            isOneToOne: false;
            referencedRelation: "movie_lists";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "movie_list_items_movie_id_fkey";
            columns: ["movie_id"];
            isOneToOne: false;
            referencedRelation: "movies";
            referencedColumns: ["id"];
          },
        ];
      };
      animes: {
        Row: {
          id: string;
          tmdb_id: number | null;
          mal_id: number | null;
          imdb_id: string | null;
          title: string;
          poster_path: string | null;
          first_air_date: string | null;
          overview: string | null;
          episode_count: number | null;
          status: string | null;
          tmdb_fetched: boolean;
          trailer_url: string | null;
          watch_providers: WatchProviderRegion | null;
        };
        Insert: {
          id?: string;
          tmdb_id?: number | null;
          mal_id?: number | null;
          imdb_id?: string | null;
          title: string;
          poster_path?: string | null;
          first_air_date?: string | null;
          overview?: string | null;
          episode_count?: number | null;
          status?: string | null;
          tmdb_fetched?: boolean;
          trailer_url?: string | null;
          watch_providers?: WatchProviderRegion | null;
        };
        Update: {
          tmdb_id?: number | null;
          mal_id?: number | null;
          imdb_id?: string | null;
          title?: string;
          poster_path?: string | null;
          first_air_date?: string | null;
          overview?: string | null;
          episode_count?: number | null;
          status?: string | null;
          tmdb_fetched?: boolean;
          trailer_url?: string | null;
          watch_providers?: WatchProviderRegion | null;
        };
        Relationships: [];
      };
      anime_lists: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name?: string;
          description?: string | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          is_public?: boolean;
          updated_at?: string;
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
      anime_list_items: {
        Row: {
          id: string;
          anime_list_id: string;
          anime_id: string;
          rating: number | null;
          position: number;
          added_at: string;
          notes: string | null;
        };
        Insert: {
          id?: string;
          anime_list_id: string;
          anime_id: string;
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
            foreignKeyName: "anime_list_items_anime_list_id_fkey";
            columns: ["anime_list_id"];
            isOneToOne: false;
            referencedRelation: "anime_lists";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "anime_list_items_anime_id_fkey";
            columns: ["anime_id"];
            isOneToOne: false;
            referencedRelation: "animes";
            referencedColumns: ["id"];
          },
        ];
      };
      games: {
        Row: {
          id: string;
          igdb_id: number | null;
          title: string;
          cover_url: string | null;
          first_release_date: string | null;
          overview: string | null;
          platforms: { id: number; name: string }[] | null;
          genres: { id: number; name: string }[] | null;
          igdb_fetched: boolean;
          url: string | null;
        };
        Insert: {
          id?: string;
          igdb_id?: number | null;
          title: string;
          cover_url?: string | null;
          first_release_date?: string | null;
          overview?: string | null;
          platforms?: { id: number; name: string }[] | null;
          genres?: { id: number; name: string }[] | null;
          igdb_fetched?: boolean;
          url?: string | null;
        };
        Update: {
          igdb_id?: number | null;
          title?: string;
          cover_url?: string | null;
          first_release_date?: string | null;
          overview?: string | null;
          platforms?: { id: number; name: string }[] | null;
          genres?: { id: number; name: string }[] | null;
          igdb_fetched?: boolean;
          url?: string | null;
        };
        Relationships: [];
      };
      game_lists: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name?: string;
          description?: string | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          is_public?: boolean;
          updated_at?: string;
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
      game_list_items: {
        Row: {
          id: string;
          game_list_id: string;
          game_id: string;
          rating: number | null;
          position: number;
          added_at: string;
          notes: string | null;
        };
        Insert: {
          id?: string;
          game_list_id: string;
          game_id: string;
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
            foreignKeyName: "game_list_items_game_list_id_fkey";
            columns: ["game_list_id"];
            isOneToOne: false;
            referencedRelation: "game_lists";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "game_list_items_game_id_fkey";
            columns: ["game_id"];
            isOneToOne: false;
            referencedRelation: "games";
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
export type Follow = Database["public"]["Tables"]["follows"]["Row"];
export type Notification = Database["public"]["Tables"]["notifications"]["Row"];
export type Movie = Database["public"]["Tables"]["movies"]["Row"];
export type MovieList = Database["public"]["Tables"]["movie_lists"]["Row"];
export type MovieListItem =
  Database["public"]["Tables"]["movie_list_items"]["Row"];
export type Anime = Database["public"]["Tables"]["animes"]["Row"];
export type AnimeList = Database["public"]["Tables"]["anime_lists"]["Row"];
export type AnimeListItem =
  Database["public"]["Tables"]["anime_list_items"]["Row"];
export type Game = Database["public"]["Tables"]["games"]["Row"];
export type GameList = Database["public"]["Tables"]["game_lists"]["Row"];
export type GameListItem =
  Database["public"]["Tables"]["game_list_items"]["Row"];

export type ListWithItems = List & {
  list_items: (ListItem & { shows: Show })[];
};
