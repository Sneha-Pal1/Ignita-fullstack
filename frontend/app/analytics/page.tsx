"use client";

import { useState, useEffect } from "react";
import type { ElementType } from "react";
import {
  ArrowRight01Icon,
  Bookmark01Icon,
  Calendar01Icon,
  Clock01Icon,
  Note01Icon,
  Share01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { AnalyticsHeader } from "@/components/analytics/AnalyticsHeader";
import { StatsOverview } from "@/components/analytics/StatsOverview";
import { ActivityHeatmap } from "@/components/analytics/ActivityHeatmap";
import { ActivityChart } from "@/components/analytics/ActivityChart";
import { CategoryInsights } from "@/components/analytics/CategoryInsights";
import { ProductivityInsights } from "@/components/analytics/ProductivityInsights";
import { ActivityFeed } from "@/components/analytics/ActivityFeed";
import { GoalsSection } from "@/components/analytics/GoalsSection";
import { Sidebar } from "@/components/layout/Sidebar";
import { analyticsAPI, type AdminAnalyticsResponse } from "@/lib/api-endpoints";

type Timeframe = "week" | "month" | "quarter" | "year";

type MonthlyPoint = {
  month: string;
  events: number;
  bookmarks: number;
  total: number;
};

type HeatmapPoint = {
  month: string;
  count: number;
  intensity: "none" | "low" | "medium" | "high" | "very-high";
};

type CategoryItem = {
  name: string;
  count: number;
  percentage: number;
  color: string;
};

type StatItem = {
  label: string;
  value: string | number;
  trendLabel: string;
  trendDirection: "up" | "down" | "flat";
  icon: ElementType;
  accent: "emerald" | "cyan" | "violet" | "amber";
};

type InsightItem = {
  id: string;
  title: string;
  value: string;
  detail: string;
  icon: ElementType;
  tone: "emerald" | "cyan" | "violet";
};

type FeedItem = {
  id: string;
  action: "register";
  title: string;
  timestamp: string;
  details: string;
  icon: ElementType;
};

type GoalItem = {
  title: string;
  current: number;
  target: number;
  progress: number;
  helper: string;
  icon: ElementType;
  tone: "emerald" | "cyan" | "amber";
};

const categoryPalette = ["emerald", "cyan", "blue", "amber", "violet", "rose"];

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatPercent(value: number) {
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value}%`;
}

function getTrendDirection(value: number): "up" | "down" | "flat" {
  if (value > 0) return "up";
  if (value < 0) return "down";
  return "flat";
}

function calculateChange(current: number, previous: number) {
  if (previous === 0) {
    if (current === 0) {
      return 0;
    }
    return 100;
  }

  return Math.round(((current - previous) / previous) * 100);
}

function getIntensity(count: number, max: number): HeatmapPoint["intensity"] {
  if (count === 0 || max === 0) return "none";
  const ratio = count / max;
  if (ratio >= 0.8) return "very-high";
  if (ratio >= 0.6) return "high";
  if (ratio >= 0.35) return "medium";
  return "low";
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

  const monthlyData: MonthlyPoint[] = orderedMonths.map((month) => {
    const events = Number(
      eventGrowth.find((entry) => entry.month === month)?.count ?? 0,
    );
    const bookmarks = Number(
      bookmarkActivity.find((entry) => entry.month === month)?.count ?? 0,
    );

    return {
      month,
      events,
      bookmarks,
      total: events + bookmarks,
    };
  });

  const latestMonth = monthlyData[monthlyData.length - 1] ?? null;
  const previousMonth = monthlyData[monthlyData.length - 2] ?? null;
  const totalEvents = eventGrowth.reduce(
    (sum, entry) => sum + Number(entry.count ?? 0),
    0,
  );
  const totalBookmarks = bookmarkActivity.reduce(
    (sum, entry) => sum + Number(entry.count ?? 0),
    0,
  );
  const activeUsers = Number(data.activeUsers ?? 0);
  const totalActivity = totalEvents + totalBookmarks;
  const monthlyDelta = calculateChange(
    latestMonth?.total ?? 0,
    previousMonth?.total ?? 0,
  );
  const bookmarkDelta = calculateChange(
    latestMonth?.bookmarks ?? 0,
    previousMonth?.bookmarks ?? 0,
  );
  const eventDelta = calculateChange(
    latestMonth?.events ?? 0,
    previousMonth?.events ?? 0,
  );

  const stats: StatItem[] = [
    {
      label: "Total Events",
      value: formatNumber(totalEvents),
      trendLabel: `${formatPercent(eventDelta)} vs previous month`,
      trendDirection: getTrendDirection(eventDelta),
      icon: Calendar01Icon,
      accent: "emerald",
    },
    {
      label: "Total Bookmarks",
      value: formatNumber(totalBookmarks),
      trendLabel: `${formatPercent(bookmarkDelta)} vs previous month`,
      trendDirection: getTrendDirection(bookmarkDelta),
      icon: Bookmark01Icon,
      accent: "cyan",
    },
    {
      label: "Active Users",
      value: formatNumber(activeUsers),
      trendLabel:
        activeUsers > 0 ? "Current live dataset" : "No active users yet",
      trendDirection: activeUsers > 0 ? "up" : "flat",
      icon: UserIcon,
      accent: "violet",
    },
    {
      label: "Growth",
      value: `${formatPercent(monthlyDelta)}`,
      trendLabel: "Month-over-month activity change",
      trendDirection: getTrendDirection(monthlyDelta),
      icon: ArrowRight01Icon,
      accent: "amber",
    },
  ];

  const maxMonthlyTotal = Math.max(...monthlyData.map((item) => item.total), 1);
  const activityHeatmap: HeatmapPoint[] = monthlyData.map((item) => ({
    month: item.month,
    count: item.total,
    intensity: getIntensity(item.total, maxMonthlyTotal),
  }));

  const categories: CategoryItem[] = categoryPopularity
    .map((item, index) => ({
      name: item.category,
      count: Number(item.count ?? 0),
      percentage: 0,
      color: categoryPalette[index % categoryPalette.length],
    }))
    .sort((left, right) => right.count - left.count);

  const categoryTotal =
    categories.reduce((sum, item) => sum + item.count, 0) || 1;
  const categoriesWithPercent = categories.map((item) => ({
    ...item,
    percentage: Math.round((item.count / categoryTotal) * 100),
  }));

  const topCategory = categoriesWithPercent[0] ?? null;
  const topMonth = monthlyData.reduce<MonthlyPoint | null>((best, current) => {
    if (!best) return current;
    return current.total > best.total ? current : best;
  }, null);

  const insights: InsightItem[] = [
    {
      id: "peak-month",
      title: "Peak Month",
      value: topMonth?.month ?? "No activity",
      detail:
        topMonth && totalActivity > 0
          ? `${formatNumber(topMonth.total)} total actions in the strongest month.`
          : "No monthly activity has been recorded yet.",
      icon: Clock01Icon,
      tone: "emerald",
    },
    {
      id: "top-category",
      title: "Top Category",
      value: topCategory?.name ?? "No categories",
      detail:
        topCategory && categoryTotal > 0
          ? `${topCategory.percentage}% of saved bookmarks belong here.`
          : "Category data is not available yet.",
      icon: Note01Icon,
      tone: "cyan",
    },
    {
      id: "activity-mix",
      title: "Activity Mix",
      value:
        totalActivity > 0
          ? `${Math.round((totalBookmarks / totalActivity) * 100)}% bookmarks`
          : "No activity",
      detail:
        totalActivity > 0
          ? `${formatNumber(totalBookmarks)} bookmarks compared with ${formatNumber(totalEvents)} events.`
          : "Activity mix will appear once the dataset has entries.",
      icon: Share01Icon,
      tone: "violet",
    },
  ];

  const feedItems: FeedItem[] = recentUserGrowth.map((item, index) => ({
    id: `recent-growth-${index}`,
    action: "register",
    title: `${formatNumber(Number(item.count ?? 0))} new users in ${item.month}`,
    timestamp: item.month,
    details: "Derived from the live analytics API response.",
    icon: UserIcon,
  }));

  const goals: GoalItem[] = [
    {
      title: "Bookmark share of activity",
      current: totalBookmarks,
      target: totalActivity,
      progress:
        totalActivity > 0
          ? Math.round((totalBookmarks / totalActivity) * 100)
          : 0,
      helper:
        totalActivity > 0
          ? `${Math.round((totalBookmarks / totalActivity) * 100)}% of tracked activity is bookmarks.`
          : "No tracked activity yet.",
      icon: Bookmark01Icon,
      tone: "cyan",
    },
    {
      title: "Top category concentration",
      current: topCategory?.count ?? 0,
      target: totalBookmarks,
      progress: topCategory?.percentage ?? 0,
      helper:
        topCategory && totalBookmarks > 0
          ? `${topCategory.percentage}% of bookmarks sit in the leading category.`
          : "No category concentration data yet.",
      icon: Note01Icon,
      tone: "emerald",
    },
    {
      title: "Latest month momentum",
      current: latestMonth?.total ?? 0,
      target: previousMonth?.total ?? latestMonth?.total ?? 0,
      progress:
        previousMonth && previousMonth.total > 0 && latestMonth
          ? Math.min(
              100,
              Math.round((latestMonth.total / previousMonth.total) * 100),
            )
          : (latestMonth?.total ?? 0),
      helper:
        latestMonth && previousMonth
          ? `${formatNumber(latestMonth.total)} actions versus ${formatNumber(previousMonth.total)} in the prior month.`
          : "Momentum becomes visible once multiple months are available.",
      icon: ArrowRight01Icon,
      tone: "amber",
    },
  ];

  const growthSnapshot =
    latestMonth && previousMonth
      ? `${formatPercent(monthlyDelta)} from ${previousMonth.month} to ${latestMonth.month}`
      : "Waiting for a second month of data";

  return {
    stats,
    monthlyData,
    activityHeatmap,
    categories: categoriesWithPercent,
    insights,
    feedItems,
    goals,
    growthSnapshot,
  };
}

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>("month");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [stats, setStats] = useState<StatItem[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyPoint[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [goals, setGoals] = useState<GoalItem[]>([]);
  const [activityData, setActivityData] = useState<HeatmapPoint[]>([]);
  const [insightsData, setInsightsData] = useState<InsightItem[]>([]);
  const [growthSnapshot, setGrowthSnapshot] = useState<string>("");

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
        setActivityData(viewModel.activityHeatmap);
        setCategories(viewModel.categories);
        setInsightsData(viewModel.insights);
        setFeedItems(viewModel.feedItems);
        setGoals(viewModel.goals);
        setGrowthSnapshot(viewModel.growthSnapshot);
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
      growthSnapshot,
      stats,
      monthlyData,
      categories,
      insightsData,
      feedItems,
      goals,
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
            <div className="h-16 sm:h-20 border-b border-zinc-800/50" />
            <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="space-y-6 animate-pulse">
                <div className="h-36 rounded-[28px] border border-zinc-800 bg-zinc-900/60" />
                <div className="grid gap-4 lg:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-32 rounded-2xl border border-zinc-800 bg-zinc-900/60"
                    />
                  ))}
                </div>
                <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                  <div className="h-80 rounded-[28px] border border-zinc-800 bg-zinc-900/60" />
                  <div className="h-80 rounded-[28px] border border-zinc-800 bg-zinc-900/60" />
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
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-emerald-950/10 via-zinc-950 to-zinc-950" />
          <div className="relative">
            <div className="h-16 border-b border-zinc-800/50 sm:h-20" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
              {error ? (
                <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <div className="space-y-8">
                <AnalyticsHeader
                  timeframe={timeframe}
                  onTimeframeChange={setTimeframe}
                  onExport={handleExport}
                  growthSnapshot={growthSnapshot}
                />

                <StatsOverview stats={stats} />

                <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                  <ActivityHeatmap activityData={activityData} />
                  <ActivityChart monthlyData={monthlyData} />
                </section>

                <section>
                  <CategoryInsights categories={categories} />
                </section>

                <section>
                  <ProductivityInsights insights={insightsData} />
                </section>

                <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                  <ActivityFeed items={feedItems} />
                  <GoalsSection goals={goals} />
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
