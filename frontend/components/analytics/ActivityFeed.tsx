"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { UserIcon } from "@hugeicons/core-free-icons";

interface FeedItem {
  id: string;
  month: string;
  count: number;
}

interface ActivityFeedProps {
  items?: FeedItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  const feed = items ?? [];

  return (
    <section className="rounded-[24px] border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-300">
          <HugeiconsIcon icon={UserIcon} size="18" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-white">
            Recent Activity
          </h2>
          <p className="mt-1 text-sm leading-6 text-zinc-400">
            Latest monthly user-growth records from the backend.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 sm:p-5">
        {feed.length > 0 ? (
          <div className="space-y-3">
            {feed.map((item, index) => (
              <div key={item.id} className="relative pl-8">
                {index < feed.length - 1 ? (
                  <span className="absolute left-[14px] top-8 h-full w-px bg-zinc-800" />
                ) : null}
                <span className="absolute left-0 top-0 inline-flex h-7 w-7 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400">
                  <HugeiconsIcon icon={UserIcon} size="14" strokeWidth={2} />
                </span>

                <div className="flex items-start justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">{item.count} new users</p>
                    <p className="mt-1 text-xs text-zinc-500">{item.month}</p>
                  </div>
                  <span className="whitespace-nowrap text-xs text-zinc-500 tabular-nums">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-zinc-800 px-4 py-10 text-center text-sm text-zinc-500">
            No recent activity yet.
          </div>
        )}
      </div>
    </section>
  );
}
