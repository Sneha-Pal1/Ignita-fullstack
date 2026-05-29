"use client";

import { useMotionPreference } from "@/hooks/useMotionPreference";
import { HugeiconsIcon } from "@hugeicons/react";

interface StatCard {
  id: string;
  title: string;
  value: string | number;
  icon: any;
  color: string;
}

const colorMap: Record<string, string> = {
  emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  teal: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
};

interface CompactStatsCardsProps {
  stats: StatCard[];
}

export const CompactStatsCards = ({ stats }: CompactStatsCardsProps) => {
  const prefersReducedMotion = useMotionPreference();
  const transitionClass = prefersReducedMotion
    ? ""
    : "transition-all duration-300";

  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      aria-label="Dashboard statistics"
      role="region"
    >
      {stats.map((stat) => (
        <article
          key={stat.id}
          className={`
            relative group rounded-xl p-4 border border-zinc-800 bg-zinc-900/50
            hover:border-zinc-700 hover:bg-zinc-900 
            ${transitionClass}
          `}
          role="region"
          aria-label={`${stat.title}: ${stat.value}`}
        >
          {/* Icon */}
          <div
            className={`inline-flex items-center justify-center w-9 h-9 rounded-lg mb-3 ${colorMap[stat.color]} border`}
          >
            <HugeiconsIcon icon={stat.icon} size="20" strokeWidth={2} />
          </div>

          {/* Value */}
          <p className="text-2xl font-bold text-white mb-1 tabular-nums">
            {stat.value}
          </p>

          {/* Label */}
          <p className="text-xs text-zinc-400 font-medium">{stat.title}</p>
        </article>
      ))}
    </section>
  );
};
