"use client";

import { Bookmark, Calendar, FileText, Clock } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "bookmark" | "event" | "post" | "alert";
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
}

const recentActivities: ActivityItem[] = [
  {
    id: "1",
    type: "event",
    title: "TechCrunch Disrupt 2026",
    description: "You registered for this event",
    time: "2 hours ago",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    id: "2",
    type: "bookmark",
    title: "Web3 Development Bootcamp",
    description: "Added to bookmarks",
    time: "5 hours ago",
    icon: <Bookmark className="w-5 h-5" />,
  },
  {
    id: "3",
    type: "post",
    title: "LinkedIn Post Generated",
    description: "Your AI post is ready to publish",
    time: "1 day ago",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: "4",
    type: "alert",
    title: "Application Deadline Reminder",
    description: "Y Combinator applications close in 3 days",
    time: "1 day ago",
    icon: <Clock className="w-5 h-5" />,
  },
];

const typeColorMap: Record<string, string> = {
  bookmark: "text-teal-400 bg-teal-500/10",
  event: "text-emerald-400 bg-emerald-500/10",
  post: "text-cyan-400 bg-cyan-500/10",
  alert: "text-amber-400 bg-amber-500/10",
};

export const RecentActivitySection = () => {
  if (recentActivities.length === 0) {
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
        {recentActivities.map((activity, index) => (
          <div
            key={activity.id}
            className="p-4 flex gap-4 hover:bg-zinc-800/30 transition-colors last:rounded-b-xl"
          >
            {/* Icon */}
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${typeColorMap[activity.type]}`}
            >
              {activity.icon}
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
              <p className="text-xs text-zinc-500 text-right">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
