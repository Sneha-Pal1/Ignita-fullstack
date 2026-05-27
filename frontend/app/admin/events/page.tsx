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
      <section className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">
            Event Management
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            View, edit, delete, and prepare featured events.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
            Keep event operations clean and organized with a compact moderation
            table built for the IGNITA admin workflow.
          </p>
        </div>

        <Link
          href="/admin/create-event"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400"
        >
          <Plus size={16} />
          Create event
        </Link>
      </section>

      {error ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <CalendarDays size={16} className="text-emerald-400" />
            {filteredEvents.length} events
          </div>
          <label className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 py-2">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search events"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
            />
          </label>
        </div>

        {isLoading ? (
          <div className="space-y-3 animate-pulse">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-18 rounded-xl bg-zinc-800/60" />
            ))}
          </div>
        ) : filteredEvents.length ? (
          <div className="overflow-hidden rounded-xl border border-zinc-800">
            <table className="min-w-full divide-y divide-zinc-800 text-sm">
              <thead className="bg-zinc-950/80 text-zinc-400">
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
              <tbody className="divide-y divide-zinc-800 bg-zinc-900/50">
                {filteredEvents.map((event) => {
                  const isUpcoming = event.startDate
                    ? new Date(event.startDate).getTime() >= Date.now()
                    : false;

                  return (
                    <tr
                      key={event.id}
                      className="hover:bg-zinc-900/80 transition-colors"
                    >
                      <Td>
                        <div>
                          <p className="font-medium text-white">
                            {event.title}
                          </p>
                          <p className="mt-1 max-w-md truncate text-xs text-zinc-500">
                            {event.location || "No location"}
                          </p>
                        </div>
                      </Td>
                      <Td>{event.category || "-"}</Td>
                      <Td>{event.mode || "-"}</Td>
                      <Td>{event.organizer || "-"}</Td>
                      <Td>{formatDate(event.startDate)}</Td>
                      <Td>
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${isUpcoming ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-zinc-700 bg-zinc-800/60 text-zinc-400"}`}
                        >
                          {isUpcoming ? "Upcoming" : "Past"}
                        </span>
                      </Td>
                      <Td>
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/create-event?edit=${event.id}`}
                            className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-emerald-500/20 hover:bg-emerald-500/10 hover:text-emerald-400"
                          >
                            <Edit3 size={14} />
                            Edit
                          </Link>
                          <button
                            type="button"
                            disabled
                            className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2 text-xs font-medium text-zinc-500"
                            title="Feature events will be added later"
                          >
                            <SparkLabel />
                            Feature
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(event.id)}
                            className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-xs font-medium text-red-300 transition-colors hover:bg-red-500/10"
                          >
                            <Trash2 size={14} />
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
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 px-6 py-16 text-center">
            <AlertTriangle size={24} className="text-emerald-400" />
            <p className="mt-4 text-lg font-semibold text-white">
              No matching events
            </p>
            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-400">
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
      className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] ${className}`}
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-4 align-top text-zinc-300">{children}</td>;
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
      className="inline-flex h-3 w-3 rounded-full border border-zinc-600 bg-zinc-800"
      aria-hidden="true"
    />
  );
}
