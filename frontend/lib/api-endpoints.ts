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
    return apiClient.put<Event>(`/events/${id}`, data);
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
    return apiClient.get("/notification");
  },

  markAsRead: async (id: string) => {
    return apiClient.put(`/notification/${id}`, { read: true });
  },
};

export const analyticsAPI = {
  getStats: async () => {
    return apiClient.get("/analytics");
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
