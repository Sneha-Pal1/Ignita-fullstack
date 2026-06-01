"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Bookmark01Icon,
  Notification01Icon,
  Share01Icon,
  UserIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import type { ElementType } from "react";

interface FeedItem {
  id: string;
  action: "bookmark" | "alert" | "post" | "register";
  title: string;
  timestamp: string;
  details?: string;
  icon?: ElementType;
}

interface ActivityFeedProps {
  items?: FeedItem[];
}

const getActionIcon = (action: "bookmark" | "alert" | "post" | "register") => {
  const iconMap = {
    bookmark: Bookmark01Icon,
    alert: Notification01Icon,
    post: Share01Icon,
    register: UserIcon,
  };
  return iconMap[action];
};

const getActionColor = (action: "bookmark" | "alert" | "post" | "register") => {
  const colorMap = {
    bookmark: "text-emerald-400",
    alert: "text-amber-400",
    post: "text-blue-400",
    register: "text-purple-400",
  };
  return colorMap[action];
};

const getActionBg = (action: "bookmark" | "alert" | "post" | "register") => {
  const bgMap = {
    bookmark: "bg-emerald-500/10",
    alert: "bg-amber-500/10",
    post: "bg-blue-500/10",
    register: "bg-purple-500/10",
  };
  return bgMap[action];
};

export function ActivityFeed({ items }: ActivityFeedProps) {
  const feed = items ?? [];

  return (
    <section className="rounded-[28px] border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Recent Activity
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-white">
            Timeline
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Real activity generated from the analytics payload.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/60 px-3 py-1.5 text-xs text-zinc-500">
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size="12"
            strokeWidth={2}
            className="text-emerald-400"
          />
          Live timeline
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 sm:p-5">
        {feed.length > 0 ? (
          <div className="space-y-4">
            {feed.map((item, index) => {
              const icon = item.icon ?? getActionIcon(item.action);

              return (
                <div key={item.id} className="relative pl-9">
                  {index < feed.length - 1 ? (
                    <span className="absolute left-[18px] top-10 h-full w-px bg-zinc-800" />
                  ) : null}
                  <span
                    className={`absolute left-0 top-0 inline-flex h-9 w-9 items-center justify-center rounded-xl border ${getActionBg(item.action)} ${getActionColor(item.action)}`}
                  >
                    <HugeiconsIcon icon={icon} size="16" strokeWidth={2} />
                  </span>

                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-zinc-500">
                          {item.details ||
                            "Derived from the live analytics response."}
                        </p>
                      </div>
                      <span className="whitespace-nowrap rounded-full border border-zinc-700 bg-zinc-950/60 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                        {item.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-zinc-800 px-4 py-10 text-center text-sm text-zinc-500">
            No recent activity yet.
          </div>
        )}

        <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-900">
          View all activity
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size="14"
            strokeWidth={2}
            className="text-zinc-500"
          />
        </button>
      </div>
    </section>
  );
}
