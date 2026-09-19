"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  FileChartColumnIncreasingIcon,
  Bookmark01Icon,
} from "@hugeicons/core-free-icons";

interface CategoryItem {
  category: string;
  count: number;
}

interface CategoryInsightsProps {
  categories?: CategoryItem[];
}

const palette = [
  "#FFB100",
  "#ffffff",
  "#8a8a86",
  "#d4a373",
  "#e63946",
  "#457b9d",
];

export function CategoryInsights({ categories }: CategoryInsightsProps) {
  const local = categories && categories.length > 0 ? categories : [];
  const topCategory = local[0] ?? null;

  return (
    <section className="border border-white/10 bg-[#141413] p-6 font-mono">
      <div className="flex items-start gap-3">
        <div className="inline-flex h-9 w-9 items-center justify-center border border-[#FFB100]/30 bg-[#FFB100]/10 text-[#FFB100]">
          <HugeiconsIcon
            icon={FileChartColumnIncreasingIcon}
            size="18"
            strokeWidth={2}
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-white font-sans">
            Category Insights
          </h2>
          <p className="mt-0.5 text-xs text-[#8a8a86]">
            Top category and distribution from live bookmark totals.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border border-white/10 bg-[#0e0e0d] p-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a8a86]">
            Top category
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#FFB100] font-sans">
            {topCategory?.category ?? "No categories yet"}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[#8a8a86]">
            {topCategory
              ? `${topCategory.count} bookmarks in the leading category.`
              : "Category data will appear once bookmarks exist."}
          </p>
        </div>

        <div className="border border-white/10 bg-[#0e0e0d] p-5">
          <div className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#8a8a86]">
            <HugeiconsIcon
              icon={Bookmark01Icon}
              size="14"
              strokeWidth={2}
              className="text-[#FFB100]"
            />
            Category distribution
          </div>
          <div className="space-y-3">
            {local.length > 0 ? (
              local.map((category, index) => {
                const color = palette[index % palette.length];
                const width = `${Math.max(
                  (category.count /
                    Math.max(
                      local.reduce((sum, item) => sum + item.count, 0),
                      1,
                    )) *
                    100,
                  4,
                )}%`;
                return (
                  <div key={category.category} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-3 text-xs text-[#8a8a86]">
                      <span className="truncate text-white font-sans font-medium">{category.category}</span>
                      <span className="tabular-nums text-[#FFB100]">
                        {category.count}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5">
                      <div
                        className="h-1.5 transition-all"
                        style={{ width, backgroundColor: color }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="border border-dashed border-white/10 px-4 py-8 text-center text-xs text-[#8a8a86]">
                No category data available yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
