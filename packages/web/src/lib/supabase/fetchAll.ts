const PAGE_SIZE = 1000;

/**
 * Fetches all rows from a Supabase query by paginating through results.
 * Needed because Supabase/PostgREST defaults to returning at most 1000 rows.
 *
 * Usage:
 *   const items = await fetchAllRows((from, to) =>
 *     supabase.from("list_items").select("*").eq("list_id", id).range(from, to)
 *   );
 */
export async function fetchAllRows<T>(
  fetch: (from: number, to: number) => PromiseLike<{ data: T[] | null }>,
): Promise<T[]> {
  const all: T[] = [];
  let from = 0;

  while (true) {
    const { data } = await fetch(from, from + PAGE_SIZE - 1);
    if (!data || data.length === 0) break;
    all.push(...data);
    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  return all;
}
