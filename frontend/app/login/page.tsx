"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Login attempt:", { email, password, rememberMe });
    // You can add authentication logic here
  };

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
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁️
              </button>
            </div>
          </div>

          <div className="form-group checkbox-group">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="checkbox-input"
            />
            <label htmlFor="remember" className="checkbox-label">
              Remember me
            </label>
            <Link href="#" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="auth-button">
            Sign In
          </button>

          <p className="auth-footer">
            Don't have an account?{" "}
            <Link href="/register" className="auth-link">
              Sign up
            </Link>
          </p>
        </form>

        <Link href="/" className="back-button">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
