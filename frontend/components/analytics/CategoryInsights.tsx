"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  FileChartColumnIncreasingIcon,
  Bookmark01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

interface CategoryItem {
  name: string;
  percentage: number;
  count: number;
  color: string;
}

interface CategoryInsightsProps {
  categories?: CategoryItem[];
}

const getColorClasses = (color: string) => {
  const colorMap: Record<string, { bg: string; text: string; bar: string }> = {
    emerald: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-300",
      bar: "bg-emerald-400",
    },
    blue: { bg: "bg-blue-500/10", text: "text-blue-300", bar: "bg-blue-400" },
    purple: {
      bg: "bg-purple-500/10",
      text: "text-purple-300",
      bar: "bg-purple-400",
    },
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-300", bar: "bg-cyan-400" },
    amber: {
      bg: "bg-amber-500/10",
      text: "text-amber-300",
      bar: "bg-amber-400",
    },
    rose: { bg: "bg-rose-500/10", text: "text-rose-300", bar: "bg-rose-400" },
  };
  return colorMap[color] || colorMap.emerald;
};

export function CategoryInsights({ categories }: CategoryInsightsProps) {
  const local = categories && categories.length > 0 ? categories : [];
  const topCategory = local[0] ?? null;
  const colors = getColorClasses(topCategory?.color || "emerald");
  const total = local.reduce((sum, category) => sum + category.count, 0) || 1;

  return (
    <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[28px] border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-950/60 px-3 py-1 text-xs font-medium text-zinc-400">
            <HugeiconsIcon
              icon={FileChartColumnIncreasingIcon}
              size="14"
              strokeWidth={2}
              className="text-emerald-400"
            />
            Category breakdown
          </div>
          <h2 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Event Categories
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Live category distribution for the saved analytics dataset.
          </p>
        </div>

        <div className="mt-6 space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 sm:p-5">
          {local.length > 0 ? (
            local.map((category) => {
              const c = getColorClasses(category.color || "emerald");
              const pct =
                category.percentage ??
                Math.round((category.count / total) * 100);
              return (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full ${c.bar}`} />
                      <div>
                        <p className="text-sm font-medium text-white">
                          {category.name}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {category.count} bookmarks
                        </p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${c.text}`}>
                      {pct}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-zinc-800">
                    <div
                      className={`h-2 rounded-full ${c.bar}`}
                      style={{ width: `${Math.max(pct, 2)}%` }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-800 px-4 py-10 text-center text-sm text-zinc-500">
              No category data available yet.
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6">
        <div
          className={`rounded-[28px] border ${colors.bg} border-zinc-800 bg-zinc-900/70 p-5 sm:p-6`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-950/60 px-3 py-1 text-xs font-medium text-zinc-400">
            <HugeiconsIcon
              icon={Bookmark01Icon}
              size="14"
              strokeWidth={2}
              className={colors.text}
            />
            Top category
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
            Leading category
          </p>
          <h3
            className={`mt-2 text-3xl font-semibold tracking-tight ${colors.text}`}
          >
            {topCategory?.name ?? "No categories yet"}
          </h3>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            {topCategory
              ? `${topCategory.percentage}% of bookmarks and ${topCategory.count} live items.`
              : "Category distribution will appear once live data is available."}
          </p>
          {topCategory ? (
            <div className="mt-6 flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm">
              <span className="text-zinc-400">Share of total</span>
              <span className={`font-semibold ${colors.text}`}>
                {topCategory.percentage}%
              </span>
            </div>
          ) : null}
        </div>

        <div className="rounded-[28px] border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Category distribution
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">
                Relative weight
              </h3>
            </div>
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size="16"
              strokeWidth={2}
              className="text-zinc-500"
            />
          </div>
          <div className="space-y-3">
            {local.length > 0 ? (
              local.map((category) => {
                const c = getColorClasses(category.color || "emerald");
                return (
                  <div key={category.name} className="flex items-center gap-3">
                    <div className="w-24 text-xs text-zinc-500">
                      {category.name}
                    </div>
                    <div className="h-2 flex-1 rounded-full bg-zinc-800">
                      <div
                        className={`h-2 rounded-full ${c.bar}`}
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                    <div className="w-12 text-right text-xs font-medium text-zinc-300 tabular-nums">
                      {category.percentage}%
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-zinc-800 px-4 py-10 text-center text-sm text-zinc-500">
                No categories to summarize yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
