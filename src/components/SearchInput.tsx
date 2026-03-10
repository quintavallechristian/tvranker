"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useState, useRef } from "react";

type SearchInputProps = {
  placeholder: string;
  onSearch: (query: string) => void;
  debounceMs?: number;
  className?: string;
};

export function SearchInput({
  placeholder,
  onSearch,
  debounceMs = 300,
  className = "",
}: SearchInputProps) {
  const [value, setValue] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, debounceMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, debounceMs, onSearch]);

  return (
    <div className={`relative ${className}`}>
      <MagnifyingGlass
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-[var(--radius-md)] border border-border bg-bg-surface py-2 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-faint transition-colors focus:border-accent focus:outline-none"
      />
    </div>
  );
}
