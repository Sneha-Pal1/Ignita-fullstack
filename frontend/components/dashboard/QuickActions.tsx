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
    : "transition-all duration-300";

  return (
    <section className="w-full">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.id}
              href={action.href}
              aria-label={action.ariaLabel}
              className={`group relative overflow-hidden p-5 sm:p-6 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-zinc-950 ${transitionClass}`}
            >
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-zinc-800 text-emerald-400 mb-3 sm:mb-4 ${transitionClass}`}
                  aria-hidden="true"
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                {/* Title */}
                <h3
                  className={`text-base sm:text-lg font-semibold text-white mb-1 ${transitionClass}`}
                >
                  {action.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
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
