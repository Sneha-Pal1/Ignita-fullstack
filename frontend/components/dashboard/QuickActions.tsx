"use client";

import Link from "next/link";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { Search, Bell, FileText } from "lucide-react";

const quickActions = [
  {
    id: 1,
    title: "Explore Events",
    description: "Discover new opportunities",
    icon: Search,
    href: "/events",
    ariaLabel: "Explore new events and opportunities",
  },
  {
    id: 2,
    title: "Create Alert",
    description: "Get notified about events",
    icon: Bell,
    href: "/profile",
    ariaLabel: "Create alerts for event notifications",
  },
  {
    id: 3,
    title: "Generate Post",
    description: "Create LinkedIn content",
    icon: FileText,
    href: "/profile",
    ariaLabel: "Generate LinkedIn post content",
  },
];

export const QuickActions = () => {
  const prefersReducedMotion = useMotionPreference();
  const transitionClass = prefersReducedMotion
    ? ""
    : "transition-all duration-200";

  return (
    <section className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.id}
              href={action.href}
              aria-label={action.ariaLabel}
              className={`group relative min-h-44 sm:min-h-48 p-6 sm:p-8 rounded-2xl bg-slate-900/30 border border-slate-700/50 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-950 overflow-hidden flex flex-col justify-between ${transitionClass}`}
            >
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-cyan-400 mb-4 sm:mb-5" aria-hidden="true">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 leading-snug">
                  {action.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
