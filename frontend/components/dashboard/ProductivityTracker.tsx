"use client";

import { useMotionPreference } from "@/hooks/useMotionPreference";
import { TrendingUp, Zap } from "lucide-react";

// Mock productivity data
const productivityData = [
  { day: "Mon", value: 65, target: 100 },
  { day: "Tue", value: 78, target: 100 },
  { day: "Wed", value: 92, target: 100 },
  { day: "Thu", value: 85, target: 100 },
  { day: "Fri", value: 88, target: 100 },
  { day: "Sat", value: 72, target: 100 },
  { day: "Sun", value: 95, target: 100 },
];

export const ProductivityTracker = () => {
  const prefersReducedMotion = useMotionPreference();
  const maxValue = 100;
  const weeklyAverage = Math.round(
    productivityData.reduce((sum, d) => sum + d.value, 0) /
      productivityData.length,
  );
  const trend = weeklyAverage > 80 ? "up" : "down";

  return (
    <div className="relative group">
      {/* Gradient background blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-emerald-500/10 to-emerald-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

      {/* Main card */}
      <div className="relative p-6 sm:p-8 rounded-3xl border border-teal-500/20 bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl overflow-hidden">
        {/* Glow accents */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between mb-6 sm:mb-8">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
              Weekly Productivity
            </h3>
            <p className="text-sm text-zinc-400">Your performance this week</p>
          </div>
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              trend === "up"
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-teal-500/20 text-teal-400"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-semibold">{weeklyAverage}%</span>
          </div>
        </div>

        {/* Chart */}
        <div className="relative z-10">
          <style>{`
            @keyframes fillChart {
              from { height: 0%; }
              to { height: var(--bar-height); }
            }
            .chart-bar {
              animation: fillChart ${prefersReducedMotion ? "0s" : "0.8s"} cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }
          `}</style>
          <div className="flex items-end justify-between gap-1.5 h-40 mb-6">
            {productivityData.map((data, index) => {
              const height = (data.value / maxValue) * 100;
              return (
                <div
                  key={data.day}
                  className="flex-1 flex flex-col items-center gap-2 group/bar"
                >
                  {/* Bar container */}
                  <div className="w-full h-full bg-gradient-to-b from-slate-700/30 to-slate-800/50 rounded-xl relative overflow-hidden border border-slate-600/30 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20">
                    {/* Animated fill */}
                    <div
                      className="chart-bar absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-500 via-teal-400 to-emerald-400 rounded-xl transition-all duration-300 group-hover/bar:from-emerald-400 group-hover/bar:via-emerald-300 group-hover/bar:to-teal-300 shadow-xl shadow-emerald-500/60 group-hover/bar:shadow-emerald-500/80"
                      style={
                        {
                          "--bar-height": `${height}%`,
                        } as React.CSSProperties
                      }
                    />
                  </div>

                  {/* Label */}
                  <span className="text-xs font-semibold text-zinc-400 group-hover/bar:text-emerald-300 transition-colors">
                    {data.day}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Stats footer */}
          <div className="grid grid-cols-3 gap-4 pt-5 px-3 border-t border-emerald-500/10 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-lg p-4">
            <div className="flex flex-col items-center">
              <span className="text-xs text-zinc-500 font-medium mb-2">
                Average
              </span>
              <span className="text-xl font-bold text-emerald-400">
                {weeklyAverage}%
              </span>
            </div>
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
            <div className="flex flex-col items-center">
              <span className="text-xs text-zinc-500 font-medium mb-2">
                Peak Day
              </span>
              <span className="text-xl font-bold text-teal-400">
                {
                  productivityData.reduce((max, d) =>
                    d.value > max.value ? d : max,
                  ).day
                }
              </span>
            </div>
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
            <div className="flex flex-col items-center">
              <span className="text-xs text-zinc-500 font-medium mb-2">
                Streak
              </span>
              <span className="text-xl font-bold text-emerald-400">7 days</span>
            </div>
          </div>
        </div>

        {/* Motivation badge */}
        <div className="relative z-10 mt-4 pt-4 border-t border-slate-700/50 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <p className="text-xs text-zinc-400">You're on fire! Keep it up 🔥</p>
        </div>
      </div>
    </div>
  );
};
