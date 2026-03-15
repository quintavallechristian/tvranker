"use client";

import { useState, useTransition } from "react";
import { UserPlus, UserMinus } from "@phosphor-icons/react";
import { followUser, unfollowUser } from "@/app/[locale]/(app)/follows/actions";
import { useTranslations } from "next-intl";

type FollowButtonProps = {
  profileId: string;
  initialFollowing: boolean;
};

export function FollowButton({
  profileId,
  initialFollowing,
}: FollowButtonProps) {
  const t = useTranslations("follows");
  const [following, setFollowing] = useState(initialFollowing);
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      try {
        if (following) {
          await unfollowUser(profileId);
          setFollowing(false);
        } else {
          await followUser(profileId);
          setFollowing(true);
        }
      } catch {
        // silently fail
      }
    });
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
        following
          ? "border-border bg-bg-surface text-text-secondary hover:border-error/40 hover:text-error"
          : "border-accent/30 bg-accent-muted text-accent hover:bg-accent/20"
      }`}
    >
      {following ? (
        <>
          <UserMinus size={14} weight="bold" />
          {t("unfollow")}
        </>
      ) : (
        <>
          <UserPlus size={14} weight="bold" />
          {t("follow")}
        </>
      )}
    </button>
  );
}
