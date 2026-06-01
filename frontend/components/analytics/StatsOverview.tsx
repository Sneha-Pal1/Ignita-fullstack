"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import type { ElementType } from "react";

interface StatItem {
  label: string;
  value: string | number;
  icon: ElementType;
  accent: "emerald" | "cyan" | "violet" | "amber";
}

interface StatsOverviewProps {
  stats?: StatItem[];
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const items = stats ?? [];

  const accentMap: Record<StatItem["accent"], string> = {
    emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    cyan: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
    violet: "border-violet-500/20 bg-violet-500/10 text-violet-300",
    amber: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((stat, index) => (
        <div
          key={index}
          className="flex min-h-[132px] flex-col justify-between rounded-[20px] border border-zinc-800 bg-zinc-900/70 p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div
              className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border ${accentMap[stat.accent]}`}
            >
              <HugeiconsIcon icon={stat.icon} size="16" strokeWidth={2} />
            </div>
          </div>

          <div className="space-y-1.5">
            <div>
              <p className="text-sm font-medium text-zinc-400">{stat.label}</p>
              <h3 className="mt-1 text-[1.75rem] font-semibold tracking-tight text-white tabular-nums">
                {stat.value}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
