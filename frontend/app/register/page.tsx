"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/use-auth";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

const roleOptions = [
  { value: "STUDENT", label: "Student Developer" },
  { value: "USER", label: "General Professional" },
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
    if (password !== confirmPassword) return;

    try {
      const response = await register({
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password,
        role,
      });
      router.push(response.user?.role === "ADMIN" ? "/create" : "/events");
    } catch {
      // Handled in useAuth
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0e0e0d] text-[#f4f4f0] flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden">
      {/* Background Amber Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFB100]/10 blur-[180px] rounded-full" />

      {/* Main Container Card */}
      <div className="w-full max-w-lg bg-[#141413] border border-white/10 p-8 sm:p-10 relative z-10 my-10">
        {/* Top Amber Bar */}
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
            <span>REGISTRATION</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white">
            CREATE ACCOUNT
          </h1>
          <p className="mt-2 text-xs font-mono text-[#8a8a86]">
            ALREADY HAVE AN ACCOUNT?{" "}
            <Link href="/login" className="text-[#FFB100] hover:underline">
              SIGN IN HERE
            </Link>
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-4">
          
          {/* Role */}
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-[#FFB100] mb-2">
              ACCOUNT TYPE
            </label>
            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value as (typeof roleOptions)[number]["value"])
              }
              className="w-full bg-[#1c1c1a] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FFB100] transition-colors font-mono cursor-pointer"
            >
              {roleOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#1c1c1a] text-white">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Full Name */}
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-[#FFB100] mb-2">
              FULL NAME
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="w-full bg-[#1c1c1a] border border-white/10 px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#FFB100] transition-colors font-mono"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-[#FFB100] mb-2">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full bg-[#1c1c1a] border border-white/10 px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#FFB100] transition-colors font-mono"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-[#FFB100] mb-2">
              PHONE NUMBER
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-[#1c1c1a] border border-white/10 px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#FFB100] transition-colors font-mono"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-[#FFB100] mb-2">
              PASSWORD
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 characters"
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

          {/* Confirm Password */}
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-widest text-[#FFB100] mb-2">
              CONFIRM PASSWORD
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full bg-[#1c1c1a] border border-white/10 px-4 py-3 pr-10 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#FFB100] transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8a86] hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {password !== confirmPassword && confirmPassword && (
              <span className="font-mono text-[10px] text-red-400 mt-1 block">
                PASSWORDS DO NOT MATCH
              </span>
            )}
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="terms"
              required
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 bg-[#1c1c1a] border-white/20 accent-[#FFB100] cursor-pointer"
            />
            <label htmlFor="terms" className="font-mono text-[10px] text-[#8a8a86] leading-relaxed">
              I AGREE TO IGNITA&apos;S{" "}
              <span className="text-[#FFB100] underline">TERMS</span> &{" "}
              <span className="text-[#FFB100] underline">PRIVACY POLICY</span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || password !== confirmPassword || !agreedToTerms}
            className="w-full bg-[#FFB100] text-black font-semibold font-mono text-xs uppercase tracking-widest py-3.5 hover:bg-[#ffbe25] transition-colors cursor-pointer mt-4"
          >
            {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT →"}
          </button>
        </form>

        {/* Back link */}
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
