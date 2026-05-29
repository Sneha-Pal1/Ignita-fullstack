"use client";

import { Bookmark, AlertCircle, Share2, CheckCircle2 } from "lucide-react";

interface FeedItem {
  id: string;
  action: "bookmark" | "alert" | "post" | "register";
  title: string;
  timestamp: string;
  details?: string;
}

interface ActivityFeedProps {
  items?: FeedItem[];
}

const getActionIcon = (action: "bookmark" | "alert" | "post" | "register") => {
  const iconMap = {
    bookmark: <Bookmark className="w-4 h-4" />,
    alert: <AlertCircle className="w-4 h-4" />,
    post: <Share2 className="w-4 h-4" />,
    register: <CheckCircle2 className="w-4 h-4" />,
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
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Recent Activity</h2>
        <p className="text-sm text-zinc-400">
          Your latest actions and interactions.
        </p>
      </div>

      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4">
        {feed.map((item, index) => (
          <div key={item.id} className="flex gap-4">
            <div
              className={`shrink-0 w-10 h-10 rounded-lg ${getActionBg(item.action)} flex items-center justify-center ${getActionColor(item.action)}`}
            >
              {getActionIcon(item.action)}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {item.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-zinc-500">{item.timestamp}</p>
                {item.details && (
                  <>
                    <span className="text-zinc-700">•</span>
                    <p className="text-xs text-zinc-400">{item.details}</p>
                  </>
                )}
              </div>
            </div>

            {index < feed.length - 1 && (
              <div className="absolute left-6 right-6 h-px bg-zinc-800/50 mt-4" />
            )}
          </div>
        ))}

        <button className="w-full mt-4 py-3 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors duration-200 border-t border-zinc-800 pt-4">
          View all activity →
        </button>
      </div>
    </div>
  );
}
