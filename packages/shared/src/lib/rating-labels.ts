// Default rating label names (index 0 = rating 1, index 9 = rating 10)
export const DEFAULT_RATING_LABELS: string[] = [
  "Unwatchable", // 1
  "Terrible", // 2
  "Bad", // 3
  "Poor", // 4
  "Average", // 5
  "Fine", // 6
  "Good", // 7
  "Great", // 8
  "Excellent", // 9
  "Masterpiece", // 10
];

export function getRatingLabel(
  rating: number,
  labels?: string[] | null,
): string {
  const l = labels && labels.length === 10 ? labels : DEFAULT_RATING_LABELS;
  return l[rating - 1] ?? DEFAULT_RATING_LABELS[rating - 1];
}
