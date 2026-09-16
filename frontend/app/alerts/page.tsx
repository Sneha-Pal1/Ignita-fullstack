"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/lib/auth-context";
import { apiClient } from "@/lib/api-client";
import NotificationCard from "@/components/notifications/NotificationCard";
import CreateAlertModal from "@/components/notifications/CreateAlertModal";
import ActivityTimeline from "@/components/notifications/ActivityTimeline";
import EmptyState from "@/components/notifications/EmptyState";
import { type NotificationRecord } from "@/lib/api-endpoints";
import {
  Bookmark01Icon,
  BellDotIcon,
  Calendar01Icon,
  Clock01Icon,
  Note01Icon,
} from "@hugeicons/core-free-icons";

type TabType = "all" | "unread" | "alerts" | "activity";

interface AlertRecord {
  id: string;
  message: string;
  read: boolean;
  createdAt?: string;
}

interface BookmarkRecord {
  id: string;
  event?: {
    title: string;
  };
  createdAt?: string;
}

interface ActivityItem {
  id: string;
  action: string;
  description: string;
  icon: string;
  timestamp: Date;
  category: "bookmark" | "registration" | "alert" | "post" | "event";
}

function formatRelativeTime(dateValue?: string) {
  if (!dateValue) {
    return new Date();
  }

  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) {
    return new Date();
  }

  return parsed;
}

function toNotification(alert: AlertRecord): NotificationRecord {
  return {
    id: alert.id,
    type: "event_deadline",
    title: alert.read ? "Alert update" : "New alert",
    message: alert.message,
    eventTitle: alert.message,
    timestamp: alert.createdAt || new Date().toISOString(),
    isRead: alert.read,
    icon: "🔔",
    color: "from-emerald-500 to-teal-500",
    actionUrl: "/alerts",
  };
}

