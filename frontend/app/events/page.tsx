"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAuthContext } from "@/lib/auth-context";
import EventCard from "@/components/EventCard";
import { events as mockEvents } from "@/lib/data/events";
import { eventsAPI, type Event as BackendEvent } from "@/lib/api-endpoints";

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
          background-color: #111827;
          color: white;
        }
        select option:checked {
          background: linear-gradient(#1a1a1a, #1a1a1a);
          background-color: #1a1a1a;
          color: white;
        }
      `}</style>
      <main className="px-6 py-10 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">Explore Events</h1>
          <p className="text-gray-400 mt-2">
            Find hackathons, internships, and more opportunities
          </p>
        </div>
        {/* SEARCH + FILTER */}
        <div className="mb-10 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:flex-1 px-4 py-2 rounded-lg bg-gray-900 border border-white/10 text-white placeholder-gray-400 focus:outline-none"
          />

          {/* Event Type Filter */}
          <select className="px-4 py-2 rounded-lg bg-gray-900 border border-white/10 text-white hover:bg-gray-800">
            <option className="bg-gray-900 text-white">All Types</option>
            <option className="bg-gray-900 text-white">Hackathon</option>
            <option className="bg-gray-900 text-white">Internship</option>
            <option className="bg-gray-900 text-white">Workshop</option>
          </select>

          {/* Date Range Filter */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-900 border border-white/10 text-white hover:bg-gray-800"
          >
            <option className="bg-gray-900 text-white">Date Range</option>
            <option className="bg-gray-900 text-white">This Week</option>
            <option className="bg-gray-900 text-white">This Month</option>
            <option className="bg-gray-900 text-white">Next Month</option>
            <option className="bg-gray-900 text-white">This Quarter</option>
          </select>

          {/* Mode Filter */}
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-900 border border-white/10 text-white hover:bg-gray-800"
          >
            <option className="bg-gray-900 text-white">Mode</option>
            <option className="bg-gray-900 text-white">Online</option>
            <option className="bg-gray-900 text-white">In Person</option>
            <option className="bg-gray-900 text-white">Hybrid</option>
          </select>
        </div>
        {/* EVENTS GRID */}
        {isLoading ? (
          <p className="text-gray-400">Loading events...</p>
        ) : error ? (
          <p className="mb-4 text-sm text-emerald-400">{error}</p>
        ) : filteredEvents.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.slug}
                {...event}
                showAdminActions={isAdmin}
                onEdit={isAdmin ? () => router.push(`/create?edit=${event.id}`) : undefined}
                onDelete={isAdmin ? () => handleDeleteEvent(event.id) : undefined}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No events found</p>
        )}
      </main>
    </>
  );
};

export default EventsPage;
