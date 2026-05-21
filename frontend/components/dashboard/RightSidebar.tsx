"use client";

import { AlertCircle, Clock, Zap, ChevronRight, Calendar } from "lucide-react";
import Link from "next/link";

interface Notification {
  id: string;
  type: "alert" | "reminder" | "streak";
  title: string;
  description: string;
  action?: string;
  actionHref?: string;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "alert",
    title: "Deadline Alert",
    description: "React Workshop registration closes in 2 days",
    action: "View",
    actionHref: "/events",
  },
  {
    id: "2",
    type: "reminder",
    title: "New Opportunity",
    description: "Frontend Developer role at Stripe",
    action: "Explore",
    actionHref: "/events",
  },
  {
    id: "3",
    type: "streak",
    title: "Keep Your Streak!",
    description: "You're on a 7-day activity streak",
  },
];

export const RightSidebar = () => {
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
          {notifications.map((notification) => {
            const iconMap = {
              alert: (
                <AlertCircle className="w-5 h-5 text-amber-400" />
              ),
              reminder: <Clock className="w-5 h-5 text-cyan-400" />,
              streak: <Zap className="w-5 h-5 text-emerald-400" />,
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
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Upcoming Deadlines */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/50">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white">Upcoming Deadlines</h2>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-700">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-white">
                  Y Combinator Applications
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Calendar className="w-3 h-3 text-zinc-500" />
                  <p className="text-xs text-zinc-400">Closes in 3 days</p>
                </div>
              </div>
              <div className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                <p className="text-xs font-medium text-amber-400">Urgent</p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-700">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-white">
                  React Workshop
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Calendar className="w-3 h-3 text-zinc-500" />
                  <p className="text-xs text-zinc-400">Closes in 5 days</p>
                </div>
              </div>
              <div className="px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">
                <p className="text-xs font-medium text-cyan-400">Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="rounded-xl border border-zinc-800 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border-emerald-500/20">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-white mb-3">
            Recommendations
          </h2>
          <p className="text-sm text-zinc-300 mb-4">
            Based on your activity, we recommend checking out Web3 events and
            product management opportunities.
          </p>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Explore Now
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </aside>
  );
};
