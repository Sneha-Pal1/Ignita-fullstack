"use client";

import { Calendar, Bookmark, Bell, Share2 } from "lucide-react";
import { stats } from "@/lib/data/dashboard";

const iconMap: Record<string, React.ReactNode> = {
  calendar: <Calendar className="w-8 h-8" />,
  bookmark: <Bookmark className="w-8 h-8" />,
  bell: <Bell className="w-8 h-8" />,
  share2: <Share2 className="w-8 h-8" />,
};

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="group relative p-6 rounded-xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden cursor-pointer"
        >
          {/* Gradient overlay on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
          />

          <div className="relative z-10">
            {/* Icon */}
            <div
              className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${stat.color} mb-4 text-white`}
            >
              {iconMap[stat.icon]}
            </div>

            {/* Stats */}
            <div className="space-y-2">
              <h3 className="text-gray-400 text-sm font-medium">
                {stat.title}
              </h3>
              <p className="text-4xl font-bold text-white">{stat.value}</p>
            </div>
          </div>

          {/* Bottom accent line */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
          />
        </div>
      ))}
    </div>
  );
};
