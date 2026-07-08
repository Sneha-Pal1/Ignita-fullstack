"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/use-auth";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import type { JwtPayload } from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { authAPI } from "@/lib/auth";
import AuthVisualPanel from "@/components/auth/AuthVisualPanel";
import { motion } from "motion/react";

type GoogleCredentialPayload = JwtPayload & {
  email?: string;
  name?: string;
  picture?: string;
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [googleAuthMessage, setGoogleAuthMessage] = useState<string | null>(null);
  const [blink, setBlink] = useState(true);
  const router = useRouter();
  const { login, loading, error } = useAuth();

  useEffect(() => {
    const i = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(i);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      console.log(res);
      setTimeout(() => {
        router.push(res.user?.role === "ADMIN" ? "/create" : "/events");
      }, 100);
    } catch {
      // Error is handled by useAuth hook
    }
  };

  const handleGoogleSuccess = useCallback(
    async (credentialResponse: CredentialResponse) => {
      try {
        if (!credentialResponse.credential) return;

        const decoded = jwtDecode<GoogleCredentialPayload>(
          credentialResponse.credential,
        );

        console.log(decoded);

        const response = await authAPI.googleLogin({
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture,
        });

        router.push(response.user?.role === "ADMIN" ? "/admin" : "/events");
      } catch (error) {
        console.error("Google login failed", error);
        setGoogleAuthMessage("Google authentication failed.");
      }
    },
    [router],
  );

  const handleGoogleError = useCallback(() => {
    setGoogleAuthMessage("Google sign-in was cancelled or failed. Please retry.");
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row w-full overflow-hidden"
      style={{ background: "#090c0a", fontFamily: "var(--font-martian-mono)" }}
    >
      {/* Left Visual Panel */}
      <AuthVisualPanel />

      {/* Right: Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-10 md:p-16 relative min-h-screen bg-[#090c0a]">
        {/* Scanline overlay on form side */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,80,0.008) 3px, rgba(0,255,80,0.008) 4px)",
          }}
        />

        {/* Mobile header */}
        <div className="lg:hidden absolute top-6 left-6 z-10">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image
              src="/icons/iglogoremovebg.png"
              alt="logo"
              width={28}
              height={28}
            />
            <span
              className="text-sm font-bold tracking-[0.15em] text-emerald-400 uppercase"
              style={{ fontFamily: "var(--font-martian-mono)" }}
            >
              IGNITA
            </span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-md relative z-10"
        >
          {/* Prompt header */}
          <div className="mb-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-emerald-500 text-sm">$</span>
              <span className="text-zinc-400 text-[11px] tracking-widest uppercase">
                ignita auth --login
              </span>
              <span
                className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-1"
                style={{ opacity: blink ? 1 : 0 }}
              />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Sign In
            </h2>
            <p className="text-zinc-600 text-[11px] mt-1 tracking-wider">
              // authenticate to continue
            </p>
          </div>

          {/* Error states */}
          {error && (
            <div className="mb-4 px-4 py-3 border border-red-900/60 bg-red-950/20 rounded text-[11px] text-red-400 font-bold tracking-wide">
              <span className="text-red-600 mr-2">ERR ✗</span>
              {error}
            </div>
          )}
          {googleAuthMessage && (
            <div className="mb-4 px-4 py-3 border border-zinc-700 bg-zinc-900/40 rounded text-[11px] text-zinc-400 tracking-wide">
              <span className="text-yellow-500 mr-2">WARN !</span>
              {googleAuthMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Email field */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-[10px] text-zinc-500 uppercase tracking-[0.18em]"
              >
                // email_address
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-emerald-600 text-[11px] select-none">
                  &gt;
                </span>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="user@domain.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  className="w-full bg-[#0c110d] border border-[#1e301e] text-emerald-300 placeholder-zinc-700 text-[12px] tracking-wide rounded pl-8 pr-4 py-3 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/40 transition-all caret-emerald-400 disabled:opacity-50"
                  style={{ fontFamily: "var(--font-martian-mono)" }}
                />
              </div>
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-[10px] text-zinc-500 uppercase tracking-[0.18em]"
                >
                  // password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[10px] text-emerald-600 hover:text-emerald-400 tracking-wider transition-colors"
                >
                  forgot?
                </Link>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-emerald-600 text-[11px] select-none">
                  &gt;
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  className="w-full bg-[#0c110d] border border-[#1e301e] text-emerald-300 placeholder-zinc-700 text-[12px] tracking-wide rounded pl-8 pr-12 py-3 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/40 transition-all caret-emerald-400 disabled:opacity-50"
                  style={{ fontFamily: "var(--font-martian-mono)" }}
                />
                <button
                  type="button"
                  className="absolute right-3.5 text-zinc-600 hover:text-emerald-400 transition-colors cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-1 relative overflow-hidden bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-zinc-950 font-bold py-3 rounded text-[12px] uppercase tracking-[0.2em] transition-all duration-200 shadow-[0_0_24px_rgba(16,185,129,0.2)] disabled:opacity-50 cursor-pointer"
              style={{ fontFamily: "var(--font-martian-mono)" }}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-zinc-950 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="inline-block w-1.5 h-1.5 bg-zinc-950 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="inline-block w-1.5 h-1.5 bg-zinc-950 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              ) : (
                "$ ./login.sh --exec"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-[#1a2a1a]" />
              <span className="text-[9px] text-zinc-700 font-bold tracking-[0.3em] uppercase">
                or
              </span>
              <div className="h-px flex-1 bg-[#1a2a1a]" />
            </div>

            {/* Google login */}
            <div className="w-full flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="continue_with"
                size="large"
                width="352"
                theme="filled_black"
              />
            </div>

            {/* Sign up link */}
            <p className="text-center text-[11px] text-zinc-600 tracking-wide">
              no account?{" "}
              <Link
                href="/register"
                className="text-emerald-500 hover:text-emerald-300 font-bold tracking-wider transition-colors"
              >
                register --new
              </Link>
            </p>
          </form>

          {/* Back to home */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-zinc-700 hover:text-zinc-400 transition-colors text-[10px] tracking-[0.15em] uppercase"
            >
              <ArrowLeft className="w-3 h-3" />
              cd ~/home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
