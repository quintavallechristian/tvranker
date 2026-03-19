"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { Link } from "@/i18n/navigation";
import { Envelope, Lock, User } from "@phosphor-icons/react";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      setLoading(false);
      return;
    }

    // Check username availability
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .single();

    if (existing) {
      setError("Username is already taken");
      setLoading(false);
      return;
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
        emailRedirectTo: `${siteUrl}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      window.location.href = "/lists";
    }
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
          {t("createAccount")}
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          {t("signUpDescription")}
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="mb-1.5 block text-xs font-medium text-text-secondary"
          >
            {t("username")}
          </label>
          <div className="relative">
            <User
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""),
                )
              }
              placeholder="cooluser"
              required
              minLength={3}
              maxLength={30}
              className="w-full rounded-md border border-border bg-bg-surface py-2.5 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-faint transition-colors focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-medium text-text-secondary"
          >
            {t("email")}
          </label>
          <div className="relative">
            <Envelope
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-md border border-border bg-bg-surface py-2.5 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-faint transition-colors focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-xs font-medium text-text-secondary"
          >
            {t("password")}
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full rounded-md border border-border bg-bg-surface py-2.5 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-faint transition-colors focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        {error && (
          <p className="text-xs text-error" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-bg-primary transition-colors hover:bg-accent-hover disabled:opacity-50"
        >
          {loading ? "..." : t("register")}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        {t("hasAccount")}{" "}
        <Link
          href="/login"
          className="font-medium text-accent hover:text-accent-hover"
        >
          {t("login")}
        </Link>
      </p>
    </div>
  );
}
