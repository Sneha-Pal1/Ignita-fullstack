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
  const [googleAuthMessage, setGoogleAuthMessage] = useState<string | null>(
    null,
  );
  const router = useRouter();
  const { login, loading, error } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      console.log(res);
      // Add small delay to ensure auth context updates
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
    setGoogleAuthMessage(
      "Google sign-in was cancelled or failed. Please retry.",
    );
  }, []);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Ignita</h1>
          <p className="auth-subtitle">Welcome back to your event hub</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <h2 className="form-heading">Sign In</h2>
          <p className="form-description">
            Enter your credentials to access your account
          </p>

          {error && (
            <div className="p-3 bg-red-950/40 border border-red-900/50 rounded-lg mb-4">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {googleAuthMessage && (
            <div className="p-3 bg-zinc-800 border border-zinc-700 rounded-lg mb-4">
              <p className="text-sm text-zinc-200">{googleAuthMessage}</p>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="form-label" style={{ margin: 0 }}>
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                tabIndex={0}
              >
                Forgot password?
              </a>
            </div>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                disabled={loading}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-zinc-700" />
            <span className="text-xs text-zinc-400 tracking-[0.22em]">OR</span>
            <div className="h-px flex-1 bg-zinc-700" />
          </div>

          <div className="w-full flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              text="continue_with"
              size="large"
              width="320"
            />
          </div>

          <p className="auth-footer">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="auth-link">
              Sign up
            </Link>
          </p>
        </form>

        <Link href="/" className="back-button flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
