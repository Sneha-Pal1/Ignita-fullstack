// Notification utilities and helpers

import {
  Notification,
  Alert,
  ActivityLog,
} from "@/lib/data/notifications-data";

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return date.toLocaleDateString();
}

/**
 * Get unread count from notifications
 */
export function getUnreadCount(notifications: Notification[]): number {
  return notifications.filter((n) => !n.isRead).length;
}

/**
 * Get notifications by type
 */
export function getNotificationsByType(
  notifications: Notification[],
  type: Notification["type"],
): Notification[] {
  return notifications.filter((n) => n.type === type);
}

/**
 * Get latest N notifications
 */
export function getLatestNotifications(
  notifications: Notification[],
  limit: number = 5,
): Notification[] {
  return notifications.slice(0, limit);
}

/**
 * Mark multiple notifications as read
 */
export function markNotificationsAsRead(
  notifications: Notification[],
  ids: string[],
): Notification[] {
  const idSet = new Set(ids);
  return notifications.map((n) =>
    idSet.has(n.id) ? { ...n, isRead: true } : n,
  );
}

/**
 * Filter notifications by read status
 */
export function filterNotifications(
  notifications: Notification[],
  filter: "all" | "read" | "unread",
): Notification[] {
  switch (filter) {
    case "unread":
      return notifications.filter((n) => !n.isRead);
    case "read":
      return notifications.filter((n) => n.isRead);
    case "all":
    default:
      return notifications;
  }
}

/**
 * Get notification type icon
 */
export function getNotificationIcon(type: Notification["type"]): string {
  const icons: Record<Notification["type"], string> = {
    event_deadline: "🚀",
    upcoming_event: "💼",
    bookmark_reminder: "⭐",
    new_opportunity: "🤖",
    internship_alert: "🔵",
    hackathon_reminder: "💻",
    ai_event: "🤖",
  };
  return icons[type] || "📬";
}

/**
 * Get notification type color gradient
 */
export function getNotificationColor(type: Notification["type"]): string {
  const colors: Record<Notification["type"], string> = {
    event_deadline: "from-emerald-500 to-teal-500",
    upcoming_event: "from-cyan-500 to-blue-500",
    bookmark_reminder: "from-emerald-500 to-green-500",
    new_opportunity: "from-purple-500 to-pink-500",
    internship_alert: "from-blue-500 to-cyan-500",
    hackathon_reminder: "from-orange-500 to-red-500",
    ai_event: "from-purple-500 to-pink-500",
  };
  return colors[type] || "from-emerald-500 to-teal-500";
}

/**
 * Get alert reminder label
 */
export function getAlertReminderLabel(
  reminderType: Alert["reminderType"],
): string {
  const labels: Record<Alert["reminderType"], string> = {
    "1_week": "1 Week Before",
    "3_days": "3 Days Before",
    "1_day": "1 Day Before",
    "3_hours": "3 Hours Before",
    custom: "Custom",
  };
  return labels[reminderType] || reminderType;
}

/**
 * Get alert reminder icon
 */
export function getAlertReminderIcon(
  reminderType: Alert["reminderType"],
): string {
  const icons: Record<Alert["reminderType"], string> = {
    "1_week": "📅",
    "3_days": "📌",
    "1_day": "⏳",
    "3_hours": "⏰",
    custom: "⚙️",
  };
  return icons[reminderType] || "🔔";
}

/**
 * Group notifications by date
 */
export function groupNotificationsByDate(
  notifications: Notification[],
): Record<string, Notification[]> {
  const grouped: Record<string, Notification[]> = {};

  notifications.forEach((notif) => {
    const date = new Date(notif.timestamp);
    const dateKey = date.toLocaleDateString();

    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(notif);
  });

  return grouped;
}

/**
 * Get activity by category
 */
export function getActivityByCategory(
  activities: ActivityLog[],
  category: ActivityLog["category"],
): ActivityLog[] {
  return activities.filter((a) => a.category === category);
}

/**
 * Get activity count by category
 */
export function getActivityCountByCategory(
  activities: ActivityLog[],
): Record<ActivityLog["category"], number> {
  return {
    bookmark: activities.filter((a) => a.category === "bookmark").length,
    registration: activities.filter((a) => a.category === "registration")
      .length,
    alert: activities.filter((a) => a.category === "alert").length,
    post: activities.filter((a) => a.category === "post").length,
    event: activities.filter((a) => a.category === "event").length,
  };
}

/**
 * Check if notification is recent (within last hour)
 */
export function isRecentNotification(notification: Notification): boolean {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  return notification.timestamp > oneHourAgo;
}

/**
 * Check if notification is urgent
 */
