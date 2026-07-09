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
  emerald: "text-[#3fb950] bg-[#2ea043]/10 border-[#238636]/30",
  teal: "text-[#3fb950] bg-[#2ea043]/10 border-[#238636]/30",
  amber: "text-[#3fb950] bg-[#2ea043]/10 border-[#238636]/30",
  cyan: "text-[#3fb950] bg-[#2ea043]/10 border-[#238636]/30",
};

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
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      aria-label="Dashboard statistics"
      role="region"
    >
      {stats.map((stat) => (
        <article
          key={stat.id}
          className={`
            relative group rounded-md p-4 border border-[#21262d] bg-[#161b22]
            hover:border-[#30363d]
            ${transitionClass}
          `}
          role="region"
          aria-label={`${stat.title}: ${stat.value}`}
        >
          {/* Icon */}
          <div
            className={`inline-flex items-center justify-center w-8 h-8 rounded-md mb-3 ${colorMap[stat.color]} border`}
          >
            <HugeiconsIcon icon={stat.icon} size="16" strokeWidth={2} />
          </div>

          {/* Value */}
          <p className="text-xl font-bold text-[#e6edf3] mb-1 tabular-nums">
            {stat.value}
          </p>

          {/* Label */}
          <p className="text-xs text-[#7d8590] font-medium">{stat.title}</p>
        </article>
      ))}
    </section>
  );
};
