"use client";

import { useTranslations } from "next-intl";
import { Globe, LockSimple } from "@phosphor-icons/react";

type ListHeaderProps = {
  name: string;
  description?: string | null;
  isPublic: boolean;
  onNameChange?: (name: string) => void;
  onDescriptionChange?: (description: string) => void;
  onTogglePublic?: () => void;
  readOnly?: boolean;
  saveStatus?: "idle" | "saving" | "saved";
};

export function ListHeader({
  name,
  description,
  isPublic,
  onNameChange,
  onDescriptionChange,
  onTogglePublic,
  readOnly = false,
  saveStatus,
}: ListHeaderProps) {
  const t = useTranslations("common");

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        {readOnly ? (
          <h1 className="text-xl font-semibold tracking-tight text-text-primary">
            {name}
          </h1>
        ) : (
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange?.(e.target.value)}
            className="flex-1 bg-transparent text-xl font-semibold tracking-tight text-text-primary outline-none placeholder:text-text-faint"
            placeholder="List name"
          />
        )}

        {/* Public/Private toggle */}
        {onTogglePublic ? (
          <button
            onClick={onTogglePublic}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              isPublic
                ? "border-accent/30 bg-accent-muted text-accent"
                : "border-border bg-bg-surface text-text-muted"
            }`}
          >
            {isPublic ? (
              <>
                <Globe size={12} /> {t("public")}
              </>
            ) : (
              <>
                <LockSimple size={12} /> {t("private")}
              </>
            )}
          </button>
        ) : (
          <span
            className={`flex items-center gap-1.5 text-xs ${
              isPublic ? "text-accent" : "text-text-muted"
            }`}
          >
            {isPublic ? <Globe size={12} /> : <LockSimple size={12} />}
            {isPublic ? t("public") : t("private")}
          </span>
        )}

        {/* Save status indicator */}
        {saveStatus && saveStatus !== "idle" && (
          <span
            className={`ml-1 text-xs transition-opacity ${
              saveStatus === "saving" ? "text-text-faint" : "text-text-muted"
            }`}
          >
            {saveStatus === "saving" ? "Saving…" : "Saved"}
          </span>
        )}
      </div>

      {readOnly ? (
        description && (
          <p className="text-sm text-text-secondary">{description}</p>
        )
      ) : (
        <input
          type="text"
          value={description || ""}
          onChange={(e) => onDescriptionChange?.(e.target.value)}
          className="w-full bg-transparent text-sm text-text-secondary outline-none placeholder:text-text-faint"
          placeholder="Add a description..."
        />
      )}
    </div>
  );
}
