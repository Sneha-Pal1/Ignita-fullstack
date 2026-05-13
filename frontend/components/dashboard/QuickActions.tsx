"use client";

import Link from "next/link";
import { Compass, Bell, Share2 } from "lucide-react";

const quickActions = [
  {
    id: 1,
    title: "Explore Events",
    description: "Discover new opportunities",
    icon: Compass,
    href: "/events",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 2,
    title: "Create Alert",
    description: "Get notified about events",
    icon: Bell,
    href: "/profile",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 3,
    title: "Generate Post",
    description: "Create LinkedIn content",
    icon: Share2,
    href: "/profile",
    color: "from-green-500 to-emerald-500",
  },
];

export const QuickActions = () => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action) => {
          const IconComponent = action.icon;
          return (
            <Link
              key={action.id}
              href={action.href}
              className="group relative p-6 rounded-xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <div
                  className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${action.color} text-white mb-3`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-semibold text-white mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-400">{action.description}</p>

                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${action.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
