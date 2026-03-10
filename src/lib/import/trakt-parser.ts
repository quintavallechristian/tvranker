import { z } from "zod/v4";

// Format A: Trakt.tv list export { name, shows: [...] }
const TraktShowSchema = z.object({
  id: z
    .object({
      imdb: z.string().optional(),
      tvdb: z.number().optional(),
    })
    .optional(),
  title: z.string(),
  uuid: z.string().optional(),
  added_at: z.string().optional(),
});

const TraktListSchema = z.object({
  name: z.string(),
  description: z.string().optional().default(""),
  is_public: z.boolean().optional().default(false),
  movies: z.array(z.unknown()).optional().default([]),
  shows: z.array(TraktShowSchema),
});

// Format B: raw array of show objects (e.g. Serializd export)
// [ { uuid, id: { tvdb, imdb }, title, seasons, created_at, status } ]
const SerializdShowSchema = z.object({
  uuid: z.string().optional(),
  id: z
    .object({
      tvdb: z.number().optional(),
      imdb: z.string().optional(),
    })
    .optional(),
  title: z.string(),
  seasons: z.array(z.unknown()).optional(),
  created_at: z.string().optional(),
  status: z.string().optional(),
});

const SerializdArraySchema = z.array(SerializdShowSchema);

export type TraktShow = z.infer<typeof TraktShowSchema>;
export type TraktList = z.infer<typeof TraktListSchema>;

export type ParsedShow = {
  title: string;
  imdb_id: string | null;
};

export type ParseResult = {
  name: string;
  description: string;
  is_public: boolean;
  shows: ParsedShow[];
};

function normalizeImdb(value: string | undefined | null): string | null {
  if (!value || value === "-1" || value.trim() === "") return null;
  return value;
}

export function parseTraktJson(input: unknown): ParseResult {
  // Detect Format B: root is an array
  if (Array.isArray(input)) {
    const parsed = SerializdArraySchema.parse(input);
    return {
      name: "Imported Shows",
      description: "",
      is_public: false,
      shows: parsed.map((show) => ({
        title: show.title,
        imdb_id: normalizeImdb(show.id?.imdb),
      })),
    };
  }

  // Format A: Trakt list object
  const parsed = TraktListSchema.parse(input);
  return {
    name: parsed.name,
    description: parsed.description ?? "",
    is_public: parsed.is_public ?? false,
    shows: parsed.shows.map((show) => ({
      title: show.title,
      imdb_id: normalizeImdb(show.id?.imdb),
    })),
  };
}

export function validateTraktJson(input: unknown): {
  success: boolean;
  error?: string;
} {
  // Accept both formats
  if (Array.isArray(input)) {
    const result = SerializdArraySchema.safeParse(input);
    if (result.success) return { success: true };
    return { success: false, error: z.prettifyError(result.error) };
  }
  const result = TraktListSchema.safeParse(input);
  if (result.success) {
    return { success: true };
  }
  return {
    success: false,
    error: z.prettifyError(result.error),
  };
}
