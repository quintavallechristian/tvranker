"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { getPosterUrl } from "@/lib/tmdb/client";
import {
  DotsSixVertical,
  Trash,
  Television,
  PlusCircle,
  NotePencil,
} from "@phosphor-icons/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RatingBar } from "./ShowCard";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
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
  detailHref?: string;
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
  // Notes
  notes?: string | null;
  onNotesChange?: (notes: string) => void;
  // Controlled mobile rating open (pass to ensure only one row is open at a time)
  openMobileRating?: boolean;
  onMobileRatingChange?: (open: boolean) => void;
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
  detailHref,
  ratingLabels,
  allTags,
  selectedTagIds,
  onTagAdd,
  onTagRemove,
  onTagCreate,
  onQuickAdd,
  quickAddLabel,
  notes,
  onNotesChange,
  openMobileRating,
  onMobileRatingChange,
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

  const [mobileRatingOpenLocal, setMobileRatingOpenLocal] = useState(false);
  const mobileRatingOpen =
    openMobileRating !== undefined ? openMobileRating : mobileRatingOpenLocal;
  const setMobileRatingOpen = (open: boolean) => {
    if (openMobileRating !== undefined) {
      onMobileRatingChange?.(open);
    } else {
      setMobileRatingOpenLocal(open);
    }
  };
  const [editingNote, setEditingNote] = useState(false);
  const [localNote, setLocalNote] = useState(notes ?? "");
  const noteInputRef = useRef<HTMLTextAreaElement>(null);
  const t = useTranslations("shows");

  const handleNoteBlur = () => {
    setEditingNote(false);
    if (onNotesChange) {
      onNotesChange(localNote);
    }
  };

  const handleNoteKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Escape") {
      setLocalNote(notes ?? "");
      setEditingNote(false);
    }
  };

  const posterUrl = getPosterUrl(posterPath, "w92");

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group rounded-md border border-border bg-bg-surface p-2.5 md:p-3 transition-colors hover:border-border-hover ${
        isDragging ? "opacity-50 shadow-lg" : ""
      }`}
    >
      {/* Top row: drag + position + poster + title + rating (desktop) */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Drag handle */}
        {!readOnly && (
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab touch-none text-text-faint hover:text-text-muted active:cursor-grabbing"
            aria-label={t("dragToReorder")}
          >
            <DotsSixVertical size={20} weight="bold" />
          </button>
        )}

        {/* Position */}
        <span className="w-5 md:w-6 text-center font-mono text-xs font-bold text-text-muted tabular-nums">
          {position}
        </span>

        {/* Poster */}
        <div className="relative h-12 w-8 shrink-0 overflow-hidden rounded-sm bg-bg-elevated">
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

        {/* Title */}
        <div className="min-w-0 flex-1">
          {(showId || detailHref) ? (
            <Link
              href={detailHref ?? `/shows/${showId}`}
              className="block truncate text-sm font-medium text-text-primary hover:text-accent transition-colors"
            >
              {title}
            </Link>
          ) : (
            <span className="block truncate text-sm font-medium text-text-primary">
              {title}
            </span>
          )}

          {/* Tags — mobile: solo pallini colorati */}
          {selectedTagIds && selectedTagIds.length > 0 && allTags && (
            <div className="md:hidden mt-1 flex items-center gap-1">
              {allTags
                .filter((t) => selectedTagIds.includes(t.id))
                .map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-block h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: tagDotColor(tag.color) }}
                    title={tag.name}
                  />
                ))}
            </div>
          )}

          {/* Tags — desktop: full badges / picker */}
          <div className="hidden md:block">
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

          {/* Notes */}
          {(onNotesChange !== undefined || (notes && notes.trim())) && (
            <div className="mt-1.5">
              {editingNote ? (
                <textarea
                  ref={noteInputRef}
                  autoFocus
                  value={localNote}
                  onChange={(e) => setLocalNote(e.target.value)}
                  onBlur={handleNoteBlur}
                  onKeyDown={handleNoteKeyDown}
                  placeholder={t("addNote")}
                  aria-label={t("personalNote")}
                  rows={2}
                  className="w-full resize-none bg-transparent text-xs text-text-secondary border-b border-dashed border-border focus:border-border-hover focus:outline-none placeholder:text-text-faint transition-colors leading-relaxed"
                />
              ) : localNote.trim() ? (
                <button
                  onClick={
                    onNotesChange ? () => setEditingNote(true) : undefined
                  }
                  className={`flex items-start gap-1 text-left text-xs text-text-muted leading-relaxed line-clamp-2 ${
                    onNotesChange
                      ? "hover:text-text-secondary cursor-text transition-colors"
                      : "cursor-default"
                  }`}
                >
                  <NotePencil
                    size={11}
                    className="mt-1 shrink-0 text-text-faint"
                  />
                  <span>{localNote}</span>
                </button>
              ) : onNotesChange ? (
                <button
                  onClick={() => setEditingNote(true)}
                  className="flex items-center gap-1 text-xs text-text-faint transition-opacity hover:text-text-muted sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <NotePencil size={11} />
                  {t("addNote")}
                </button>
              ) : null}
            </div>
          )}
        </div>

        {/* Rating — desktop inline */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
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
            className="rounded-sm p-1.5 text-accent transition-colors hover:bg-accent/10 hover:text-accent-hover"
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
            className="rounded-sm p-1.5 text-text-faint transition-colors hover:bg-error/10 hover:text-error"
            aria-label={t("removeFromList")}
          >
            <Trash size={16} />
          </button>
        )}
      </div>

      {/* Bottom row — mobile only */}
      <div className="md:hidden mt-2 pl-7">
        {onRatingChange ? (
          mobileRatingOpen ? (
            <RatingBar
              value={rating}
              onChange={(n) => {
                onRatingChange(n);
                setMobileRatingOpen(false);
              }}
              labels={ratingLabels}
              fullWidth
            />
          ) : (
            <button
              onClick={() => setMobileRatingOpen(true)}
              className="flex items-center gap-0.5"
              aria-label={
                rating
                  ? t("ratingTapToChange", { rating })
                  : t("tapToRate")
              }
            >
              {rating ? (
                <span className="font-mono text-xs tabular-nums text-accent">
                  {rating} · {getRatingLabel(rating, ratingLabels)}
                </span>
              ) : (
                Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <span
                    key={n}
                    className="size-4 rounded-full bg-text-faint/30"
                  />
                ))
              )}
            </button>
          )
        ) : rating ? (
          <span className="font-mono text-xs tabular-nums text-accent">
            {rating}/10 · {getRatingLabel(rating, ratingLabels)}
          </span>
        ) : (
          <span className="text-xs text-text-faint">—</span>
        )}
      </div>
    </div>
  );
}
