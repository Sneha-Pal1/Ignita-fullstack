"use client";

import { useAuthContext } from "@/lib/auth-context";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { RecentBookmarks } from "@/components/dashboard/RecentBookmarks";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-400">Loading dashboard...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <DashboardHero />

        {/* Stats Section */}
        <StatsCards />

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - 2 columns wide */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Bookmarks */}
            <RecentBookmarks />

            {/* Upcoming Events */}
            <UpcomingEvents />

            {/* Quick Actions */}
            <QuickActions />
          </div>

          {/* Right column - 1 column */}
          <div>
            {/* Activity Timeline */}
            <ActivityTimeline />
          </div>
        </div>
      </div>
    </main>
  );
}
