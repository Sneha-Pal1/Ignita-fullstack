"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { adminAPI, type Event } from "@/lib/api-endpoints";
import { AlertTriangle, CalendarDays, Edit3, Plus, Trash2 } from "lucide-react";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      try {
        setIsLoading(true);
        const items = await adminAPI.getEvents();
        if (isMounted) {
          setEvents(items);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load events.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return events;
    }

    return events.filter((event) => {
      return [
        event.title,
        event.category,
        event.mode,
        event.organizer,
        event.location,
      ]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(query));
    });
  }, [events, search]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Delete this event?");
    if (!confirmDelete) {
      return;
    }

    try {
      await adminAPI.deleteEvent(id);
      setEvents((current) => current.filter((event) => event.id !== id));
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Failed to delete event.",
      );
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <section className="flex flex-col gap-4 rounded-md border border-[#242422] bg-[#141413] p-6 shadow-2xl shadow-black/40 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#FFB100]">
            Event Management
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#f4f4f0] sm:text-3xl">
            View, edit, delete, and prepare featured events.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8a8a86]">
            Keep event operations clean and organized with a compact moderation
            table built for the IGNITA admin workflow.
          </p>
        </div>

        <Link
          href="/admin/create-event"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#FFB100] px-4 py-2.5 text-sm font-semibold text-[#0e0e0d] transition-all hover:bg-[#FFB100]/90"
        >
          <Plus size={16} />
          Create event
        </Link>
      </section>

      {error ? (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 font-mono text-sm text-red-400">
          {error}
        </div>
      ) : null}

      <section className="rounded-md border border-[#242422] bg-[#141413] p-4 sm:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 font-mono text-xs text-[#8a8a86]">
            <CalendarDays size={16} className="text-[#FFB100]" />
            {filteredEvents.length} events
          </div>
          <label className="flex items-center gap-2 rounded-md border border-[#242422] bg-[#0e0e0d] px-4 py-2">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search events"
              className="w-full bg-transparent text-sm text-[#f4f4f0] outline-none placeholder:text-[#8a8a86]/50"
            />
          </label>
        </div>

        {isLoading ? (
          <div className="space-y-3 animate-pulse">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-16 rounded-md bg-[#242422]" />
            ))}
          </div>
        ) : filteredEvents.length ? (
          <div className="overflow-hidden rounded-md border border-[#242422]">
            <table className="min-w-full divide-y divide-[#242422] text-sm">
              <thead className="bg-[#0e0e0d] font-mono text-xs text-[#8a8a86]">
                <tr>
                  <Th>Title</Th>
                  <Th>Category</Th>
                  <Th>Mode</Th>
                  <Th>Organizer</Th>
                  <Th>Date</Th>
                  <Th>Status</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242422] bg-[#141413]">
                {filteredEvents.map((event) => {
                  const isUpcoming = event.startDate
                    ? new Date(event.startDate).getTime() >= Date.now()
                    : false;

                  return (
                    <tr
                      key={event.id}
                      className="hover:bg-[#181816] transition-colors"
                    >
                      <Td>
                        <div>
                          <p className="font-medium text-[#f4f4f0]">
                            {event.title}
                          </p>
                          <p className="mt-1 max-w-md truncate text-xs text-[#8a8a86]">
                            {event.location || "No location"}
                          </p>
                        </div>
                      </Td>
                      <Td><span className="font-mono text-xs text-[#8a8a86]">{event.category || "-"}</span></Td>
                      <Td><span className="font-mono text-xs text-[#8a8a86]">{event.mode || "-"}</span></Td>
                      <Td>{event.organizer || "-"}</Td>
                      <Td><span className="font-mono text-xs">{formatDate(event.startDate)}</span></Td>
                      <Td>
                        <span
                          className={`inline-flex rounded-md border px-2.5 py-0.5 font-mono text-xs font-medium ${isUpcoming ? "border-[#FFB100]/30 bg-[#FFB100]/10 text-[#FFB100]" : "border-[#242422] bg-[#181816] text-[#8a8a86]"}`}
                        >
                          {isUpcoming ? "Upcoming" : "Past"}
                        </span>
                      </Td>
                      <Td>
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/create-event?edit=${event.id}`}
                            className="inline-flex items-center gap-1.5 rounded-md border border-[#242422] px-3 py-1.5 font-mono text-xs font-medium text-[#f4f4f0] transition-colors hover:border-[#FFB100]/40 hover:bg-[#FFB100]/10 hover:text-[#FFB100]"
                          >
                            <Edit3 size={13} />
                            Edit
                          </Link>
                          <button
                            type="button"
                            disabled
                            className="inline-flex items-center gap-1.5 rounded-md border border-[#242422] px-3 py-1.5 font-mono text-xs font-medium text-[#8a8a86]/50 opacity-60"
                            title="Feature events will be added later"
                          >
                            <SparkLabel />
                            Feature
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(event.id)}
                            className="inline-flex items-center gap-1.5 rounded-md border border-red-500/20 px-3 py-1.5 font-mono text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
                          >
                            <Trash2 size={13} />
                            Delete
                          </button>
                        </div>
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-[#242422] px-6 py-16 text-center">
            <AlertTriangle size={24} className="text-[#FFB100]" />
            <p className="mt-4 text-lg font-semibold text-[#f4f4f0]">
              No matching events
            </p>
            <p className="mt-2 max-w-md text-sm leading-6 text-[#8a8a86]">
              Create a new event or clear the search term to review the full
              catalog.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-4 py-3 text-left font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a8a86] ${className}`}
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-4 align-top text-[#f4f4f0]">{children}</td>;
}

function formatDate(value?: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function SparkLabel() {
  return (
    <span
      className="inline-flex h-2.5 w-2.5 rounded-full border border-[#8a8a86]/30 bg-[#242422]"
      aria-hidden="true"
    />
  );
}
