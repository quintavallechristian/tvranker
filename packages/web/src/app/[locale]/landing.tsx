"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Television,
  ListBullets,
  Star,
  Users,
  Lightning,
  ArrowRight,
} from "@phosphor-icons/react";

export function LandingPage() {
  const t = useTranslations("landing");
  const tAuth = useTranslations("auth");

  const features = [
    {
      icon: ListBullets,
      title: t("feature1Title"),
      desc: t("feature1Desc"),
    },
    {
      icon: Star,
      title: t("feature2Title"),
      desc: t("feature2Desc"),
    },
    {
      icon: Users,
      title: t("feature3Title"),
      desc: t("feature3Desc"),
    },
    {
      icon: Lightning,
      title: t("feature4Title"),
      desc: t("feature4Desc"),
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-bg-primary/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Television size={22} weight="duotone" className="text-accent" />
            <span className="text-sm font-bold tracking-tight text-text-primary">
              TV Ranker
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-md px-3 py-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {tAuth("login")}
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-bg-primary transition-colors hover:bg-accent-hover"
            >
              {tAuth("register")}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-16">
        <div className="mx-auto max-w-2xl text-center">
          {/* Glow dot */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-bg-surface px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-xs text-text-secondary">Free &amp; open</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl">
            {t("hero")
              .split("\n")
              .map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg-primary transition-colors hover:bg-accent-hover"
            >
              {t("cta")}
              <ArrowRight
                size={16}
                weight="bold"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/login"
              className="text-sm text-text-muted transition-colors hover:text-text-secondary"
            >
              {t("loginCta")}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-auto pb-8 pt-12">
          <div className="h-6 w-3.5 rounded-full border border-text-faint p-0.5">
            <div className="h-1.5 w-full animate-bounce rounded-full bg-text-muted" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">
            {t("features")}
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="rounded-[var(--radius-lg)] border border-border bg-bg-surface p-6 transition-colors hover:border-border-hover"
              >
                <div className="mb-4 inline-flex rounded-md bg-accent-muted p-2">
                  <Icon size={20} weight="duotone" className="text-accent" />
                </div>
                <h3 className="text-sm font-semibold tracking-tight text-text-primary">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-md text-center">
          <p className="text-lg font-semibold text-text-primary">
            {t("footerTagline")}
          </p>
          <Link
            href="/register"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg-primary transition-colors hover:bg-accent-hover"
          >
            {t("cta")}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Television
              size={16}
              weight="duotone"
              className="text-text-faint"
            />
            <span className="text-xs text-text-faint">TV Ranker</span>
          </div>
          <span className="text-xs text-text-faint">
            &copy; {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </div>
  );
}
