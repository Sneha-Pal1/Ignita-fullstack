"use client";

import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  badge: string;
}

const upcomingEvents: UpcomingEvent[] = [
  {
    id: "1",
    title: "TechCrunch Disrupt 2026",
    date: "May 28, 2026",
    location: "San Francisco, CA",
    attendees: 2500,
    badge: "Hackathon",
  },
  {
    id: "2",
    title: "React Advanced Workshop",
    date: "June 5, 2026",
    location: "Online",
    attendees: 150,
    badge: "Workshop",
  },
  {
    id: "3",
    title: "Web3 Developer Bootcamp",
    date: "June 15, 2026",
    location: "NYC, NY",
    attendees: 80,
    badge: "Bootcamp",
  },
];

export const UpcomingEventsList = () => {
  if (upcomingEvents.length === 0) {
    return (
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center">
        <p className="text-zinc-400 text-sm">No upcoming events</p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/50">
      {/* Header */}
      <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Upcoming Events</h2>
        <Link
          href="/events"
          className="text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Events List */}
      <div className="divide-y divide-zinc-800">
        {upcomingEvents.map((event, index) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="p-5 hover:bg-zinc-800/30 transition-colors group last:rounded-b-xl"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Title + Badge */}
                <div className="flex items-start gap-3 mb-2">
                  <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {event.title}
                  </h3>
                  <span className="flex-shrink-0 px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 whitespace-nowrap">
                    {event.badge}
                  </span>
                </div>

                {/* Meta Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-zinc-600" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Users className="w-3.5 h-3.5 text-zinc-600" />
                    {event.attendees.toLocaleString()} attendees
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 flex items-center text-zinc-600 group-hover:text-emerald-400 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
