"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  BellDotIcon,
  Calendar01Icon,
  Clock01Icon,
  Note01Icon,
} from "@hugeicons/core-free-icons";
import { useAuthContext } from "@/lib/auth-context";
import {
  alertsAPI,
  notificationAPI,
  bookmarkAPI,
  type NotificationRecord,
} from "@/lib/api-endpoints";
import NotificationCard from "@/components/notifications/NotificationCard";
import CreateAlertModal from "@/components/notifications/CreateAlertModal";
import ActivityTimeline from "@/components/notifications/ActivityTimeline";
import EmptyState from "@/components/notifications/EmptyState";
import { Sidebar } from "@/components/layout/Sidebar";

type TabType = "all" | "unread" | "alerts" | "activity" | "bookmarks";

interface AlertRecord {
  id: string;
  message: string;
  read: boolean;
  createdAt?: string;
}

interface ActivityItem {
  id: string;
  action: string;
  description: string;
  icon: React.ReactNode;
  timestamp: Date;
  category: "bookmark" | "registration" | "alert" | "post" | "event";
}

function toDate(value?: string) {
  if (!value) {
    return new Date();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function getActivityIcon(type?: string) {
  const t = (type || "").toLowerCase();
  if (t.includes("dead") || t.includes("deadline")) return Clock01Icon;
  if (t.includes("upcoming") || t.includes("event")) return Calendar01Icon;
  if (t.includes("opportun") || t.includes("new")) return Note01Icon;
  return BellDotIcon;
}

function notificationToActivity(
  notification: NotificationRecord,
): ActivityItem {
  return {
    id: `notif-${notification.id}`,
    action: notification.isRead ? "Reviewed Notification" : "New Notification",
    description: notification.message,
    icon: (
      <HugeiconsIcon
        icon={getActivityIcon(notification.type)}
        size="16"
        className="text-emerald-300"
      />
    ),
    timestamp: toDate(notification.timestamp),
    category: "alert",
  };
}

function alertToActivity(alert: AlertRecord): ActivityItem {
  return {
    id: `alert-${alert.id}`,
    action: alert.read ? "Reviewed Alert" : "Created Alert",
    description: alert.message,
    icon: (
      <HugeiconsIcon
        icon={BellDotIcon}
        size="16"
        className="text-emerald-300"
      />
    ),
    timestamp: toDate(alert.createdAt),
    category: "alert",
  };
}

export default function NotificationPage() {
  const { user, isLoading: authLoading } = useAuthContext();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [alerts, setAlerts] = useState<AlertRecord[]>([]);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);

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
        const [notificationData, alertData, bookmarkData] = await Promise.all([
          notificationAPI.getAll(),
          alertsAPI.getAll(),
          bookmarkAPI.getAll(),
        ]);

        if (!mounted) {
          return;
        }

        setNotifications(notificationData || []);
        setAlerts(alertData || []);
        setBookmarks(Array.isArray(bookmarkData) ? bookmarkData : []);
      } catch (error) {
        console.error("Failed to load notification data:", error);
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

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.isRead).length,
    [notifications],
  );

  const activityItems = useMemo(() => {
    const notificationActivity = notifications.map(notificationToActivity);
    const alertActivity = alerts.map(alertToActivity);

    return [...notificationActivity, ...alertActivity].sort(
      (left, right) => right.timestamp.getTime() - left.timestamp.getTime(),
    );
  }, [alerts, notifications]);

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
      await notificationAPI.markAsRead(id);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, isRead: true }
            : notification,
        ),
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await notificationAPI.delete(id);
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id),
      );
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  const handleDeleteAlert = async (id: string) => {
    try {
      await alertsAPI.delete(id);
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    } catch (error) {
      console.error("Failed to delete alert:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, isRead: true })),
      );
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  const handleCreateAlert = async (alertData: {
    eventTitle: string;
    reminderType: string;
    reminderTime: string;
  }) => {
    const message = `${alertData.eventTitle} - ${alertData.reminderType.replace(/_/g, " ")} at ${alertData.reminderTime}`;

    try {
      await alertsAPI.create(message);
      const [notificationData, alertDataResponse] = await Promise.all([
        notificationAPI.getAll(),
        alertsAPI.getAll(),
      ]);
      setNotifications(notificationData || []);
      setAlerts(alertDataResponse || []);
      setIsCreateAlertOpen(false);
    } catch (error) {
      console.error("Failed to create alert:", error);
      alert("Failed to create alert");
    }
  };

  if (authLoading || isLoading) {
    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center text-gray-400">
        Loading...
      </main>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
        <main className="min-h-screen bg-background">
          {/* Compact Header */}
          <div className="relative overflow-hidden py-4 border-b border-white/10">
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Link
                    href="/Dashboard"
                    className="flex items-center justify-center w-9 h-9 rounded-md bg-white/5 border border-white/10 hover:bg-white/8 transition-colors"
                    title="Back to Dashboard"
                  >
                    <HugeiconsIcon
                      icon={ArrowLeft01Icon}
                      size="18"
                      strokeWidth={2}
                      className="text-zinc-400"
                    />
                  </Link>
                  <div>
                    <h1 className="text-2xl font-semibold text-white flex items-center gap-3">
                      <HugeiconsIcon
                        icon={BellDotIcon}
                        size="22"
                        strokeWidth={2}
                        className="text-emerald-400"
                      />
                      Notifications
                      <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {unreadCount} unread
                      </span>
                    </h1>
                    <p className="text-sm text-gray-400">
                      All your recent activity
                    </p>
                  </div>
                </div>

                {/* Compact toolbar */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsCreateAlertOpen(true)}
                    className="px-3 py-1.5 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500 transition-colors flex items-center gap-2"
                  >
                    <HugeiconsIcon
                      icon={BellDotIcon}
                      size="16"
                      className="text-amber-400"
                    />
                    <span>Create</span>
                  </button>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllAsRead}
                      className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/8 transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Filter pills */}
          <div className="sticky top-0 z-30 bg-background/40 backdrop-blur-sm border-b border-white/6">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-3 py-3 overflow-x-auto">
                {[
                  { id: "all" as TabType, label: "All" },
                  { id: "unread" as TabType, label: "Unread" },
                  { id: "alerts" as TabType, label: "Alerts" },
                  { id: "activity" as TabType, label: "Activity" },
                  { id: "bookmarks" as TabType, label: "Bookmarks" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-white/3 text-gray-300 hover:bg-white/5"
                    }`}
                  >
                    {tab.label}
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold bg-white/5 text-gray-200">
                      {tab.id === "unread"
                        ? unreadCount
                        : tab.id === "alerts"
                          ? alerts.length
                          : tab.id === "activity"
                            ? activityItems.length
                            : notifications.length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 sm:px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 max-w-full">
                {/* All Notifications Tab */}
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
                        icon={
                          <HugeiconsIcon
                            icon={BellDotIcon}
                            size="36"
                            className="text-emerald-400"
                          />
                        }
                        title="You're all caught up!"
                        description="No notifications at the moment. Stay tuned for updates on your favorite events."
                        actionText="Explore Events"
                        onAction={() => (window.location.href = "/events")}
                        variant="notifications"
                      />
                    )}
                  </div>
                )}

                {/* Unread Tab */}
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
                        icon={
                          <HugeiconsIcon
                            icon={BellDotIcon}
                            size="36"
                            className="text-emerald-400"
                          />
                        }
                        title="All marked as read"
                        description="Great job staying on top of things! Check back later for new notifications."
                        variant="notifications"
                      />
                    )}
                  </div>
                )}

                {/* Alerts Tab */}
                {activeTab === "alerts" && (
                  <div className="space-y-6">
                    {alerts.length > 0 ? (
                      <div className="space-y-4">
                        {alerts.map((alert) => (
                          <div
                            key={alert.id}
                            className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/8 transition-all group"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                                  {alert.message.split(" - ")[0] || "Alert"}
                                </h3>
                                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-500">
                                      Message:
                                    </span>
                                    <p className="text-white font-medium capitalize">
                                      {alert.message}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">
                                      Created:
                                    </span>
                                    <p className="text-white font-medium">
                                      {toDate(alert.createdAt).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2 ml-4">
                                <button
                                  onClick={() => handleDeleteAlert(alert.id)}
                                  className="px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-sm font-medium"
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
                        icon={
                          <HugeiconsIcon
                            icon={BellDotIcon}
                            size="36"
                            className="text-emerald-400"
                          />
                        }
                        title="No custom alerts yet"
                        description="Create your first alert to get notified about important events."
                        actionText="Create Alert"
                        onAction={() => setIsCreateAlertOpen(true)}
                        variant="notifications"
                      />
                    )}
                  </div>
                )}

                {/* Activity Tab */}
                {activeTab === "activity" && (
                  <div>
                    {activityItems.length > 0 ? (
                      <ActivityTimeline activities={activityItems} />
                    ) : (
                      <EmptyState
                        icon={
                          <HugeiconsIcon
                            icon={Calendar01Icon}
                            size="36"
                            className="text-emerald-400"
                          />
                        }
                        title="No activity yet"
                        description="Your activity will appear here as you interact with events."
                        variant="notifications"
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Right summary panel */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 p-4 rounded-md bg-white/3 border border-white/6">
                  <h4 className="text-sm font-semibold text-white mb-3">
                    Summary
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Unread</p>
                        <p className="text-lg font-bold text-white">
                          {unreadCount}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Active Alerts</p>
                        <p className="text-lg font-bold text-white">
                          {alerts.length}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Upcoming Deadlines
                      </p>
                      <ul className="mt-2 space-y-2 max-h-36 overflow-auto">
                        {notifications
                          .filter((n) => n.type?.toLowerCase().includes("dead"))
                          .slice(0, 4)
                          .map((n) => (
                            <li key={n.id} className="text-sm text-gray-200">
                              <div className="flex items-center justify-between">
                                <span className="truncate">{n.title}</span>
                                <span className="text-xs text-gray-400 ml-2">
                                  {new Date(n.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">Recent Bookmarks</p>
                      <ul className="mt-2 space-y-2 max-h-36 overflow-auto">
                        {notifications
                          .filter(
                            (n) => n.type === "bookmark" || !!n.eventTitle,
                          )
                          .slice(0, 4)
                          .map((n) => (
                            <li
                              key={n.id}
                              className="text-sm text-gray-200 truncate"
                            >
                              {n.eventTitle || n.title}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>

          {/* Create Alert Modal */}
          {isCreateAlertOpen && (
            <CreateAlertModal
              isOpen={isCreateAlertOpen}
              onClose={() => setIsCreateAlertOpen(false)}
              onSave={handleCreateAlert}
            />
          )}
        </main>
      </div>
    </div>
  );
}
