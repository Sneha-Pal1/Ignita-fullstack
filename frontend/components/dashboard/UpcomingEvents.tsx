"use client";

import Link from "next/link";
import { upcomingEvents } from "@/lib/data/dashboard";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { Smartphone, MapPin } from "lucide-react";

export const UpcomingEvents = () => {
  const prefersReducedMotion = useMotionPreference();
  const transitionClass = prefersReducedMotion
    ? ""
    : "transition-all duration-200";

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Upcoming Events
        </h2>
      </div>

      <ol className="space-y-4 sm:space-y-5">
        {upcomingEvents.map((event) => (
          <li key={event.id} className="relative">
            <Link
              href={`/events/${event.id}`}
              className={`flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-slate-900/30 border border-slate-700/50 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-950 group ${transitionClass}`}
            >
              {/* Date badge */}
              <div className="flex-shrink-0 px-4 sm:px-5 py-3 rounded-lg bg-slate-800/50 border border-slate-700">
                <p className="text-sm sm:text-base font-bold text-cyan-400 tabular-nums">
                  {event.date}
                </p>
              </div>

              {/* Event details */}
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-cyan-300 leading-snug ${transitionClass}`}
                >
                  {event.title}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2 text-sm sm:text-base text-slate-300">
                  <div className="flex items-center gap-2">
                    {event.mode === "Online" ? (
                      <>
                        <Smartphone
                          className="w-4 h-4 text-cyan-400 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span>Online</span>
                      </>
                    ) : (
                      <>
                        <MapPin
                          className="w-4 h-4 text-cyan-400 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span>{event.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Arrow indicator */}
              <div
                className={`flex-shrink-0 hidden sm:flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-focus:text-cyan-400 ${transitionClass}`}
                aria-hidden="true"
              >
                <span className="text-xl">→</span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
};
