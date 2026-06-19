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
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white">Notifications</h2>
        </div>

        {/* Content */}
        <div className="divide-y divide-zinc-800">
          {notifications.length > 0 ? (
            notifications.map((notification) => {
              const iconMap: Record<string, React.ReactNode> = {
                alert: (
                  <HugeiconsIcon
                    icon={Alert01Icon}
                    size="20"
                    strokeWidth={2}
                    className="text-amber-400"
                  />
                ),
                reminder: (
                  <HugeiconsIcon
                    icon={Clock01Icon}
                    size="20"
                    strokeWidth={2}
                    className="text-cyan-400"
                  />
                ),
              };

              return (
                <div
                  key={notification.id}
                  className="p-4 hover:bg-zinc-800/30 transition-colors last:rounded-b-xl"
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {iconMap[notification.type]}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">
                        {notification.title}
                      </p>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                        {notification.description}
                      </p>
                      {notification.actionHref && (
                        <Link
                          href={notification.actionHref}
                          className="text-xs text-emerald-400 hover:text-emerald-300 font-medium mt-2 inline-flex items-center gap-1 transition-colors"
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
            <div className="p-4 text-sm text-zinc-400">
              No live notifications yet.
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Deadlines */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/50">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white">
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
                className="block p-3 rounded-lg bg-zinc-800/30 border border-zinc-700 hover:border-zinc-600 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-white">
                      {deadline.title}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <HugeiconsIcon
                        icon={Calendar01Icon}
                        size="12"
                        strokeWidth={2}
                        className="text-zinc-500"
                      />
                      <p className="text-xs text-zinc-400">
                        {deadline.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                    <p className="text-xs font-medium text-amber-400">
                      {deadline.urgency}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-700 text-sm text-zinc-400">
              No upcoming deadlines from the live event feed.
            </div>
          )}
        </div>
      </section>

      {/* Recommendations */}
      <section className="rounded-xl border border-zinc-800 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border-emerald-500/20">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-white mb-3">
            Recommendations
          </h2>
          <div className="space-y-3 mb-4">
            {recommendations.length > 0 ? (
              recommendations.map((item) => (
                <div key={item.id} className="space-y-1">
                  <p className="text-sm text-zinc-100 font-medium">
                    {item.title}
                  </p>
                  <p className="text-sm text-zinc-400">{item.description}</p>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Explore Now
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size="16"
                      strokeWidth={2}
                    />
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-300">
                No recommendations available from the current live event list.
              </p>
            )}
          </div>
        </div>
      </section>
    </aside>
  );
};
