import { apiClient } from "./api-client";

export interface Event {
  id: string;
  name: string;
  description?: string;
  date?: string;
  category?: string;
  type?: string;
  // Add other fields as needed
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
  create: async (data: Partial<Event>) => {
    return apiClient.post<Event>("/events", data);
  },

  // Update event
  update: async (id: string, data: Partial<Event>) => {
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

  create: async (data: any) => {
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

  updateProfile: async (data: any) => {
    return apiClient.put("/user/profile", data);
  },
};
