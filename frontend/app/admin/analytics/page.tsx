"use client";

import { useEffect, useState } from "react";
import { adminAPI, type AdminAnalyticsResponse } from "@/lib/api-endpoints";
import {
  BarChart3,
  TrendingUp,
  Bookmark,
  Users2,
  ChartColumnIncreasing,
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AdminAnalyticsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadAnalytics = async () => {
      try {
        setIsLoading(true);
        const response = await adminAPI.getAnalytics();
        if (isMounted) {
          setData(response);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load analytics.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadAnalytics();

    return () => {
      isMounted = false;
    };
  }, []);

  const eventGrowth = data?.eventGrowth ?? [];
  const bookmarkActivity = data?.bookmarkActivity ?? [];
  const categoryPopularity = data?.categoryPopularity ?? [];
  const maxEventCount = Math.max(
    ...eventGrowth.map((item) => Number(item.count)),
    1,
  );
  const maxBookmarkCount = Math.max(
    ...bookmarkActivity.map((item) => Number(item.count)),
    1,
  );

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">
          Analytics
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          Growth, bookmark activity, and category demand at a glance.
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
          The admin analytics page stays lightweight and responsive while still
          feeling like a production SaaS dashboard.
        </p>
      </section>

      {error ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-24 rounded-xl border border-zinc-800 bg-zinc-900/50 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Event growth points"
            value={eventGrowth.length}
            icon={TrendingUp}
            accent="emerald"
          />
          <MetricCard
            title="Active users"
            value={data?.activeUsers ?? 0}
            icon={Users2}
            accent="teal"
          />
          <MetricCard
            title="Bookmark periods"
            value={bookmarkActivity.length}
            icon={Bookmark}
            accent="cyan"
          />
          <MetricCard
            title="Tracked categories"
            value={categoryPopularity.length}
            icon={ChartColumnIncreasing}
            accent="amber"
          />
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-white">
                Event Growth
              </h3>
              <BarChart3 size={18} className="text-emerald-400" />
            </div>
            <ChartBars items={eventGrowth} max={maxEventCount} label="Events" />
          </section>

          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-white">
                Bookmark Activity
              </h3>
              <Bookmark size={18} className="text-cyan-400" />
            </div>
            <ChartBars
              items={bookmarkActivity}
              max={maxBookmarkCount}
              label="Bookmarks"
            />
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="text-base font-semibold text-white">
              Category Popularity
            </h3>
            <div className="mt-4 space-y-3">
              {categoryPopularity.map((item) => (
                <div
                  key={item.category}
                  className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-white">
                      {item.category}
                    </p>
                    <p className="text-sm font-semibold text-emerald-400 tabular-nums">
                      {Number(item.count)}
                    </p>
                  </div>
                </div>
              ))}
              {!categoryPopularity.length ? (
                <div className="rounded-xl border border-dashed border-zinc-800 px-4 py-10 text-center text-sm text-zinc-500">
                  No category data yet.
                </div>
              ) : null}
            </div>
          </section>

          <section className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5">
            <p className="font-semibold text-emerald-300">
              Scalable foundation
            </p>
            <p className="mt-2 text-sm leading-6 text-emerald-100/80">
              This structure can be extended for organizer and moderator roles
              without changing the public interface.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
  accent,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent: "emerald" | "teal" | "cyan" | "amber";
}) {
  const accentClass: Record<typeof accent, string> = {
    emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    teal: "border-teal-500/20 bg-teal-500/10 text-teal-400",
    cyan: "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
    amber: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  };

  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900">
      <div
        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${accentClass[accent]}`}
      >
        <Icon size={18} />
      </div>
      <p className="mt-4 text-3xl font-semibold text-white tabular-nums">
        {value}
      </p>
      <p className="mt-1 text-sm text-zinc-400">{title}</p>
    </article>
  );
}

function ChartBars({
  items,
  max,
  label,
}: {
  items: Array<{ month: string; count: string | number }>;
  max: number;
  label: string;
}) {
  if (!items.length) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-800 px-4 py-10 text-center text-sm text-zinc-500">
        No {label.toLowerCase()} data yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const count = Number(item.count);
        const width = `${Math.max((count / max) * 100, 8)}%`;

        return (
          <div key={item.month}>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <p className="text-zinc-300">{formatMonth(item.month)}</p>
              <p className="text-zinc-500 tabular-nums">{count}</p>
            </div>
            <div className="h-3 rounded-full bg-zinc-800">
              <div
                className="h-3 rounded-full bg-linear-to-r from-emerald-400 to-teal-400 transition-all duration-500"
                style={{ width }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function formatMonth(value: string) {
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(date);
}
