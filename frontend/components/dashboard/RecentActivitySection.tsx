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
  bookmark: "text-[#3fb950] bg-[#2ea043]/10 border border-[#238636]/30",
  alert: "text-[#3fb950] bg-[#2ea043]/10 border border-[#238636]/30",
};

interface RecentActivitySectionProps {
  activities: ActivityItem[];
}

export const RecentActivitySection = ({
  activities,
}: RecentActivitySectionProps) => {
  if (activities.length === 0) {
    return (
      <div className="rounded-md border border-[#21262d] bg-[#161b22] p-6 text-center">
        <p className="text-[#7d8590] text-sm">No recent activities yet</p>
      </div>
    );
  }

  return (
    <section
      className="rounded-md border border-[#21262d] bg-[#161b22]"
      aria-label="Recent activity"
    >
      {/* Header */}
      <div className="p-4 border-b border-[#21262d]">
        <h2 className="text-sm font-semibold text-[#e6edf3]">Recent Activity</h2>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-[#21262d]">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="p-4 flex gap-4 hover:bg-[#21262d]/30 transition-colors last:rounded-b-md"
          >
            {/* Icon */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center ${typeColorMap[activity.type]}`}
            >
              <HugeiconsIcon icon={activity.icon} size="16" strokeWidth={2} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#e6edf3]">{activity.title}</p>
              <p className="text-xs text-[#7d8590] mt-0.5">
                {activity.description}
              </p>
            </div>

            {/* Time */}
            <div className="flex-shrink-0">
              <p className="text-xs text-[#484f58] text-right">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
