"use client";

import { useMotionPreference } from "@/hooks/useMotionPreference";
import { Calendar, Bookmark, Bell, Upload } from "lucide-react";

interface StatCard {
  id: string;
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const stats: StatCard[] = [
  {
    id: "events",
    title: "Events Joined",
    value: 12,
    icon: <Calendar className="w-5 h-5" />,
    color: "emerald",
  },
  {
    id: "bookmarks",
    title: "Bookmarks",
    value: 24,
    icon: <Bookmark className="w-5 h-5" />,
    color: "teal",
  },
  {
    id: "alerts",
    title: "Alerts Active",
    value: 5,
    icon: <Bell className="w-5 h-5" />,
    color: "amber",
  },
  {
    id: "posts",
    title: "Posts Generated",
    value: 8,
    icon: <Upload className="w-5 h-5" />,
    color: "cyan",
  },
];

const colorMap: Record<string, string> = {
  emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  teal: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
};

export const CompactStatsCards = () => {
  const prefersReducedMotion = useMotionPreference();
  const transitionClass = prefersReducedMotion
    ? ""
    : "transition-all duration-300";

  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      aria-label="Dashboard statistics"
      role="region"
    >
      {stats.map((stat) => (
        <article
          key={stat.id}
          className={`
            relative group rounded-xl p-4 border border-zinc-800 bg-zinc-900/50
            hover:border-zinc-700 hover:bg-zinc-900 
            ${transitionClass}
          `}
          role="region"
          aria-label={`${stat.title}: ${stat.value}`}
        >
          {/* Icon */}
          <div
            className={`inline-flex items-center justify-center w-9 h-9 rounded-lg mb-3 ${colorMap[stat.color]} border`}
          >
            {stat.icon}
          </div>

          {/* Value */}
          <p className="text-2xl font-bold text-white mb-1 tabular-nums">
            {stat.value}
          </p>

          {/* Label */}
          <p className="text-xs text-zinc-400 font-medium">{stat.title}</p>
        </article>
      ))}
    </section>
  );
};
