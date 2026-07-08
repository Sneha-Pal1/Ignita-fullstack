"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/use-auth";
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User, Phone } from "lucide-react";
import AuthVisualPanel from "@/components/auth/AuthVisualPanel";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";

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
    <div className="min-h-screen bg-zinc-950 flex flex-col lg:flex-row w-full overflow-hidden">
      {/* Left Visual Banner Section */}
      <AuthVisualPanel />

      {/* Right Auth Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-10 md:p-16 relative min-h-screen bg-zinc-950">
        
        {/* Mobile Header Logo */}
        <div className="lg:hidden absolute top-6 left-6">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image
              src="/icons/iglogoremovebg.png"
              alt="logo"
              width={32}
              height={32}
            />
            <span className="text-lg font-bold text-white font-schibsted-grotesk">IGNITA</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md my-8 lg:my-0"
        >
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">Create Account</h2>
              <p className="text-zinc-400 text-xs mt-1">
                Get started with your free Ignita account
              </p>
            </div>

            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
              {error && (
                <div className="p-3.5 bg-red-950/40 border border-red-900/50 rounded-xl">
                  <p className="text-xs text-red-300 font-medium">{error}</p>
                </div>
              )}

              {/* Custom Role Dropdown */}
              <div className="w-full flex flex-col gap-1.5">
                <label htmlFor="role" className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  I am a
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value as (typeof roleOptions)[number]["value"])
                  }
                  className="w-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 rounded-xl py-3 px-4 outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200 cursor-pointer"
                  disabled={loading}
                  required
                >
                  {roleOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-zinc-900 text-zinc-100">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                id="fullName"
                name="name"
                type="text"
                label="Full Name"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading}
                required
                autoComplete="name"
                icon={<User className="w-4 h-4 text-zinc-500" />}
              />

              <Input
                id="email"
                name="email"
                type="email"
                label="Email address"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                autoComplete="email"
                icon={<Mail className="w-4 h-4 text-zinc-500" />}
              />

              <Input
                id="phone"
                name="phone"
                type="tel"
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
                required
                autoComplete="tel"
                icon={<Phone className="w-4 h-4 text-zinc-500" />}
              />

              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Create a password (min 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                autoComplete="new-password"
                icon={<Lock className="w-4 h-4 text-zinc-500" />}
                suffix={
                  <button
                    type="button"
                    className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer flex items-center justify-center"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />

              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                required
                autoComplete="new-password"
                icon={<Lock className="w-4 h-4 text-zinc-500" />}
                error={password !== confirmPassword && confirmPassword ? "Passwords do not match" : undefined}
                suffix={
                  <button
                    type="button"
                    className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer flex items-center justify-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />

              {/* Custom styled checkbox */}
              <div className="flex items-start gap-2.5 my-1">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-zinc-800 bg-zinc-950 text-emerald-500 focus:ring-emerald-500/20 focus:ring-offset-zinc-950 accent-emerald-500 cursor-pointer"
                  disabled={loading}
                  required
                />
                <label htmlFor="terms" className="text-xs text-zinc-400 leading-normal select-none">
                  I agree to the{" "}
                  <Link href="#" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-zinc-950 font-bold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/10 cursor-pointer mt-2 text-sm disabled:opacity-50 disabled:pointer-events-none"
                disabled={loading || password !== confirmPassword || !agreedToTerms}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <p className="text-center text-zinc-400 text-xs mt-4">
                Already have an account?{" "}
                <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                  Sign in
                </Link>
              </p>
            </form>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-xs font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
