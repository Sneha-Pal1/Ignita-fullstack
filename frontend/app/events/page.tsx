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
        setError(null);
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
          setError(null);
          return;
        }

        console.error("Failed to fetch events:", fetchError);
        setError("Unable to connect to live server. Displaying cached offline catalog.");
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
      <main className="px-6 py-20 max-w-7xl mx-auto font-mono text-[#8a8a86]">
        <p>LOADING EVENTS...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0e0e0d] text-[#f4f4f0] px-6 py-12 sm:px-10 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-10 flex flex-col items-start gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-xs text-[#8a8a86] border border-white/10 hover:border-white/40 hover:text-white bg-[#141413] transition-colors"
        >
          <span>← BACK TO HOME</span>
        </Link>

        <div className="levo-eyebrow">
          <span className="h-1.5 w-1.5 bg-[#FFB100]" />
          <span>EVENTS CATALOG</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          EXPLORE OPPORTUNITIES
        </h1>
        <p className="font-mono text-xs text-[#8a8a86]">
          INDEXING HACKATHONS, INTERNSHIPS, CODING CONTESTS & WORKSHOPS REAL-TIME.
        </p>
      </div>

      {/* ERROR / OFFLINE BANNER */}
      {error && (
        <div className="mb-8 p-4 border border-[#FFB100]/30 bg-[#FFB100]/5 font-mono text-xs text-[#FFB100]">
          {error}
        </div>
      )}

      {/* SEARCH & FILTERS */}
      <div className="mb-12 flex flex-col md:flex-row gap-3 font-mono">
        <input
          type="text"
          placeholder="SEARCH BY TITLE OR KEYWORD..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:flex-1 px-4 py-3 text-xs text-white placeholder-[#555] bg-[#141413] border border-white/10 focus:outline-none focus:border-[#FFB100] transition-colors"
        />

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="px-4 py-3 text-xs text-white bg-[#141413] border border-white/10 focus:outline-none focus:border-[#FFB100] transition-colors cursor-pointer"
        >
          <option value="" className="bg-[#141413]">ALL MODES</option>
          <option value="online" className="bg-[#141413]">ONLINE / REMOTE</option>
          <option value="person" className="bg-[#141413]">IN PERSON</option>
          <option value="hybrid" className="bg-[#141413]">HYBRID</option>
        </select>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-3 text-xs text-white bg-[#141413] border border-white/10 focus:outline-none focus:border-[#FFB100] transition-colors cursor-pointer"
        >
          <option value="" className="bg-[#141413]">DATE RANGE</option>
          <option value="week" className="bg-[#141413]">THIS WEEK</option>
          <option value="month" className="bg-[#141413]">THIS MONTH</option>
          <option value="quarter" className="bg-[#141413]">THIS QUARTER</option>
        </select>
      </div>

      {/* EVENTS GRID */}
      {isLoading ? (
        <p className="font-mono text-xs text-[#8a8a86]">LOADING CATALOG...</p>
      ) : filteredEvents.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="p-12 border border-white/10 bg-[#141413] text-center font-mono text-xs text-[#8a8a86]">
          NO EVENTS MATCHED YOUR SEARCH CRITERIA.
        </div>
      )}
    </main>
  );
};

export default EventsPage;
