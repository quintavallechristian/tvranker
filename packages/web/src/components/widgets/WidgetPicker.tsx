"use client";

import { useState } from "react";
import {
  Television,
  FilmSlate,
  NumberCircleOne,
  Bell,
  Users,
  Compass,
  Trophy,
  Clock,
  Plus,
  X,
  ArrowLeft,
  GameController,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import type {
  WidgetType,
  WidgetConfig,
  WidgetCategory,
  WidgetTopic,
} from "@/lib/widgets";
import {
  WIDGET_CATEGORIES,
  WIDGET_TOPICS,
  DEFAULT_COL_SPAN,
  CATEGORY_NEEDS_TOPIC,
  CATEGORY_TOPIC_TO_TYPE,
  CATEGORY_DIRECT_TYPE,
} from "@/lib/widgets";

const CATEGORY_ICONS: Record<WidgetCategory, React.ReactNode> = {
  podium: <Trophy size={18} weight="duotone" />,
  count: <NumberCircleOne size={18} weight="duotone" />,
  last_added: <Clock size={18} weight="duotone" />,
  suggestions: <Compass size={18} weight="duotone" />,
  notifications: <Bell size={18} weight="duotone" />,
  recent_follows: <Users size={18} weight="duotone" />,
};

const TOPIC_ICONS: Record<WidgetTopic, React.ReactNode> = {
  show: <Television size={20} weight="duotone" />,
  movie: <FilmSlate size={20} weight="duotone" />,
  anime: <FilmSlate size={20} weight="duotone" />,
  game: <GameController size={20} weight="duotone" />,
};

function getCategoryColSpan(category: WidgetCategory): 1 | 2 {
  if (!CATEGORY_NEEDS_TOPIC[category]) {
    const directType = CATEGORY_DIRECT_TYPE[category];
    return directType ? DEFAULT_COL_SPAN[directType] : 1;
  }
  const types = Object.values(CATEGORY_TOPIC_TO_TYPE[category]).filter(
    Boolean,
  ) as WidgetType[];
  return types.length > 0 ? DEFAULT_COL_SPAN[types[0]] : 1;
}

function isCategoryFullyAdded(
  category: WidgetCategory,
  activeTypes: Set<WidgetType>,
): boolean {
  if (!CATEGORY_NEEDS_TOPIC[category]) {
    const directType = CATEGORY_DIRECT_TYPE[category];
    return directType ? activeTypes.has(directType) : false;
  }
  const types = Object.values(CATEGORY_TOPIC_TO_TYPE[category]).filter(
    Boolean,
  ) as WidgetType[];
  return types.length > 0 && types.every((t) => activeTypes.has(t));
}

export function WidgetPicker({
  currentWidgets,
  onAdd,
}: {
  currentWidgets: WidgetConfig[];
  onAdd: (type: WidgetType) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<WidgetCategory | null>(null);
  const t = useTranslations("home");

  const activeTypes = new Set(currentWidgets.map((w) => w.type));

  function handleCategoryClick(category: WidgetCategory) {
    if (CATEGORY_NEEDS_TOPIC[category]) {
      setSelectedCategory(category);
    } else {
      const widgetType = CATEGORY_DIRECT_TYPE[category]!;
      onAdd(widgetType);
      handleClose();
    }
  }

  function handleTopicClick(topic: WidgetTopic) {
    if (!selectedCategory) return;
    const widgetType = CATEGORY_TOPIC_TO_TYPE[selectedCategory][topic]!;
    onAdd(widgetType);
    handleClose();
  }

  function handleClose() {
    setOpen(false);
    setSelectedCategory(null);
  }

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
            onClick={handleClose}
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-xl border border-border bg-bg-surface p-5 shadow-xl">
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="rounded-md p-1 text-text-muted transition-colors hover:bg-bg-surface-hover hover:text-text-primary"
                    >
                      <ArrowLeft size={14} />
                    </button>
                  )}
                  <h2 className="text-base font-semibold text-text-primary">
                    {t("widgets.addWidget")}
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="rounded-md p-1 text-text-muted transition-colors hover:bg-bg-surface-hover hover:text-text-primary"
                >
                  <X size={16} />
                </button>
              </div>

              {!selectedCategory ? (
                /* Step 1 — choose category */
                <div className="grid grid-cols-2 gap-2">
                  {WIDGET_CATEGORIES.map((category) => {
                    const fullyAdded = isCategoryFullyAdded(
                      category,
                      activeTypes,
                    );
                    const colSpan = getCategoryColSpan(category);

                    return (
                      <button
                        key={category}
                        disabled={fullyAdded}
                        onClick={() => handleCategoryClick(category)}
                        className={`flex items-center gap-2.5 rounded-lg border p-3 text-left transition-all ${
                          fullyAdded
                            ? "cursor-not-allowed border-border/50 opacity-40"
                            : "border-border hover:border-accent hover:bg-accent-muted"
                        }`}
                      >
                        <div
                          className={`shrink-0 ${fullyAdded ? "text-text-faint" : "text-accent"}`}
                        >
                          {CATEGORY_ICONS[category]}
                        </div>
                        <div className="min-w-0">
                          <p
                            className={`truncate text-xs font-medium ${
                              fullyAdded
                                ? "text-text-faint"
                                : "text-text-primary"
                            }`}
                          >
                            {t(
                              `widgets.categories.${category}` as Parameters<
                                typeof t
                              >[0],
                            )}
                          </p>
                          <p className="text-[10px] text-text-muted">
                            {colSpan === 2
                              ? t("widgets.wide")
                              : t("widgets.compact")}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Step 2 — choose topic */
                <div>
                  <p className="mb-3 text-xs text-text-muted">
                    {t("widgets.chooseTopic")}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {WIDGET_TOPICS.map((topic) => {
                      const widgetType =
                        CATEGORY_TOPIC_TO_TYPE[selectedCategory][topic];
                      if (!widgetType) return null;
                      const alreadyAdded = activeTypes.has(widgetType);

                      return (
                        <button
                          key={topic}
                          disabled={alreadyAdded}
                          onClick={() => handleTopicClick(topic)}
                          className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-all ${
                            alreadyAdded
                              ? "cursor-not-allowed border-border/50 opacity-40"
                              : "border-border hover:border-accent hover:bg-accent-muted"
                          }`}
                        >
                          <div
                            className={`${alreadyAdded ? "text-text-faint" : "text-accent"}`}
                          >
                            {TOPIC_ICONS[topic]}
                          </div>
                          <p
                            className={`text-xs font-medium ${
                              alreadyAdded
                                ? "text-text-faint"
                                : "text-text-primary"
                            }`}
                          >
                            {t(
                              `widgets.topics.${topic}` as Parameters<
                                typeof t
                              >[0],
                            )}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
