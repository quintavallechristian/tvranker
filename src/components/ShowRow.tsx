"use client";

import Image from "next/image";
import { getPosterUrl } from "@/lib/tmdb/client";
import { DotsSixVertical, Trash, Television, PlusCircle } from "@phosphor-icons/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RatingBar } from "./ShowCard";
import { Link } from "@/i18n/navigation";
import { getRatingLabel } from "@/lib/rating-labels";
import { TagPicker } from "./TagPicker";
import type { TagRow } from "@/app/[locale]/(app)/tags/actions";
import { tagBadgeStyle, tagDotColor } from "@/lib/tag-colors";

type ShowRowProps = {
  id: string;
  title: string;
  posterPath: string | null;
  rating: number | null;
  position: number;
  onRatingChange?: (rating: number) => void;
  onRemove?: () => void;
  readOnly?: boolean;
  showId?: string;
  ratingLabels?: string[] | null;
  // Tags
  allTags?: TagRow[];
  selectedTagIds?: string[];
  onTagAdd?: (tagId: string) => void;
  onTagRemove?: (tagId: string) => void;
  onTagCreate?: (name: string, color: string) => Promise<TagRow>;
  // Quick-add to own list (when viewing others' lists)
  onQuickAdd?: () => void;
  quickAddLabel?: string;
};

export function ShowRow({
  id,
  title,
  posterPath,
  rating,
  position,
  onRatingChange,
  onRemove,
  readOnly = false,
  showId,
  ratingLabels,
  allTags,
  selectedTagIds,
  onTagAdd,
  onTagRemove,
  onTagCreate,
  onQuickAdd,
  quickAddLabel,
}: ShowRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: readOnly });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const posterUrl = getPosterUrl(posterPath, "w92");

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 rounded-[var(--radius-md)] border border-border bg-bg-surface p-3 transition-colors hover:border-border-hover ${
        isDragging ? "opacity-50 shadow-lg" : ""
      }`}
    >
      {/* Drag handle */}
      {!readOnly && (
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab touch-none text-text-faint hover:text-text-muted active:cursor-grabbing"
          aria-label="Drag to reorder"
        >
          <DotsSixVertical size={20} weight="bold" />
        </button>
      )}

      {/* Position */}
      <span className="w-6 text-center font-mono text-xs font-bold text-text-muted tabular-nums">
        {position}
      </span>

      {/* Poster */}
      <div className="relative h-12 w-8 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-bg-elevated">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="32px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Television size={14} className="text-text-faint" />
          </div>
        )}
      </div>

      {/* Title + Tags */}
      <div className="min-w-0 flex-1">
        {showId ? (
          <Link
            href={`/shows/${showId}`}
            className="block truncate text-sm font-medium text-text-primary hover:text-accent transition-colors"
          >
            {title}
          </Link>
        ) : (
          <span className="block truncate text-sm font-medium text-text-primary">
            {title}
          </span>
        )}
        {/* Tags */}
        {allTags && onTagAdd && onTagRemove && onTagCreate ? (
          <div className="mt-1">
            <TagPicker
              showId={showId ?? id}
              allTags={allTags}
              selectedTagIds={selectedTagIds ?? []}
              onAdd={onTagAdd}
              onRemove={onTagRemove}
              onCreateTag={onTagCreate}
            />
          </div>
        ) : selectedTagIds && selectedTagIds.length > 0 && allTags ? (
          /* Read-only tag badges */
          <div className="mt-1 flex flex-wrap gap-1">
            {allTags
              .filter((t) => selectedTagIds.includes(t.id))
              .map((tag) => (
                <span
                  key={tag.id}
                  style={tagBadgeStyle(tag.color)}
                  className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium"
                >
                  <span
                    className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: tagDotColor(tag.color) }}
                  />
                  {tag.name}
                </span>
              ))}
          </div>
        ) : null}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        {onRatingChange ? (
          <RatingBar
            value={rating}
            onChange={onRatingChange}
            labels={ratingLabels}
          />
        ) : rating ? (
          <span className="whitespace-nowrap font-mono text-xs tabular-nums text-accent">
            {rating} · {getRatingLabel(rating, ratingLabels)}
          </span>
        ) : (
          <span className="text-xs text-text-faint">—</span>
        )}
      </div>

      {/* Quick-add to own list */}
      {onQuickAdd && (
        <button
          onClick={onQuickAdd}
          className="rounded-[var(--radius-sm)] p-1.5 text-accent transition-colors hover:bg-accent/10 hover:text-accent-hover"
          aria-label={quickAddLabel || "Add to my list"}
          title={quickAddLabel || "Add to my list"}
        >
          <PlusCircle size={18} weight="bold" />
        </button>
      )}

      {/* Remove */}
      {onRemove && (
        <button
          onClick={onRemove}
          className="rounded-[var(--radius-sm)] p-1.5 text-text-faint transition-colors hover:bg-error/10 hover:text-error"
          aria-label="Remove from list"
        >
          <Trash size={16} />
        </button>
      )}
    </div>
  );
}
