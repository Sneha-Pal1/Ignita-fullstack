"use client";

import { useAuthContext } from "@/lib/auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopHeader } from "@/components/layout/TopHeader";
import { CompactStatsCards } from "@/components/dashboard/CompactStatsCards";
import { RecentActivitySection } from "@/components/dashboard/RecentActivitySection";
import { UpcomingEventsList } from "@/components/dashboard/UpcomingEventsList";
import { RightSidebar } from "@/components/dashboard/RightSidebar";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";

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
    <div className="flex h-dvh overflow-hidden bg-zinc-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        {/* Top Header */}
        <TopHeader />

        {/* Dashboard Content */}
        <main
          className="flex-1 overflow-y-auto"
          id="main-content"
          role="main"
          aria-label="Dashboard content"
        >
          <div className="p-6 lg:p-8">
            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Stats Row */}
                <section role="region" aria-label="Dashboard statistics">
                  <CompactStatsCards />
                </section>

                {/* Recent Activity */}
                <RecentActivitySection />

                {/* Upcoming Events */}
                <UpcomingEventsList />
              </div>

              {/* Right Column - Sidebar Panel */}
              <div>
                <RightSidebar />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
