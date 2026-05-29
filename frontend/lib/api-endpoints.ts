import { apiClient } from "./api-client";

export interface Event {
  id: string;
  title: string;
  description?: string;
  category?: string;
  mode?: string;
  organizer?: string;
  location?: string;
  registrationLink?: string;
  startDate?: string;
  endDate?: string;
  bannerImage?: string;
  tags?: string[];
  deadline?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
}

export interface AdminOverviewResponse {
  stats: {
    totalEvents: number;
    totalUsers: number;
    totalBookmarks: number;
    activeAlerts: number;
  };
  recentEvents: Event[];
  recentUsers: Array<{
    id: string;
    name: string;
    email: string;
    phone?: string;
    role?: string;
    createdAt?: string;
  }>;
  recentAlerts: Array<{
    id: string;
    message: string;
    read: boolean;
    createdAt?: string;
    user?: {
      id: string;
      name: string;
      email: string;
    };
  }>;
  pendingActions: Array<{
    label: string;
    value: number;
  }>;
}

export interface AdminAnalyticsResponse {
  eventGrowth: Array<{ month: string; count: string | number }>;
  bookmarkActivity: Array<{ month: string; count: string | number }>;
  categoryPopularity: Array<{ category: string; count: string | number }>;
  activeUsers: number;
  recentUserGrowth: Array<{ month: string; count: string | number }>;
}

export interface CreateEventPayload {
  title: string;
  description?: string;
  category: string;
  mode: string;
  organizer?: string;
  location?: string;
  registrationLink?: string;
  startDate: string;
  endDate: string;
  bannerImage?: string;
  tags?: string[];
  deadline?: string;
}

export const eventsAPI = {
  // Get all events
  getAll: async () => {
    return apiClient.get<Event[]>("/events");
  },

  // Get single event by ID
  getById: async (id: string) => {
    return apiClient.get<Event>(`/events/${id}`);
  },

  // Create event
  create: async (data: CreateEventPayload) => {
    return apiClient.post<Event>("/events", data);
  },

  // Update event
  update: async (id: string, data: Partial<CreateEventPayload>) => {
    return apiClient.patch<Event>(`/events/${id}`, data);
  },

  // Delete event
  delete: async (id: string) => {
    return apiClient.delete(`/events/${id}`);
  },
};

export const bookmarkAPI = {
  getAll: async () => {
    return apiClient.get("/bookmark");
  },

  create: async (data: Record<string, unknown>) => {
    return apiClient.post("/bookmark", data);
  },

  delete: async (id: string) => {
    return apiClient.delete(`/bookmark/${id}`);
  },
};

export const notificationAPI = {
  getAll: async () => {
    return apiClient.get<NotificationRecord[]>("/notification");
  },

  markAsRead: async (id: string) => {
    return apiClient.patch(`/notification/${id}/read`);
  },

  markAllAsRead: async () => {
    return apiClient.patch("/notification/read-all");
  },

  getUnreadCount: async () => {
    return apiClient.get<number>("/notification/unread-count");
  },

  delete: async (id: string) => {
    return apiClient.delete(`/notification/${id}`);
  },
};

export interface NotificationRecord {
  id: string;
  type: string;
  title: string;
  message: string;
  eventTitle?: string;
  timestamp: string;
  isRead: boolean;
  icon: string;
  color: string;
  actionUrl?: string;
}

export const alertsAPI = {
  getAll: async () => {
    return apiClient.get<
      Array<{
        id: string;
        message: string;
        read: boolean;
        createdAt?: string;
      }>
    >("/alerts");
  },

  create: async (message: string) => {
    return apiClient.post("/alerts", { message });
  },

  markAsRead: async (id: string) => {
    return apiClient.patch(`/alerts/${id}/read`);
  },

  delete: async (id: string) => {
    return apiClient.delete(`/alerts/${id}`);
  },
};

export const analyticsAPI = {
  getStats: async () => {
    return apiClient.get("/analytics");
  },
};

export const adminAPI = {
  getOverview: async () => {
    return apiClient.get<AdminOverviewResponse>("/admin/overview");
  },

  getEvents: async () => {
    return apiClient.get<Event[]>("/admin/events");
  },

  getEventById: async (id: string) => {
    return apiClient.get<Event>(`/admin/events/${id}`);
  },

  createEvent: async (data: CreateEventPayload) => {
    return apiClient.post<Event>("/admin/events", data);
  },

  updateEvent: async (id: string, data: Partial<CreateEventPayload>) => {
    return apiClient.patch<Event>(`/admin/events/${id}`, data);
  },

  deleteEvent: async (id: string) => {
    return apiClient.delete(`/admin/events/${id}`);
  },

  getUsers: async () => {
    return apiClient.get<Array<User & { createdAt?: string }>>("/admin/users");
  },

  getAnalytics: async () => {
    return apiClient.get<AdminAnalyticsResponse>("/admin/analytics");
  },

  getAlerts: async () => {
    return apiClient.get<
      Array<{
        id: string;
        message: string;
        read: boolean;
        createdAt?: string;
        user?: { id: string; name: string; email: string };
      }>
    >("/admin/alerts");
  },
};

export const userAPI = {
  getProfile: async () => {
    return apiClient.get("/user/profile");
  },

  updateProfile: async (data: Record<string, unknown>) => {
    return apiClient.put("/user/profile", data);
  },
};
