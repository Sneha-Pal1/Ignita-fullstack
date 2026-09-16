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

interface CompactStatsCardsProps {
  stats: StatCard[];
}

export const CompactStatsCards = ({ stats }: CompactStatsCardsProps) => {
  const prefersReducedMotion = useMotionPreference();
  const transitionClass = prefersReducedMotion
    ? ""
    : "transition-all duration-200";

  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono"
      aria-label="Dashboard statistics"
      role="region"
    >
      {stats.map((stat) => (
        <article
          key={stat.id}
          className={`
            relative group p-5 border border-white/10 bg-[#141413]
            hover:border-[#FFB100]/60 hover:bg-[#181816]
            ${transitionClass}
          `}
          role="region"
          aria-label={`${stat.title}: ${stat.value}`}
        >
          {/* Top Amber Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#FFB100] transition-colors" />

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-8 h-8 bg-[#1c1c1a] border border-[#FFB100] text-[#FFB100] mb-3">
            <HugeiconsIcon icon={stat.icon} size="16" strokeWidth={2} />
          </div>

          {/* Value */}
          <p className="text-2xl font-bold text-white mb-1 tabular-nums">
            {stat.value}
          </p>

          {/* Label */}
          <p className="text-[11px] text-[#8a8a86] uppercase tracking-wider">{stat.title}</p>
        </article>
      ))}
    </section>
  );
};
