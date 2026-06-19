"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Bookmark01Icon,
  ArrowRight01Icon,
  FileChartColumnIncreasingIcon,
  Calendar01Icon,
} from "@hugeicons/core-free-icons";
import type { ElementType } from "react";

interface GoalData {
  title: string;
  current: number;
  target: number;
  progress: number;
  helper: string;
  icon: any;
  tone?: "emerald" | "cyan" | "amber";
}

interface GoalsSectionProps {
  goals?: GoalData[];
}

export function GoalsSection({ goals }: GoalsSectionProps) {
  const localGoals = goals ?? [];

  const toneMap: Record<NonNullable<GoalData["tone"]>, string> = {
    emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    cyan: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
    amber: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  };

  return (
    <section className="rounded-[28px] border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Progress
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-white">
            Goals & progress
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
            Derived progress cards based entirely on current analytics values.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/60 px-3 py-1.5 text-xs text-zinc-500">
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size="12"
            strokeWidth={2}
            className="text-emerald-400"
          />
          No gamification, just metrics
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {localGoals.length > 0 ? (
          localGoals.map((goal, index) => {
            const tone =
              goal.tone ??
              (index === 0 ? "cyan" : index === 1 ? "emerald" : "amber");
            const classes = toneMap[tone];
            const Icon = goal.icon;

            return (
              <article
                key={goal.title}
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
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                    {goal.progress}%
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <h3 className="text-sm font-medium text-white">
                    {goal.title}
                  </h3>
                  <p className="text-sm leading-6 text-zinc-400">
                    {goal.helper}
                  </p>
                </div>

                <div className="mt-5 h-2 rounded-full bg-zinc-800">
                  <div
                    className={`h-2 rounded-full ${tone === "amber" ? "bg-amber-400" : tone === "cyan" ? "bg-cyan-400" : "bg-emerald-400"}`}
                    style={{ width: `${Math.min(goal.progress, 100)}%` }}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                  <span className="tabular-nums">
                    {goal.current} / {goal.target}
                  </span>
                  <span>Live progress</span>
                </div>
              </article>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-zinc-800 px-4 py-10 text-sm text-zinc-500 md:col-span-3">
            No progress metrics available yet.
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
            <HugeiconsIcon icon={Calendar01Icon} size="16" strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Activity window
            </p>
            <p className="mt-1 text-sm font-medium text-white">
              Current month focus
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
            <HugeiconsIcon icon={Bookmark01Icon} size="16" strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Bookmark share
            </p>
            <p className="mt-1 text-sm font-medium text-white">
              Derived from live totals
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:col-span-2 xl:col-span-1">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-300">
            <HugeiconsIcon icon={ArrowRight01Icon} size="16" strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Momentum
            </p>
            <p className="mt-1 text-sm font-medium text-white">
              Month-over-month movement
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
