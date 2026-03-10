"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  Plus,
  FileArrowUp,
  Globe,
  LockSimple,
  Trash,
} from "@phosphor-icons/react";
import { EmptyState } from "@/components/EmptyState";
import { ImportDialog } from "@/components/ImportDialog";
import { createList, deleteList, importFromJson } from "./actions";
import type { ListWithCount } from "@/lib/supabase/types";

type ListsPageClientProps = {
  lists: ListWithCount[];
};

export function ListsPageClient({ lists }: ListsPageClientProps) {
  const t = useTranslations();
  const router = useRouter();
  const [showImport, setShowImport] = useState(false);
  const [showNewList, setShowNewList] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleCreateList(formData: FormData) {
    startTransition(async () => {
      const list = await createList(formData);
      router.push(`/lists/${list.id}`);
    });
  }

  async function handleDelete(listId: string) {
    if (!confirm(t("lists.deleteConfirm"))) return;
    startTransition(async () => {
      await deleteList(listId);
      router.refresh();
    });
  }

  async function handleImport(data: unknown) {
    const result = await importFromJson(data);
    router.push(`/lists/${result.listId}`);
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight text-text-primary">
          {t("lists.title")}
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowImport(true)}
            className="flex items-center gap-1.5 rounded-[var(--radius-md)] border border-border px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-bg-surface hover:text-text-primary"
          >
            <FileArrowUp size={14} />
            {t("lists.importJson")}
          </button>
          <button
            onClick={() => setShowNewList(true)}
            className="flex items-center gap-1.5 rounded-[var(--radius-md)] bg-accent px-3 py-2 text-xs font-medium text-bg-primary transition-colors hover:bg-accent-hover"
          >
            <Plus size={14} weight="bold" />
            {t("lists.newList")}
          </button>
        </div>
      </div>

      {/* New list form */}
      {showNewList && (
        <form
          action={handleCreateList}
          className="mb-6 rounded-[var(--radius-lg)] border border-border bg-bg-surface p-4"
        >
          <div className="space-y-3">
            <input
              name="name"
              placeholder={t("lists.namePlaceholder")}
              required
              autoFocus
              className="w-full bg-transparent text-sm font-medium text-text-primary outline-none placeholder:text-text-faint"
            />
            <input
              name="description"
              placeholder={t("lists.descriptionPlaceholder")}
              className="w-full bg-transparent text-xs text-text-secondary outline-none placeholder:text-text-faint"
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowNewList(false)}
              className="px-3 py-1.5 text-xs text-text-muted hover:text-text-secondary"
            >
              {t("common.cancel")}
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-[var(--radius-md)] bg-accent px-3 py-1.5 text-xs font-medium text-bg-primary hover:bg-accent-hover disabled:opacity-50"
            >
              {t("common.create")}
            </button>
          </div>
        </form>
      )}

      {/* Lists grid */}
      {lists.length === 0 ? (
        <EmptyState
          title={t("lists.emptyState")}
          action={
            <button
              onClick={() => setShowNewList(true)}
              className="rounded-[var(--radius-md)] bg-accent px-4 py-2 text-sm font-medium text-bg-primary"
            >
              {t("lists.newList")}
            </button>
          }
        />
      ) : (
        <div className="grid gap-3">
          {lists.map((list) => (
            <Link
              key={list.id}
              href={`/lists/${list.id}`}
              className="group flex items-center justify-between rounded-[var(--radius-lg)] border border-border bg-bg-surface p-4 transition-colors hover:border-border-hover"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-medium text-text-primary">
                    {list.name}
                  </h3>
                  {list.is_public ? (
                    <Globe size={12} className="shrink-0 text-accent" />
                  ) : (
                    <LockSimple
                      size={12}
                      className="shrink-0 text-text-faint"
                    />
                  )}
                </div>
                {list.description && (
                  <p className="mt-0.5 truncate text-xs text-text-muted">
                    {list.description}
                  </p>
                )}
                <p className="mt-1 text-xs text-text-faint">
                  {list.item_count} shows
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDelete(list.id);
                }}
                className="rounded-[var(--radius-sm)] p-2 text-text-faint opacity-0 transition-all hover:bg-error/10 hover:text-error group-hover:opacity-100"
                aria-label="Delete list"
              >
                <Trash size={14} />
              </button>
            </Link>
          ))}
        </div>
      )}

      {/* Import dialog */}
      <ImportDialog
        open={showImport}
        onClose={() => setShowImport(false)}
        onImport={handleImport}
      />
    </div>
  );
}
