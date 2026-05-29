"use client";

import { useState, useEffect } from "react";
import { AnalyticsHeader } from "@/components/analytics/AnalyticsHeader";
import { StatsOverview } from "@/components/analytics/StatsOverview";
import { ActivityHeatmap } from "@/components/analytics/ActivityHeatmap";
import { ActivityChart } from "@/components/analytics/ActivityChart";
import { CategoryInsights } from "@/components/analytics/CategoryInsights";
import { ProductivityInsights } from "@/components/analytics/ProductivityInsights";
import { Clock2, Users2, Sparkles } from "lucide-react";
import { ActivityFeed } from "@/components/analytics/ActivityFeed";
import { GoalsSection } from "@/components/analytics/GoalsSection";
import { Sidebar } from "@/components/layout/Sidebar";
import { analyticsAPI } from "@/lib/api-endpoints";

type MonthlyPoint = {
  month: string;
  bookmarks: number;
  events: number;
  alerts: number;
  posts: number;
};

type CategoryItem = {
  name: string;
  count: number;
  percentage?: number;
  color?: string;
};

type StatItem = {
  label: string;
  value: string | number;
  change?: string;
  changePercent?: string;
  icon?: React.ReactNode;
};

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<
    "week" | "month" | "quarter" | "year"
  >("month");

  const [stats, setStats] = useState<StatItem[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyPoint[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [feedItems, setFeedItems] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [engagementScore, setEngagementScore] = useState<number>(0);
  const [activityData, setActivityData] = useState<any[]>([]);
  const [insightsData, setInsightsData] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;

    const loadAnalytics = async () => {
      try {
        const data: any = await analyticsAPI.getStats();

        if (!mounted || !data) return;

        // Build monthly data from eventGrowth and bookmarkActivity
        const eventGrowth = data.eventGrowth ?? [];
        const bookmarkActivity = data.bookmarkActivity ?? [];

        const monthsSet = new Set<string>();
        eventGrowth.forEach((m: any) => monthsSet.add(m.month));
        bookmarkActivity.forEach((m: any) => monthsSet.add(m.month));

        const months = Array.from(monthsSet);

        const monthly: MonthlyPoint[] = months.map((month) => ({
          month,
          bookmarks: Number(
            bookmarkActivity.find((m: any) => m.month === month)?.count ?? 0,
          ),
          events: Number(
            eventGrowth.find((m: any) => m.month === month)?.count ?? 0,
          ),
          alerts: 0,
          posts: 0,
        }));

        setMonthlyData(monthly);

        // Synthesize a simple daily activity heatmap from monthly aggregates
        const synthesizeHeatmap = (monthlyArr: MonthlyPoint[]) => {
          const days: any[] = [];
          const today = new Date();
          for (let i = 364; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            const monthShort = d.toLocaleString("en-US", { month: "short" });
            const m = monthlyArr.find((mo) => mo.month === monthShort) ?? {
              bookmarks: 0,
              events: 0,
            };
            const base = (m.bookmarks + m.events) / 2;
            const daily = Math.max(
              0,
              Math.round(base / 30 + (Math.random() * 2 - 1)),
            );
            const intensity =
              daily > 5
                ? "very-high"
                : daily > 3
                  ? "high"
                  : daily > 1
                    ? "medium"
                    : daily > 0
                      ? "low"
                      : "none";
            days.push({
              date: d.toISOString().slice(0, 10),
              count: daily,
              intensity,
            });
          }
          return days;
        };

        setActivityData(synthesizeHeatmap(monthly));

        // Categories
        const cat = (data.categoryPopularity ?? []).map((c: any) => ({
          name: c.category ?? c.name,
          count: Number(c.count ?? 0),
        }));
        const totalCat =
          cat.reduce((s: number, it: any) => s + it.count, 0) || 1;
        const catWithPct: CategoryItem[] = cat.map((c: any) => ({
          ...c,
          percentage: Math.round((c.count / totalCat) * 100),
        }));
        setCategories(catWithPct);

        // Productivity insights derived from analytics
        const topMonth = monthly.reduce((best, it) => {
          const score = it.events + it.bookmarks;
          return score > (best.score ?? -1) ? { month: it.month, score } : best;
        }, {} as any);

        const favoriteCategory = catWithPct[0]?.name ?? "General";

        const lastTwo = monthly.slice(-2);
        let growthLabel = "—";
        if (lastTwo.length === 2) {
          const prev = lastTwo[0].events + lastTwo[0].bookmarks;
          const last = lastTwo[1].events + lastTwo[1].bookmarks;
          const pct =
            prev === 0
              ? last === 0
                ? 0
                : 100
              : Math.round(((last - prev) / prev) * 100);
          growthLabel = `${pct >= 0 ? "+" : ""}${pct}%`;
        }

        const insights = [
          {
            id: "peak-month",
            title: "Peak Month",
            value: topMonth.month ?? "N/A",
            icon: Clock2,
          },
          {
            id: "favorite-category",
            title: "Top Category",
            value: favoriteCategory,
            icon: Users2,
          },
          {
            id: "monthly-growth",
            title: "Monthly Change",
            value: growthLabel,
            icon: Sparkles,
          },
        ];

        setInsightsData(insights);

        // Stats overview
        const totalEvents = eventGrowth.reduce(
          (s: number, it: any) => s + Number(it.count ?? 0),
          0,
        );
        const totalBookmarks = bookmarkActivity.reduce(
          (s: number, it: any) => s + Number(it.count ?? 0),
          0,
        );
        const activeUsers = Number(data.activeUsers ?? 0);

        const statsArr: StatItem[] = [
          { label: "Total Events", value: totalEvents },
          { label: "Total Bookmarks", value: totalBookmarks },
          { label: "Active Users", value: activeUsers },
          {
            label: "Recent Growth",
            value: (data.recentUserGrowth ?? []).length,
          },
        ];
        setStats(statsArr);

        // Activity feed - map recentUserGrowth or fallback
        const feed = (data.recentUserGrowth ?? []).map(
          (m: any, idx: number) => ({
            id: `g-${idx}`,
            action: "register",
            title: `${m.count} new users in ${m.month}`,
            timestamp: m.month,
            details: "",
          }),
        );
        setFeedItems(feed);

        // Goals - synthesize from totals
        setGoals([
          {
            title: "Save Events This Month",
            current: totalBookmarks,
            target: Math.max(40, totalBookmarks),
            unit: "events",
            progress: Math.min(
              100,
              Math.round((totalBookmarks / Math.max(40, totalBookmarks)) * 100),
            ),
          },
        ]);

        setEngagementScore(
          Math.min(
            100,
            Math.round((activeUsers / Math.max(1, totalEvents)) * 10),
          ),
        );
      } catch (err) {
        console.error("Failed to load analytics:", err);
      }
    };

    loadAnalytics();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
        <main className="min-h-screen bg-zinc-950">
          {/* Header Background */}
          <div className="absolute inset-0 bg-linear-to-br from-emerald-950/10 via-zinc-950 to-zinc-950 pointer-events-none" />

          {/* Content */}
          <div className="relative">
            {/* Top Navigation Padding */}
            <div className="h-16 sm:h-20 border-b border-zinc-800/50" />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              <div className="space-y-12">
                {/* 1. Header Section */}
                <AnalyticsHeader
                  timeframe={timeframe}
                  onTimeframeChange={setTimeframe}
                />

                {/* 2. Stats Overview */}
                <section className="space-y-4">
                  <StatsOverview stats={stats} />
                </section>

                {/* 3. Activity Heatmap */}
                <section className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                  <ActivityHeatmap activityData={activityData} />
                </section>

                {/* 4. Monthly Activity Graph */}
                <section className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                  <ActivityChart monthlyData={monthlyData} />
                </section>

                {/* 5. Event Category Insights */}
                <section className="space-y-4">
                  <CategoryInsights categories={categories} />
                </section>

                {/* 6. Productivity Insights */}
                <section className="space-y-4">
                  <ProductivityInsights insights={insightsData} />
                </section>

                {/* 7 & 8. Two Column Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Recent Activity Feed */}
                  <div className="lg:col-span-2">
                    <ActivityFeed items={feedItems} />
                  </div>

                  {/* Goals & Streaks */}
                  <div className="lg:col-span-1">
                    <GoalsSection
                      goals={goals}
                      engagementScore={engagementScore}
                      currentStreak={0}
                      streakRecord={0}
                    />
                  </div>
                </div>

                {/* Footer Spacing */}
                <div className="h-8" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
