"use client";

import { useState, useEffect, type FormEvent, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authAPI } from "@/lib/auth";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!token) {
      setError(
        "No reset token found. Please request a new password reset link.",
      );
    }
  }, [token]);

  const getPasswordStrength = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strength = getPasswordStrength(password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = [
    "",
    "bg-red-500",
    "bg-amber-500",
    "bg-yellow-400",
    "bg-emerald-500",
  ][strength];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("No reset token. Please request a new link.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await authAPI.resetPassword(token, password);
      setSuccess(true);
      // Auto-redirect after 3s
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. The link may have expired.";
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
          <Link href="/login" className="inline-flex items-center gap-2">
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
          {success ? (
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-3">
                Password updated!
              </h1>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Your password has been successfully reset. You'll be redirected
                to login in a few seconds.
              </p>
              <Link
                href="/login"
                id="rp-go-to-login"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold transition-all duration-200"
              >
                Go to Login
              </Link>
            </div>
          ) : (
            /* Form state */
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-2">
                  Set new password
                </h1>
                <p className="text-zinc-400 text-sm">
                  Choose a strong password you haven't used before.
                </p>
              </div>

              {error && (
                <div className="mb-5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                  {error}
                  {!token && (
                    <div className="mt-2">
                      <Link
                        href="/forgot-password"
                        className="text-red-200 underline underline-offset-2"
                      >
                        Request a new link
                      </Link>
                    </div>
                  )}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
                id="rp-form"
              >
                {/* New password */}
                <div>
                  <label
                    htmlFor="rp-password"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    New password
                  </label>
                  <div className="relative">
                    <input
                      id="rp-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      className="w-full px-4 py-3 pr-11 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-white transition-colors"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Password strength indicator */}
                  {password.length > 0 && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              strength >= level ? strengthColor : "bg-zinc-700"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-zinc-400">
                        Strength:{" "}
                        <span className="text-white font-medium">
                          {strengthLabel}
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm password */}
                <div>
                  <label
                    htmlFor="rp-confirm-password"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    Confirm new password
                  </label>
                  <input
                    id="rp-confirm-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    className={`w-full px-4 py-3 rounded-xl bg-zinc-800 border text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all duration-200 text-sm ${
                      confirmPassword.length > 0 &&
                      confirmPassword !== password
                        ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20"
                        : "border-zinc-700 focus:border-emerald-500 focus:ring-emerald-500/20"
                    }`}
                  />
                  {confirmPassword.length > 0 &&
                    confirmPassword !== password && (
                      <p className="mt-1 text-xs text-red-400">
                        Passwords don't match
                      </p>
                    )}
                </div>

                <button
                  id="rp-submit"
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !token ||
                    !password ||
                    password !== confirmPassword
                  }
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
                      Resetting password...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-zinc-500">
                <Link
                  href="/login"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  ← Back to login
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
