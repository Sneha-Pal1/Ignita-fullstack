"use client";

import { activities } from "@/lib/data/dashboard";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { Bookmark, CheckCircle, FileText, Bell } from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  bookmark: <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />,
  registration: <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
  post: <FileText className="w-4 h-4 sm:w-5 sm:h-5" />,
  alert: <Bell className="w-4 h-4 sm:w-5 sm:h-5" />,
};

const typeLabels: Record<string, string> = {
  bookmark: "Bookmark activity",
  registration: "Event registration",
  post: "Post generated",
  alert: "Alert created",
};

export const ActivityTimeline = () => {
  const prefersReducedMotion = useMotionPreference();
  const transitionClass = prefersReducedMotion
    ? ""
    : "transition-all duration-300";

  return (
    <section className="w-full">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
        Activity Timeline
      </h2>

      <ol className="space-y-3 relative">
        {/* Vertical timeline line - hidden on mobile */}
        <div
          className="hidden sm:block absolute left-5 top-10 bottom-0 w-0.5 bg-gradient-to-b from-zinc-700 via-zinc-800 to-transparent"
          aria-hidden="true"
        />

        {activities.map((activity) => (
          <li key={activity.id} className="relative sm:pl-8">
            {/* Timeline icon circle */}
            <div
              className={`relative z-10 inline-flex items-center justify-center w-10 h-10 sm:w-10 sm:h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 text-emerald-400 sm:absolute sm:left-0 sm:top-0 ${transitionClass}`}
              role="img"
              aria-label={typeLabels[activity.type] || activity.type}
            >
              {typeIcons[activity.type]}
            </div>

            {/* Content card */}
            <div className="mt-2 sm:mt-0 pl-12 sm:pl-0">
              <div
                className={`p-4 sm:p-4 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:ring-offset-2 focus-within:ring-offset-zinc-950 overflow-hidden group ${transitionClass}`}
              >
                {/* Text content */}
                <p className="relative z-10 text-sm sm:text-base text-white leading-relaxed font-medium">
                  {activity.description}
                </p>
                <time className="relative z-10 text-xs text-zinc-500 mt-2 block">
                  {activity.timestamp}
                </time>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};
