# Notifications & Alerts System - Backend Integration Guide

This guide explains how to integrate the frontend Notifications & Alerts System with your NestJS backend.

## 📋 Overview

The frontend is currently using mock data. To connect to a real backend, you'll need to:

1. Create backend API endpoints
2. Replace mock data with API calls
3. Set up real-time notifications (optional)
4. Implement notification preferences

## 🔗 Backend API Endpoints

Create these endpoints in your NestJS backend:

### 1. Get All Notifications

```http
GET /api/notifications
```

**Response:**

```json
{
  "data": [
    {
      "id": "notif-1",
      "type": "event_deadline",
      "title": "HackMIT 2026 Deadline Tomorrow",
      "message": "Registration closes in 24 hours",
      "eventTitle": "HackMIT 2026",
      "timestamp": "2024-05-19T10:30:00Z",
      "isRead": false,
      "icon": "🚀",
      "color": "from-emerald-500 to-teal-500",
      "actionUrl": "/events/hackmit-2026"
    }
  ],
  "pagination": {
    "total": 10,
    "page": 1,
    "pageSize": 20
  }
}
```

### 2. Get Unread Notifications

```http
GET /api/notifications/unread
```

**Response:**

```json
{
  "data": [...],
  "unreadCount": 3
}
```

### 3. Get Notification by ID

```http
GET /api/notifications/:id
```

### 4. Mark Notification as Read

```http
PUT /api/notifications/:id
Content-Type: application/json

{
  "isRead": true
}
```

### 5. Mark All as Read

```http
PUT /api/notifications/mark-all-as-read
```

### 6. Delete Notification

```http
DELETE /api/notifications/:id
```

### 7. Create Alert

```http
POST /api/alerts
Content-Type: application/json

{
  "eventTitle": "Google Internship Info Session",
  "reminderType": "3_hours",
  "reminderTime": "14:00",
  "eventId": "event-123"
}
```

**Response:**

```json
{
  "id": "alert-123",
  "eventTitle": "Google Internship Info Session",
  "reminderType": "3_hours",
  "reminderTime": "14:00",
  "isActive": true,
  "createdAt": "2024-05-19T10:30:00Z",
  "nextNotification": "2024-05-20T10:30:00Z"
}
```

### 8. Get User's Alerts

```http
GET /api/alerts
```

### 9. Update Alert

```http
PUT /api/alerts/:id
Content-Type: application/json

{
  "isActive": false,
  "reminderType": "1_day"
}
```

### 10. Delete Alert

```http
DELETE /api/alerts/:id
```

### 11. Get Activity Log

```http
GET /api/activity
```

**Response:**

```json
{
  "data": [
    {
      "id": "activity-1",
      "action": "Bookmarked Event",
      "description": "Saved 'Advanced LLM Bootcamp 2026'",
      "icon": "🔖",
      "timestamp": "2024-05-19T10:30:00Z",
      "category": "bookmark"
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "pageSize": 20
  }
}
```

## 🛠️ Frontend Implementation

### Step 1: Create API Service

Create a new file `lib/api/notifications-api.ts`:

```typescript
import { apiClient } from "@/lib/api-client";
import {
  Notification,
  Alert,
  ActivityLog,
} from "@/lib/data/notifications-data";

export const notificationsAPI = {
  // Notifications
  getNotifications: (page = 1, pageSize = 20) =>
    apiClient.get<{
      data: Notification[];
      pagination: { total: number; page: number; pageSize: number };
    }>(`/notifications?page=${page}&pageSize=${pageSize}`),

  getUnreadNotifications: () =>
    apiClient.get<{ data: Notification[]; unreadCount: number }>(
      "/notifications/unread",
    ),

  markAsRead: (id: string) =>
    apiClient.put(`/notifications/${id}`, { isRead: true }),

  markAllAsRead: () => apiClient.put("/notifications/mark-all-as-read", {}),

  deleteNotification: (id: string) => apiClient.delete(`/notifications/${id}`),

  // Alerts
  createAlert: (alert: {
    eventTitle: string;
    reminderType: string;
    reminderTime: string;
  }) => apiClient.post<Alert>("/alerts", alert),

  getAlerts: () => apiClient.get<{ data: Alert[]; total: number }>("/alerts"),

  updateAlert: (id: string, updates: Partial<Alert>) =>
    apiClient.put<Alert>(`/alerts/${id}`, updates),

  deleteAlert: (id: string) => apiClient.delete(`/alerts/${id}`),

  // Activity
  getActivity: (page = 1, pageSize = 20) =>
    apiClient.get<{
      data: ActivityLog[];
      pagination: { total: number; page: number; pageSize: number };
    }>(`/activity?page=${page}&pageSize=${pageSize}`),
};
```

### Step 2: Update Alerts Page

Replace mock data with API calls:

```typescript
"use client";

import { useEffect, useState } from "react";
import { notificationsAPI } from "@/lib/api/notifications-api";
import type { Notification, Alert } from "@/lib/data/notifications-data";

export default function AlertsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [notifsRes, alertsRes] = await Promise.all([
          notificationsAPI.getNotifications(),
          notificationsAPI.getAlerts(),
        ]);

        setNotifications(notifsRes.data);
        setAlerts(alertsRes.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
        setError("Failed to load notifications");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationsAPI.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const handleCreateAlert = async (alertData: {
    eventTitle: string;
    reminderType: string;
    reminderTime: string;
  }) => {
    try {
      const newAlert = await notificationsAPI.createAlert(alertData);
      setAlerts((prev) => [newAlert, ...prev]);
    } catch (err) {
      console.error("Failed to create alert:", err);
    }
  };

  // ... rest of component
}
```

