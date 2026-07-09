"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/use-auth";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import type { JwtPayload } from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { authAPI } from "@/lib/auth";
import AuthVisualPanel from "@/components/auth/AuthVisualPanel";

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
    <div className="min-h-screen flex flex-col lg:flex-row w-full bg-[#0d1117]">
      {/* Left panel */}
      <AuthVisualPanel />

      {/* Right — form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 sm:px-12 min-h-screen">

        {/* Mobile logo */}
        <div className="lg:hidden w-full max-w-sm mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/icons/iglogoremovebg.png" alt="Ignita" width={24} height={24} />
            <span className="text-sm font-semibold text-[#e6edf3]">Ignita</span>
          </Link>
        </div>

        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-xl font-semibold text-[#e6edf3] tracking-tight">
              Sign in to Ignita
            </h1>
            <p className="mt-1 text-sm text-[#7d8590]">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-[#3fb950] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Error messages */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-md border border-[#f85149]/30 bg-[#f85149]/5 text-sm text-[#f85149]">
              {error}
            </div>
          )}
          {googleAuthMessage && (
            <div className="mb-5 px-4 py-3 rounded-md border border-[#30363d] bg-[#161b22] text-sm text-[#7d8590]">
              {googleAuthMessage}
            </div>
          )}

          {/* Google sign in */}
          <div className="w-full flex justify-center mb-5">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              text="continue_with"
              size="large"
              width="384"
              theme="filled_black"
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-[#21262d]" />
            <span className="text-xs text-[#484f58]">or</span>
            <div className="h-px flex-1 bg-[#21262d]" />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#e6edf3]"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                className="w-full px-3 py-2 text-sm text-[#e6edf3] placeholder-[#484f58] bg-[#0d1117] border border-[#30363d] rounded-md focus:outline-none focus:border-[#2ea043] focus:ring-1 focus:ring-[#2ea043]/30 transition-colors disabled:opacity-50"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-[#e6edf3]"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#7d8590] hover:text-[#e6edf3] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  className="w-full px-3 py-2 pr-10 text-sm text-[#e6edf3] placeholder-[#484f58] bg-[#0d1117] border border-[#30363d] rounded-md focus:outline-none focus:border-[#2ea043] focus:ring-1 focus:ring-[#2ea043]/30 transition-colors disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#484f58] hover:text-[#7d8590] transition-colors cursor-pointer"
                >
                  {showPassword
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye className="w-4 h-4" />
                  }
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 text-sm font-medium text-white bg-[#2ea043] hover:bg-[#3fb950] rounded-md transition-colors disabled:opacity-50 cursor-pointer mt-1"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Back */}
          <div className="mt-8 pt-6 border-t border-[#21262d]">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#7d8590] hover:text-[#e6edf3] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
