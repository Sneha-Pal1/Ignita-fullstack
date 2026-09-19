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
    <section className="border border-white/10 bg-[#141413] p-6 font-mono">
      <div className="flex items-start gap-3">
        <div className="inline-flex h-9 w-9 items-center justify-center border border-[#FFB100]/30 bg-[#FFB100]/10 text-[#FFB100]">
          <HugeiconsIcon icon={UserIcon} size="18" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-white font-sans">
            Recent Activity
          </h2>
          <p className="mt-0.5 text-xs text-[#8a8a86]">
            Latest monthly user-growth records from backend.
          </p>
        </div>
      </div>

      <div className="mt-5 border border-white/10 bg-[#0e0e0d] p-5">
        {feed.length > 0 ? (
          <div className="space-y-3">
            {feed.map((item, index) => (
              <div key={item.id} className="relative pl-7">
                {index < feed.length - 1 ? (
                  <span className="absolute left-[11px] top-6 h-full w-px bg-white/10" />
                ) : null}
                <span className="absolute left-0 top-0 inline-flex h-6 w-6 items-center justify-center border border-[#FFB100]/40 bg-[#FFB100]/10 text-[#FFB100]">
                  <HugeiconsIcon icon={UserIcon} size="12" strokeWidth={2} />
                </span>

                <div className="flex items-start justify-between gap-4 border border-white/10 bg-[#141413] p-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white font-sans">
                      {item.count} new users registered
                    </p>
                    <p className="mt-0.5 text-[10px] text-[#8a8a86] font-mono">{item.month}</p>
                  </div>
                  <span className="whitespace-nowrap text-xs text-[#FFB100] font-mono font-bold tabular-nums">
                    +{item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-white/10 px-4 py-8 text-center text-xs text-[#8a8a86]">
            No recent activity recorded yet.
          </div>
        )}
      </div>
    </section>
  );
}
