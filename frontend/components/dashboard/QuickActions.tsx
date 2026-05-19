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
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "emerald",
  },
  {
    id: 2,
    title: "Create Alert",
    description: "Get notified about events",
    icon: Bell,
    href: "/profile",
    ariaLabel: "Create alerts for event notifications",
    gradient: "from-teal-500/20 to-emerald-500/20",
    iconColor: "teal",
  },
  {
    id: 3,
    title: "Generate Post",
    description: "Create LinkedIn content",
    icon: FileText,
    href: "/profile",
    ariaLabel: "Generate LinkedIn post content",
    gradient: "from-emerald-500/10 to-cyan-500/20",
    iconColor: "emerald",
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
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          const isEmerald = action.iconColor === "emerald";

          return (
            <Link
              key={action.id}
              href={action.href}
              aria-label={action.ariaLabel}
              className={`group relative overflow-hidden p-5 sm:p-6 rounded-2xl border border-emerald-500/20 hover:border-emerald-400/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-950 ${transitionClass}`}
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 ${transitionClass}`}
                aria-hidden="true"
              />

              {/* Glow effect */}
              <div
                className={`absolute -top-12 -right-12 w-32 h-32 bg-${isEmerald ? "emerald" : "teal"}-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-60 ${transitionClass}`}
                aria-hidden="true"
              />

              {/* Dark overlay */}
              <div
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
                aria-hidden="true"
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${
                    isEmerald
                      ? "bg-emerald-500/30 text-emerald-300"
                      : "bg-teal-500/30 text-teal-300"
                  } group-hover:${
                    isEmerald ? "bg-emerald-500/50" : "bg-teal-500/50"
                  } group-hover:shadow-lg ${
                    isEmerald
                      ? "group-hover:shadow-emerald-500/50"
                      : "group-hover:shadow-teal-500/50"
                  } mb-3 sm:mb-4 ${transitionClass}`}
                  aria-hidden="true"
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                {/* Title */}
                <h3
                  className={`text-base sm:text-lg font-semibold text-white mb-1 group-hover:${isEmerald ? "text-emerald-300" : "text-teal-300"} ${transitionClass}`}
                >
                  {action.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-400 group-hover:text-zinc-300 leading-relaxed">
                  {action.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${
                  isEmerald
                    ? "from-emerald-500 to-teal-500"
                    : "from-teal-500 to-emerald-500"
                } transform origin-left scale-x-0 group-hover:scale-x-100 ${transitionClass}`}
                aria-hidden="true"
              />

              {/* Floating effect on hover */}
              <div
                className={`absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 ${transitionClass}`}
                style={{
                  boxShadow: isEmerald
                    ? "inset 0 0 20px rgba(16, 185, 129, 0.1), 0 0 20px rgba(16, 185, 129, 0.2)"
                    : "inset 0 0 20px rgba(20, 184, 166, 0.1), 0 0 20px rgba(20, 184, 166, 0.2)",
                }}
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};
