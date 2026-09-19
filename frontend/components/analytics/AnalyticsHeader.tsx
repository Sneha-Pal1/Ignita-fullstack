"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Download01Icon, Calendar01Icon } from "@hugeicons/core-free-icons";

interface TimeframeOption {
  label: string;
  value: "week" | "month" | "quarter" | "year";
}

interface AnalyticsHeaderProps {
  timeframe?: "week" | "month" | "quarter" | "year";
  onTimeframeChange?: (
    timeframe: "week" | "month" | "quarter" | "year",
  ) => void;
  onExport?: () => void;
}

export function AnalyticsHeader({
  timeframe = "month",
  onTimeframeChange,
  onExport,
}: AnalyticsHeaderProps) {
  const timeframeOptions: TimeframeOption[] = [
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Quarter", value: "quarter" },
    { label: "Year", value: "year" },
  ];

  return (
    <section className="border border-white/10 bg-[#141413] p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-2">
          <div className="levo-eyebrow mb-2">
            <span className="h-1.5 w-1.5 bg-[#FFB100]" />
            <span>01 / ANALYTICS OVERVIEW</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center border border-[#FFB100]/30 bg-[#FFB100]/10 text-[#FFB100]">
              <HugeiconsIcon icon={Calendar01Icon} size="18" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white font-sans sm:text-3xl">
                System Analytics
              </h1>
              <p className="mt-0.5 text-xs text-[#8a8a86] font-mono">
                Real bookmark, event, category, and user activity from backend.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-1 border border-white/10 bg-[#0e0e0d] p-1 font-mono text-xs">
            {timeframeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onTimeframeChange?.(option.value)}
                className={`px-3 py-1.5 font-medium transition-colors ${
                  timeframe === option.value
                    ? "bg-[#FFB100] text-black font-semibold"
                    : "text-[#8a8a86] hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onExport}
            className="inline-flex h-9 items-center justify-center gap-2 border border-white/10 bg-[#0e0e0d] px-4 font-mono text-xs font-semibold text-white transition-colors hover:border-[#FFB100] hover:text-[#FFB100]"
          >
            <HugeiconsIcon
              icon={Download01Icon}
              size="16"
              strokeWidth={2}
            />
            <span>Export Data</span>
          </button>
        </div>
      </div>
    </section>
  );
}
