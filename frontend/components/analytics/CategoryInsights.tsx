"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { FileChartColumnIncreasingIcon, Bookmark01Icon } from "@hugeicons/core-free-icons";

interface CategoryItem {
  category: string;
  count: number;
}

interface CategoryInsightsProps {
  categories?: CategoryItem[];
}

const palette = ["#34d399", "#22d3ee", "#a78bfa", "#f59e0b", "#fb7185", "#60a5fa"];

export function CategoryInsights({ categories }: CategoryInsightsProps) {
  const local = categories && categories.length > 0 ? categories : [];
  const topCategory = local[0] ?? null;

  return (
    <section className="rounded-[24px] border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
          <HugeiconsIcon
            icon={FileChartColumnIncreasingIcon}
            size="18"
            strokeWidth={2}
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-white">
            Category Insights
          </h2>
          <p className="mt-1 text-sm leading-6 text-zinc-400">
            Top category and distribution from live bookmark totals.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Top category</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
            {topCategory?.category ?? "No categories yet"}
          </h3>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            {topCategory
              ? `${topCategory.count} bookmarks in the leading category.`
              : "Category data will appear once bookmarks exist."}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 sm:p-5">
          <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
            <HugeiconsIcon icon={Bookmark01Icon} size="14" strokeWidth={2} className="text-zinc-400" />
            Category distribution
          </div>
          <div className="space-y-3">
            {local.length > 0 ? (
              local.map((category, index) => {
                const color = palette[index % palette.length];
                const width = `${Math.max((category.count / Math.max(local.reduce((sum, item) => sum + item.count, 0), 1)) * 100, 4)}%`;
                return (
                  <div key={category.category} className="space-y-2">
                    <div className="flex items-center justify-between gap-3 text-xs text-zinc-400">
                      <span className="truncate">{category.category}</span>
                      <span className="tabular-nums text-zinc-300">{category.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-zinc-800">
                      <div className="h-2 rounded-full" style={{ width, backgroundColor: color }} />
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
      </div>
    </section>
  );
}
