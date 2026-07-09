"use client";

import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
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
      <section className="rounded-md border border-[#21262d] bg-[#161b22] p-6 text-center">
        <p className="text-[#7d8590] text-sm">No upcoming events</p>
      </section>
    );
  }

  return (
    <section className="rounded-md border border-[#21262d] bg-[#161b22]">
      {/* Header */}
      <div className="p-4 border-b border-[#21262d] flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#e6edf3]">Upcoming Events</h2>
        <Link
          href="/events"
          className="text-xs text-[#3fb950] hover:underline font-medium transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Events List */}
      <div className="divide-y divide-[#21262d]">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="p-4 flex flex-col hover:bg-[#21262d]/30 transition-colors group last:rounded-b-md"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Title + Badge */}
                <div className="flex items-start gap-2.5 mb-2">
                  <h3 className="text-sm font-semibold text-[#e6edf3] group-hover:text-[#3fb950] transition-colors line-clamp-1">
                    {event.title}
                  </h3>
                  <span className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#2ea043]/10 border border-[#238636]/30 text-[#3fb950] whitespace-nowrap">
                    {event.badge}
                  </span>
                </div>

                {/* Meta Info */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-[#7d8590]">
                    <Calendar className="w-3.5 h-3.5 text-[#7d8590] shrink-0" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#7d8590]">
                    <MapPin className="w-3.5 h-3.5 text-[#7d8590] shrink-0" />
                    {event.location}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 self-center flex items-center text-[#7d8590] group-hover:text-[#3fb950] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
