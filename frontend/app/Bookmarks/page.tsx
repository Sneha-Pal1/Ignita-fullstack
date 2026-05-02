"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { apiClient } from "@/lib/api-client";
import { events } from "@/lib/data/events";
import Link from "next/link";

interface Bookmark {
  id: string;
  eventSlug: string;
  eventTitle: string;
}

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setIsLoading(true);
        const data = await apiClient.get<Bookmark[]>("/bookmark");
        setBookmarks(data || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch bookmarks:", err);
        setError("Failed to load bookmarks");
        setBookmarks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const bookmarkedEvents = bookmarks
    .map((bookmark) =>
      events.find((event) => event.slug === bookmark.eventSlug),
    )
    .filter((event) => event !== undefined);

  return (
    <main className="px-6 py-10 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">My Bookmarks</h1>
        <p className="text-gray-400 mt-2">Events you've saved for later</p>
      </div>

      {/* CONTENT */}
      {isLoading ? (
        <div className="text-gray-400 text-center py-12">Loading...</div>
      ) : error ? (
        <div className="text-red-400 text-center py-12">{error}</div>
      ) : bookmarkedEvents.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarkedEvents.map((event) => (
            <EventCard key={event.slug} {...event} showDetailsButton={true} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No bookmarks yet</p>
          <Link
            href="/events"
            className="inline-block px-6 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Explore Events
          </Link>
        </div>
      )}
    </main>
  );
};

export default BookmarksPage;
