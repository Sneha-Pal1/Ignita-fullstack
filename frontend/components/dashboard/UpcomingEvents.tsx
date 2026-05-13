"use client";

import { upcomingEvents } from "@/lib/data/dashboard";
import { Calendar, MapPin, Globe, MapPinOff } from "lucide-react";

export const UpcomingEvents = () => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
      </div>

      <div className="space-y-3">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-4 p-4 rounded-xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-white/20 transition-all duration-300 group"
          >
            {/* Date badge */}
            <div className="flex-shrink-0 px-4 py-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-center">
              <p className="text-sm font-bold text-cyan-400">{event.date}</p>
            </div>

            {/* Event details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white mb-2 truncate">
                {event.title}
              </h3>
              <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  {event.mode === "Online" ? (
                    <>
                      <Globe className="w-4 h-4 text-purple-400" />
                      <span>Online</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <span>{event.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <span className="text-gray-400 group-hover:text-cyan-400 transition-colors">
                →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
