"use client";

import { useEffect, useState } from "react";
// import type { ElementType } from "react";
// import type { IconSvgObject } from "@hugeicons/core-free-icons";
import {
  Bookmark01Icon,
  Calendar01Icon,
  Clock01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { AnalyticsHeader } from "@/components/analytics/AnalyticsHeader";
import { ActivityChart } from "@/components/analytics/ActivityChart";
import { ActivityFeed } from "@/components/analytics/ActivityFeed";
import { CategoryInsights } from "@/components/analytics/CategoryInsights";
import { StatsOverview } from "@/components/analytics/StatsOverview";
import { Sidebar } from "@/components/layout/Sidebar";
import { analyticsAPI, type AdminAnalyticsResponse } from "@/lib/api-endpoints";

type Timeframe = "week" | "month" | "quarter" | "year";

type MonthlyPoint = {
  month: string;
  events: number;
  bookmarks: number;
};

type StatItem = {
  label: string;
  value: string | number;
  icon: unknown;
  accent: "emerald" | "cyan" | "violet" | "amber";
};

type CategoryItem = {
  category: string;
  count: number;
};

type ActivityItem = {
  id: string;
  month: string;
  count: number;
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function getMonthOrder(months: string[]) {
  return new Map(months.map((month, index) => [month, index]));
}

function buildAnalyticsState(data: AdminAnalyticsResponse) {
  const eventGrowth = data.eventGrowth ?? [];
  const bookmarkActivity = data.bookmarkActivity ?? [];
  const categoryPopularity = data.categoryPopularity ?? [];
  const recentUserGrowth = data.recentUserGrowth ?? [];

  const orderedMonths = Array.from(
    new Set([
      ...eventGrowth.map((entry) => entry.month),
      ...bookmarkActivity.map((entry) => entry.month),
    ]),
  );
  const monthOrder = getMonthOrder(
    [...eventGrowth, ...bookmarkActivity].map((entry) => entry.month),
  );
  orderedMonths.sort(
    (left, right) => (monthOrder.get(left) ?? 0) - (monthOrder.get(right) ?? 0),
  );

  const monthlyData: MonthlyPoint[] = orderedMonths.map((month) => ({
    month,
    events: Number(
      eventGrowth.find((entry) => entry.month === month)?.count ?? 0,
    ),
    bookmarks: Number(
      bookmarkActivity.find((entry) => entry.month === month)?.count ?? 0,
    ),
  }));

  const stats: StatItem[] = [
    {
      label: "Total Events",
      value: formatNumber(Number(data.totalEvents ?? 0)),
      icon: Calendar01Icon,
      accent: "emerald",
    },
    {
      label: "Total Bookmarks",
      value: formatNumber(Number(data.totalBookmarks ?? 0)),
      icon: Bookmark01Icon,
      accent: "cyan",
    },
    {
      label: "Total Users",
      value: formatNumber(Number(data.totalUsers ?? 0)),
      icon: UserIcon,
      accent: "violet",
    },
    {
      label: "Active Users",
      value: formatNumber(Number(data.activeUsers ?? 0)),
      icon: Clock01Icon,
      accent: "amber",
    },
  ];

  const categories: CategoryItem[] = categoryPopularity
    .map((item) => ({
      category: item.category,
      count: Number(item.count ?? 0),
    }))
    .sort((left, right) => right.count - left.count);

  const recentActivity: ActivityItem[] = recentUserGrowth
    .map((item, index) => ({
      id: `recent-growth-${index}`,
      month: item.month,
      count: Number(item.count ?? 0),
    }))
    .slice(-4)
    .reverse();

  return { stats, monthlyData, categories, recentActivity };
}

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>("month");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [stats, setStats] = useState<StatItem[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyPoint[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    let mounted = true;

    const loadAnalytics = async () => {
      try {
        setIsLoading(true);
        const data = (await analyticsAPI.getStats()) as AdminAnalyticsResponse;

        if (!mounted || !data) return;

        const viewModel = buildAnalyticsState(data);

        setStats(viewModel.stats);
        setMonthlyData(viewModel.monthlyData);
        setCategories(viewModel.categories);
        setRecentActivity(viewModel.recentActivity);
        setError(null);
      } catch (err) {
        console.error("Failed to load analytics:", err);
        if (mounted) {
          setError("Unable to load analytics right now.");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadAnalytics();

    return () => {
      mounted = false;
    };
  }, []);

  const handleExport = () => {
    const payload = {
      timeframe,
      stats,
      monthlyData,
      categories,
      recentActivity,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ignita-analytics-${timeframe}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-zinc-950 text-white">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
          <main className="min-h-screen">
            <div className="h-16 border-b border-zinc-800/50 sm:h-20" />
            <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="space-y-6 animate-pulse">
                <div className="h-36 rounded-[24px] border border-zinc-800 bg-zinc-900/60" />
                <div className="grid gap-4 lg:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-32 rounded-[20px] border border-zinc-800 bg-zinc-900/60"
                    />
                  ))}
                </div>
                <div className="h-[420px] rounded-[24px] border border-zinc-800 bg-zinc-900/60" />
                <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                  <div className="h-[420px] rounded-[24px] border border-zinc-800 bg-zinc-900/60" />
                  <div className="h-[420px] rounded-[24px] border border-zinc-800 bg-zinc-900/60" />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
        <main className="relative min-h-screen overflow-x-hidden bg-zinc-950">
          <div className="relative">
            <div className="h-16 border-b border-zinc-800/50 sm:h-20" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
              {error ? (
                <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <div className="space-y-6">
                <AnalyticsHeader
                  timeframe={timeframe}
                  onTimeframeChange={setTimeframe}
                  onExport={handleExport}
                />

                <StatsOverview stats={stats} />

                <section>
                  <ActivityChart monthlyData={monthlyData} />
                </section>

                <section>
                  <CategoryInsights categories={categories} />
                </section>

                <section>
                  <ActivityFeed items={recentActivity} />
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
