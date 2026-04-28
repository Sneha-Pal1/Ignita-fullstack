"use client";

import { useState } from "react";
import EventCard from "@/components/EventCard";
import { events } from "@/lib/data/events";

const EventsPage = () => {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [mode, setMode] = useState("");

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase()),
  );

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
        {filteredEvents.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.slug} {...event} />
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
