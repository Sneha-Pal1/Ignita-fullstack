"use client";

import { useAuthContext } from "@/lib/auth-context";
import { useMotionPreference } from "@/hooks/useMotionPreference";

export const DashboardHero = () => {
  const { user } = useAuthContext();
  const firstName = user?.name?.split(" ")[0] || "User";
  const prefersReducedMotion = useMotionPreference();
  const transitionClass = prefersReducedMotion
    ? ""
    : "transition-all duration-300";

  return (
    <header className="relative mb-12 sm:mb-16">
      <div className={`px-0 ${transitionClass}`}>
        {/* Main Heading with WCAG AA+ contrast */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          Welcome back,{" "}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 mt-2 sm:mt-3">
            {firstName}
          </span>
        </h1>

        {/* Subheading with proper contrast */}
        <p className="text-lg sm:text-xl text-slate-200 leading-relaxed max-w-3xl">
          Track your saved events, alerts, and activity in one place
        </p>
      </div>
    </header>
  );
};
