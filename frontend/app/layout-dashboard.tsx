"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { TopHeader } from "@/components/layout/TopHeader";
import { ReactNode } from "react";

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-dvh overflow-hidden bg-zinc-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        {/* Top Header */}
        <TopHeader />

        {/* Main Content Area */}
        <main
          className="flex-1 overflow-y-auto"
          id="main-content"
          role="main"
          aria-label="Dashboard content"
        >
          {children}
        </main>
      </div>
    </div>
  );
};
