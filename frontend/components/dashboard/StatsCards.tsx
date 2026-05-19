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
    : "transition-all duration-300";

  return (
    <section
      className="grid grid-cols-2 gap-3 sm:gap-4"
      aria-label="Dashboard statistics overview"
      role="region"
    >
      {stats.map((stat, index) => {
        return (
          <article
            key={stat.id}
            className={`relative group overflow-hidden rounded-xl p-5 sm:p-6 border border-zinc-800 bg-zinc-900 hover:border-zinc-700 focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:ring-offset-2 focus-within:ring-offset-zinc-950 ${transitionClass}`}
            role="region"
            aria-label={`${stat.title}: ${stat.value}`}
          >
            {/* Content */}
            <div className="relative z-10 space-y-3">
              {/* Icon Container */}
              <div
                className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-zinc-800 text-emerald-400 ${transitionClass}`}
                aria-hidden="true"
              >
                {iconMap[stat.icon]}
              </div>

              {/* Stats Label */}
              <h3 className="text-xs sm:text-sm text-zinc-500 font-medium tracking-wide uppercase leading-tight">
                {stat.title}
              </h3>

              {/* Stats Value */}
              <p
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-white tabular-nums leading-tight ${transitionClass}`}
                role="status"
                aria-live="polite"
              >
                {stat.value}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
};
