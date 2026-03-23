"use client";

import { useTranslations } from "next-intl";
import { Globe, LockSimple } from "@phosphor-icons/react";

type ListHeaderProps = {
  description?: string | null;
  isPublic: boolean;
  onDescriptionChange?: (description: string) => void;
  readOnly?: boolean;
  saveStatus?: "idle" | "saving" | "saved";
};

export function ListHeader({
  description,
  isPublic,
  onDescriptionChange,
  readOnly = false,
  saveStatus,
}: ListHeaderProps) {
  const t = useTranslations("common");
  const tLists = useTranslations("lists");

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold tracking-tight text-text-primary">
          {tLists("title")}
        </h1>

        {/* Read-only visibility badge */}
        <span
          className={`flex items-center gap-1.5 text-xs ${
            isPublic ? "text-accent" : "text-text-muted"
          }`}
        >
          {isPublic ? <Globe size={12} /> : <LockSimple size={12} />}
          {isPublic ? t("public") : t("private")}
        </span>

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
