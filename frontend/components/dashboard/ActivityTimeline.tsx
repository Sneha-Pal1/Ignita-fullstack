"use client";

import { activities } from "@/lib/data/dashboard";
import { Bookmark, CheckCircle, Share2, Bell } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  bookmark: <Bookmark className="w-5 h-5" />,
  "check-circle": <CheckCircle className="w-5 h-5" />,
  share2: <Share2 className="w-5 h-5" />,
  bell: <Bell className="w-5 h-5" />,
};

const colorMap: Record<string, string> = {
  bookmark: "from-purple-500 to-pink-500",
  registration: "from-green-500 to-emerald-500",
  post: "from-blue-500 to-cyan-500",
  alert: "from-orange-500 to-yellow-500",
};

export const ActivityTimeline = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Activity Timeline</h2>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex gap-4">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              {/* Icon */}
              <div
                className={`relative z-10 w-10 h-10 rounded-full bg-gradient-to-br ${colorMap[activity.type]} flex items-center justify-center text-white mb-4`}
              >
                {iconMap[activity.icon]}
              </div>

              {/* Line */}
              {index !== activities.length - 1 && (
                <div className="w-1 h-12 bg-gradient-to-b from-white/20 to-transparent" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-2 pb-4">
              <div className="p-4 rounded-xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-white/20 transition-all duration-300">
                <p className="text-white font-medium">{activity.description}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
