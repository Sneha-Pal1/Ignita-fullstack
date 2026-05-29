"use client";

import { useAuthContext } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopHeader } from "@/components/layout/TopHeader";
import { CompactStatsCards } from "@/components/dashboard/CompactStatsCards";
import { RecentActivitySection } from "@/components/dashboard/RecentActivitySection";
import { UpcomingEventsList } from "@/components/dashboard/UpcomingEventsList";
import { RightSidebar } from "@/components/dashboard/RightSidebar";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { apiClient } from "@/lib/api-client";
import { type Event } from "@/lib/api-endpoints";
import {
  Bookmark01Icon,
  Calendar01Icon,
  Clock01Icon,
} from "@hugeicons/core-free-icons";

interface BookmarkRecord {
  id: string;
  event?: {
    id?: string;
    title: string;
    description?: string;
    category?: string;
    type?: string;
    organizer?: string;
    location?: string;
    registrationLink?: string;
    startDate?: string;
    endDate?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  createdAt?: string;
}

interface AlertRecord {
  id: string;
  message: string;
  read: boolean;
  createdAt?: string;
}

interface ActivityItem {
  id: string;
  type: "bookmark" | "alert";
  title: string;
  description: string;
  time: string;
  icon: any;
  timestamp: number;
}

function formatRelativeTime(value?: string) {
  if (!value) {
    return "Recently";
  }

  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) {
    return "Recently";
  }

  const diffInMinutes = Math.floor((Date.now() - timestamp) / 60000);
  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60)
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24)
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
}

function formatEventDate(event: Event) {
  const rawDate = event.startDate || event.deadline || event.createdAt;
  if (!rawDate) {
    return "TBA";
  }

  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) {
    return "TBA";
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>([]);
  const [alerts, setAlerts] = useState<AlertRecord[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    let isMounted = true;

    const loadDashboardData = async () => {
      try {
        setIsDataLoading(true);
        const [bookmarkData, alertData, eventData] = await Promise.all([
          apiClient.get<BookmarkRecord[]>("/bookmark"),
          apiClient.get<AlertRecord[]>("/alerts"),
          apiClient.get<Event[]>("/events"),
        ]);

        if (!isMounted) {
          return;
        }

        setBookmarks(bookmarkData || []);
        setAlerts(alertData || []);
        setEvents(eventData || []);
        setError(null);
      } catch (dashboardError) {
        if (!isMounted) {
          return;
        }

        console.error("Failed to load dashboard data:", dashboardError);
        setError("Unable to load live dashboard data.");
      } finally {
        if (isMounted) {
          setIsDataLoading(false);
        }
      }
    };

    if (!isLoading && user) {
      loadDashboardData();
    }

    return () => {
      isMounted = false;
    };
  }, [user, isLoading]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return null;
  }

  if (isDataLoading) {
    return <DashboardSkeleton />;
  }

  const unreadAlerts = alerts.filter((alert) => !alert.read).length;
  const upcomingEvents = events
    .filter((event) => {
      const rawDate = event.startDate || event.deadline;
      if (!rawDate) {
        return true;
      }

      const date = new Date(rawDate);
      return !Number.isNaN(date.getTime()) && date.getTime() >= Date.now();
    })
    .sort((left, right) => {
      const leftDate = new Date(
        left.startDate || left.deadline || left.createdAt || 0,
      ).getTime();
      const rightDate = new Date(
        right.startDate || right.deadline || right.createdAt || 0,
      ).getTime();
      return leftDate - rightDate;
    })
    .slice(0, 3);

  const stats = [
    {
      id: "bookmarks",
      title: "Saved Events",
      value: bookmarks.length,
      icon: Bookmark01Icon,
      color: "teal",
    },
    {
      id: "alerts",
      title: "Unread Alerts",
      value: unreadAlerts,
      icon: Clock01Icon,
      color: "amber",
    },
    {
      id: "events",
      title: "Upcoming Events",
      value: upcomingEvents.length,
      icon: Calendar01Icon,
      color: "emerald",
    },
    {
      id: "activity",
      title: "Recent Actions",
      value: bookmarks.length + alerts.length,
      icon: Calendar01Icon,
      color: "cyan",
    },
  ];

  const recentActivity: ActivityItem[] = [
    ...bookmarks.map((bookmark) => ({
      id: `bookmark-${bookmark.id}`,
      type: "bookmark" as const,
      title: bookmark.event?.title || "Saved event",
      description: "Saved to bookmarks",
      time: formatRelativeTime(bookmark.createdAt),
      icon: Bookmark01Icon,
      timestamp: bookmark.createdAt
        ? new Date(bookmark.createdAt).getTime()
        : 0,
    })),
    ...alerts.map((alert) => ({
      id: `alert-${alert.id}`,
      type: "alert" as const,
      title: alert.read ? "Alert reviewed" : "New alert",
      description: alert.message,
      time: formatRelativeTime(alert.createdAt),
      icon: Clock01Icon,
      timestamp: alert.createdAt ? new Date(alert.createdAt).getTime() : 0,
    })),
  ]
    .sort((left, right) => right.timestamp - left.timestamp)
    .slice(0, 5);

  const notifications = alerts.slice(0, 3).map((alert) => ({
    id: alert.id,
    type: "alert" as const,
    title: alert.read ? "Alert update" : "New alert",
    description: alert.message,
    action: "View Alerts",
    actionHref: "/alerts",
  }));

  const deadlines = upcomingEvents.map((event) => ({
    id: event.id,
    title: event.title,
    description: formatEventDate(event),
    urgency:
      event.deadline &&
      new Date(event.deadline).getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000
        ? ("Urgent" as const)
        : ("Soon" as const),
    href: `/events/${event.id}`,
  }));

  const recommendations = upcomingEvents.slice(0, 2).map((event) => ({
    id: event.id,
    title: event.title,
    description: event.description || "Open this event for details.",
    href: `/events/${event.id}`,
  }));

  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
        {/* Top Header */}
        <TopHeader savedCount={bookmarks.length} />

        {/* Dashboard Content */}
        <main
          className="flex-1"
          id="main-content"
          role="main"
          aria-label="Dashboard content"
        >
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Stats Row */}
                <section role="region" aria-label="Dashboard statistics">
                  <CompactStatsCards stats={stats} />
                </section>

                {/* Recent Activity */}
                <RecentActivitySection activities={recentActivity} />

                {/* Upcoming Events */}
                <UpcomingEventsList
                  events={upcomingEvents.map((event) => ({
                    id: event.id,
                    title: event.title,
                    date: formatEventDate(event),
                    location: event.location || "TBA",
                    attendees: null,
                    badge: event.category || "Event",
                  }))}
                />
              </div>

              {/* Right Column - Sidebar Panel */}
              <div>
                <RightSidebar
                  notifications={notifications}
                  deadlines={deadlines}
                  recommendations={recommendations}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
