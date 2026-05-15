"use client";

import { Calendar, Bookmark, Bell, Share2 } from "lucide-react";
import { stats } from "@/lib/data/dashboard";
import { useMotionPreference } from "@/hooks/useMotionPreference";

const iconMap: Record<string, React.ReactNode> = {
  calendar: <Calendar className="w-7 h-7 sm:w-8 sm:h-8" />,
  bookmark: <Bookmark className="w-7 h-7 sm:w-8 sm:h-8" />,
  bell: <Bell className="w-7 h-7 sm:w-8 sm:h-8" />,
  share2: <Share2 className="w-7 h-7 sm:w-8 sm:h-8" />,
};

export const StatsCards = () => {
  const prefersReducedMotion = useMotionPreference();
  const transitionClass = prefersReducedMotion
    ? ""
    : "transition-all duration-200";

  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16"
      aria-label="Dashboard statistics overview"
      role="region"
    >
      {stats.map((stat) => (
        <article
          key={stat.id}
          className={`relative p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 hover:bg-slate-800/70 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-900 overflow-hidden group ${transitionClass}`}
          role="region"
          aria-label={`${stat.title}: ${stat.value}`}
        >
          {/* Icon Container - Min 44x44px for touch */}
          <div
            className="inline-flex items-center justify-center min-w-12 min-h-12 p-3 rounded-lg sm:rounded-xl bg-slate-700/60 mb-5 sm:mb-6 text-blue-400 flex-shrink-0 group-hover:bg-slate-600/80 ${transitionClass}"
            aria-hidden="true"
          >
            {iconMap[stat.icon]}
          </div>

          {/* Stats Content */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-slate-400 text-xs sm:text-sm font-medium tracking-widest uppercase leading-tight">
              {stat.title}
            </h3>
            <p
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tabular-nums leading-tight"
              role="status"
              aria-live="polite"
            >
              {stat.value}
            </p>
          </div>

          {/* Bottom accent line - Motion-friendly */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform origin-left ${
              prefersReducedMotion
                ? "scale-x-0"
                : "scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100"
            } ${transitionClass}`}
            aria-hidden="true"
          />
        </article>
      ))}
    </section>
  );
};
