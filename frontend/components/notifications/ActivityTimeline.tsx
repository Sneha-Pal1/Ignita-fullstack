"use client";

interface ActivityTimelineProps {
  activities: any[];
}

export default function ActivityTimeline({
  activities,
}: ActivityTimelineProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      bookmark: "from-pink-500 to-rose-500",
      registration: "from-green-500 to-emerald-500",
      alert: "from-cyan-500 to-blue-500",
      post: "from-purple-500 to-pink-500",
      event: "from-orange-500 to-yellow-500",
    };
    return colors[category] || "from-emerald-500 to-teal-500";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white mb-1">
          Activity Timeline
        </h2>
        <p className="text-sm text-gray-400">Your recent actions on Ignita</p>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="relative flex gap-4">
            {/* Timeline line */}
            {index !== activities.length - 1 && (
              <div className="absolute left-5 top-12 w-0.5 h-8 bg-linear-to-b from-emerald-500/30 to-transparent" />
            )}

            {/* Icon circle */}
            <div className="shrink-0 relative z-10">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all duration-300 hover:scale-110`}
                style={{
                  background: `linear-gradient(135deg, ${getCategoryColor(
                    activity.category,
                  )})`,
                  boxShadow: `0 0 20px rgba(16, 185, 129, 0.3)`,
                }}
              >
                {activity.icon}
              </div>
            </div>

            {/* Content */}
            <div
              className="flex-1 pt-1 group cursor-pointer transition-all duration-200"
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.75rem",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(16, 185, 129, 0.08)";
                el.style.borderColor = "rgba(16, 185, 129, 0.3)";
                el.style.boxShadow =
                  "0 0 20px rgba(16, 185, 129, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(255, 255, 255, 0.02)";
                el.style.borderColor = "rgba(255, 255, 255, 0.05)";
                el.style.boxShadow = "none";
              }}
            >
              <h3 className="text-sm font-semibold text-white">
                {activity.action}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {activity.description}
              </p>

              {/* Time */}
              <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                <svg
                  className="w-3 h-3 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3"
                  />
                </svg>
                <span>
                  {new Date(activity.timestamp).toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Category badge */}
              <div className="mt-2 inline-block">
                <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 capitalize">
                  {activity.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load more button */}
      <button className="w-full mt-6 px-4 py-3 rounded-lg bg-linear-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 text-emerald-400 hover:from-emerald-600/30 hover:to-teal-600/30 font-medium transition-all duration-200">
        Load More Activity
      </button>
    </div>
  );
}
