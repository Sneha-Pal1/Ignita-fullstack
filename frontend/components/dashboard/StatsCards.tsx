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
        // Assign gradient colors alternately
        const gradients = [
          "from-emerald-500/20 to-teal-500/20",
          "from-teal-500/20 to-emerald-500/20",
          "from-emerald-500/10 to-cyan-500/20",
          "from-teal-500/15 to-cyan-500/15",
        ];
        const glowColors = [
          "emerald-500",
          "teal-500",
          "emerald-500",
          "teal-500",
        ];
        const gradientClass = gradients[index % gradients.length];
        const glowColor = glowColors[index % glowColors.length];

        return (
          <article
            key={stat.id}
            className={`relative group overflow-hidden rounded-2xl p-5 sm:p-6 border border-emerald-500/20 hover:border-emerald-400/30 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-950 ${transitionClass}`}
            role="region"
            aria-label={`${stat.title}: ${stat.value}`}
          >
            {/* Gradient background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-100 ${transitionClass}`}
              aria-hidden="true"
            />

            {/* Glow effect on hover */}
            <div
              className={`absolute -top-8 -right-8 w-24 h-24 bg-${glowColor}/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 ${transitionClass}`}
              aria-hidden="true"
            />

            {/* Dark overlay for glassmorphism */}
            <div
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Content */}
            <div className="relative z-10 space-y-3">
              {/* Icon Container with glow */}
              <div
                className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/30 group-hover:shadow-lg group-hover:shadow-emerald-500/50 ${transitionClass}`}
                aria-hidden="true"
              >
                {iconMap[stat.icon]}
              </div>

              {/* Stats Label */}
              <h3 className="text-xs sm:text-sm text-zinc-400 font-medium tracking-widest uppercase leading-tight">
                {stat.title}
              </h3>

              {/* Stats Value */}
              <p
                className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-white tabular-nums leading-tight group-hover:text-emerald-300 ${transitionClass}`}
                role="status"
                aria-live="polite"
              >
                {stat.value}
              </p>
            </div>

            {/* Bottom accent gradient line */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-transparent transform origin-left scale-x-0 group-hover:scale-x-100 ${transitionClass}`}
              aria-hidden="true"
            />

            {/* Border glow effect */}
            <div
              className={`absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 ${transitionClass}`}
              style={{
                boxShadow: "inset 0 0 20px rgba(16, 185, 129, 0.1)",
              }}
              aria-hidden="true"
            />
          </article>
        );
      })}
    </section>
  );
};
