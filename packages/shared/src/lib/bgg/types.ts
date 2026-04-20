// BoardGameGeek API types

export type BGGSearchResult = {
  id: number;
  name: string;
  yearPublished?: number;
  type: string; // "boardgame" | "boardgameexpansion" etc.
};

export type BGGThingItem = {
  id: number;
  name: string;
  description?: string;
  thumbnail?: string;
  image?: string;
  yearPublished?: number;
  minPlayers?: number;
  maxPlayers?: number;
  playingTime?: number;
  minPlaytime?: number;
  maxPlaytime?: number;
  minAge?: number;
  categories?: { id: number; name: string }[];
  mechanics?: { id: number; name: string }[];
  designers?: { id: number; name: string }[];
  averageRating?: number;
  averageWeight?: number;
};

export type BGGCollectionItem = {
  bggId: number;
  name: string;
  yearPublished?: number;
  thumbnail?: string;
  image?: string;
  userRating?: number; // 1-10 (N/A if not rated)
  bggRating?: number;
  numPlays?: number;
  owned: boolean;
};
