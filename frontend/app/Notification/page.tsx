"use client";

import { useEffect, useMemo, useState } from "react";
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
  type NotificationRecord,
} from "@/lib/api-endpoints";
import NotificationCard from "@/components/notifications/NotificationCard";
import CreateAlertModal from "@/components/notifications/CreateAlertModal";
import ActivityTimeline from "@/components/notifications/ActivityTimeline";
import EmptyState from "@/components/notifications/EmptyState";
import { Sidebar } from "@/components/layout/Sidebar";

type TabType = "all" | "unread" | "alerts" | "activity";

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
  icon: string;
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

function notificationToActivity(
  notification: NotificationRecord,
): ActivityItem {
  return {
    id: `notif-${notification.id}`,
    action: notification.isRead ? "Reviewed Notification" : "New Notification",
    description: notification.message,
    icon: notification.icon || "🔔",
    timestamp: toDate(notification.timestamp),
    category: "alert",
  };
}

function alertToActivity(alert: AlertRecord): ActivityItem {
  return {
    id: `alert-${alert.id}`,
    action: alert.read ? "Reviewed Alert" : "Created Alert",
    description: alert.message,
    icon: "🔔",
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
        const [notificationData, alertData] = await Promise.all([
          notificationAPI.getAll(),
          alertsAPI.getAll(),
        ]);

        if (!mounted) {
          return;
        }

        setNotifications(notificationData || []);
        setAlerts(alertData || []);
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
          {/* Hero Section */}
          <div className="relative overflow-hidden py-12 border-b border-white/10">
            {/* Animated background gradient */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(45, 212, 191, 0.2) 0%, transparent 50%)",
              }}
            />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
              <div className="max-w-4xl mx-auto">
                {/* Header with back button */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <Link
                      href="/Dashboard"
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                      title="Back to Dashboard"
                    >
                      <HugeiconsIcon
                        icon={ArrowLeft01Icon}
                        size="20"
                        strokeWidth={2}
                        className="text-zinc-400"
                      />
                    </Link>
                    <div>
                      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 flex items-center gap-3">
                        <HugeiconsIcon
                          icon={BellDotIcon}
                          size="32"
                          strokeWidth={2}
                          className="text-emerald-400"
                        />
                        Notifications
                      </h1>
                      <p className="text-gray-400 text-lg">
                        Stay updated on events that matter to you
                      </p>
                    </div>
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

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setIsCreateAlertOpen(true)}
                    className="px-6 py-3 rounded-lg bg-linear-to-r from-emerald-600 to-teal-600 text-white font-medium hover:from-emerald-500 hover:to-teal-500 transition-all duration-200 flex items-center gap-2"
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

          {/* Tabs */}
          <div className="border-b border-white/10 bg-background/50 sticky top-0 z-30 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex gap-8 overflow-x-auto">
                {[
                  {
                    id: "all" as TabType,
                    label: "All Notifications",
                    count: notifications.length,
                  },
                  {
                    id: "unread" as TabType,
                    label: "Unread",
                    count: unreadCount,
                  },
                  {
                    id: "alerts" as TabType,
                    label: "My Alerts",
                    count: alerts.length,
                  },
                  {
                    id: "activity" as TabType,
                    label: "Activity",
                    count: activityItems.length,
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

          {/* Content */}
          <div className="container mx-auto px-4 sm:px-6 py-12">
            <div className="max-w-4xl mx-auto">
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
                      icon="📭"
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
                      icon="✅"
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
                      icon="🔔"
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
                      icon="📊"
                      title="No activity yet"
                      description="Your activity will appear here as you interact with events."
                      variant="notifications"
                    />
                  )}
                </div>
              )}
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
