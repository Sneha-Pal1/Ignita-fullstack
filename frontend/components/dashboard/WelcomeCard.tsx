"use client";

import { useAuthContext } from "@/lib/auth-context";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { Sparkles } from "lucide-react";

export const WelcomeCard = () => {
  const { user } = useAuthContext();
  const firstName = user?.name?.split(" ")[0] || "User";
  const prefersReducedMotion = useMotionPreference();

  // Generate a random motivational line
  const motivationalLines = [
    "Keep pushing forward, you're unstoppable",
    "Every moment counts, make them matter",
    "Your potential is limitless",
    "Stay focused, stay fierce",
    "Progress over perfection",
  ];
  const motivationalLine =
    motivationalLines[Math.floor(Math.random() * motivationalLines.length)];

  return (
    <div className="relative group h-full">
      {/* Main card */}
      <div className="relative h-full p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden hover:border-zinc-700 transition-colors duration-200">
        {/* Content */}
        <div className="relative z-10">
          {/* Greeting */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs sm:text-sm text-emerald-400/80 font-medium mb-2 tracking-wide">
                Welcome back
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                {firstName}
              </h1>
            </div>
            <div className="text-emerald-400 opacity-50">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          {/* Motivational line */}
          <p className="text-base sm:text-lg text-zinc-300 mb-6 leading-relaxed">
            {motivationalLine}
          </p>

          {/* Quick stats row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500 font-medium mb-1">
                Today's Focus
              </span>
              <span className="text-lg sm:text-xl font-semibold text-emerald-400">
                In Progress
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500 font-medium mb-1">
                Streak
              </span>
              <span className="text-lg sm:text-xl font-semibold text-teal-400">
                7 days
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
