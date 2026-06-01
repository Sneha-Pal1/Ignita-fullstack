import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Download01Icon,
  Calendar01Icon,
} from "@hugeicons/core-free-icons";

interface TimeframeOption {
  label: string;
  value: "week" | "month" | "quarter" | "year";
}

interface AnalyticsHeaderProps {
  timeframe?: "week" | "month" | "quarter" | "year";
  onTimeframeChange?: (
    timeframe: "week" | "month" | "quarter" | "year",
  ) => void;
  growthSnapshot?: string;
  onExport?: () => void;
}

export function AnalyticsHeader({
  timeframe = "month",
  onTimeframeChange,
  growthSnapshot,
  onExport,
}: AnalyticsHeaderProps) {
  const timeframeOptions: TimeframeOption[] = [
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Quarter", value: "quarter" },
    { label: "Year", value: "year" },
  ];

  return (
    <section className="rounded-[28px] border border-zinc-800 bg-zinc-900/70 p-6 shadow-[0_1px_0_rgba(255,255,255,0.02)] backdrop-blur-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <HugeiconsIcon icon={Calendar01Icon} size="20" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400/90">
                Analytics Overview
              </p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Analytics
              </h1>
            </div>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Real activity, bookmarks, category demand, and growth signals from
            the live analytics dataset.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <span className="rounded-full border border-zinc-800 bg-zinc-950/70 px-3 py-1">
              {growthSnapshot || "Live data loaded from the analytics API"}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-1 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-1">
            {timeframeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onTimeframeChange?.(option.value)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                  timeframe === option.value
                    ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/20"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onExport}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-950/80 px-4 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-600 hover:bg-zinc-900"
          >
            <HugeiconsIcon
              icon={Download01Icon}
              size="18"
              strokeWidth={2}
              className="text-zinc-300"
            />
            <span>Export</span>
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size="16"
              strokeWidth={2}
              className="text-zinc-500"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
