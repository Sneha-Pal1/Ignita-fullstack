"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

interface HeatmapCell {
  month: string;
  count: number;
  intensity: "none" | "low" | "medium" | "high" | "very-high";
}

const getIntensityColor = (
  intensity: "none" | "low" | "medium" | "high" | "very-high",
): string => {
  const colorMap = {
    none: "bg-zinc-800/80",
    low: "bg-emerald-950/60 border border-emerald-700/30",
    medium: "bg-emerald-800/70 border border-emerald-600/35",
    high: "bg-emerald-700/80 border border-emerald-500/40",
    "very-high": "bg-emerald-500/90 border border-emerald-400/50",
  } as Record<string, string>;
  return colorMap[intensity];
};

export function ActivityHeatmap({
  activityData,
}: {
  activityData?: HeatmapCell[];
}) {
  const data = activityData ?? [];

  return (
    <section className="rounded-[28px] border border-zinc-800 bg-zinc-900/70 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
            <HugeiconsIcon icon={Calendar01Icon} size="18" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-white">
              Activity Heatmap
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-zinc-400">
              Monthly contribution density built from the live analytics
              response. Higher intensity represents a larger combined event and
              bookmark total.
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/80 px-3 py-2 text-xs text-zinc-500 md:flex">
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size="14"
            strokeWidth={2}
            className="text-zinc-400"
          />
          GitHub-style density, real monthly data only
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[24px] border border-zinc-800 bg-zinc-950/60 p-4">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(92px,1fr))] gap-3">
          {data.length > 0 ? (
            data.map((cell) => (
              <article
                key={cell.month}
                className="flex min-h-[104px] flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3"
              >
                <div className="flex items-center justify-between gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                  <span>{cell.month}</span>
                  <span className="tabular-nums text-zinc-400">
                    {cell.count}
                  </span>
                </div>
                <div
                  className={`mt-3 flex-1 rounded-2xl ${getIntensityColor(
                    cell.intensity,
                  )}`}
                />
              </article>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-zinc-800 px-4 py-10 text-center text-sm text-zinc-500">
              No activity data yet.
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800 pt-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span>Less activity</span>
            <div className="flex gap-1">
              {(["none", "low", "medium", "high", "very-high"] as const).map(
                (intensity) => (
                  <span
                    key={intensity}
                    className={`h-2.5 w-2.5 rounded-sm ${getIntensityColor(intensity)}`}
                  />
                ),
              )}
            </div>
            <span>More activity</span>
          </div>
          <p className="text-zinc-500">
            Each card reflects a real month from the API response.
          </p>
        </div>
      </div>
    </section>
  );
}
