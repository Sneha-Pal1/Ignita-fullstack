"use client";

import { useAuthContext } from "@/lib/auth-context";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { RecentBookmarks } from "@/components/dashboard/RecentBookmarks";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
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
    return <DashboardSkeleton />;
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-dvh pb-12 sm:pb-16 lg:pb-20">
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:p-3 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:ring-2 focus:ring-blue-400"
      >
        Skip to main content
      </a>

      {/* Header with responsive padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <DashboardHero />

        {/* Stats Section */}
        <StatsCards />

        {/* Main content grid with proper spacing */}
        <div
          id="main-content"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-10"
          role="main"
          aria-label="Dashboard content"
        >
          {/* Left column - 2 columns wide */}
          <div className="lg:col-span-2 space-y-12 sm:space-y-16">
            {/* Recent Bookmarks Section */}
            <RecentBookmarks />

            {/* Upcoming Events Section */}
            <UpcomingEvents />

            {/* Quick Actions Section */}
            <QuickActions />
          </div>

          {/* Right column - Activity Timeline */}
          <aside className="lg:col-span-1" aria-label="Recent activity">
            <ActivityTimeline />
          </aside>
        </div>
      </div>
    </main>
  );
}
