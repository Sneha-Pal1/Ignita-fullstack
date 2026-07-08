"use client";

import { useState, useEffect, type FormEvent, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { authAPI } from "@/lib/auth";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";

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
    "bg-amber-505", // custom color class mapped in standard tailwind (actually amber-500)
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
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Dot Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />
      
      {/* Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 hover:opacity-90 transition-opacity">
            <Image
              src="/icons/iglogoremovebg.png"
              alt="logo"
              width={36}
              height={36}
            />
            <span className="text-xl font-bold tracking-tight text-white font-schibsted-grotesk">IGNITA</span>
          </Link>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl"
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
              <h1 className="text-2xl font-bold text-white mb-3 tracking-tight">
                Password updated!
              </h1>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Your password has been successfully reset. You'll be redirected
                to login in a few seconds.
              </p>
              <Link
                href="/login"
                id="rp-go-to-login"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/10"
              >
                Go to Login
              </Link>
            </div>
          ) : (
            /* Form state */
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2">
                  Set New Password
                </h1>
                <p className="text-zinc-400 text-xs">
                  Choose a strong password you haven't used before.
                </p>
              </div>

              {error && (
                <div className="mb-5 px-4 py-3 rounded-xl bg-red-950/40 border border-red-900/50 text-red-300 text-xs font-medium">
                  {error}
                  {!token && (
                    <div className="mt-2">
                      <Link
                        href="/forgot-password"
                        className="text-red-400 hover:text-red-300 underline underline-offset-2"
                      >
                        Request a new link
                      </Link>
                    </div>
                  )}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                noValidate
                id="rp-form"
              >
                {/* New password */}
                <div className="space-y-1.5">
                  <Input
                    id="rp-password"
                    type={showPassword ? "text" : "password"}
                    label="New Password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    icon={<Lock className="w-4 h-4 text-zinc-500" />}
                    suffix={
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="text-zinc-500 hover:text-zinc-300 transition-colors flex items-center justify-center cursor-pointer"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                  />

                  {/* Password strength indicator */}
                  {password.length > 0 && (
                    <div className="mt-2.5">
                      <div className="flex gap-1.5 mb-1.5">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              strength >= level 
                                ? (strength === 2 ? "bg-amber-500" : strengthColor)
                                : "bg-zinc-800"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                        Strength:{" "}
                        <span className="text-zinc-300 font-extrabold normal-case">
                          {strengthLabel}
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm password */}
                <Input
                  id="rp-confirm-password"
                  type={showPassword ? "text" : "password"}
                  label="Confirm new password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  icon={<Lock className="w-4 h-4 text-zinc-500" />}
                  error={confirmPassword.length > 0 && confirmPassword !== password ? "Passwords don't match" : undefined}
                />

                <button
                  id="rp-submit"
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !token ||
                    !password ||
                    password !== confirmPassword
                  }
                  className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-zinc-950 font-bold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/10 cursor-pointer text-sm disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Resetting password..." : "Reset Password"}
                </button>
              </form>

              <p className="mt-6 text-center text-xs text-zinc-550">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to login
                </Link>
              </p>
            </>
          )}
        </motion.div>
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
