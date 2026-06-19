"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { TopHeader } from "@/components/layout/TopHeader";

interface AppLayoutProps {
  children: React.ReactNode;
  savedCount?: number;
}

export function AppLayout({ children, savedCount }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
        <TopHeader savedCount={savedCount} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
