"use client";

import { HugeiconsIcon } from "@hugeicons/react";

interface ActivityItem {
  id: string;
  type: "bookmark" | "alert";
  title: string;
  description: string;
  time: string;
  icon: any;
}

interface RecentActivitySectionProps {
  activities: ActivityItem[];
}

export const RecentActivitySection = ({
  activities,
}: RecentActivitySectionProps) => {
  if (activities.length === 0) {
    return (
      <div className="border border-white/10 bg-[#141413] p-6 text-center font-mono text-xs text-[#8a8a86]">
        NO RECENT ACTIVITY RECORDED.
      </div>
    );
  }

  return (
    <section
      className="border border-white/10 bg-[#141413] font-mono"
      aria-label="Recent activity"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center gap-2">
        <span className="h-1.5 w-1.5 bg-[#FFB100]" />
        <h2 className="text-xs font-bold uppercase tracking-widest text-white">RECENT ACTIVITY</h2>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-white/10">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors"
          >
            {/* Icon */}
            <div className="flex-shrink-0 w-8 h-8 bg-[#1c1c1a] border border-[#FFB100] text-[#FFB100] flex items-center justify-center">
              <HugeiconsIcon icon={activity.icon} size="14" strokeWidth={2} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white uppercase truncate">{activity.title}</p>
              <p className="text-[11px] text-[#8a8a86] mt-0.5 truncate">
                {activity.description}
              </p>
            </div>

            {/* Time */}
            <div className="flex-shrink-0 text-right">
              <p className="text-[10px] text-[#FFB100]">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
