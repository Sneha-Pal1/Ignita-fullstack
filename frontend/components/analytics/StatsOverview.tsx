"use client";

import { HugeiconsIcon } from "@hugeicons/react";

interface StatItem {
  label: string;
  value: string | number;
  icon: unknown;
  accent: "emerald" | "cyan" | "violet" | "amber";
}

interface StatsOverviewProps {
  stats?: StatItem[];
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const items = stats ?? [];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 font-mono">
      {items.map((stat, index) => (
        <div
          key={index}
          className="flex min-h-[120px] flex-col justify-between border border-white/10 bg-[#141413] p-5 hover:border-[#FFB100]/40 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="inline-flex h-8 w-8 items-center justify-center border border-[#FFB100]/30 bg-[#FFB100]/10 text-[#FFB100]">
              <HugeiconsIcon
                icon={stat.icon as any}
                size={16}
                strokeWidth={2}
              />
            </div>
            <span className="text-[10px] text-[#8a8a86] tracking-wider uppercase">0{index + 1}</span>
          </div>

          <div className="space-y-1 mt-4">
            <p className="text-xs text-[#8a8a86] uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-2xl font-bold tracking-tight text-white tabular-nums">
              {stat.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
