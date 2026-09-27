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
      <section className="rounded-md border border-[#242422] bg-[#141413] p-6 shadow-2xl shadow-black/40">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#FFB100]">
          Analytics
        </p>
        <h2 className="mt-2 text-2xl font-bold text-[#f4f4f0] sm:text-3xl">
          Growth, bookmark activity, and category demand at a glance.
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8a8a86]">
          The admin analytics page stays lightweight and responsive while still
          feeling like a production control surface.
        </p>
      </section>

      {error ? (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 font-mono text-sm text-red-400">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-24 rounded-md border border-[#242422] bg-[#141413] animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Event growth points"
            value={eventGrowth.length}
            icon={TrendingUp}
          />
          <MetricCard
            title="Active users"
            value={data?.activeUsers ?? 0}
            icon={Users2}
          />
          <MetricCard
            title="Bookmark periods"
            value={bookmarkActivity.length}
            icon={Bookmark}
          />
          <MetricCard
            title="Tracked categories"
            value={categoryPopularity.length}
            icon={ChartColumnIncreasing}
          />
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section className="rounded-md border border-[#242422] bg-[#141413] p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h3 className="font-schibsted-grotesk text-base font-semibold text-[#f4f4f0]">
                Event Growth
              </h3>
              <BarChart3 size={18} className="text-[#FFB100]" />
            </div>
            <ChartBars items={eventGrowth} max={maxEventCount} label="Events" />
          </section>

          <section className="rounded-md border border-[#242422] bg-[#141413] p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h3 className="font-schibsted-grotesk text-base font-semibold text-[#f4f4f0]">
                Bookmark Activity
              </h3>
              <Bookmark size={18} className="text-[#FFB100]" />
            </div>
            <ChartBars
              items={bookmarkActivity}
              max={maxBookmarkCount}
              label="Bookmarks"
            />
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-md border border-[#242422] bg-[#141413] p-5">
            <h3 className="font-schibsted-grotesk text-base font-semibold text-[#f4f4f0]">
              Category Popularity
            </h3>
            <div className="mt-4 space-y-3">
              {categoryPopularity.map((item) => (
                <div
                  key={item.category}
                  className="rounded-md border border-[#242422] bg-[#0e0e0d] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-[#f4f4f0]">
                      {item.category}
                    </p>
                    <p className="font-mono text-sm font-bold text-[#FFB100] tabular-nums">
                      {Number(item.count)}
                    </p>
                  </div>
                </div>
              ))}
              {!categoryPopularity.length ? (
                <div className="rounded-md border border-dashed border-[#242422] px-4 py-10 text-center font-mono text-sm text-[#8a8a86]">
                  No category data yet.
                </div>
              ) : null}
            </div>
          </section>

          <section className="rounded-md border border-[#FFB100]/30 bg-[#FFB100]/10 p-5">
            <p className="font-mono text-xs font-semibold text-[#FFB100] uppercase tracking-wider">
              Scalable foundation
            </p>
            <p className="mt-2 text-sm leading-6 text-[#f4f4f0]/90">
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
}: {
  title: string;
  value: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent?: string;
}) {
  return (
    <article className="rounded-md border border-[#242422] bg-[#141413] p-5 transition-all duration-200 hover:border-[#FFB100]/30">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#FFB100]/30 bg-[#FFB100]/10 text-[#FFB100]">
        <Icon size={18} />
      </div>
      <p className="mt-4 font-mono text-3xl font-bold text-[#f4f4f0] tabular-nums">
        {value}
      </p>
      <p className="mt-1 font-mono text-xs text-[#8a8a86] uppercase tracking-wider">{title}</p>
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
      <div className="rounded-md border border-dashed border-[#242422] px-4 py-10 text-center font-mono text-sm text-[#8a8a86]">
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
              <p className="font-mono text-xs text-[#8a8a86]">{formatMonth(item.month)}</p>
              <p className="font-mono text-xs text-[#f4f4f0] tabular-nums">{count}</p>
            </div>
            <div className="h-2 rounded-full bg-[#0e0e0d]">
              <div
                className="h-2 rounded-full bg-[#FFB100] transition-all duration-500 shadow-[0_0_10px_rgba(255,177,0,0.3)]"
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
