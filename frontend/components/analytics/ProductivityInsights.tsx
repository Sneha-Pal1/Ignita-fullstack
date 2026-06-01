"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  FileChartColumnIncreasingIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import type { ElementType } from "react";

type ProductivityInsight = {
  id: string;
  title: string;
  value: string;
  detail: string;
  icon?: ElementType;
  tone?: "emerald" | "cyan" | "violet";
};

export function ProductivityInsights({
  insights,
}: {
  insights?: ProductivityInsight[];
}) {
  const items = insights ?? [];

  const toneMap: Record<NonNullable<ProductivityInsight["tone"]>, string> = {
    emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    cyan: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
    violet: "border-violet-500/20 bg-violet-500/10 text-violet-300",
  };

  return (
    <section className="rounded-[28px] border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Productivity
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
            Compact insights
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
            Derived metrics from the live analytics payload. No synthetic
            values.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/60 px-3 py-1.5 text-xs text-zinc-500">
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size="12"
            strokeWidth={2}
            className="text-emerald-400"
          />
          Calculated from current response data
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {items.length > 0 ? (
          items.map((card, index) => {
            const tone =
              card.tone ??
              (index === 0 ? "emerald" : index === 1 ? "cyan" : "violet");
            const classes = toneMap[tone];
            const Icon = card.icon;

            return (
              <article
                key={card.id}
                className="flex h-full flex-col rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border ${classes}`}
                  >
                    {Icon ? (
                      <HugeiconsIcon icon={Icon} size="18" strokeWidth={2} />
                    ) : (
                      <HugeiconsIcon
                        icon={FileChartColumnIncreasingIcon}
                        size="18"
                        strokeWidth={2}
                      />
                    )}
                  </div>
                </div>

                <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                  {card.title}
                </p>
                <h4 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                  {card.value}
                </h4>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {card.detail}
                </p>
              </article>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-zinc-800 px-4 py-10 text-sm text-zinc-500 md:col-span-3">
            No productivity insights available.
          </div>
        )}
      </div>
    </section>
  );
}
