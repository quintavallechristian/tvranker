"use client";

import { useState } from "react";
import {
  Television,
  FilmSlate,
  NumberCircleOne,
  Bell,
  Users,
  Compass,
  Plus,
  X,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import type { WidgetType, WidgetConfig } from "@/lib/widgets";
import { WIDGET_TYPES, DEFAULT_COL_SPAN } from "@/lib/widgets";

const WIDGET_ICONS: Record<WidgetType, React.ReactNode> = {
  show_podium: <Television size={18} weight="duotone" />,
  movie_podium: <FilmSlate size={18} weight="duotone" />,
  show_count: <NumberCircleOne size={18} weight="duotone" />,
  movie_count: <NumberCircleOne size={18} weight="duotone" />,
  last_show_added: <Television size={18} weight="duotone" />,
  last_movie_added: <FilmSlate size={18} weight="duotone" />,
  notifications: <Bell size={18} weight="duotone" />,
  recent_follows: <Users size={18} weight="duotone" />,
  show_suggestions: <Compass size={18} weight="duotone" />,
  movie_suggestions: <Compass size={18} weight="duotone" />,
};

export function WidgetPicker({
  currentWidgets,
  onAdd,
}: {
  currentWidgets: WidgetConfig[];
  onAdd: (type: WidgetType) => void;
}) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("home");

  // Which types are already added
  const activeTypes = new Set(currentWidgets.map((w) => w.type));

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-dashed border-border bg-bg-surface text-text-muted transition-all hover:border-accent hover:bg-accent-muted hover:text-accent"
        aria-label={t("widgets.addWidget")}
      >
        <Plus size={18} weight="bold" />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-xl border border-border bg-bg-surface p-5 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-text-primary">
                  {t("widgets.addWidget")}
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md p-1 text-text-muted transition-colors hover:bg-bg-surface-hover hover:text-text-primary"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {WIDGET_TYPES.map((type) => {
                  const alreadyAdded = activeTypes.has(type);

                  return (
                    <button
                      key={type}
                      disabled={alreadyAdded}
                      onClick={() => {
                        onAdd(type);
                        setOpen(false);
                      }}
                      className={`flex items-center gap-2.5 rounded-lg border p-3 text-left transition-all ${
                        alreadyAdded
                          ? "cursor-not-allowed border-border/50 opacity-40"
                          : "border-border hover:border-accent hover:bg-accent-muted"
                      }`}
                    >
                      <div
                        className={`shrink-0 ${alreadyAdded ? "text-text-faint" : "text-accent"}`}
                      >
                        {WIDGET_ICONS[type]}
                      </div>
                      <div className="min-w-0">
                        <p
                          className={`truncate text-xs font-medium ${
                            alreadyAdded
                              ? "text-text-faint"
                              : "text-text-primary"
                          }`}
                        >
                          {t(`widgets.types.${type}`)}
                        </p>
                        <p className="text-[10px] text-text-muted">
                          {DEFAULT_COL_SPAN[type] === 2
                            ? t("widgets.wide")
                            : t("widgets.compact")}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
