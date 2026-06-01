"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import type { ElementType } from "react";

interface StatItem {
  label: string;
  value: string | number;
  trendLabel: string;
  trendDirection: "up" | "down" | "flat";
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

  const trendClassMap: Record<StatItem["trendDirection"], string> = {
    up: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
    down: "text-rose-300 bg-rose-500/10 border-rose-500/20",
    flat: "text-zinc-300 bg-zinc-800/80 border-zinc-700",
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((stat, index) => (
        <div
          key={index}
          className="group flex min-h-[148px] flex-col justify-between rounded-[24px] border border-zinc-800 bg-zinc-900/70 p-5 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
        >
          <div className="flex items-start justify-between gap-4">
            <div
              className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border ${accentMap[stat.accent]}`}
            >
              <HugeiconsIcon icon={stat.icon} size="18" strokeWidth={2} />
            </div>
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium ${trendClassMap[stat.trendDirection]}`}
            >
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size="12"
                strokeWidth={2}
                className={
                  stat.trendDirection === "down"
                    ? "rotate-90"
                    : stat.trendDirection === "up"
                      ? "-rotate-45"
                      : "rotate-0"
                }
              />
              {stat.trendDirection === "flat"
                ? "Stable"
                : stat.trendDirection === "up"
                  ? "Up"
                  : "Down"}
            </span>
          </div>

          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium text-zinc-400">{stat.label}</p>
              <h3 className="mt-1 text-3xl font-semibold tracking-tight text-white tabular-nums">
                {stat.value}
              </h3>
            </div>
            <p className="text-xs leading-5 text-zinc-500">{stat.trendLabel}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
