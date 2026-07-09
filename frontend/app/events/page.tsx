"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAuthContext } from "@/lib/auth-context";
import EventCard from "@/components/EventCard";
import { events as mockEvents } from "@/lib/data/events";
import { eventsAPI, type Event as BackendEvent } from "@/lib/api-endpoints";
import { APIError } from "@/lib/api-client";
import { authStorage } from "@/lib/auth";

type EventCardData = {
  id: string;
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  organizer?: string;
  participants?: string;
  tags?: string[];
};

function formatDateRange(
  startDate?: string,
  endDate?: string,
  deadline?: string,
) {
  const formatDate = (value?: string) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const start = formatDate(startDate);
  const end = formatDate(endDate);
  const applicationDeadline = formatDate(deadline);

  if (start && end) return `${start} - ${end}`;
  if (start) return start;
  if (applicationDeadline) return `Deadline ${applicationDeadline}`;
  return "Date coming soon";
}

function mapBackendEvent(event: BackendEvent): EventCardData {
  const tags = Array.isArray(event.tags) ? event.tags : [];

  return {
    id: event.id,
    title: event.title,
    image: event.bannerImage || "/images/event1.png",
    slug: event.id,
    location: event.location || "TBA",
    date: formatDateRange(event.startDate, event.endDate, event.deadline),
    time: event.description || "View event details",
    organizer: event.organizer ? `by ${event.organizer}` : "IGNITA",
    participants: event.mode || event.category || "Live event",
    tags,
  };
}

function mapMockEvent(event: (typeof mockEvents)[number]): EventCardData {
  return {
    id: event.slug,
    title: event.title,
    image: event.image,
    slug: event.slug,
    location: event.location,
    date: event.date,
    time: event.time,
    organizer: event.organizer,
    participants: event.participants,
    tags: event.tags,
  };
}

const EventsPage = () => {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthContext();
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [mode, setMode] = useState("");
  const [events, setEvents] = useState<EventCardData[]>(
    mockEvents.map(mapMockEvent),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    const fetchEvents = async () => {
      const accessToken = authStorage.getToken();

      if (!accessToken) {
        setEvents(mockEvents.map(mapMockEvent));
        setError("Using local sample events until the backend is available.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await eventsAPI.getAll();

        if (Array.isArray(data) && data.length > 0) {
          setEvents(data.map(mapBackendEvent));
        } else {
          setEvents(mockEvents.map(mapMockEvent));
        }
        setError(null);
      } catch (fetchError) {
        if (fetchError instanceof APIError && fetchError.status === 401) {
          setEvents(mockEvents.map(mapMockEvent));
          setError("Using local sample events until the backend is available.");
          return;
        }

        console.error("Failed to fetch events:", fetchError);
        setError("Using local sample events until the backend is available.");
        setEvents(mockEvents.map(mapMockEvent));
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDeleteEvent = async (id: string) => {
    const confirmed = window.confirm(
      "Delete this event? This action cannot be undone.",
    );

    if (!confirmed) return;

    try {
      await eventsAPI.delete(id);
      setEvents((current) => current.filter((event) => event.id !== id));
    } catch (deleteError) {
      console.error("Failed to delete event:", deleteError);
      setError("Unable to delete the event right now.");
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesMode =
        !mode || event.participants?.toLowerCase().includes(mode.toLowerCase());
      return matchesSearch && matchesMode;
    });
  }, [events, mode, search]);

  if (authLoading) {
    return (
      <main className="px-6 py-10 max-w-7xl mx-auto">
        <p className="text-gray-400">Loading...</p>
      </main>
    );
  }

  return (
    <>
      <style>{`
        select option {
          background-color: #161b22;
          color: #e6edf3;
        }
      `}</style>
      <main className="px-6 py-12 max-w-7xl mx-auto min-h-screen bg-[#0d1117]">
        {/* HEADER */}
        <div className="mb-8 flex flex-col items-start gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#7d8590] border border-[#30363d] hover:border-[#484f58] hover:text-[#e6edf3] bg-[#161b22] rounded-md transition-colors"
          >
            <span aria-hidden="true">←</span>
            Back to Home
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#e6edf3] tracking-tight">Explore Events</h1>
            <p className="text-sm text-[#7d8590] mt-1.5">
              Find hackathons, internships, and more opportunities
            </p>
          </div>
        </div>

        {/* INFO/ERROR BANNER */}
        {error && (
          <div className="mb-6 px-4 py-3 rounded-md border border-[#3fb950]/30 bg-[#2ea043]/5 text-sm text-[#3fb950]">
            {error}
          </div>
        )}

        {/* SEARCH + FILTER */}
        <div className="mb-10 flex flex-col md:flex-row gap-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:flex-1 px-3 py-2 text-sm text-[#e6edf3] placeholder-[#484f58] bg-[#0d1117] border border-[#30363d] rounded-md focus:outline-none focus:border-[#2ea043] focus:ring-1 focus:ring-[#2ea043]/30 transition-colors"
          />

          {/* Event Type Filter */}
          <select className="px-3 py-2 text-sm text-[#e6edf3] bg-[#161b22] border border-[#30363d] rounded-md focus:outline-none focus:border-[#2ea043] hover:border-[#484f58] transition-colors cursor-pointer">
            <option className="bg-[#161b22] text-[#e6edf3]">All Types</option>
            <option className="bg-[#161b22] text-[#e6edf3]">Hackathon</option>
            <option className="bg-[#161b22] text-[#e6edf3]">Internship</option>
            <option className="bg-[#161b22] text-[#e6edf3]">Workshop</option>
          </select>

          {/* Date Range Filter */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 text-sm text-[#e6edf3] bg-[#161b22] border border-[#30363d] rounded-md focus:outline-none focus:border-[#2ea043] hover:border-[#484f58] transition-colors cursor-pointer"
          >
            <option className="bg-[#161b22] text-[#e6edf3]">Date Range</option>
            <option className="bg-[#161b22] text-[#e6edf3]">This Week</option>
            <option className="bg-[#161b22] text-[#e6edf3]">This Month</option>
            <option className="bg-[#161b22] text-[#e6edf3]">Next Month</option>
            <option className="bg-[#161b22] text-[#e6edf3]">This Quarter</option>
          </select>

          {/* Mode Filter */}
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="px-3 py-2 text-sm text-[#e6edf3] bg-[#161b22] border border-[#30363d] rounded-md focus:outline-none focus:border-[#2ea043] hover:border-[#484f58] transition-colors cursor-pointer"
          >
            <option className="bg-[#161b22] text-[#e6edf3]">Mode</option>
            <option className="bg-[#161b22] text-[#e6edf3]">Online</option>
            <option className="bg-[#161b22] text-[#e6edf3]">In Person</option>
            <option className="bg-[#161b22] text-[#e6edf3]">Hybrid</option>
          </select>
        </div>

        {/* EVENTS GRID */}
        {isLoading ? (
          <p className="text-sm text-[#7d8590]">Loading events...</p>
        ) : filteredEvents.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.slug}
                {...event}
                showAdminActions={isAdmin}
                onEdit={
                  isAdmin
                    ? () => router.push(`/create?edit=${event.id}`)
                    : undefined
                }
                onDelete={
                  isAdmin ? () => handleDeleteEvent(event.id) : undefined
                }
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#7d8590]">No events found</p>
        )}
      </main>
    </>
  );
};

export default EventsPage;
