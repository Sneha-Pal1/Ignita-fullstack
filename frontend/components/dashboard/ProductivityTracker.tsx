"use client";

import React from "react";
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
      {/* Main card */}
      <div className="relative p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden hover:border-zinc-700 transition-colors duration-200">
        {/* Header */}
        <div className="relative z-10 flex items-start justify-between mb-6 sm:mb-8">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
              Weekly Productivity
            </h3>
            <p className="text-sm text-zinc-500">Your performance this week</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 text-emerald-400">
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
            {productivityData.map((data) => {
              const height = (data.value / maxValue) * 100;
              return (
                <div
                  key={data.day}
                  className="flex-1 flex flex-col items-center gap-2 group/bar"
                >
                  {/* Bar container */}
                  <div className="w-full h-full bg-zinc-800 rounded-lg relative overflow-hidden border border-zinc-700 hover:border-emerald-500/50 transition-all duration-200">
                    {/* Animated fill */}
                    <div
                      className="chart-bar absolute bottom-0 left-0 right-0 bg-emerald-500 rounded-lg transition-all duration-200 group-hover/bar:bg-emerald-400"
                      style={
                        {
                          "--bar-height": `${height}%`,
                        } as React.CSSProperties
                      }
                    />
                  </div>

                  {/* Label */}
                  <span className="text-xs font-semibold text-zinc-500">
                    {data.day}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Stats footer */}
          <div className="grid grid-cols-3 gap-4 pt-5 border-t border-zinc-800 bg-zinc-800/50 rounded-lg p-4">
            <div className="flex flex-col items-center">
              <span className="text-xs text-zinc-500 font-medium mb-2">
                Average
              </span>
              <span className="text-xl font-bold text-emerald-400">
                {weeklyAverage}%
              </span>
            </div>
            <div className="h-12 w-px bg-zinc-700" />
            <div className="flex flex-col items-center">
              <span className="text-xs text-zinc-500 font-medium mb-2">
                Peak Day
              </span>
              <span className="text-xl font-bold text-emerald-400">
                {
                  productivityData.reduce((max, d) =>
                    d.value > max.value ? d : max,
                  ).day
                }
              </span>
            </div>
            <div className="h-12 w-px bg-zinc-700" />
            <div className="flex flex-col items-center">
              <span className="text-xs text-zinc-500 font-medium mb-2">
                Streak
              </span>
              <span className="text-xl font-bold text-emerald-400">7 days</span>
            </div>
          </div>
        </div>

        {/* Motivation badge */}
        <div className="relative z-10 mt-4 pt-4 border-t border-zinc-800 flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-400" />
          <p className="text-xs text-zinc-400">Keep up the momentum!</p>
        </div>
      </div>
    </div>
  );
};
