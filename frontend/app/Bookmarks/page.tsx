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
import { TopHeader } from "@/components/layout/TopHeader";

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

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setIsLoading(true);
        const accessToken = authStorage.getToken();
        if (!accessToken) {
          setError("Please sign in to view saved bookmarks.");
          setBookmarks([]);
          return;
        }

        const data = await apiClient.get<Bookmark[]>("/bookmark");
        setBookmarks(data || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch bookmarks:", err);
        setError("Unable to load saved bookmarks.");
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
  ) => {
    try {
      await apiClient.delete(`/bookmark/${bookmarkId}`);
      setBookmarks(bookmarks.filter((b) => b.id !== bookmarkId));
    } catch (err) {
      console.error("Failed to delete bookmark:", err);
    }
  };

  const bookmarkedEvents = bookmarks
    .map((bookmark) => {
      const backendEvent = bookmark.event;
      const localEvent = events.find(
        (event) =>
          event.title.toLowerCase() === backendEvent.title.toLowerCase(),
      );

      if (localEvent) {
        return {
          ...localEvent,
          _bookmarkId: bookmark.id,
        };
      }

      return {
        slug: backendEvent.title.toLowerCase().replace(/\s+/g, "-"),
        title: backendEvent.title,
        image: "/images/event1.png",
        location: "TBA",
        date: "TBA",
        time: backendEvent.description || "Check for details",
        organizer: backendEvent.organizer || "Event",
        participants: "TBA",
        _bookmarkId: bookmark.id,
      };
    })
    .filter((event) => event !== null && event !== undefined);

  return (
    <div className="flex min-h-screen bg-[#0e0e0d] text-[#f4f4f0]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
        <TopHeader savedCount={bookmarks.length} />

        <main className="px-6 py-10 max-w-7xl mx-auto w-full font-mono">
          {/* HEADER */}
          <div className="mb-10">
            <div className="levo-eyebrow mb-2">
              <span className="h-1.5 w-1.5 bg-[#FFB100]" />
              <span>SAVED COLLECTION</span>
            </div>
            <h1 className="text-3xl font-bold text-white uppercase tracking-tight">MY BOOKMARKS</h1>
            <p className="text-xs text-[#8a8a86] mt-2">
              EVENTS & OPPORTUNITIES YOU HAVE SAVED TO YOUR PERSONAL DASHBOARD.
            </p>
          </div>

          {/* CONTENT */}
          {authLoading || isLoading ? (
            <div className="text-xs text-[#8a8a86] py-12">LOADING BOOKMARKS...</div>
          ) : error ? (
            <div className="p-4 border border-[#FFB100]/30 bg-[#FFB100]/5 text-xs text-[#FFB100]">{error}</div>
          ) : bookmarkedEvents.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {bookmarkedEvents.map((event) => (
                <EventCard
                  key={event._bookmarkId}
                  {...event}
                  showDetailsButton={true}
                  isBookmarkCard={true}
                  onDelete={() =>
                    handleDeleteBookmark(event._bookmarkId)
                  }
                />
              ))}
            </div>
          ) : (
            <div className="p-12 border border-white/10 bg-[#141413] text-center">
              <p className="text-xs text-[#8a8a86] mb-6">NO BOOKMARKS SAVED YET.</p>
              <Link
                href="/events"
                className="inline-block px-6 py-3 bg-[#FFB100] text-black font-semibold text-xs tracking-widest uppercase hover:bg-[#ffbe25] transition-colors"
              >
                EXPLORE EVENTS →
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BookmarksPage;
