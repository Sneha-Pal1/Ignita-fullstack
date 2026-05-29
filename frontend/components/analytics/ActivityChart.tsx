"use client";

import { useState } from "react";

interface DataPoint {
  month: string;
  bookmarks: number;
  events: number;
  alerts: number;
  posts: number;
}

interface ActivityChartProps {
  monthlyData?: DataPoint[];
}

type ChartType = "line" | "bar";

const chartColors = {
  bookmarks: "#10b981", // emerald
  events: "#06b6d4", // cyan
  alerts: "#f59e0b", // amber
  posts: "#8b5cf6", // purple
};

const chartLabels = {
  bookmarks: "Bookmarks",
  events: "Events",
  alerts: "Alerts",
  posts: "Posts",
};

export function ActivityChart({ monthlyData }: ActivityChartProps) {
  const [chartType, setChartType] = useState<ChartType>("line");
  const [hoveredData, setHoveredData] = useState<DataPoint | null>(null);

  const data = monthlyData ?? [];

  const maxValue = Math.max(
    ...(data.length > 0
      ? data.flatMap((d) => [d.bookmarks, d.events, d.alerts, d.posts])
      : [1]),
  );

  const calculatePath = (key: keyof Omit<DataPoint, "month">) => {
    const width = data.length > 1 ? 100 / (data.length - 1) : 100;
    let path = "";

    data.forEach((point, idx) => {
      const x = idx * width;
      const y = 100 - (point[key] / maxValue) * 100;
      path += idx === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    });

    return path;
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              Monthly Activity
            </h2>
            <p className="text-sm text-zinc-400">
              Track your engagement across different activities throughout the
              year.
            </p>
          </div>

          {/* Chart Type Toggle */}
          <div className="flex gap-2 bg-zinc-800/50 p-1 rounded-lg border border-zinc-700/50">
            {(["line", "bar"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all duration-200 ${
                  chartType === type
                    ? "bg-emerald-600 text-white"
                    : "text-zinc-400 hover:text-zinc-300"
                }`}
              >
                {type === "line" ? "Line" : "Bar"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        {chartType === "line" ? (
          // Line Chart
          <svg
            viewBox="0 0 100 100"
            className="w-full h-80"
            preserveAspectRatio="none"
          >
            {/* Grid */}
            <defs>
              <pattern
                id="grid"
                width="14.28"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 14.28 0 L 0 0 0 20"
                  fill="none"
                  stroke="#3f3f46"
                  strokeWidth="0.05"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />

            {/* Lines */}
            {(Object.keys(chartColors) as (keyof typeof chartColors)[]).map(
              (key) => (
                <path
                  key={key}
                  d={calculatePath(key as keyof Omit<DataPoint, "month">)}
                  fill="none"
                  stroke={chartColors[key]}
                  strokeWidth="0.5"
                  vectorEffect="non-scaling-stroke"
                />
              ),
            )}

            {/* Data Points */}
            {data.map((point, idx) => {
              const x = data.length > 1 ? (100 / (data.length - 1)) * idx : 50;
              return (
                <g key={`point-${idx}`}>
                  {(
                    Object.keys(chartColors) as (keyof typeof chartColors)[]
                  ).map((key) => {
                    const y =
                      100 -
                      (point[key as keyof Omit<DataPoint, "month">] /
                        maxValue) *
                        100;
                    return (
                      <circle
                        key={`${idx}-${key}`}
                        cx={x}
                        cy={y}
                        r="0.8"
                        fill={chartColors[key]}
                        opacity="0.8"
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>
        ) : (
          // Bar Chart
          <svg
            viewBox="0 0 100 100"
            className="w-full h-80"
            preserveAspectRatio="none"
          >
            {/* Grid */}
            <defs>
              <pattern
                id="grid-bar"
                width="14.28"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 14.28 0 L 0 0 0 20"
                  fill="none"
                  stroke="#3f3f46"
                  strokeWidth="0.05"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid-bar)" />

            {/* Bars */}
            {data.map((point, idx) => {
              const barWidth = 3;
              const groupWidth = 14.28;
              const x = data.length > 0 ? (100 / data.length) * idx : 0;
              const barSpacing = (groupWidth - barWidth * 4) / 5;

              return (
                <g key={`bar-group-${idx}`}>
                  {(
                    Object.keys(chartColors) as (keyof typeof chartColors)[]
                  ).map((key, barIdx) => {
                    const barValue =
                      point[key as keyof Omit<DataPoint, "month">];
                    const barHeight = (barValue / maxValue) * 100;
                    const barX =
                      x + barSpacing + barIdx * (barWidth + barSpacing);
                    const barY = 100 - barHeight;

                    return (
                      <rect
                        key={`${idx}-${key}`}
                        x={barX}
                        y={barY}
                        width={barWidth}
                        height={barHeight}
                        fill={chartColors[key]}
                        opacity="0.85"
                        rx="0.3"
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>
        )}

        {/* X-Axis Labels */}
        <div className="flex justify-between mt-2 px-4 text-xs text-zinc-500">
          {data.map((point) => (
            <div key={point.month}>{point.month}</div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-zinc-800">
          {(Object.keys(chartColors) as (keyof typeof chartColors)[]).map(
            (key) => (
              <div key={key} className="flex items-center gap-2 text-xs">
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: chartColors[key] }}
                />
                <span className="text-zinc-400">{chartLabels[key]}</span>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
