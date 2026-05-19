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
              className={`block p-4 sm:p-5 rounded-2xl border border-emerald-500/20 hover:border-emerald-400/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-950 overflow-hidden ${transitionClass}`}
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Glow effect */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" />

              {/* Content container */}
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                {/* Date badge */}
                <div className="flex-shrink-0 px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 hover:bg-emerald-500/30 group-hover:border-emerald-400/50 transition-all duration-300">
                  <p className="text-sm sm:text-base font-bold text-emerald-300 tabular-nums">
                    {event.date}
                  </p>
                </div>

                {/* Event details */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-base sm:text-lg font-semibold text-white mb-1 line-clamp-1 group-hover:text-emerald-300 ${transitionClass}`}
                  >
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
                    {event.mode === "Online" ? (
                      <>
                        <Smartphone
                          className="w-4 h-4 text-teal-400 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span>Online</span>
                      </>
                    ) : (
                      <>
                        <MapPin
                          className="w-4 h-4 text-teal-400 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="truncate">{event.location}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Arrow indicator */}
                <div
                  className={`flex-shrink-0 hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/50 text-zinc-400 group-hover:bg-emerald-500/30 group-hover:text-emerald-400 ${transitionClass}`}
                  aria-hidden="true"
                >
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>
          </li>
        ))}
      </div>
    </section>
  );
};
