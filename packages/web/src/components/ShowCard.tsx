"use client";

import Image from "next/image";
import { useState } from "react";
import { getPosterUrl } from "@/lib/tmdb/client";
import { Television } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { getRatingLabel } from "@/lib/rating-labels";

type ShowCardProps = {
  title: string;
  posterPath: string | null;
  rating?: number | null;
  position?: number;
  onRatingChange?: (rating: number) => void;
  compact?: boolean;
  showId?: string;
  ratingLabels?: string[] | null;
};

export function ShowCard({
  title,
  posterPath,
  rating,
  position,
  onRatingChange,
  compact = false,
  showId,
  ratingLabels,
}: ShowCardProps) {
  const posterUrl = getPosterUrl(posterPath, compact ? "w185" : "w342");

  return (
    <div className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-bg-surface transition-colors hover:border-border-hover">
      {/* Position badge */}
      {position !== undefined && (
        <div className="absolute top-2 left-2 z-10 flex h-6 w-6 items-center justify-center rounded-sm bg-bg-primary/80 text-xs font-mono font-bold text-text-primary tabular-nums backdrop-blur-sm">
          {position}
        </div>
      )}

      {/* Poster */}
      <div
        className={`relative w-full ${compact ? "aspect-[2/3]" : "aspect-[2/3]"} bg-bg-elevated`}
      >
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={title}
            fill
            className="object-cover"
            sizes={compact ? "120px" : "200px"}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Television size={32} className="text-text-faint" />
          </div>
        )}

        {/* Rating overlay on hover */}
        {onRatingChange && (
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
            <RatingBar
              value={rating ?? null}
              onChange={onRatingChange}
              labels={ratingLabels}
              className="w-full p-2"
            />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        {showId ? (
          <Link
            href={`/shows/${showId}`}
            className="truncate text-sm font-medium text-text-primary hover:text-accent transition-colors block"
          >
            {title}
          </Link>
        ) : (
          <p className="truncate text-sm font-medium text-text-primary">
            {title}
          </p>
        )}
        {rating && (
          <p className="mt-1 font-mono text-xs text-accent tabular-nums">
            {rating}/10
          </p>
        )}
      </div>
    </div>
  );
}

type RatingBarProps = {
  value: number | null;
  onChange: (rating: number) => void;
  className?: string;
  labels?: string[] | null;
  fullWidth?: boolean;
};

function RatingBar({
  value,
  onChange,
  className = "",
  labels,
  fullWidth = false,
}: RatingBarProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? value;
  const label = active ? getRatingLabel(active, labels) : null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {active && label && (
        <span className="hidden sm:inline whitespace-nowrap font-mono text-xs tabular-nums text-text-muted">
          {active} · {label}
        </span>
      )}
      <div
        className={
          fullWidth ? "grid grid-cols-10 w-full gap-1" : "flex gap-0.5 sm:gap-1"
        }
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={(e) => {
              e.stopPropagation();
              onChange(n);
            }}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(null)}
            className={`${fullWidth ? "w-full aspect-square" : "size-4 sm:size-3.5"} rounded-full transition-colors ${
              active && n <= active
                ? "bg-accent"
                : "bg-text-faint/30 hover:bg-accent/50"
            }`}
            aria-label={`Rate ${n}`}
          />
        ))}
      </div>
    </div>
  );
}

export { RatingBar };
