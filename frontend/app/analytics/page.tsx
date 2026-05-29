"use client";

import { useState } from "react";
import { AnalyticsHeader } from "@/components/analytics/AnalyticsHeader";
import { StatsOverview } from "@/components/analytics/StatsOverview";
import { ActivityHeatmap } from "@/components/analytics/ActivityHeatmap";
import { ActivityChart } from "@/components/analytics/ActivityChart";
import { CategoryInsights } from "@/components/analytics/CategoryInsights";
import { ProductivityInsights } from "@/components/analytics/ProductivityInsights";
import { ActivityFeed } from "@/components/analytics/ActivityFeed";
import { GoalsSection } from "@/components/analytics/GoalsSection";
import { Sidebar } from "@/components/layout/Sidebar";

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<
    "week" | "month" | "quarter" | "year"
  >("month");

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
        <main className="min-h-screen bg-zinc-950">
          {/* Header Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/10 via-zinc-950 to-zinc-950 pointer-events-none" />

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
                  <StatsOverview />
                </section>

                {/* 3. Activity Heatmap */}
                <section className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                  <ActivityHeatmap />
                </section>

                {/* 4. Monthly Activity Graph */}
                <section className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                  <ActivityChart />
                </section>

                {/* 5. Event Category Insights */}
                <section className="space-y-4">
                  <CategoryInsights />
                </section>

                {/* 6. Productivity Insights */}
                <section className="space-y-4">
                  <ProductivityInsights />
                </section>

                {/* 7 & 8. Two Column Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Recent Activity Feed */}
                  <div className="lg:col-span-2">
                    <ActivityFeed />
                  </div>

                  {/* Goals & Streaks */}
                  <div className="lg:col-span-1">
                    <GoalsSection />
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
