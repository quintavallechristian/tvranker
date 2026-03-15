"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Tag as TagIcon, Plus, X, Check } from "@phosphor-icons/react";
import type { TagRow } from "@/app/[locale]/(app)/tags/actions";
import {
  TAG_COLORS,
  TAG_COLOR_HEX,
  TAG_COLOR_LABEL,
  tagBadgeStyle,
  tagDotColor,
  type TagColor,
} from "@/lib/tag-colors";

type TagPickerProps = {
  showId: string;
  allTags: TagRow[];
  selectedTagIds: string[];
  onAdd: (tagId: string) => void;
  onRemove: (tagId: string) => void;
  onCreateTag: (name: string, color: string) => Promise<TagRow>;
};

export function TagPicker({
  allTags,
  selectedTagIds,
  onAdd,
  onRemove,
  onCreateTag,
}: TagPickerProps) {
  const [open, setOpen] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState<TagColor>("slate");
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const selectedTags = allTags.filter((t) => selectedTagIds.includes(t.id));

  function handleToggle(tag: TagRow) {
    if (selectedTagIds.includes(tag.id)) {
      onRemove(tag.id);
    } else {
      onAdd(tag.id);
    }
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const name = newTagName.trim();
    if (!name || isPending) return;
    startTransition(async () => {
      const newTag = await onCreateTag(name, newTagColor);
      setNewTagName("");
      setNewTagColor("slate");
      onAdd(newTag.id);
    });
  }

  return (
    <div
      ref={containerRef}
      className="relative flex flex-wrap items-center gap-1"
    >
      {/* Selected tag badges */}
      {selectedTags.map((tag) => (
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(tag.id);
            }}
            className="opacity-60 hover:opacity-100"
            aria-label={`Remove tag ${tag.name}`}
          >
            <X size={10} weight="bold" />
          </button>
        </span>
      ))}

      {/* Toggle picker button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="inline-flex items-center gap-0.5 rounded-full border border-dashed border-border px-2 py-0.5 text-[10px] text-text-faint transition-colors hover:border-border-hover hover:text-text-muted"
        aria-label="Manage tags"
      >
        <TagIcon size={10} />
        <Plus size={8} weight="bold" />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-1 w-56 max-w-[calc(100vw-2rem)] rounded-[var(--radius-md)] border border-border bg-bg-surface shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-h-48 overflow-y-auto p-1">
            {allTags.map((tag) => {
              const selected = selectedTagIds.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  onClick={() => handleToggle(tag)}
                  className="flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-xs transition-colors hover:bg-bg-elevated"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: tagDotColor(tag.color) }}
                  />
                  <span className="flex-1 truncate text-text-secondary">
                    {tag.name}
                  </span>
                  {selected && (
                    <Check
                      size={12}
                      weight="bold"
                      style={{ color: tagDotColor(tag.color) }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Create new tag */}
          <div className="space-y-2 border-t border-border p-2">
            {/* Color swatches */}
            <div className="flex flex-wrap gap-1.5">
              {TAG_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  title={TAG_COLOR_LABEL[c]}
                  onClick={() => setNewTagColor(c)}
                  className="h-4 w-4 rounded-full transition-transform hover:scale-110"
                  style={{
                    backgroundColor: TAG_COLOR_HEX[c],
                    outline:
                      newTagColor === c
                        ? `2px solid ${TAG_COLOR_HEX[c]}`
                        : "none",
                    outlineOffset: "2px",
                  }}
                />
              ))}
            </div>
            <form onSubmit={handleCreate} className="flex gap-1">
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Nuovo tag..."
                maxLength={50}
                className="min-w-0 flex-1 rounded-[var(--radius-sm)] border border-border bg-bg-elevated px-2 py-1 text-xs text-text-primary placeholder:text-text-faint outline-none focus:border-accent"
              />
              <button
                type="submit"
                disabled={!newTagName.trim() || isPending}
                className="rounded-[var(--radius-sm)] bg-accent px-2 py-1 text-xs font-medium text-bg-primary hover:bg-accent-hover disabled:opacity-40"
              >
                <Plus size={12} weight="bold" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
