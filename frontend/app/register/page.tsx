"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/use-auth";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import AuthVisualPanel from "@/components/auth/AuthVisualPanel";

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

    const emailVal =
      (form.elements.namedItem("email") as HTMLInputElement)?.value?.trim().toLowerCase() ||
      email.trim().toLowerCase();
    const nameVal =
      (form.elements.namedItem("name") as HTMLInputElement)?.value?.trim() || fullName.trim();
    const phoneVal =
      (form.elements.namedItem("phone") as HTMLInputElement)?.value?.trim() || phone.trim();
    const passwordVal =
      (form.elements.namedItem("password") as HTMLInputElement)?.value || password;
    const confirmPasswordVal =
      (form.elements.namedItem("confirmPassword") as HTMLInputElement)?.value || confirmPassword;

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
    <div className="min-h-screen flex flex-col lg:flex-row w-full bg-[#0d1117]">
      {/* Left Visual Banner Section */}
      <AuthVisualPanel />

      {/* Right Auth Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 sm:px-12 min-h-screen">
        {/* Mobile Header Logo */}
        <div className="lg:hidden w-full max-w-sm mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image
              src="/icons/iglogoremovebg.png"
              alt="logo"
              width={24}
              height={24}
            />
            <span className="text-sm font-semibold text-[#e6edf3]">Ignita</span>
          </Link>
        </div>

        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-xl font-semibold text-[#e6edf3] tracking-tight">
              Create an account
            </h1>
            <p className="mt-1 text-sm text-[#7d8590]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#3fb950] hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            {error && (
              <div className="px-4 py-3 rounded-md border border-[#f85149]/30 bg-[#f85149]/5 text-sm text-[#f85149]">
                {error}
              </div>
            )}

            {/* Role Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="role"
                className="text-sm font-medium text-[#e6edf3]"
              >
                I am a
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) =>
                  setRole(e.target.value as (typeof roleOptions)[number]["value"])
                }
                className="w-full px-3 py-2 text-sm text-[#e6edf3] bg-[#161b22] border border-[#30363d] rounded-md focus:outline-none focus:border-[#2ea043] hover:border-[#484f58] transition-colors cursor-pointer"
                disabled={loading}
                required
              >
                {roleOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-[#161b22] text-[#e6edf3]"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-[#e6edf3]"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="name"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading}
                required
                autoComplete="name"
                className="w-full px-3 py-2 text-sm text-[#e6edf3] placeholder-[#484f58] bg-[#0d1117] border border-[#30363d] rounded-md focus:outline-none focus:border-[#2ea043] focus:ring-1 focus:ring-[#2ea043]/30 transition-colors disabled:opacity-50"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#e6edf3]"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                autoComplete="email"
                className="w-full px-3 py-2 text-sm text-[#e6edf3] placeholder-[#484f58] bg-[#0d1117] border border-[#30363d] rounded-md focus:outline-none focus:border-[#2ea043] focus:ring-1 focus:ring-[#2ea043]/30 transition-colors disabled:opacity-50"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-[#e6edf3]"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
                required
                autoComplete="tel"
                className="w-full px-3 py-2 text-sm text-[#e6edf3] placeholder-[#484f58] bg-[#0d1117] border border-[#30363d] rounded-md focus:outline-none focus:border-[#2ea043] focus:ring-1 focus:ring-[#2ea043]/30 transition-colors disabled:opacity-50"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[#e6edf3]"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password (min 6 chars)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  autoComplete="new-password"
                  className="w-full px-3 py-2 pr-10 text-sm text-[#e6edf3] placeholder-[#484f58] bg-[#0d1117] border border-[#30363d] rounded-md focus:outline-none focus:border-[#2ea043] focus:ring-1 focus:ring-[#2ea043]/30 transition-colors disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#484f58] hover:text-[#7d8590] transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-[#e6edf3]"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  required
                  autoComplete="new-password"
                  className="w-full px-3 py-2 pr-10 text-sm text-[#e6edf3] placeholder-[#484f58] bg-[#0d1117] border border-[#30363d] rounded-md focus:outline-none focus:border-[#2ea043] focus:ring-1 focus:ring-[#2ea043]/30 transition-colors disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#484f58] hover:text-[#7d8590] transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {password !== confirmPassword && confirmPassword && (
                <span className="text-xs text-[#f85149] font-medium mt-0.5">
                  Passwords do not match
                </span>
              )}
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-2.5 my-1">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-[#30363d] bg-[#0d1117] text-[#2ea043] focus:ring-[#2ea043]/20 focus:ring-offset-[#0d1117] accent-[#2ea043] cursor-pointer"
                disabled={loading}
                required
              />
              <label
                htmlFor="terms"
                className="text-xs text-[#7d8590] leading-normal select-none"
              >
                I agree to the{" "}
                <Link href="#" className="text-[#3fb950] hover:underline font-medium">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-[#3fb950] hover:underline font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 text-sm font-medium text-white bg-[#2ea043] hover:bg-[#3fb950] rounded-md transition-colors disabled:opacity-50 cursor-pointer mt-1"
              disabled={loading || password !== confirmPassword || !agreedToTerms}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Back to Home */}
          <div className="mt-8 pt-6 border-t border-[#21262d]">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#7d8590] hover:text-[#e6edf3] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
