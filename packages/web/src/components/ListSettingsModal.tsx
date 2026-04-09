"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  X,
  Globe,
  LockSimple,
  Users,
  UserList,
  Check,
  ArrowCounterClockwise,
} from "@phosphor-icons/react";
import { DEFAULT_RATING_LABELS } from "@/lib/rating-labels";

export type ListSettingsData = {
  is_public: boolean;
  visible_to_followers: boolean;
  visible_to_following: boolean;
  rating_labels: string[] | null;
  custom_visibility: boolean;
};

export type ProfileVisibilityData = {
  is_public: boolean;
  visible_to_followers: boolean;
  visible_to_following: boolean;
};

type ListSettingsModalProps = {
  open: boolean;
  onClose: () => void;
  listId: string;
  settings: ListSettingsData;
  profileRatingLabels: string[] | null;
  profileVisibility: ProfileVisibilityData;
  onSave: (listId: string, updates: Partial<ListSettingsData>) => Promise<void>;
};

export function ListSettingsModal({
  open,
  onClose,
  listId,
  settings,
  profileRatingLabels,
  profileVisibility,
  onSave,
}: ListSettingsModalProps) {
  const t = useTranslations("listSettings");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Custom visibility toggle
  const [useCustomVisibility, setUseCustomVisibility] = useState(
    settings.custom_visibility,
  );

  // Visibility state – initialized from settings (which are already synced with
  // profile defaults when custom_visibility = false)
  const [isPublic, setIsPublic] = useState(settings.is_public);
  const [visibleToFollowers, setVisibleToFollowers] = useState(
    settings.visible_to_followers,
  );
  const [visibleToFollowing, setVisibleToFollowing] = useState(
    settings.visible_to_following,
  );

  // Rating labels state
  const profileLabels = profileRatingLabels ?? DEFAULT_RATING_LABELS;
  const [labels, setLabels] = useState<string[]>(
    settings.rating_labels ?? profileLabels,
  );
  const hasCustomLabels = settings.rating_labels !== null;
  const [customized, setCustomized] = useState(hasCustomLabels);

  function handleCustomVisibilityToggle() {
    const next = !useCustomVisibility;
    setUseCustomVisibility(next);

    if (!next) {
      // Reverting to profile defaults: sync local state and persist
      setIsPublic(profileVisibility.is_public);
      setVisibleToFollowers(profileVisibility.visible_to_followers);
      setVisibleToFollowing(profileVisibility.visible_to_following);
      startTransition(async () => {
        await onSave(listId, {
          custom_visibility: false,
          is_public: profileVisibility.is_public,
          visible_to_followers: profileVisibility.visible_to_followers,
          visible_to_following: profileVisibility.visible_to_following,
        });
        router.refresh();
      });
    } else {
      startTransition(async () => {
        await onSave(listId, { custom_visibility: true });
        router.refresh();
      });
    }
  }

  function handleVisibilityChange(
    field: "is_public" | "visible_to_followers" | "visible_to_following",
    value: boolean,
  ) {
    const next = {
      is_public: field === "is_public" ? value : isPublic,
      visible_to_followers:
        field === "visible_to_followers" ? value : visibleToFollowers,
      visible_to_following:
        field === "visible_to_following" ? value : visibleToFollowing,
    };
    if (field === "is_public") setIsPublic(value);
    if (field === "visible_to_followers") setVisibleToFollowers(value);
    if (field === "visible_to_following") setVisibleToFollowing(value);

    startTransition(async () => {
      await onSave(listId, next);
      router.refresh();
    });
  }

  function handleResetLabels() {
    setLabels(profileLabels);
    setCustomized(false);
    startTransition(async () => {
      await onSave(listId, { rating_labels: null });
      router.refresh();
    });
  }

  function handleSaveLabels() {
    setCustomized(true);
    startTransition(async () => {
      await onSave(listId, { rating_labels: labels });
      router.refresh();
      onClose();
    });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-start justify-center bg-black/60 sm:pt-[10vh] backdrop-blur-sm">
      <div className="relative w-full sm:mx-4 sm:max-w-lg rounded-t-[16px] sm:rounded-[var(--radius-lg)] border border-border bg-bg-surface max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-sm font-semibold text-text-primary">
            {t("title")}
          </h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 space-y-6">
          {/* Visibility section */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <LockSimple size={14} className="text-text-muted" />
              <div>
                <h3 className="text-sm font-semibold text-text-primary">
                  {t("visibilityTitle")}
                </h3>
                <p className="text-xs text-text-muted">{t("visibilityDesc")}</p>
              </div>
            </div>

            {/* Custom visibility master toggle */}
            <div className="mb-3 flex items-center justify-between rounded-md border border-border bg-bg-elevated px-3 py-2.5">
              <div>
                <p className="text-xs font-medium text-text-primary">
                  {t("useCustomVisibility")}
                </p>
                <p className="text-[11px] text-text-muted">
                  {useCustomVisibility
                    ? t("usingCustomVisibility")
                    : t("usingProfileVisibility")}
                </p>
              </div>
              <button
                role="switch"
                aria-checked={useCustomVisibility}
                disabled={isPending}
                onClick={handleCustomVisibilityToggle}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none disabled:opacity-50 ${
                  useCustomVisibility ? "bg-accent" : "bg-bg-surface-hover"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform ${
                    useCustomVisibility ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Per-list visibility controls, shown only when custom visibility is ON */}
            {useCustomVisibility && (
            <div className="space-y-2">
              {/* Public */}
              <div className="flex items-center justify-between rounded-md border border-border bg-bg-elevated px-3 py-2.5">
                <div className="flex items-center gap-2.5">
                  <Globe
                    size={14}
                    className={isPublic ? "text-accent" : "text-text-faint"}
                  />
                  <div>
                    <p className="text-xs font-medium text-text-primary">
                      {t("visibilityPublic")}
                    </p>
                    <p className="text-[11px] text-text-muted">
                      {t("visibilityPublicDesc")}
                    </p>
                  </div>
                </div>
                <button
                  role="switch"
                  aria-checked={isPublic}
                  disabled={isPending}
                  onClick={() => handleVisibilityChange("is_public", !isPublic)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none disabled:opacity-50 ${
                    isPublic ? "bg-accent" : "bg-bg-surface-hover"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform ${
                      isPublic ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Followers */}
              <div
                className={`flex items-center justify-between rounded-md border px-3 py-2.5 transition-opacity ${
                  isPublic
                    ? "border-border/50 bg-bg-elevated/50 opacity-50"
                    : "border-border bg-bg-elevated"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users
                    size={14}
                    className={
                      visibleToFollowers && !isPublic
                        ? "text-accent"
                        : "text-text-faint"
                    }
                  />
                  <div>
                    <p className="text-xs font-medium text-text-primary">
                      {t("visibilityFollowers")}
                    </p>
                    <p className="text-[11px] text-text-muted">
                      {t("visibilityFollowersDesc")}
                    </p>
                  </div>
                </div>
                <button
                  role="switch"
                  aria-checked={visibleToFollowers}
                  disabled={isPending || isPublic}
                  onClick={() =>
                    handleVisibilityChange(
                      "visible_to_followers",
                      !visibleToFollowers,
                    )
                  }
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                    visibleToFollowers && !isPublic
                      ? "bg-accent"
                      : "bg-bg-surface-hover"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform ${
                      visibleToFollowers ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Following */}
              <div
                className={`flex items-center justify-between rounded-md border px-3 py-2.5 transition-opacity ${
                  isPublic
                    ? "border-border/50 bg-bg-elevated/50 opacity-50"
                    : "border-border bg-bg-elevated"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <UserList
                    size={14}
                    className={
                      visibleToFollowing && !isPublic
                        ? "text-accent"
                        : "text-text-faint"
                    }
                  />
                  <div>
                    <p className="text-xs font-medium text-text-primary">
                      {t("visibilityFollowing")}
                    </p>
                    <p className="text-[11px] text-text-muted">
                      {t("visibilityFollowingDesc")}
                    </p>
                  </div>
                </div>
                <button
                  role="switch"
                  aria-checked={visibleToFollowing}
                  disabled={isPending || isPublic}
                  onClick={() =>
                    handleVisibilityChange(
                      "visible_to_following",
                      !visibleToFollowing,
                    )
                  }
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                    visibleToFollowing && !isPublic
                      ? "bg-accent"
                      : "bg-bg-surface-hover"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform ${
                      visibleToFollowing ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
            )}
          </div>

          {/* Rating labels section */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-text-primary">
                  {t("ratingLabelsTitle")}
                  <span
                    className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      customized
                        ? "bg-accent/10 text-accent"
                        : "bg-bg-elevated text-text-faint"
                    }`}
                  >
                    {customized
                      ? t("usingCustomLabels")
                      : t("usingProfileDefaults")}
                  </span>
                </h3>
                <p className="mt-2 text-xs text-text-muted">
                  {t("ratingLabelsDesc")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {Array.from({ length: 10 }, (_, i) => 10 - i).map((rating) => {
                const idx = rating - 1;
                return (
                  <div key={rating} className="flex items-center gap-2.5">
                    <span className="w-5 text-right font-mono text-xs font-bold tabular-nums text-accent">
                      {rating}
                    </span>
                    <input
                      type="text"
                      value={labels[idx] ?? ""}
                      maxLength={32}
                      placeholder={profileLabels[idx]}
                      onChange={(e) => {
                        const next = [...labels];
                        next[idx] = e.target.value;
                        setLabels(next);
                        if (!customized) setCustomized(true);
                      }}
                      className="flex-1 rounded-sm border border-border bg-bg-elevated px-2.5 py-1 text-xs text-text-primary placeholder:text-text-faint outline-none focus:border-accent"
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-between">
              {customized && (
                <button
                  onClick={handleResetLabels}
                  disabled={isPending}
                  className="flex items-center gap-1 text-xs text-text-muted hover:text-text-secondary disabled:opacity-50"
                >
                  <ArrowCounterClockwise size={12} />
                  {t("ratingLabelsReset")}
                </button>
              )}
              <div className="ml-auto">
                <button
                  onClick={handleSaveLabels}
                  disabled={isPending}
                  className="flex items-center gap-1 rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-bg-primary hover:bg-accent-hover disabled:opacity-50"
                >
                  <Check size={12} />
                  {tCommon("save")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
