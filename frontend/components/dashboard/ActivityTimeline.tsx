"use client";

import { activities } from "@/lib/data/dashboard";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { Bookmark, CheckCircle, FileText, Bell } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  bookmark: <Bookmark className="w-5 h-5 sm:w-6 sm:h-6" />,
  "check-circle": <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
  share2: <FileText className="w-5 h-5 sm:w-6 sm:h-6" />,
  bell: <Bell className="w-5 h-5 sm:w-6 sm:h-6" />,
};

const typeIcons: Record<string, React.ReactNode> = {
  bookmark: <Bookmark className="w-5 h-5 sm:w-6 sm:h-6" />,
  registration: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
  post: <FileText className="w-5 h-5 sm:w-6 sm:h-6" />,
  alert: <Bell className="w-5 h-5 sm:w-6 sm:h-6" />,
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
    : "transition-all duration-200";

  return (
    <section className="px-4 sm:px-0">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
        Activity Timeline
      </h2>

      <ol className="space-y-6 sm:space-y-8 relative">
        {/* Vertical timeline line - hidden on mobile */}
        <div
          className="hidden sm:block absolute left-5 sm:left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-slate-600 to-transparent"
          aria-hidden="true"
        />

        {activities.map((activity) => (
          <li key={activity.id} className="relative sm:pl-8">
            {/* Timeline icon circle */}
            <div
              className="relative z-10 inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 sm:absolute sm:left-0 sm:top-0"
              role="img"
              aria-label={typeLabels[activity.type] || activity.type}
            >
              {typeIcons[activity.type]}
            </div>

            {/* Content card */}
            <div className="mt-3 sm:mt-0 pl-14 sm:pl-0">
              <div
                className={`p-5 sm:p-6 rounded-xl bg-slate-900/30 border border-slate-700/50 hover:border-slate-600 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-950 ${transitionClass}`}
              >
                <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
                  {activity.description}
                </p>
                <time className="text-xs sm:text-sm text-slate-400 mt-3 block">
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
