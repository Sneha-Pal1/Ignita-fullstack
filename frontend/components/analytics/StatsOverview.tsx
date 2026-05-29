"use client";

import { TrendingUp } from "lucide-react";

interface StatItem {
  label: string;
  value: string | number;
  change?: string;
  changePercent?: string;
  icon?: React.ReactNode;
}

interface StatsOverviewProps {
  stats?: StatItem[];
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const items = stats ?? [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((stat, index) => (
        <div
          key={index}
          className="group p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all duration-200 hover:bg-zinc-900/80"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-zinc-400 mb-1">
                {stat.label}
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {stat.value}
              </h3>
            </div>
            <div className="text-2xl">{stat.icon}</div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-md">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium text-emerald-300">
                {stat.change}
              </span>
            </div>
            <span className="text-zinc-500">{stat.changePercent}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
