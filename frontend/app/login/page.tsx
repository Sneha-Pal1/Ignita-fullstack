"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/use-auth";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import type { JwtPayload } from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { authAPI } from "@/lib/auth";

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
  const router = useRouter();
  const { login, loading, error } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      setTimeout(() => {
        router.push(res.user?.role === "ADMIN" ? "/create" : "/events");
      }, 100);
    } catch {
      // Error handled in useAuth
    }
  };

  const handleGoogleSuccess = useCallback(
    async (credentialResponse: CredentialResponse) => {
      try {
        if (!credentialResponse.credential) return;
        const decoded = jwtDecode<GoogleCredentialPayload>(
          credentialResponse.credential,
        );
        const response = await authAPI.googleLogin({
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture,
        });
        router.push(response.user?.role === "ADMIN" ? "/admin" : "/events");
      } catch (error) {
        console.error("Google login failed", error);
        setGoogleAuthMessage("Google authentication failed. Please try again.");
      }
    },
    [router],
  );

  const handleGoogleError = useCallback(() => {
    setGoogleAuthMessage("Google sign-in was cancelled or failed. Please retry.");
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0e0e0d] text-[#f4f4f0] flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden">
      
      {/* Background Amber Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#FFB100]/10 blur-[180px] rounded-full" />

      {/* Main Container Card */}
      <div className="w-full max-w-md bg-[#141413] border border-white/10 p-8 sm:p-10 relative z-10">
        
        {/* Top Amber Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFB100]" />

        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
            <span className="h-2.5 w-2.5 bg-[#FFB100] group-hover:scale-125 transition-transform" />
            <span className="font-mono text-base font-bold tracking-widest text-white uppercase">
              IGNITA
            </span>
          </Link>

          <div className="levo-eyebrow justify-center mb-2">
            <span>AUTHENTICATION</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white">
            SIGN IN
          </h1>
          <p className="mt-2 text-xs font-mono text-[#8a8a86]">
            DON&apos;T HAVE AN ACCOUNT?{" "}
            <Link
              href="/register"
              className="text-[#FFB100] hover:underline"
            >
              SIGN UP NOW
            </Link>
          </p>
        </div>

        {/* Error Notifications */}
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs">
            {error}
          </div>
        )}
        {googleAuthMessage && (
          <div className="mb-6 p-3 bg-white/5 border border-white/10 text-[#8a8a86] font-mono text-xs">
            {googleAuthMessage}
          </div>
        )}

        {/* Google OAuth Button */}
        <div className="w-full flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            text="continue_with"
            size="large"
            theme="filled_black"
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6 font-mono text-[10px] text-[#8a8a86] uppercase">
          <div className="h-px flex-1 bg-white/10" />
          <span>OR EMAIL</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-[#FFB100] mb-2">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder="developer@ignita.io"
              className="w-full bg-[#1c1c1a] border border-white/10 px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#FFB100] transition-colors font-mono"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block font-mono text-[11px] uppercase tracking-widest text-[#FFB100]">
                PASSWORD
              </label>
              <Link
                href="/forgot-password"
                className="font-mono text-[10px] uppercase text-[#8a8a86] hover:text-white transition-colors"
              >
                FORGOT?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="••••••••••••"
                className="w-full bg-[#1c1c1a] border border-white/10 px-4 py-3 pr-10 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#FFB100] transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8a86] hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFB100] text-black font-semibold font-mono text-xs uppercase tracking-widest py-3.5 hover:bg-[#ffbe25] transition-colors cursor-pointer"
          >
            {loading ? "AUTHENTICATING..." : "SIGN IN →"}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#8a8a86] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO HOME</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
