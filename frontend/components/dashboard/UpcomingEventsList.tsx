"use client";

import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees?: number | null;
  badge: string;
}

interface UpcomingEventsListProps {
  events: UpcomingEvent[];
}

export const UpcomingEventsList = ({ events }: UpcomingEventsListProps) => {
  if (events.length === 0) {
    return (
      <section className="border border-white/10 bg-[#141413] p-6 text-center font-mono text-xs text-[#8a8a86]">
        NO UPCOMING EVENTS SCHEDULED.
      </section>
    );
  }

  return (
    <section className="border border-white/10 bg-[#141413] font-mono">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-[#FFB100]" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-white">UPCOMING EVENTS</h2>
        </div>
        <Link
          href="/events"
          className="text-xs text-[#FFB100] hover:underline tracking-widest uppercase font-semibold transition-colors"
        >
          VIEW ALL →
        </Link>
      </div>

      {/* Events List */}
      <div className="divide-y divide-white/10">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="p-5 flex items-center justify-between hover:bg-white/5 transition-colors group"
          >
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 text-[9px] font-bold uppercase bg-[#FFB100]/10 border border-[#FFB100]/40 text-[#FFB100]">
                  {event.badge}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-[#FFB100] transition-colors truncate font-sans">
                  {event.title}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#8a8a86]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#FFB100]" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8a8a86]" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            <ArrowUpRight className="w-4 h-4 text-[#8a8a86] group-hover:text-[#FFB100] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
};
