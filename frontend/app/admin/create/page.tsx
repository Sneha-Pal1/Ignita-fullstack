"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/auth-context";
import { authAPI } from "@/lib/auth";
import { ArrowLeft, Shield } from "lucide-react";

export default function CreateAdminPage() {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role !== "ADMIN") {
      router.replace("/Dashboard");
    }
  }, [isLoading, router, user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      const response = await authAPI.createAdmin({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
      });

      setSuccessMessage(
        response.message || "Admin account created successfully.",
      );
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to create admin.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !user || user.role !== "ADMIN") {
    return (
      <main className="min-h-dvh bg-zinc-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <p className="text-zinc-400">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-zinc-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            href="/Dashboard"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-emerald-400"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            Admin Only
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
                  Admin Management
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                  Create a new admin account
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
                  Use this page to create additional admin users who can manage
                  events, users, and platform content.
                </p>
              </div>
              <div className="hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400 md:block">
                <Shield size={24} />
              </div>
            </div>

            {successMessage && (
              <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Full Name">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    placeholder="Admin name"
                    required
                  />
                </Field>

                <Field label="Email">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    placeholder="admin@ignita.com"
                    type="email"
                    required
                  />
                </Field>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Phone">
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                    placeholder="Phone number"
                    type="tel"
                    required
                  />
                </Field>

                <Field label="Password">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                    placeholder="Temporary password"
                    type="password"
                    minLength={6}
                    required
                  />
                </Field>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Creating..." : "Create Admin"}
              </button>
            </form>
          </section>

          <aside className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white">Admin Access</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              This page is hidden from normal users. Only existing admins can
              open it, and it creates new admin accounts directly on the
              backend.
            </p>
            <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-sm text-zinc-300">
              New admins can then go to{" "}
              <span className="text-emerald-400">/create</span> to publish
              events for everyone.
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-zinc-300">{label}</span>
      {children}
      {error ? <span className="text-xs text-red-300">{error}</span> : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30";
