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
    <main
      className="min-h-dvh max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12 sm:pb-16 lg:pb-20 space-y-12 sm:space-y-16"
      id="main-content"
      role="main"
      aria-label="Dashboard content"
    >
      {/* Hero Section */}
      <DashboardHero />

      {/* Stats Section */}
      <StatsCards />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-10">
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
    </main>
  );
}
