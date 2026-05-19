"use client";

import { useAuthContext } from "@/lib/auth-context";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { RecentBookmarks } from "@/components/dashboard/RecentBookmarks";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { ProductivityTracker } from "@/components/dashboard/ProductivityTracker";
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
      className="min-h-dvh w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12 sm:pb-16 lg:pb-20 bg-slate-950"
      id="main-content"
      role="main"
      aria-label="Dashboard content"
    >
      <div className="max-w-7xl mx-auto">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-5 auto-rows-max">
          {/* Welcome Card - spans 2 columns on desktop */}
          <div className="lg:col-span-2">
            <WelcomeCard />
          </div>

          {/* Stats Cards - 2 columns on desktop */}
          <div className="lg:col-span-2">
            <StatsCards />
          </div>

          {/* Quick Actions - spans 2 columns */}
          <div className="md:col-span-2 lg:col-span-2">
            <QuickActions />
          </div>

          {/* Upcoming Events - spans 2 columns */}
          <div className="md:col-span-2 lg:col-span-2">
            <UpcomingEvents />
          </div>

          {/* Productivity Tracker - spans full width on mobile, 2 on desktop */}
          <div className="md:col-span-2 lg:col-span-2">
            <ProductivityTracker />
          </div>

          {/* Recent Bookmarks - spans 2 on mobile, 2 on desktop */}
          <div className="md:col-span-2 lg:col-span-2">
            <RecentBookmarks />
          </div>

          {/* Activity Timeline - spans full on mobile, 2 on desktop */}
          <div className="md:col-span-2 lg:col-span-2">
            <ActivityTimeline />
          </div>
        </div>
      </div>
    </main>
  );
}
