import Image from "next/image";
import { User } from "@phosphor-icons/react/dist/ssr";

type UserAvatarProps = {
  url?: string | null;
  username: string;
  size?: number;
  className?: string;
};

export function UserAvatar({
  url,
  username,
  size = 32,
  className = "",
}: UserAvatarProps) {
  const initials = username.slice(0, 2).toUpperCase();

  if (url) {
    return (
      <Image
        src={url}
        alt={username}
        width={size}
        height={size}
        className={`rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-accent-muted ${className}`}
      style={{ width: size, height: size }}
    >
      {size >= 24 ? (
        <span
          className="font-mono text-xs font-bold text-accent"
          style={{ fontSize: size * 0.35 }}
        >
          {initials}
        </span>
      ) : (
        <User size={size * 0.5} className="text-accent" />
      )}
    </div>
  );
}
