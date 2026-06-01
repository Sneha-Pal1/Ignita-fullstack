"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { FileChartColumnIncreasingIcon } from "@hugeicons/core-free-icons";

interface DataPoint {
  month: string;
  bookmarks: number;
  events: number;
}

interface ActivityChartProps {
  monthlyData?: DataPoint[];
}

const chartColors = {
  bookmarks: "#34d399",
  events: "#22d3ee",
};

const chartLabels = {
  bookmarks: "Bookmarks",
  events: "Events",
};

export function ActivityChart({ monthlyData }: ActivityChartProps) {
  const data = monthlyData ?? [];

  const maxValue = Math.max(
    ...(data.length > 0 ? data.flatMap((d) => [d.bookmarks, d.events]) : [1]),
  );

  const axisMarks = [
    maxValue,
    Math.round(maxValue * 0.75),
    Math.round(maxValue * 0.5),
    Math.round(maxValue * 0.25),
    0,
  ];

  const calculatePath = (key: keyof Omit<DataPoint, "month">) => {
    const width = data.length > 1 ? 100 / (data.length - 1) : 100;
    let path = "";

    data.forEach((point, idx) => {
      const x = idx * width;
      const y = 100 - ((point[key] ?? 0) / maxValue) * 100;
      path += idx === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    });

    return path;
  };

  return (
    <section className="rounded-[24px] border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
          <HugeiconsIcon
            icon={FileChartColumnIncreasingIcon}
            size="18"
            strokeWidth={2}
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-white">
            Activity Trends
          </h2>
          <p className="mt-1 text-sm leading-6 text-zinc-400">
            Monthly bookmarks and events from the live analytics response.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 sm:p-5">
        {data.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-[56px_1fr] lg:gap-5">
            <div className="flex flex-col justify-between py-1 text-[10px] uppercase tracking-[0.24em] text-zinc-500">
              {axisMarks.map((mark, index) => (
                <span key={index} className="leading-none tabular-nums">
                  {mark}
                </span>
              ))}
            </div>

            <div>
              <svg
                viewBox="0 0 100 100"
                className="h-64 w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern
                    id="activity-grid"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 10 0 L 0 0 0 10"
                      fill="none"
                      stroke="#27272a"
                      strokeWidth="0.4"
                    />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#activity-grid)" />
                <line
                  x1="0"
                  y1="92"
                  x2="100"
                  y2="92"
                  stroke="#3f3f46"
                  strokeWidth="0.6"
                />
                <line
                  x1="0"
                  y1="8"
                  x2="100"
                  y2="8"
                  stroke="#3f3f46"
                  strokeWidth="0.3"
                />

                {(["events", "bookmarks"] as const).map((key, index) => (
                  <path
                    key={key}
                    d={calculatePath(key)}
                    fill="none"
                    stroke={chartColors[key]}
                    strokeWidth={index === 0 ? 1.4 : 1}
                    vectorEffect="non-scaling-stroke"
                    opacity={index === 0 ? 1 : 0.85}
                  />
                ))}

                {data.map((point, idx) => {
                  const x =
                    data.length > 1 ? (100 / (data.length - 1)) * idx : 50;
                  return (["events", "bookmarks"] as const).map((key) => {
                    const value = point[key] ?? 0;
                    const y = 100 - (value / maxValue) * 82 - 8;
                    return (
                      <circle
                        key={`${idx}-${key}`}
                        cx={x}
                        cy={y}
                        r="0.75"
                        fill={chartColors[key]}
                        opacity="0.95"
                      />
                    );
                  });
                })}

                {data.map((point, idx) => {
                  const x =
                    data.length > 1 ? (100 / (data.length - 1)) * idx : 50;
                  return (
                    <text
                      key={point.month}
                      x={x}
                      y="98"
                      fill="#71717a"
                      fontSize="3"
                      textAnchor="middle"
                    >
                      {point.month}
                    </text>
                  );
                })}
              </svg>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                {(Object.keys(chartColors) as (keyof typeof chartColors)[]).map(
                  (key) => (
                    <div key={key} className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: chartColors[key] }}
                      />
                      <span>{chartLabels[key]}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-zinc-800 px-4 py-10 text-center text-sm text-zinc-500">
            No monthly chart data yet.
          </div>
        )}
      </div>
    </section>
  );
}
