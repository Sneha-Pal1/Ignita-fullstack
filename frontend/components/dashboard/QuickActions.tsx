"use client";

import Link from "next/link";
import { Compass, Bell, Share2 } from "lucide-react";
import { useMotionPreference } from "@/hooks/useMotionPreference";

const quickActions = [
  {
    id: 1,
    title: "Explore Events",
    description: "Discover new opportunities",
    icon: Compass,
    href: "/events",
    color: "from-cyan-500 to-blue-500",
    ariaLabel: "Explore new events and opportunities",
  },
  {
    id: 2,
    title: "Create Alert",
    description: "Get notified about events",
    icon: Bell,
    href: "/profile",
    color: "from-orange-500 to-red-500",
    ariaLabel: "Create alerts for event notifications",
  },
  {
    id: 3,
    title: "Generate Post",
    description: "Create LinkedIn content",
    icon: Share2,
    href: "/profile",
    color: "from-green-500 to-emerald-500",
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
          const IconComponent = action.icon;
          return (
            <Link
              key={action.id}
              href={action.href}
              aria-label={action.ariaLabel}
              className={`group relative min-h-44 sm:min-h-48 p-6 sm:p-8 rounded-xl sm:rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 overflow-hidden flex flex-col justify-between ${transitionClass}`}
            >
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 group-focus:opacity-10 ${transitionClass}`}
              />

              <div className="relative z-10">
                {/* Icon - Min 44px touch target */}
                <div
                  className={`inline-flex min-w-11 min-h-11 items-center justify-center p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${action.color} text-white mb-4 sm:mb-5`}
                  aria-hidden="true"
                >
                  <IconComponent className="w-6 h-6" />
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

              {/* Bottom accent line */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${action.color} transform ${
                  prefersReducedMotion
                    ? ""
                    : "scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100"
                } ${transitionClass} origin-left`}
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};
