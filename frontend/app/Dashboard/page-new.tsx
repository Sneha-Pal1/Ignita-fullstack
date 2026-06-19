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
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
        <TopHeader />
        <main
          className="flex-1"
          id="main-content"
          role="main"
          aria-label="Dashboard content"
        >
          <div className="p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <section role="region" aria-label="Dashboard statistics">
                  {/* stats prop satisfied with empty array — data loaded in main Dashboard page */}
                  <CompactStatsCards stats={[]} />
                </section>
                <RecentActivitySection activities={[]} />
                <UpcomingEventsList events={[]} />
              </div>
              <div>
                <RightSidebar
                  notifications={[]}
                  deadlines={[]}
                  recommendations={[]}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