export default function AlertsPage() {
  const { user, isLoading: authLoading } = useAuthContext();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [alerts, setAlerts] = useState<AlertRecord[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>([]);
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, router, user]);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);
        const [alertData, bookmarkData] = await Promise.all([
          apiClient.get<AlertRecord[]>("/alerts"),
          apiClient.get<BookmarkRecord[]>("/bookmark"),
        ]);

        if (!mounted) {
          return;
        }

        setAlerts(alertData || []);
        setBookmarks(bookmarkData || []);
      } catch (error) {
        console.error("Failed to load alerts page data:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    if (!authLoading && user) {
      loadData();
    }

    return () => {
      mounted = false;
    };
  }, [authLoading, user]);

  const notifications = useMemo(
    () => alerts.map((alert) => toNotification(alert)),
    [alerts],
  );

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  const activityItems: ActivityItem[] = useMemo(() => {
    const bookmarkActivity = bookmarks.map((bookmark) => ({
      id: `bookmark-${bookmark.id}`,
      action: "Saved Event",
      description: `Saved '${bookmark.event?.title || "an event"}' to bookmarks`,
      icon: "🔖",
      timestamp: new Date(bookmark.createdAt || Date.now()),
      category: "bookmark" as const,
    }));

    const alertActivity = alerts.map((alert) => ({
      id: `alert-${alert.id}`,
      action: alert.read ? "Reviewed Alert" : "Created Alert",
      description: alert.message,
      icon: "🔔",
      timestamp: new Date(alert.createdAt || Date.now()),
      category: "alert" as const,
    }));

    return [...bookmarkActivity, ...alertActivity].sort(
      (left, right) => right.timestamp.getTime() - left.timestamp.getTime(),
    );
  }, [alerts, bookmarks]);

  const filteredNotifications = useMemo(() => {
    switch (activeTab) {
      case "unread":
        return notifications.filter((notification) => !notification.isRead);
      case "alerts":
        return notifications;
      case "all":
      default:
        return notifications;
    }
  }, [activeTab, notifications]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await apiClient.patch(`/alerts/${id}/read`);
      setAlerts((prev) =>
        prev.map((alert) =>
          alert.id === id ? { ...alert, read: true } : alert,
        ),
      );
    } catch (error) {
      console.error("Failed to mark alert as read:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/alerts/${id}`);
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    } catch (error) {
      console.error("Failed to delete alert:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await Promise.all(
        alerts
          .filter((alert) => !alert.read)
          .map((alert) => apiClient.patch(`/alerts/${alert.id}/read`)),
      );
      setAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })));
    } catch (error) {
      console.error("Failed to mark all alerts as read:", error);
    }
  };

  const handleCreateAlert = async (alertData: {
    eventTitle: string;
    reminderType: string;
    reminderTime: string;
  }) => {
    const message = `${alertData.eventTitle} - ${alertData.reminderType.replace(/_/g, " ")} at ${alertData.reminderTime}`;

    try {
      await apiClient.post(`/alerts/${encodeURIComponent(message)}`);
      const createdAt = new Date().toISOString();
      setAlerts((prev) => [
        {
          id: `alert-${Date.now()}`,
          message,
          read: false,
          createdAt,
        },
        ...prev,
      ]);
      setIsCreateAlertOpen(false);
    } catch (error) {
      console.error("Failed to create alert:", error);
      alert("Failed to create alert");
    }
  };

  if (authLoading || isLoading) {
    return (
      <main className="min-h-screen bg-[#0e0e0d] text-[#8a8a86] flex items-center justify-center font-mono text-xs">
        LOADING ALERTS...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0e0e0d] text-[#f4f4f0] font-mono">
      <div className="relative overflow-hidden py-12 border-b border-white/10 bg-[#141413]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="levo-eyebrow mb-2">
                <span className="h-1.5 w-1.5 bg-[#FFB100]" />
                <span>NOTIFICATIONS & ALERTS</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight font-sans">
                ALERT ENGINE
              </h1>
              <p className="text-xs text-[#8a8a86] mt-1">
                REAL-TIME NOTIFICATIONS FROM YOUR EVENT PIPELINE.
              </p>
            </div>
            {unreadCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-1 bg-[#FFB100]/10 border border-[#FFB100]/30 text-[#FFB100] text-xs">
                <div className="w-1.5 h-1.5 bg-[#FFB100] animate-pulse" />
                <span>{unreadCount} UNREAD</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setIsCreateAlertOpen(true)}
              className="px-6 py-3 bg-[#FFB100] text-black font-semibold text-xs tracking-widest uppercase hover:bg-[#ffbe25] transition-colors cursor-pointer"
            >
              + CREATE ALERT
            </button>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="px-6 py-3 border border-white/10 bg-transparent text-white font-semibold text-xs tracking-widest uppercase hover:border-white/40 transition-colors"
              >
                MARK ALL AS READ
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="border-b border-white/10 bg-[#0e0e0d] sticky top-0 z-30">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex gap-8 overflow-x-auto">
            {[
              {
                id: "all" as TabType,
                label: "ALL NOTIFICATIONS",
                count: notifications.length,
                icon: BellDotIcon,
              },
              {
                id: "unread" as TabType,
                label: "UNREAD",
                count: unreadCount,
                icon: Clock01Icon,
              },
              {
                id: "alerts" as TabType,
                label: "MY ALERTS",
                count: alerts.length,
                icon: Calendar01Icon,
              },
              {
                id: "activity" as TabType,
                label: "ACTIVITY",
                count: activityItems.length,
                icon: Note01Icon,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 text-xs font-bold uppercase tracking-wider whitespace-nowrap border-b-2 transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? "border-[#FFB100] text-[#FFB100]"
                    : "border-transparent text-[#8a8a86] hover:text-white"
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] bg-[#FFB100]/20 text-[#FFB100]">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {activeTab === "all" && (
          <div>
            {filteredNotifications.length > 0 ? (
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon="📭"
                title="ALL CAUGHT UP!"
                description="No active notifications at the moment."
                actionText="Explore Events"
                onAction={() => (window.location.href = "/events")}
                variant="notifications"
              />
            )}
          </div>
        )}

        {activeTab === "unread" && (
          <div>
            {filteredNotifications.length > 0 ? (
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon="✅"
                title="NO UNREAD ALERTS"
                description="You are completely up to date!"
                variant="notifications"
              />
            )}
          </div>
        )}

        {activeTab === "alerts" && (
          <div className="space-y-6">
            {alerts.length > 0 ? (
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-5 border border-white/10 bg-[#141413] hover:border-[#FFB100]/40 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-base font-bold text-white font-sans">
                            {alert.message}
                          </h3>
                          <span
                            className={`px-2 py-0.5 text-[10px] uppercase font-bold ${
                              alert.read
                                ? "bg-white/10 text-[#8a8a86]"
                                : "bg-[#FFB100]/20 text-[#FFB100] border border-[#FFB100]/40"
                            }`}
                          >
                            {alert.read ? "READ" : "UNREAD"}
                          </span>
                        </div>
                        <p className="text-xs text-[#8a8a86]">
                          CREATED{" "}
                          {formatRelativeTime(
                            alert.createdAt,
                          ).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex gap-2 flex-shrink-0">
                        {!alert.read && (
                          <button
                            onClick={() => handleMarkAsRead(alert.id)}
                            className="px-3 py-1.5 bg-[#FFB100]/10 border border-[#FFB100]/40 text-[#FFB100] hover:bg-[#FFB100] hover:text-black transition-colors text-xs font-bold uppercase"
                          >
                            MARK READ
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(alert.id)}
                          className="px-3 py-1.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors text-xs font-bold uppercase"
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon="🔔"
                title="NO ALERTS SET"
                description="Create a custom alert to get notified about upcoming event deadlines."
                actionText="Create Alert"
                onAction={() => setIsCreateAlertOpen(true)}
                variant="alerts"
              />
            )}
          </div>
        )}

        {activeTab === "activity" && (
          <ActivityTimeline activities={activityItems} />
        )}
      </div>

      <CreateAlertModal
        isOpen={isCreateAlertOpen}
        onClose={() => setIsCreateAlertOpen(false)}
        onSave={handleCreateAlert}
      />
    </main>
  );
}

