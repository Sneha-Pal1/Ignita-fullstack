"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { authAPI } from "@/lib/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await authAPI.forgotPassword(email);
      setSubmitted(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      {/* Background decoration */}
      <div
        className="pointer-events-none fixed inset-0 opacity-20"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-teal-600 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/login" className="inline-flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="text-2xl font-bold text-white">Ignita</span>
          </Link>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm p-8"
          style={{ boxShadow: "0 0 40px rgba(16,185,129,0.08)" }}
        >
          {submitted ? (
            /* Success state */
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-3">
                Check your inbox
              </h1>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                If an account exists for{" "}
                <span className="text-white font-medium">{email}</span>, we've
                sent a password reset link. It expires in{" "}
                <strong className="text-white">15 minutes</strong>.
              </p>
              <p className="text-xs text-zinc-500 mb-6">
                Don't see it? Check your spam folder or{" "}
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                  }}
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors"
                >
                  try again
                </button>
                .
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to login
              </Link>
            </div>
          ) : (
            /* Form state */
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-2">
                  Forgot your password?
                </h1>
                <p className="text-zinc-400 text-sm">
                  Enter your email and we'll send you a link to reset your
                  password.
                </p>
              </div>

              {error && (
                <div className="mb-5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label
                    htmlFor="fp-email"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    Email address
                  </label>
                  <input
                    id="fp-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 text-sm"
                  />
                </div>

                <button
                  id="fp-submit"
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-zinc-500">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
