"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { authAPI } from "@/lib/auth";
import { Mail, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";

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
              <h1 className="text-2xl font-bold text-white mb-3 tracking-tight">
                Check your inbox
              </h1>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                If an account exists for{" "}
                <span className="text-white font-semibold">{email}</span>, we've
                sent a password reset link. It expires in{" "}
                <strong className="text-white font-semibold">15 minutes</strong>.
              </p>
              <p className="text-xs text-zinc-500 mb-6">
                Don't see it? Check your spam folder or{" "}
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                  }}
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors cursor-pointer font-medium"
                >
                  try again
                </button>
                .
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </div>
          ) : (
            /* Form state */
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2">
                  Forgot Password
                </h1>
                <p className="text-zinc-400 text-xs">
                  Enter your email and we'll send you a link to reset your password.
                </p>
              </div>

              {error && (
                <div className="mb-5 px-4 py-3 rounded-xl bg-red-950/40 border border-red-900/50 text-red-300 text-xs font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <Input
                  id="fp-email"
                  type="email"
                  label="Email address"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  icon={<Mail className="w-4 h-4 text-zinc-500" />}
                  disabled={isSubmitting}
                />

                <button
                  id="fp-submit"
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-zinc-950 font-bold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/10 cursor-pointer text-sm disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </button>
              </form>

              <p className="mt-6 text-center text-xs text-zinc-400">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
