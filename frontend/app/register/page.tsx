"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/use-auth";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

const roleOptions = [
  { value: "STUDENT", label: "Student" },
  { value: "USER", label: "General User" },
] as const;

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] =
    useState<(typeof roleOptions)[number]["value"]>("STUDENT");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();
  const { register, loading, error } = useAuth();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Read directly from DOM — captures browser autofill that bypasses React onChange
    const emailVal = (form.elements.namedItem("email") as HTMLInputElement)?.value?.trim().toLowerCase() || email.trim().toLowerCase();
    const nameVal = (form.elements.namedItem("name") as HTMLInputElement)?.value?.trim() || fullName.trim();
    const phoneVal = (form.elements.namedItem("phone") as HTMLInputElement)?.value?.trim() || phone.trim();
    const passwordVal = (form.elements.namedItem("password") as HTMLInputElement)?.value || password;
    const confirmPasswordVal = (form.elements.namedItem("confirmPassword") as HTMLInputElement)?.value || confirmPassword;

    console.log("📝 Form values on submit:", { emailVal, nameVal, phoneVal, role });

    if (passwordVal !== confirmPasswordVal) {
      return;
    }
    try {
      const response = await register({
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        password: passwordVal,
        role,
      });
      router.push(response.user?.role === "ADMIN" ? "/create" : "/events");
    } catch {
      // Error is handled by useAuth hook
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Ignita</h1>
          <p className="auth-subtitle">
            Join thousands of students discovering events
          </p>
        </div>

        <form onSubmit={handleSignUp} className="auth-form">
          <h2 className="form-heading">Create Account</h2>
          <p className="form-description">
            Get started with your free Ignita account
          </p>

          {error && (
            <div className="p-3 bg-red-950/40 border border-red-900/50 rounded-lg mb-4">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) =>
                setRole(e.target.value as (typeof roleOptions)[number]["value"])
              }
              className="form-input"
              disabled={loading}
              required
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-2">
              Admin accounts are created separately.
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              id="fullName"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="form-input"
              disabled={loading}
              required
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              disabled={loading}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
              disabled={loading}
              required
              autoComplete="tel"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="password-input-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                disabled={loading}
                required
                autoComplete="new-password"
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

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <div className="password-input-wrapper">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input"
                disabled={loading}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {password !== confirmPassword && confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          <div className="form-group checkbox-group">
            <input
              id="terms"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="checkbox-input"
              disabled={loading}
              required
            />
            <label htmlFor="terms" className="checkbox-label">
              I agree to the{" "}
              <Link href="#" className="auth-link">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="auth-link">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading || password !== confirmPassword}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="auth-footer">
            Already have an account?{" "}
            <Link href="/login" className="auth-link">
              Sign in
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
