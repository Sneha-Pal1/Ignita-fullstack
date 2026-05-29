"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { apiClient } from "@/lib/api-client";
import { events } from "@/lib/data/events";
import Link from "next/link";
import { useAuthContext } from "@/lib/auth-context";
import { authStorage } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";

interface Bookmark {
  id: string;
  event: {
    id: string;
    title: string;
    description?: string;
    category?: string;
    type?: string;
    organizer?: string;
    registrationLink?: string;
    startDate?: string;
    endDate?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  user?: any;
  createdAt?: string;
}

const BookmarksPage = () => {
  const { user, isLoading: authLoading } = useAuthContext();
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Auth check
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setIsLoading(true);
        console.log("📋 Fetching bookmarks...");

        const accessToken = authStorage.getToken();
        if (!accessToken) {
          setError("Please sign in again to load your bookmarks.");
          setBookmarks([]);
          return;
        }

        const data = await apiClient.get<Bookmark[]>("/bookmark");
        console.log("✅ Bookmarks loaded:", data);
        setBookmarks(data || []);
        setError(null);
      } catch (err) {
        console.error("❌ Failed to fetch bookmarks:", err);
        setError("Failed to load bookmarks");
        setBookmarks([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading && user) {
      fetchBookmarks();
    }
  }, [user, authLoading]);

  const handleDeleteBookmark = async (
    bookmarkId: string,
    eventSlug: string,
  ) => {
    try {
      setDeletingId(bookmarkId);
      await apiClient.delete(`/bookmark/${bookmarkId}`);
      setBookmarks(bookmarks.filter((b) => b.id !== bookmarkId));
    } catch (err) {
      console.error("Failed to delete bookmark:", err);
      alert("Failed to delete bookmark");
    } finally {
      setDeletingId(null);
    }
  };

  const bookmarkedEvents = bookmarks
    .map((bookmark) => {
      const backendEvent = bookmark.event;

      // First try to find from local events array using title
      const localEvent = events.find(
        (event) =>
          event.title.toLowerCase() === backendEvent.title.toLowerCase(),
      );

      // If found, return the complete local event data
      if (localEvent) {
        return {
          ...localEvent,
          _bookmarkId: bookmark.id, // Add unique ID for React key
        };
      }

      // Fallback: create event object from backend data
      return {
        slug: backendEvent.title.toLowerCase().replace(/\s+/g, "-"),
        title: backendEvent.title,
        image: "/images/event1.png", // Fallback image
        location: "TBA",
        date: "TBA",
        time: backendEvent.description || "Check for details",
        organizer: backendEvent.organizer || "Event",
        participants: "TBA",
        _bookmarkId: bookmark.id, // Add unique ID for React key
      };
    })
    .filter((event) => event !== null && event !== undefined);

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
        <main className="px-6 py-10 max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold">My Bookmarks</h1>
            <p className="text-gray-400 mt-2">Events you've saved for later</p>
          </div>

          {/* CONTENT */}
          {authLoading || isLoading ? (
            <div className="text-gray-400 text-center py-12">Loading...</div>
          ) : error ? (
            <div className="text-red-400 text-center py-12">{error}</div>
          ) : bookmarkedEvents.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bookmarkedEvents.map((event) => (
                <EventCard
                  key={event._bookmarkId}
                  {...event}
                  showDetailsButton={true}
                  isBookmarkCard={true}
                  onDelete={() =>
                    handleDeleteBookmark(event._bookmarkId, event.slug)
                  }
                />
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
      </div>
    </div>
  );
};

export default BookmarksPage;
