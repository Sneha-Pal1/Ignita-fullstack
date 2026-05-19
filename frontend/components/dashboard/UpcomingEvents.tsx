"use client";

import Link from "next/link";
import { upcomingEvents } from "@/lib/data/dashboard";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { Smartphone, MapPin, ChevronRight } from "lucide-react";

export const UpcomingEvents = () => {
  const prefersReducedMotion = useMotionPreference();
  const transitionClass = prefersReducedMotion
    ? ""
    : "transition-all duration-300";

  return (
    <section className="w-full">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
        Upcoming Events
      </h2>

      <div className="space-y-3">
        {upcomingEvents.map((event) => (
          <li key={event.id} className="relative list-none group">
            <Link
              href={`/events/${event.id}`}
              className={`block p-4 sm:p-5 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-zinc-950 overflow-hidden ${transitionClass}`}
            >
              {/* Content container */}
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                {/* Date badge */}
                <div className="flex-shrink-0 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700">
                  <p className="text-sm sm:text-base font-bold text-emerald-400 tabular-nums">
                    {event.date}
                  </p>
                </div>

                {/* Event details */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-base sm:text-lg font-semibold text-white mb-1 line-clamp-1 ${transitionClass}`}
                  >
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
                    {event.mode === "Online" ? (
                      <>
                        <Smartphone
                          className="w-4 h-4 text-emerald-400 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span>Online</span>
                      </>
                    ) : (
                      <>
                        <MapPin
                          className="w-4 h-4 text-emerald-400 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="truncate">{event.location}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Arrow indicator */}
                <div
                  className={`flex-shrink-0 hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800 text-zinc-500 group-hover:bg-zinc-700 group-hover:text-emerald-400 ${transitionClass}`}
                  aria-hidden="true"
                >
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </div>
    </section>
  );
};
