"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CaretDown } from "@phosphor-icons/react";

const FAQ_KEYS = [
  "addShow",
  "importExternal",
  "viewProfile",
  "copyList",
  "rateShow",
  "reorder",
  "similarity",
  "recommendations",
] as const;

function AccordionItem({
  title,
  body,
  open,
  onToggle,
}: {
  title: string;
  body: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium text-text-primary transition-colors hover:text-accent"
      >
        {title}
        <CaretDown
          size={16}
          weight="bold"
          className={`shrink-0 text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-200 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="pb-4 text-sm leading-relaxed text-text-secondary prose-invert">
            {body.split("\n\n").map((paragraph, i) => (
              <p key={i} className={i > 0 ? "mt-3" : ""}>
                {renderInlineMarkdown(paragraph)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Minimal inline markdown: **bold** and `code` */
function renderInlineMarkdown(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-bg-elevated px-1.5 py-0.5 text-xs font-mono text-accent"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function FaqPage() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-lg font-semibold text-text-primary">
          {t("title")}
        </h1>
        <p className="mt-1 text-sm text-text-secondary">{t("subtitle")}</p>
      </div>

      <div className="rounded-[var(--radius-lg)] border border-border bg-bg-surface px-5">
        {FAQ_KEYS.map((key, i) => (
          <AccordionItem
            key={key}
            title={t(`${key}.title`)}
            body={t(`${key}.body`)}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </div>
  );
}