export function isUrgentNotification(notification: Notification): boolean {
  const urgentTypes: Notification["type"][] = [
    "event_deadline",
    "internship_alert",
    "hackathon_reminder",
  ];
  return urgentTypes.includes(notification.type);
}

/**
 * Batch mark notifications as read
 */
export function batchMarkAsRead(
  notifications: Notification[],
  filter?: "all" | "unread",
): Notification[] {
  if (filter === "unread") {
    return notifications.map((n) => ({ ...n, isRead: true }));
  }
  return notifications.map((n) => ({ ...n, isRead: true }));
}

/**
 * Search notifications
 */
export function searchNotifications(
  notifications: Notification[],
  query: string,
): Notification[] {
  const lowerQuery = query.toLowerCase();
  return notifications.filter(
    (n) =>
      n.title.toLowerCase().includes(lowerQuery) ||
      n.message.toLowerCase().includes(lowerQuery) ||
      (n.eventTitle?.toLowerCase().includes(lowerQuery) ?? false),
  );
}

/**
 * Sort notifications
 */
export function sortNotifications(
  notifications: Notification[],
  sortBy: "recent" | "oldest" | "unread",
): Notification[] {
  const sorted = [...notifications];

  switch (sortBy) {
    case "recent":
      return sorted.sort(
        (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
      );
    case "oldest":
      return sorted.sort(
        (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
      );
    case "unread":
      return sorted.sort((a, b) => {
        if (a.isRead === b.isRead) {
          return b.timestamp.getTime() - a.timestamp.getTime();
        }
        return a.isRead ? 1 : -1;
      });
    default:
      return sorted;
  }
}

/**
 * Generate notification from activity log
 */
export function activityToNotification(activity: ActivityLog): Notification {
  return {
    id: `notif-${activity.id}`,
    type: "new_opportunity",
    title: activity.action,
    message: activity.description,
    timestamp: activity.timestamp,
    isRead: false,
    icon: activity.icon,
    color: "from-emerald-500 to-teal-500",
  };
}

/**
 * Calculate notification statistics
 */
export interface NotificationStats {
  totalNotifications: number;
  unreadCount: number;
  readCount: number;
  urgentCount: number;
  recentCount: number; // within last hour
  byType: Record<Notification["type"], number>;
}

export function calculateNotificationStats(
  notifications: Notification[],
): NotificationStats {
  const byType: Record<Notification["type"], number> = {
    event_deadline: 0,
    upcoming_event: 0,
    bookmark_reminder: 0,
    new_opportunity: 0,
    internship_alert: 0,
    hackathon_reminder: 0,
    ai_event: 0,
  };

  let unreadCount = 0;
  let urgentCount = 0;
  let recentCount = 0;

  notifications.forEach((n) => {
    byType[n.type]++;
    if (!n.isRead) unreadCount++;
    if (isUrgentNotification(n)) urgentCount++;
    if (isRecentNotification(n)) recentCount++;
  });

  return {
    totalNotifications: notifications.length,
    unreadCount,
    readCount: notifications.length - unreadCount,
    urgentCount,
    recentCount,
    byType,
  };
}

/**
 * Create notification from template
 */
export interface NotificationTemplate {
  type: Notification["type"];
  titleTemplate: string;
  messageTemplate: string;
  eventTitle?: string;
  actionUrl?: string;
}

export function createNotificationFromTemplate(
  template: NotificationTemplate,
  variables?: Record<string, string>,
): Notification {
  let title = template.titleTemplate;
  let message = template.messageTemplate;

  if (variables) {
    Object.entries(variables).forEach(([key, value]) => {
      title = title.replace(`{${key}}`, value);
      message = message.replace(`{${key}}`, value);
    });
  }

  return {
    id: `notif-${Date.now()}`,
    type: template.type,
    title,
    message,
    eventTitle: template.eventTitle,
    timestamp: new Date(),
    isRead: false,
    icon: getNotificationIcon(template.type),
    color: getNotificationColor(template.type),
    actionUrl: template.actionUrl,
  };
}

/**
 * Export notifications as CSV
 */
export function exportNotificationsAsCSV(
  notifications: Notification[],
): string {
  const headers = ["ID", "Type", "Title", "Message", "Timestamp", "Read"];
  const rows = notifications.map((n) => [
    n.id,
    n.type,
    n.title,
    n.message,
    n.timestamp.toISOString(),
    n.isRead ? "Yes" : "No",
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  return csv;
}

/**
 * Throttle notification updates
 */
export function throttleNotificationUpdate(
  fn: () => void,
  delay: number = 1000,
): () => void {
  let lastCall = 0;

  return () => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      fn();
      lastCall = now;
    }
  };
}
