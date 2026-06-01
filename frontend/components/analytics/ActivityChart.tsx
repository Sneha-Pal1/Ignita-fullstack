"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FileChartColumnIncreasingIcon,
  FileChartPieIcon,
} from "@hugeicons/core-free-icons";

interface DataPoint {
  month: string;
  bookmarks: number;
  events: number;
  total: number;
}

interface ActivityChartProps {
  monthlyData?: DataPoint[];
}

type ChartType = "line" | "bar";

const chartColors = {
  bookmarks: "#34d399",
  events: "#22d3ee",
  total: "#f59e0b",
};

const chartLabels = {
  bookmarks: "Bookmarks",
  events: "Events",
  total: "Total",
};

export function ActivityChart({ monthlyData }: ActivityChartProps) {
  const [chartType, setChartType] = useState<ChartType>("line");

  const data = monthlyData ?? [];

  const maxValue = Math.max(
    ...(data.length > 0
      ? data.flatMap((d) => [d.bookmarks, d.events, d.total])
      : [1]),
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
    <section className="rounded-[28px] border border-zinc-800 bg-zinc-900/70 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
            <HugeiconsIcon
              icon={FileChartColumnIncreasingIcon}
              size="18"
              strokeWidth={2}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-white">
              Monthly Activity
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-zinc-400">
              Real monthly counts rendered as a compact chart with readable
              axes, legend, and per-series comparison.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-1">
          {(["line", "bar"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setChartType(type)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                chartType === type
                  ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              <HugeiconsIcon
                icon={
                  type === "line"
                    ? FileChartPieIcon
                    : FileChartColumnIncreasingIcon
                }
                size="16"
                strokeWidth={2}
              />
              {type === "line" ? "Line" : "Bar"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-950/60 p-4">
        {data.length > 0 ? (
          <>
            <div className="grid grid-cols-[48px_1fr] gap-4">
              <div className="flex flex-col justify-between py-2 text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                {axisMarks.map((mark, index) => (
                  <span key={`${index}-${mark}`} className="leading-none">
                    {mark}
                  </span>
                ))}
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
                {chartType === "line" ? (
                  <svg
                    viewBox="0 0 100 100"
                    className="h-72 w-full"
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

                    {(
                      Object.keys(chartColors) as (keyof typeof chartColors)[]
                    ).map((key, index) => (
                      <path
                        key={key}
                        d={calculatePath(key as keyof Omit<DataPoint, "month">)}
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

                      return (
                        <g key={`point-${idx}`}>
                          {(
                            Object.keys(
                              chartColors,
                            ) as (keyof typeof chartColors)[]
                          ).map((key) => {
                            const y =
                              100 -
                              ((point[key as keyof Omit<DataPoint, "month">] ??
                                0) /
                                maxValue) *
                                82 -
                              8;
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
                          })}
                        </g>
                      );
                    })}
                  </svg>
                ) : (
                  <div className="flex h-72 items-end gap-3 overflow-hidden">
                    {data.map((point) => (
                      <div
                        key={point.month}
                        className="flex min-w-0 flex-1 flex-col items-center gap-2"
                      >
                        <div className="flex h-full min-h-0 w-full items-end gap-1 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-2">
                          {(
                            Object.keys(
                              chartColors,
                            ) as (keyof typeof chartColors)[]
                          ).map((key) => {
                            const barValue =
                              point[key as keyof Omit<DataPoint, "month">] ?? 0;
                            const barHeight = `${Math.max((barValue / maxValue) * 100, 4)}%`;
                            return (
                              <div
                                key={`${point.month}-${key}`}
                                className="flex-1 rounded-full"
                                style={{
                                  height: barHeight,
                                  backgroundColor: chartColors[key],
                                }}
                              />
                            );
                          })}
                        </div>
                        <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                          {point.month}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 grid gap-3 border-t border-zinc-800 pt-4 sm:grid-cols-2 xl:grid-cols-4">
              {(Object.keys(chartColors) as (keyof typeof chartColors)[]).map(
                (key) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-xs"
                  >
                    <div className="flex items-center gap-2 text-zinc-300">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: chartColors[key] }}
                      />
                      <span>{chartLabels[key]}</span>
                    </div>
                    <span className="text-zinc-500">Live series</span>
                  </div>
                ),
              )}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-zinc-800 px-4 py-10 text-center text-sm text-zinc-500">
            No monthly chart data yet.
          </div>
        )}
      </div>
    </section>
  );
}
