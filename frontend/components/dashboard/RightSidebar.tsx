"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Clock01Icon,
  ArrowRight01Icon,
  Calendar01Icon,
  Alert01Icon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";

interface Notification {
  id: string;
  type: "alert" | "reminder";
  title: string;
  description: string;
  action?: string;
  actionHref?: string;
}

interface DeadlineItem {
  id: string;
  title: string;
  description: string;
  urgency: "Urgent" | "Soon" | "Upcoming";
  href: string;
}

interface RightSidebarProps {
  notifications: Notification[];
  deadlines: DeadlineItem[];
  recommendations: Array<{
    id: string;
    title: string;
    description: string;
    href: string;
  }>;
}

export const RightSidebar = ({
  notifications,
  deadlines,
  recommendations,
}: RightSidebarProps) => {
  return (
    <aside className="hidden lg:flex flex-col gap-4 sm:gap-6">
      {/* Notifications Panel */}
      <section className="rounded-md border border-[#21262d] bg-[#161b22] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#21262d]">
          <h2 className="text-sm font-semibold text-[#e6edf3]">Notifications</h2>
        </div>

        {/* Content */}
        <div className="divide-y divide-[#21262d]">
          {notifications.length > 0 ? (
            notifications.map((notification) => {
              const iconMap: Record<string, React.ReactNode> = {
                alert: (
                  <HugeiconsIcon
                    icon={Alert01Icon}
                    size="18"
                    strokeWidth={2}
                    className="text-[#3fb950]"
                  />
                ),
                reminder: (
                  <HugeiconsIcon
                    icon={Clock01Icon}
                    size="18"
                    strokeWidth={2}
                    className="text-[#3fb950]"
                  />
                ),
              };

              return (
                <div
                  key={notification.id}
                  className="p-4 hover:bg-[#21262d]/30 transition-colors last:rounded-b-md"
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-0.5">
                      {iconMap[notification.type]}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#e6edf3]">
                        {notification.title}
                      </p>
                      <p className="text-xs text-[#7d8590] mt-1 line-clamp-2 leading-relaxed">
                        {notification.description}
                      </p>
                      {notification.actionHref && (
                        <Link
                          href={notification.actionHref}
                          className="text-xs text-[#3fb950] hover:underline font-medium mt-2 inline-flex items-center gap-1 transition-colors"
                        >
                          {notification.action}
                          <HugeiconsIcon
                            icon={ArrowRight01Icon}
                            size="12"
                            strokeWidth={2}
                          />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-4 text-xs text-[#7d8590]">
              No live notifications yet.
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Deadlines */}
      <section className="rounded-md border border-[#21262d] bg-[#161b22]">
        {/* Header */}
        <div className="p-4 border-b border-[#21262d]">
          <h2 className="text-sm font-semibold text-[#e6edf3]">
            Upcoming Deadlines
          </h2>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {deadlines.length > 0 ? (
            deadlines.map((deadline) => (
              <Link
                key={deadline.id}
                href={deadline.href}
                className="block p-3 rounded-md bg-[#0d1117] border border-[#30363d] hover:border-[#484f58] transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-[#e6edf3]">
                      {deadline.title}
                    </p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <HugeiconsIcon
                        icon={Calendar01Icon}
                        size="12"
                        strokeWidth={2}
                        className="text-[#7d8590]"
                      />
                      <p className="text-xs text-[#7d8590]">
                        {deadline.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-[#2ea043]/10 border border-[#238636]/30 shrink-0">
                    <p className="text-[10px] font-semibold text-[#3fb950]">
                      {deadline.urgency}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-3 rounded-md bg-[#0d1117] border border-[#30363d] text-xs text-[#7d8590]">
              No upcoming deadlines from the live event feed.
            </div>
          )}
        </div>
      </section>

      {/* Recommendations */}
      <section className="rounded-md border border-[#21262d] bg-[#161b22]">
        <div className="p-4">
          <h2 className="text-sm font-semibold text-[#e6edf3] mb-3">
            Recommendations
          </h2>
          <div className="space-y-4">
            {recommendations.length > 0 ? (
              recommendations.map((item) => (
                <div key={item.id} className="space-y-1">
                  <p className="text-sm text-[#e6edf3] font-semibold">
                    {item.title}
                  </p>
                  <p className="text-xs text-[#7d8590] leading-relaxed">{item.description}</p>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#3fb950] hover:underline transition-colors mt-1"
                  >
                    Explore Now
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size="14"
                      strokeWidth={2}
                    />
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#7d8590]">
                No recommendations available from the current live event list.
              </p>
            )}
          </div>
        </div>
      </section>
    </aside>
  );
};
