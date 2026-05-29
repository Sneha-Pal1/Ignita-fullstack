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
import { type Notification } from "@/lib/data/notifications-data";
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

function toNotification(alert: AlertRecord): Notification {
  return {
    id: alert.id,
    type: "event_deadline",
    title: alert.read ? "Alert update" : "New alert",
    message: alert.message,
    eventTitle: alert.message,
    timestamp: formatRelativeTime(alert.createdAt),
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
      <main className="min-h-screen bg-background flex items-center justify-center text-gray-400">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="relative overflow-hidden py-12 border-b border-white/10">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(45, 212, 191, 0.2) 0%, transparent 50%)",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  Notifications & Alerts
                </h1>
                <p className="text-gray-400 text-lg">
                  Live alerts from your account activity
                </p>
              </div>
              {unreadCount > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-medium text-emerald-400">
                    {unreadCount} unread
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsCreateAlertOpen(true)}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium hover:from-emerald-500 hover:to-teal-500 transition-all duration-200 flex items-center gap-2"
              >
                <span>🔔</span>
                <span>Create Alert</span>
              </button>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-200"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-white/10 bg-background/50 sticky top-0 z-30 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex gap-8 overflow-x-auto">
            {[
              {
                id: "all" as TabType,
                label: "All Notifications",
                count: notifications.length,
                icon: BellDotIcon,
              },
              {
                id: "unread" as TabType,
                label: "Unread",
                count: unreadCount,
                icon: Clock01Icon,
              },
              {
                id: "alerts" as TabType,
                label: "My Alerts",
                count: alerts.length,
                icon: Calendar01Icon,
              },
              {
                id: "activity" as TabType,
                label: "Activity",
                count: activityItems.length,
                icon: Note01Icon,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? "border-emerald-500 text-emerald-400"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto">
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
                  title="You're all caught up!"
                  description="No live notifications at the moment. Stay tuned for updates on your events."
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
                  title="All marked as read"
                  description="Great job staying on top of things!"
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
                      className="group p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/5 transition-all duration-200"
                      style={{
                        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-white">
                              {alert.message}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                alert.read
                                  ? "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                                  : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              }`}
                            >
                              {alert.read ? "Read" : "Unread"}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">
                            Created{" "}
                            {formatRelativeTime(
                              alert.createdAt,
                            ).toLocaleString()}
                          </p>
                        </div>

                        <div className="flex gap-2 flex-shrink-0">
                          {!alert.read && (
                            <button
                              onClick={() => handleMarkAsRead(alert.id)}
                              className="px-3 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-all duration-200 text-sm"
                            >
                              Mark Read
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(alert.id)}
                            className="px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-200 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon="🔔"
                  title="No alerts yet"
                  description="Create an alert to get notified about your favorite events."
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
      </div>

      <CreateAlertModal
        isOpen={isCreateAlertOpen}
        onClose={() => setIsCreateAlertOpen(false)}
        onSave={handleCreateAlert}
      />
    </main>
  );
}