### Step 3: Update NotificationBell

Replace mock data in `components/notifications/NotificationBell.tsx`:

```typescript
"use client";

import { useState, useEffect, useRef } from "react";
import { notificationsAPI } from "@/lib/api/notifications-api";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationsAPI.getUnreadNotifications();
        setUnreadCount(data.unreadCount);
        setNotifications(data.data);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };

    fetchNotifications();

    // Refresh every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationsAPI.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  // ... rest of component
}
```

## 🔔 Real-Time Notifications (WebSocket)

For real-time notifications, implement WebSocket support:

### Backend Setup (NestJS)

```typescript
// notifications.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  },
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private userSockets = new Map<string, Socket>();

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    this.userSockets.set(userId, client);
    console.log(`User ${userId} connected`);
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;
    this.userSockets.delete(userId);
    console.log(`User ${userId} disconnected`);
  }

  @SubscribeMessage("mark-as-read")
  handleMarkAsRead(client: Socket, data: { notificationId: string }) {
    // Handle mark as read
  }

  // Method to send notification to a user
  sendNotificationToUser(userId: string, notification: any) {
    const socket = this.userSockets.get(userId);
    if (socket) {
      socket.emit("notification", notification);
    }
  }

  // Method to broadcast notification
  broadcastNotification(notification: any) {
    this.server.emit("notification", notification);
  }
}
```

### Frontend Setup

Create `lib/services/notifications-socket.ts`:

```typescript
import io, { Socket } from "socket.io-client";
import { Notification } from "@/lib/data/notifications-data";

let socket: Socket | null = null;

export const notificationsSocket = {
  connect: (userId: string) => {
    socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001", {
      query: { userId },
    });

    socket.on("notification", (notification: Notification) => {
      // Handle incoming notification
      if (typeof window !== "undefined") {
        // Trigger notification event
        window.dispatchEvent(
          new CustomEvent("new-notification", { detail: notification }),
        );
      }
    });
  },

  disconnect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },

  markAsRead: (notificationId: string) => {
    if (socket) {
      socket.emit("mark-as-read", { notificationId });
    }
  },
};
```

Use in component:

```typescript
useEffect(() => {
  if (user?.id) {
    notificationsSocket.connect(user.id);

    window.addEventListener("new-notification", (e: any) => {
      const notification = e.detail;
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      notificationsSocket.disconnect();
    };
  }
}, [user?.id]);
```

## 📊 Database Schema

### Notifications Table

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  event_id UUID,
  event_title VARCHAR(255),
  is_read BOOLEAN DEFAULT FALSE,
  icon VARCHAR(50),
  color VARCHAR(100),
  action_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_user_id ON notifications(user_id);
CREATE INDEX idx_is_read ON notifications(is_read);
CREATE INDEX idx_created_at ON notifications(created_at DESC);
```

### Alerts Table

```sql
CREATE TABLE alerts (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  event_id UUID NOT NULL,
  event_title VARCHAR(255) NOT NULL,
  reminder_type VARCHAR(50) NOT NULL,
  reminder_time TIME,
  is_active BOOLEAN DEFAULT TRUE,
  next_notification TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (event_id) REFERENCES events(id)
);

CREATE INDEX idx_user_id ON alerts(user_id);
CREATE INDEX idx_is_active ON alerts(is_active);
```

### Activity Log Table

```sql
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  action VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  category VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_user_id ON activity_logs(user_id);
CREATE INDEX idx_created_at ON activity_logs(created_at DESC);
```

## 🔐 Authentication

All endpoints require JWT authentication. Add the token to headers:

```typescript
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};
```

The API client in `lib/api-client.ts` already handles this automatically.

## 🚀 Deployment Checklist

- [ ] Backend endpoints implemented and tested
- [ ] Database migrations created
- [ ] JWT authentication working
- [ ] CORS configured properly
- [ ] WebSocket gateway running (optional)
- [ ] Error handling implemented
- [ ] Rate limiting configured
- [ ] Logging set up
- [ ] Tests written
- [ ] Documentation updated

## 🧪 Testing

### Test API Endpoints

```bash
# Get notifications
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3001/api/notifications

# Create alert
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "eventTitle": "Test Event",
    "reminderType": "1_day",
    "reminderTime": "09:00"
  }' \
  http://localhost:3001/api/alerts
```

## 📝 Error Handling

All API calls should handle errors:

```typescript
try {
  const notifications = await notificationsAPI.getNotifications();
  setNotifications(notifications.data);
} catch (error) {
  if (error instanceof APIError) {
    if (error.status === 401) {
      // Redirect to login
    } else if (error.status === 403) {
      // Show permission error
    } else {
      // Show generic error
    }
  }
}
```

## 📚 References

- [NestJS WebSocket Gateway](https://docs.nestjs.com/websockets/gateways)
- [Socket.io Client Documentation](https://socket.io/docs/v4/client-api/)
- [TypeORM Documentation](https://typeorm.io/)
- [JWT Authentication](https://www.npmjs.com/package/@nestjs/jwt)

---

For questions or issues, refer to the main [NOTIFICATIONS_GUIDE.md](./NOTIFICATIONS_GUIDE.md)
