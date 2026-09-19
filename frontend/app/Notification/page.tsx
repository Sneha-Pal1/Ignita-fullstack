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
        className="text-[#FFB100]"
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
        className="text-[#FFB100]"
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
      <main className="min-h-screen bg-[#0e0e0d] flex items-center justify-center text-[#8a8a86] font-mono text-xs">
        LOADING NOTIFICATIONS...
      </main>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0e0e0d]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col lg:ml-64 font-mono">
        <main className="min-h-screen bg-[#0e0e0d] text-[#f4f4f0]">
          {/* Header */}
          <div className="border-b border-white/10 bg-[#141413] py-6 px-4 sm:px-6">
            <div className="container mx-auto">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Link
                    href="/Dashboard"
                    className="flex items-center justify-center w-9 h-9 border border-white/10 bg-[#0e0e0d] hover:border-[#FFB100] transition-colors"
                    title="Back to Dashboard"
                  >
                    <HugeiconsIcon
                      icon={ArrowLeft01Icon}
                      size="18"
                      strokeWidth={2}
                      className="text-[#8a8a86]"
                    />
                  </Link>
                  <div>
                    <div className="levo-eyebrow mb-1">
                      <span className="h-1.5 w-1.5 bg-[#FFB100]" />
                      <span>03 / SYSTEM ALERTS & ACTIVITY</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white font-sans flex items-center gap-3">
                      <HugeiconsIcon
                        icon={BellDotIcon}
                        size="22"
                        strokeWidth={2}
                        className="text-[#FFB100]"
                      />
                      Notifications
                      <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-mono font-semibold bg-[#FFB100]/10 text-[#FFB100] border border-[#FFB100]/30">
                        {unreadCount} UNREAD
                      </span>
                    </h1>
                  </div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-2 font-mono">
                  <button
                    onClick={() => setIsCreateAlertOpen(true)}
                    className="px-4 py-2 bg-[#FFB100] text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#ffbe26] transition-colors flex items-center gap-2"
                  >
                    <HugeiconsIcon
                      icon={BellDotIcon}
                      size="14"
                      className="text-black"
                    />
                    <span>Create Alert</span>
                  </button>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllAsRead}
                      className="px-3 py-2 border border-white/10 bg-[#0e0e0d] text-xs text-white hover:border-[#FFB100] transition-colors"
                    >
                      Mark All Read
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Filter pills */}
          <div className="sticky top-0 z-30 bg-[#0e0e0d]/90 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-2 py-3 overflow-x-auto font-mono text-xs">
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
                    className={`flex items-center gap-2 px-3 py-1.5 transition-colors whitespace-nowrap border ${
                      activeTab === tab.id
                        ? "bg-[#FFB100] border-[#FFB100] text-black font-semibold"
                        : "bg-[#141413] border-white/10 text-[#8a8a86] hover:text-white hover:border-white/20"
                    }`}
                  >
                    {tab.label}
                    <span className={`inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold ${
                      activeTab === tab.id ? "bg-black/20 text-black" : "bg-white/10 text-white"
                    }`}>
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
                            className="text-[#FFB100]"
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
                            className="text-[#FFB100]"
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
                      <div className="space-y-3 font-mono">
                        {alerts.map((alert) => (
                          <div
                            key={alert.id}
                            className="p-4 bg-[#141413] border border-white/10 hover:border-[#FFB100]/40 transition-colors group"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="text-sm font-bold text-white font-sans group-hover:text-[#FFB100] transition-colors">
                                  {alert.message.split(" - ")[0] || "Alert"}
                                </h3>
                                <div className="mt-2 flex flex-wrap gap-4 text-xs font-mono">
                                  <div>
                                    <span className="text-[#8a8a86]">
                                      Message:
                                    </span>
                                    <p className="text-white font-medium capitalize">
                                      {alert.message}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-[#8a8a86]">
                                      Created:
                                    </span>
                                    <p className="text-[#FFB100]">
                                      {toDate(alert.createdAt).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col gap-2 ml-4">
                                <button
                                  onClick={() => handleDeleteAlert(alert.id)}
                                  className="px-3 py-1 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors text-xs uppercase"
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
                            className="text-[#FFB100]"
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
                            className="text-[#FFB100]"
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
              <aside className="hidden lg:block font-mono">
                <div className="sticky top-24 p-5 bg-[#141413] border border-white/10 space-y-4">
                  <div className="levo-eyebrow mb-1">
                    <span className="h-1.5 w-1.5 bg-[#FFB100]" />
                    <span>SYSTEM METRICS</span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-sans">
                    Activity Summary
                  </h4>
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-2 gap-3 border-b border-white/10 pb-4">
                      <div>
                        <p className="text-[10px] text-[#8a8a86] uppercase tracking-wider">Unread</p>
                        <p className="text-xl font-bold text-[#FFB100] tabular-nums">
                          {unreadCount}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#8a8a86] uppercase tracking-wider">Active Alerts</p>
                        <p className="text-xl font-bold text-white tabular-nums">
                          {alerts.length}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] text-[#8a8a86] uppercase tracking-wider mb-2">
                        Upcoming Deadlines
                      </p>
                      <ul className="space-y-2 max-h-36 overflow-auto text-xs">
                        {notifications
                          .filter((n) => n.type?.toLowerCase().includes("dead"))
                          .slice(0, 4)
                          .map((n) => (
                            <li key={n.id} className="text-white border-b border-white/5 pb-1.5">
                              <div className="flex items-center justify-between">
                                <span className="truncate">{n.title}</span>
                                <span className="text-[10px] text-[#FFB100] ml-2 font-mono">
                                  {new Date(n.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                            </li>
                          ))}
                        {notifications.filter((n) => n.type?.toLowerCase().includes("dead")).length === 0 && (
                          <li className="text-xs text-[#8a8a86]">No active deadlines</li>
                        )}
                      </ul>
                    </div>

                    <div>
                      <p className="text-[10px] text-[#8a8a86] uppercase tracking-wider mb-2">Recent Bookmarks</p>
                      <ul className="space-y-1.5 max-h-36 overflow-auto text-xs">
                        {notifications
                          .filter(
                            (n) => n.type === "bookmark" || !!n.eventTitle,
                          )
                          .slice(0, 4)
                          .map((n) => (
                            <li
                              key={n.id}
                              className="text-[#8a8a86] hover:text-white truncate transition-colors"
                            >
                              • {n.eventTitle || n.title}
                            </li>
                          ))}
                        {notifications.filter((n) => n.type === "bookmark" || !!n.eventTitle).length === 0 && (
                          <li className="text-xs text-[#8a8a86]">No recent bookmarks</li>
                        )}
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
