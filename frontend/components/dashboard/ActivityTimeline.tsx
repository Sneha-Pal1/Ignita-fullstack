"use client";

import { activities } from "@/lib/data/dashboard";
import { Bookmark, CheckCircle, Share2, Bell } from "lucide-react";
import { useMotionPreference } from "@/hooks/useMotionPreference";

const iconMap: Record<string, React.ReactNode> = {
  bookmark: <Bookmark className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />,
  "check-circle": (
    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
  ),
  share2: <Share2 className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />,
  bell: <Bell className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />,
};

const colorMap: Record<string, string> = {
  bookmark: "from-purple-500 to-pink-500",
  registration: "from-green-500 to-emerald-500",
  post: "from-blue-500 to-cyan-500",
  alert: "from-orange-500 to-yellow-500",
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
          className="hidden sm:block absolute left-5 sm:left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-slate-500/50 to-transparent"
          aria-hidden="true"
        />

        {activities.map((activity, index) => (
          <li key={activity.id} className="relative sm:pl-8">
            {/* Timeline icon circle */}
            <div
              className={`relative z-10 inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${colorMap[activity.type]} text-white sm:absolute sm:left-0 sm:top-0 shadow-lg`}
              role="img"
              aria-label={typeLabels[activity.type] || activity.type}
            >
              {iconMap[activity.icon]}
            </div>

            {/* Content card */}
            <div className="mt-3 sm:mt-0 pl-14 sm:pl-0">
              <div
                className={`p-5 sm:p-6 rounded-lg sm:rounded-xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-white/20 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-900 ${transitionClass}`}
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
