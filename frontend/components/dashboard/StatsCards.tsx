"use client";

import { stats } from "@/lib/data/dashboard";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { Calendar, Bookmark, Bell, Upload } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  calendar: <Calendar className="w-6 h-6 sm:w-7 sm:h-7" />,
  bookmark: <Bookmark className="w-6 h-6 sm:w-7 sm:h-7" />,
  bell: <Bell className="w-6 h-6 sm:w-7 sm:h-7" />,
  share2: <Upload className="w-6 h-6 sm:w-7 sm:h-7" />,
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
          className={`relative p-6 sm:p-8 rounded-2xl bg-transparent border border-slate-700/50 hover:border-slate-600 hover:bg-slate-900/30 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-950 overflow-hidden group ${transitionClass}`}
          role="region"
          aria-label={`${stat.title}: ${stat.value}`}
        >
          {/* Icon Container */}
          <div className="text-cyan-400 mb-4 sm:mb-6" aria-hidden="true">
            {iconMap[stat.icon]}
          </div>

          {/* Stats Content */}
          <div className="space-y-2 sm:space-y-3">
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
            className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transform origin-left ${
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
