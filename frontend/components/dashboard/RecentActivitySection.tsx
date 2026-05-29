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

const typeColorMap: Record<string, string> = {
  bookmark: "text-teal-400 bg-teal-500/10",
  alert: "text-amber-400 bg-amber-500/10",
};

interface RecentActivitySectionProps {
  activities: ActivityItem[];
}

export const RecentActivitySection = ({
  activities,
}: RecentActivitySectionProps) => {
  if (activities.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center">
        <p className="text-zinc-400 text-sm">No recent activities yet</p>
      </div>
    );
  }

  return (
    <section
      className="rounded-xl border border-zinc-800 bg-zinc-900/50"
      aria-label="Recent activity"
    >
      {/* Header */}
      <div className="p-6 border-b border-zinc-800">
        <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-zinc-800">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="p-4 flex gap-4 hover:bg-zinc-800/30 transition-colors last:rounded-b-xl"
          >
            {/* Icon */}
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${typeColorMap[activity.type]}`}
            >
              <HugeiconsIcon icon={activity.icon} size="20" strokeWidth={2} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">{activity.title}</p>
              <p className="text-xs text-zinc-400 mt-0.5">
                {activity.description}
              </p>
            </div>

            {/* Time */}
            <div className="flex-shrink-0">
              <p className="text-xs text-zinc-500 text-right">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
