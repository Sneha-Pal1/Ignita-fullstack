"use client";

interface ActivityTimelineProps {
  activities: any[];
}

export default function ActivityTimeline({
  activities,
}: ActivityTimelineProps) {
  return (
    <div className="space-y-6 font-mono">
      <div>
        <div className="levo-eyebrow mb-1">
          <span className="h-1.5 w-1.5 bg-[#FFB100]" />
          <span>USER ACTIVITY LOG</span>
        </div>
        <h2 className="text-xl font-bold text-white font-sans">
          Activity Timeline
        </h2>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={activity.id} className="relative flex gap-4">
            {/* Timeline vertical line */}
            {index !== activities.length - 1 && (
              <div className="absolute left-[15px] top-10 w-px h-full bg-white/10" />
            )}

            {/* Icon box */}
            <div className="shrink-0 relative z-10">
              <div className="w-8 h-8 flex items-center justify-center border border-[#FFB100]/30 bg-[#FFB100]/10 text-[#FFB100]">
                {activity.icon}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 border border-white/10 bg-[#141413] p-4 hover:border-[#FFB100]/40 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xs font-bold text-white font-sans">
                  {activity.action}
                </h3>
                <span className="px-2 py-0.5 border border-white/10 bg-[#0e0e0d] text-[10px] text-[#FFB100] uppercase font-mono">
                  {activity.category}
                </span>
              </div>
              <p className="text-xs text-[#8a8a86] mt-1 font-mono">
                {activity.description}
              </p>

              <div className="text-[10px] text-[#8a8a86] mt-2 font-mono flex items-center gap-1.5">
                <span>
                  {new Date(activity.timestamp).toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
