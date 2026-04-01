"use client";

import { useState, useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { UserAvatar } from "@/components/UserAvatar";
import { createClient } from "@/lib/supabase/client";
import {
  PencilSimple,
  Check,
  Tag,
  Plus,
  X,
  GlobeSimple,
  Globe,
  LockSimple,
  Users,
  UserList,
} from "@phosphor-icons/react";
import { DEFAULT_RATING_LABELS } from "@/lib/rating-labels";
import {
  createTag,
  deleteTag,
  updateTagColor,
  type TagRow,
} from "@/app/[locale]/(app)/tags/actions";
import { updateList, updateProfileVisibilityDefaults } from "@/app/[locale]/(app)/lists/actions";
import {
  TAG_COLORS,
  TAG_COLOR_HEX,
  TAG_COLOR_LABEL,
  tagBadgeStyle,
  tagDotColor,
  type TagColor,
} from "@/lib/tag-colors";
import { setLocale } from "./actions";

type ProfilePageClientProps = {
  profile: {
    id: string;
    username: string;
    avatar_url: string | null;
    rating_labels: string[] | null;
    default_is_public: boolean;
    default_visible_to_followers: boolean;
    default_visible_to_following: boolean;
  };
  publicListCount: number;
  initialTags?: TagRow[];
};

export function ProfilePageClient({
  profile,
  publicListCount,
  initialTags = [],
}: ProfilePageClientProps) {
  const t = useTranslations("profile");
  const tSettings = useTranslations("settings");
  const tCommon = useTranslations("common");
  const currentLocale = useLocale();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(profile.username);
  const [isPending, startTransition] = useTransition();

  // Rating labels state: 10 entries, index 0 = rating 1, index 9 = rating 10
  const [labels, setLabels] = useState<string[]>(
    profile.rating_labels ?? DEFAULT_RATING_LABELS,
  );
  const [labelsEditing, setLabelsEditing] = useState(false);
  const [labelsPending, startLabelTransition] = useTransition();

  // Tags state
  const [tags, setTags] = useState<TagRow[]>(initialTags);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState<TagColor>("slate");
  const [tagsPending, startTagTransition] = useTransition();
  const [colorPickerTagId, setColorPickerTagId] = useState<string | null>(null);

  // Visibility state (profile defaults)
  const [isPublic, setIsPublic] = useState(profile.default_is_public);
  const [visibleToFollowers, setVisibleToFollowers] = useState(
    profile.default_visible_to_followers,
  );
  const [visibleToFollowing, setVisibleToFollowing] = useState(
    profile.default_visible_to_following,
  );
  const [visibilityPending, startVisibilityTransition] = useTransition();

  async function handleSave() {
    if (username.length < 3) return;
    const supabase = createClient();
    startTransition(async () => {
      await supabase.from("profiles").update({ username }).eq("id", profile.id);
      setEditing(false);
      router.refresh();
    });
  }

  async function handleSaveLabels() {
    const supabase = createClient();
    startLabelTransition(async () => {
      await supabase
        .from("profiles")
        .update({ rating_labels: labels })
        .eq("id", profile.id);
      setLabelsEditing(false);
      router.refresh();
    });
  }

  function handleCreateTag(e: React.FormEvent) {
    e.preventDefault();
    const name = newTagName.trim();
    if (!name || tagsPending) return;
    startTagTransition(async () => {
      const newTag = await createTag(name, newTagColor);
      setTags((prev) => [...prev, newTag]);
      setNewTagName("");
      setNewTagColor("slate");
    });
  }

  function handleChangeTagColor(tagId: string, color: string) {
    setTags((prev) => prev.map((t) => (t.id === tagId ? { ...t, color } : t)));
    setColorPickerTagId(null);
    startTagTransition(async () => {
      await updateTagColor(tagId, color);
    });
  }

  function handleDeleteTag(tagId: string) {
    startTagTransition(async () => {
      await deleteTag(tagId);
      setTags((prev) => prev.filter((t) => t.id !== tagId));
    });
  }

  function handleVisibilityChange(
    field: "is_public" | "visible_to_followers" | "visible_to_following",
    value: boolean,
  ) {
    if (field === "is_public") setIsPublic(value);
    if (field === "visible_to_followers") setVisibleToFollowers(value);
    if (field === "visible_to_following") setVisibleToFollowing(value);
    const next: Record<string, boolean> = {};
    if (field === "is_public") next.default_is_public = value;
    if (field === "visible_to_followers") next.default_visible_to_followers = value;
    if (field === "visible_to_following") next.default_visible_to_following = value;
    startVisibilityTransition(async () => {
      await updateProfileVisibilityDefaults(next);
      router.refresh();
    });
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const supabase = createClient();
    const fileExt = file.name.split(".").pop();
    const filePath = `${profile.id}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", profile.id);

    router.refresh();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold tracking-tight text-text-primary">
        {t("title")}
      </h1>

      {/* Profile card */}
      <div className="rounded-[var(--radius-lg)] border border-border bg-bg-surface p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          {/* Avatar */}
          <div className="relative">
            <UserAvatar
              url={profile.avatar_url}
              username={profile.username}
              size={72}
            />
            <label className="absolute -bottom-1 -right-1 cursor-pointer rounded-full bg-bg-elevated p-1.5 text-text-muted transition-colors hover:text-text-primary">
              <PencilSimple size={12} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </label>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            {editing ? (
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                <input
                  type="text"
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""),
                    )
                  }
                  className="rounded-md border border-border bg-bg-elevated px-3 py-1.5 text-sm text-text-primary outline-none focus:border-accent"
                  autoFocus
                />
                <button
                  onClick={handleSave}
                  disabled={isPending || username.length < 3}
                  className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-bg-primary hover:bg-accent-hover disabled:opacity-50"
                >
                  {tCommon("save")}
                </button>
                <button
                  onClick={() => {
                    setUsername(profile.username);
                    setEditing(false);
                  }}
                  className="px-2 py-1.5 text-xs text-text-muted hover:text-text-secondary"
                >
                  {tCommon("cancel")}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-text-primary">
                  @{profile.username}
                </h2>
                <button
                  onClick={() => setEditing(true)}
                  className="text-text-faint hover:text-text-muted"
                >
                  <PencilSimple size={14} />
                </button>
              </div>
            )}

            <p className="mt-2 text-sm text-text-muted">
              {publicListCount} {t("publicLists").toLowerCase()}
            </p>
          </div>
        </div>
      </div>

      {/* Rating labels card */}
      <div className="rounded-[var(--radius-lg)] border border-border bg-bg-surface p-4 md:p-6">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">
              {t("ratingLabelsTitle")}
            </h3>
            <p className="mt-0.5 text-xs text-text-muted">
              {t("ratingLabelsDesc")}
            </p>
          </div>
          {labelsEditing ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveLabels}
                disabled={labelsPending}
                className="flex items-center gap-1 rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-bg-primary hover:bg-accent-hover disabled:opacity-50"
              >
                <Check size={12} />
                {tCommon("save")}
              </button>
              <button
                onClick={() => {
                  setLabels(profile.rating_labels ?? DEFAULT_RATING_LABELS);
                  setLabelsEditing(false);
                }}
                className="px-2 py-1.5 text-xs text-text-muted hover:text-text-secondary"
              >
                {tCommon("cancel")}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setLabelsEditing(true)}
              className="flex items-center gap-1 text-xs text-text-faint hover:text-text-muted"
            >
              <PencilSimple size={13} />
              {tCommon("edit")}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {Array.from({ length: 10 }, (_, i) => 10 - i).map((rating) => {
            const idx = rating - 1;
            return (
              <div key={rating} className="flex items-center gap-3">
                <span className="w-5 text-right font-mono text-xs font-bold tabular-nums text-accent">
                  {rating}
                </span>
                {labelsEditing ? (
                  <input
                    type="text"
                    value={labels[idx] ?? ""}
                    maxLength={32}
                    onChange={(e) => {
                      const next = [...labels];
                      next[idx] = e.target.value;
                      setLabels(next);
                    }}
                    className="flex-1 rounded-sm border border-border bg-bg-elevated px-2.5 py-1 text-xs text-text-primary outline-none focus:border-accent"
                  />
                ) : (
                  <span className="flex-1 truncate rounded-sm px-2.5 py-1 text-xs text-text-secondary">
                    {labels[idx] ?? DEFAULT_RATING_LABELS[idx]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tags card */}
      <div className="rounded-[var(--radius-lg)] border border-border bg-bg-surface p-4 md:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Tag size={16} className="text-text-muted" />
          <div>
            <h3 className="text-sm font-semibold text-text-primary">
              {t("tagsTitle")}
            </h3>
            <p className="mt-0.5 text-xs text-text-muted">{t("tagsDesc")}</p>
          </div>
        </div>

        {/* Tag list */}
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div key={tag.id} className="relative">
              <span
                style={tagBadgeStyle(tag.color)}
                className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium"
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: tagDotColor(tag.color) }}
                />
                {tag.name}
                {tag.is_default ? (
                  <span className="text-[9px] opacity-50">default</span>
                ) : (
                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={() =>
                        setColorPickerTagId(
                          colorPickerTagId === tag.id ? null : tag.id,
                        )
                      }
                      className="opacity-50 hover:opacity-100"
                      title={t("changeColor")}
                    >
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full border border-white/30"
                        style={{ backgroundColor: tagDotColor(tag.color) }}
                      />
                    </button>
                    <button
                      onClick={() => handleDeleteTag(tag.id)}
                      disabled={tagsPending}
                      className="opacity-50 transition-opacity hover:opacity-100 disabled:opacity-20"
                      aria-label={t("deleteTag", { name: tag.name })}
                    >
                      <X size={11} weight="bold" />
                    </button>
                  </div>
                )}
              </span>
              {/* Color picker popover for this tag */}
              {colorPickerTagId === tag.id && (
                <div className="absolute left-0 top-full z-50 mt-1 flex flex-wrap gap-1.5 rounded-md border border-border bg-bg-surface p-2 shadow-lg">
                  {TAG_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      title={TAG_COLOR_LABEL[c]}
                      onClick={() => handleChangeTagColor(tag.id, c)}
                      className="h-5 w-5 rounded-full transition-transform hover:scale-110"
                      style={{
                        backgroundColor: TAG_COLOR_HEX[c],
                        outline:
                          tag.color === c
                            ? `2px solid ${TAG_COLOR_HEX[c]}`
                            : "none",
                        outlineOffset: "2px",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
          {tags.length === 0 && (
            <span className="text-xs text-text-faint">{t("noTags")}</span>
          )}
        </div>

        {/* Create new tag */}
        <div className="space-y-2">
          {/* Color swatches */}
          <div className="flex flex-wrap gap-1.5">
            {TAG_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                title={TAG_COLOR_LABEL[c]}
                onClick={() => setNewTagColor(c)}
                className="h-5 w-5 rounded-full transition-transform hover:scale-110"
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
          <form onSubmit={handleCreateTag} className="flex gap-2">
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder={t("newTagPlaceholder")}
              maxLength={50}
              className="min-w-0 flex-1 rounded-md border border-border bg-bg-elevated px-3 py-1.5 text-xs text-text-primary placeholder:text-text-faint outline-none focus:border-accent"
            />
            <button
              type="submit"
              disabled={!newTagName.trim() || tagsPending}
              className="flex items-center gap-1 rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-bg-primary hover:bg-accent-hover disabled:opacity-40"
            >
              <Plus size={12} weight="bold" />
              {t("addTag")}
            </button>
          </form>
        </div>
      </div>

      {/* Visibility card */}
      <div className="rounded-[var(--radius-lg)] border border-border bg-bg-surface p-4 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <LockSimple size={16} className="text-text-muted" />
            <div>
              <h3 className="text-sm font-semibold text-text-primary">
                {t("visibilityTitle")}
              </h3>
              <p className="mt-0.5 text-xs text-text-muted">
                {t("visibilityDesc")}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {/* General visibility */}
            <div className="flex items-center justify-between rounded-md border border-border bg-bg-elevated px-4 py-3">
              <div className="flex items-center gap-3">
                <Globe
                  size={16}
                  className={isPublic ? "text-accent" : "text-text-faint"}
                />
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {t("visibilityGeneral")}
                  </p>
                  <p className="text-xs text-text-muted">
                    {t("visibilityGeneralDesc")}
                  </p>
                </div>
              </div>
              <button
                role="switch"
                aria-checked={isPublic}
                disabled={visibilityPending}
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

            {/* Visible to followers */}
            <div
              className={`flex items-center justify-between rounded-md border px-4 py-3 transition-opacity ${
                isPublic
                  ? "border-border/50 bg-bg-elevated/50 opacity-50"
                  : "border-border bg-bg-elevated"
              }`}
            >
              <div className="flex items-center gap-3">
                <Users
                  size={16}
                  className={
                    visibleToFollowers && !isPublic
                      ? "text-accent"
                      : "text-text-faint"
                  }
                />
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {t("visibilityFollowers")}
                  </p>
                  <p className="text-xs text-text-muted">
                    {t("visibilityFollowersDesc")}
                  </p>
                </div>
              </div>
              <button
                role="switch"
                aria-checked={visibleToFollowers}
                disabled={visibilityPending || isPublic}
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

            {/* Visible to following */}
            <div
              className={`flex items-center justify-between rounded-md border px-4 py-3 transition-opacity ${
                isPublic
                  ? "border-border/50 bg-bg-elevated/50 opacity-50"
                  : "border-border bg-bg-elevated"
              }`}
            >
              <div className="flex items-center gap-3">
                <UserList
                  size={16}
                  className={
                    visibleToFollowing && !isPublic
                      ? "text-accent"
                      : "text-text-faint"
                  }
                />
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {t("visibilityFollowing")}
                  </p>
                  <p className="text-xs text-text-muted">
                    {t("visibilityFollowingDesc")}
                  </p>
                </div>
              </div>
              <button
                role="switch"
                aria-checked={visibleToFollowing}
                disabled={visibilityPending || isPublic}
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
      </div>

      {/* Settings card */}
      <div className="rounded-[var(--radius-lg)] border border-border bg-bg-surface p-4 md:p-6">
        <div className="mb-4 flex items-center gap-2">
          <GlobeSimple size={16} className="text-text-muted" />
          <div>
            <h3 className="text-sm font-semibold text-text-primary">
              {tSettings("title")}
            </h3>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium text-text-secondary">
            {tSettings("language")}
          </p>
          <p className="mb-3 text-xs text-text-muted">
            {tSettings("languageDescription")}
          </p>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                await setLocale("en");
                router.refresh();
              }}
              className={`rounded-md px-4 py-2 text-xs font-medium transition-colors ${
                currentLocale === "en"
                  ? "bg-accent text-bg-primary"
                  : "border border-border bg-bg-elevated text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary"
              }`}
            >
              {tSettings("english")}
            </button>
            <button
              onClick={async () => {
                await setLocale("it");
                router.refresh();
              }}
              className={`rounded-md px-4 py-2 text-xs font-medium transition-colors ${
                currentLocale === "it"
                  ? "bg-accent text-bg-primary"
                  : "border border-border bg-bg-elevated text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary"
              }`}
            >
              {tSettings("italian")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
