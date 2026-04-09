const RECENT_LISTS_KEY = "recent_lists";
const MAX_RECENT = 3;

export type RecentListTopic = "show" | "anime" | "movie" | "game";

export type RecentList = {
  id: string;
  topic: RecentListTopic;
  href: string;
};

export function getRecentLists(): RecentList[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_LISTS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function addRecentList(list: RecentList): void {
  if (typeof window === "undefined") return;
  const existing = getRecentLists().filter((r) => r.id !== list.id);
  const next = [list, ...existing].slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_LISTS_KEY, JSON.stringify(next));
}
