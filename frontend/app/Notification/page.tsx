"use client";

import { useState } from "react";
import NotificationCard from "@/components/notifications/NotificationCard";
import CreateAlertModal from "@/components/notifications/CreateAlertModal";
import ActivityTimeline from "@/components/notifications/ActivityTimeline";
import EmptyState from "@/components/notifications/EmptyState";
import {
  mockNotifications,
  mockAlerts,
  mockActivityLog,
  type Notification,
} from "@/lib/data/notifications-data";
import Link from "next/link";
import { Bell, ArrowLeft } from "lucide-react";

type TabType = "all" | "unread" | "alerts" | "activity";

export default function NotificationPage() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [notifications, setNotifications] = useState(mockNotifications);
  const [alerts, setAlerts] = useState(mockAlerts);
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Filter notifications based on active tab
  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return notifications.filter((n) => !n.isRead);
      case "alerts":
        return alerts.length > 0
          ? notifications.filter((n) =>
              alerts.some((a) => a.eventTitle === n.eventTitle),
            )
          : [];
      case "all":
      default:
        return notifications;
    }
  };

  const filteredNotifications = getFilteredNotifications();

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleCreateAlert = (alertData: {
    eventTitle: string;
    reminderType: string;
    reminderTime: string;
  }) => {
    const newAlert = {
      id: `alert-${Date.now()}`,
      ...alertData,
      isActive: true,
      createdAt: new Date(),
      nextNotification: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };
    setAlerts((prev) => [newAlert, ...prev]);
    setIsCreateAlertOpen(false);

    // Show success toast
    alert("Alert created successfully!");
  };

  const handleToggleAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a)),
    );
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
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
                  <ArrowLeft className="w-5 h-5 text-zinc-400" />
                </Link>
                <div>
                  <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 flex items-center gap-3">
                    <Bell className="w-8 h-8 text-emerald-400" />
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
              { id: "unread" as TabType, label: "Unread", count: unreadCount },
              {
                id: "alerts" as TabType,
                label: "My Alerts",
                count: alerts.length,
              },
              {
                id: "activity" as TabType,
                label: "Activity",
                count: mockActivityLog.length,
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
                      className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                            {alert.eventTitle}
                          </h3>
                          <div className="mt-3 flex flex-wrap gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Reminder Type:</span>
                              <p className="text-white font-medium capitalize">
                                {alert.reminderType}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Time:</span>
                              <p className="text-white font-medium">
                                {alert.reminderTime}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Next:</span>
                              <p className="text-white font-medium">
                                {new Date(
                                  alert.nextNotification,
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <button
                            onClick={() => handleToggleAlert(alert.id)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              alert.isActive
                                ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                                : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                            }`}
                          >
                            {alert.isActive ? "Active" : "Inactive"}
                          </button>
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
              {mockActivityLog.length > 0 ? (
                <ActivityTimeline activities={mockActivityLog} />
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
          onSubmit={handleCreateAlert}
        />
      )}
    </main>
  );
}
