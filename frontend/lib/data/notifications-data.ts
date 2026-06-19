// Mock data for notifications and alerts

export interface Notification {
  id: string;
  type:
    | "event_deadline"
    | "upcoming_event"
    | "bookmark_reminder"
    | "new_opportunity"
    | "internship_alert"
    | "hackathon_reminder"
    | "ai_event";
  title: string;
  message: string;
  eventTitle?: string;
  timestamp: Date;
  isRead: boolean;
  icon: string;
  color: string;
  actionUrl?: string;
}

export interface Alert {
  id: string;
  eventTitle: string;
  reminderType: "1_day" | "3_hours" | "1_week" | "3_days" | "custom";
  reminderTime: string;
  isActive: boolean;
  createdAt: Date;
  nextNotification: Date;
}

export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  icon: string;
  timestamp: Date;
  category: "bookmark" | "registration" | "alert" | "post" | "event";
}

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    type: "event_deadline",
    title: "HackMIT 2026 Deadline Tomorrow",
    message: "Registration closes in 24 hours. Secure your spot now!",
    eventTitle: "HackMIT 2026",
    timestamp: new Date(Date.now() - 30 * 60000), // 30 mins ago
    isRead: false,
    icon: "🚀",
    color: "from-emerald-500 to-teal-500",
    actionUrl: "/events/hackmit-2026",
  },
  {
    id: "notif-2",
    type: "upcoming_event",
    title: "Google Internship Info Session",
    message: "Your bookmarked event starts in 3 hours",
    eventTitle: "Google Internship Info Session",
    timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
    isRead: false,
    icon: "💼",
    color: "from-cyan-500 to-blue-500",
    actionUrl: "/events/google-internship",
  },
  {
    id: "notif-3",
    type: "new_opportunity",
    title: "New AI/ML Opportunity Added",
    message: "Check out 'Advanced LLM Bootcamp 2026' - matching your interests",
    eventTitle: "Advanced LLM Bootcamp 2026",
    timestamp: new Date(Date.now() - 4 * 60 * 60000), // 4 hours ago
    isRead: false,
    icon: "🤖",
    color: "from-purple-500 to-pink-500",
    actionUrl: "/events/llm-bootcamp",
  },
  {
    id: "notif-4",
    type: "internship_alert",
    title: "Microsoft Internship Applications Close in 3 Days",
    message: "Don't miss out on this opportunity - apply now",
    eventTitle: "Microsoft Internship Program",
    timestamp: new Date(Date.now() - 8 * 60 * 60000), // 8 hours ago
    isRead: true,
    icon: "🔵",
    color: "from-blue-500 to-cyan-500",
    actionUrl: "/events/microsoft-internship",
  },
  {
    id: "notif-5",
    type: "bookmark_reminder",
    title: "Your Bookmarked Event Starts Soon",
    message: "Stanford StartX Summit begins in 2 days",
    eventTitle: "Stanford StartX Summit",
    timestamp: new Date(Date.now() - 24 * 60 * 60000), // 1 day ago
    isRead: true,
    icon: "⭐",
    color: "from-emerald-500 to-green-500",
    actionUrl: "/events/stanford-startx",
  },
  {
    id: "notif-6",
    type: "hackathon_reminder",
    title: "Your Registered Hackathon Starts Tomorrow",
    message: "Get ready for HackUCSC 2026 - check logistics",
    eventTitle: "HackUCSC 2026",
    timestamp: new Date(Date.now() - 36 * 60 * 60000), // 1.5 days ago
    isRead: true,
    icon: "💻",
    color: "from-orange-500 to-red-500",
    actionUrl: "/events/hackucsc",
  },
];

// Mock alerts
export const mockAlerts: Alert[] = [
  {
    id: "alert-1",
    eventTitle: "HackMIT 2026",
    reminderType: "1_day",
    reminderTime: "09:00 AM",
    isActive: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60000), // 7 days ago
    nextNotification: new Date(Date.now() + 1 * 24 * 60 * 60000),
  },
  {
    id: "alert-2",
    eventTitle: "Google Internship Info Session",
    reminderType: "3_hours",
    reminderTime: "Before event",
    isActive: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60000),
    nextNotification: new Date(Date.now() + 2 * 60 * 60000),
  },
  {
    id: "alert-3",
    eventTitle: "Stanford StartX Summit",
    reminderType: "1_week",
    reminderTime: "10:00 AM",
    isActive: false,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60000),
    nextNotification: new Date(Date.now() + 7 * 24 * 60 * 60000),
  },
];

// Mock activity log
export const mockActivityLog: ActivityLog[] = [
  {
    id: "activity-1",
    action: "Bookmarked Event",
    description: "Saved 'Advanced LLM Bootcamp 2026' to bookmarks",
    icon: "🔖",
    timestamp: new Date(Date.now() - 2 * 60 * 60000),
    category: "bookmark",
  },
  {
    id: "activity-2",
    action: "Registered for Event",
    description: "Successfully registered for 'HackMIT 2026'",
    icon: "✅",
    timestamp: new Date(Date.now() - 6 * 60 * 60000),
    category: "registration",
  },
  {
    id: "activity-3",
    action: "Created Alert",
    description: "Set up reminder for 'Google Internship Info Session'",
    icon: "🔔",
    timestamp: new Date(Date.now() - 12 * 60 * 60000),
    category: "alert",
  },
  {
    id: "activity-4",
    action: "Generated LinkedIn Post",
    description: "AI-generated post about HackMIT 2026 attendance",
    icon: "📝",
    timestamp: new Date(Date.now() - 24 * 60 * 60000),
    category: "post",
  },
  {
    id: "activity-5",
    action: "Enabled Startup Alerts",
    description: "Subscribed to startup-focused event notifications",
    icon: "🚀",
    timestamp: new Date(Date.now() - 48 * 60 * 60000),
    category: "event",
  },
  {
    id: "activity-6",
    action: "Event Attended",
    description: "Marked attendance for 'Web3 Networking Event'",
    icon: "🎯",
    timestamp: new Date(Date.now() - 72 * 60 * 60000),
    category: "event",
  },
];
