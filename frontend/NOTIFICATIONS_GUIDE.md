# Ignita Notifications & Alerts System

A modern, premium notification and alert management system for the Ignita event platform. Built with glassmorphism, emerald/teal gradients, and smooth animations.

## 📁 File Structure

```
frontend/
├── components/
│   └── notifications/
│       ├── NotificationBell.tsx          # Navbar notification bell with dropdown
│       ├── NotificationCard.tsx          # Individual notification card component
│       ├── CreateAlertModal.tsx          # Modal for creating new alerts
│       ├── ActivityTimeline.tsx          # Activity log timeline view
│       └── EmptyState.tsx                # Empty state UI component
├── app/
│   └── alerts/
│       └── page.tsx                      # Main alerts/notifications dashboard
└── lib/
    └── data/
        └── notifications-data.ts         # Mock data and types
```

## 🎨 Design System

### Colors & Gradients

- **Primary**: Emerald 500 (#10B981)
- **Secondary**: Teal 500 (#14B8A6)
- **Accent**: Cyan 500 (#06B6D4)
- **Background**: Dark (#030708)
- **Glass**: `rgba(15, 23, 42, 0.8)` with blur

### Components

#### NotificationBell

Location: `components/notifications/NotificationBell.tsx`

Features:

- Bell icon in navbar with unread badge counter
- Animated badge with gradient
- Dropdown showing latest 3 notifications
- "View All" and "Manage Alerts" buttons
- Mark all as read functionality
- Smooth animations and hover effects

Usage:

```tsx
import NotificationBell from "@/components/notifications/NotificationBell";

export default function Navbar() {
  return (
    <nav>
      <NotificationBell />
    </nav>
  );
}
```

#### NotificationCard

Location: `components/notifications/NotificationCard.tsx`

Props:

```tsx
interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead?: (id: string) => void;
  onDelete?: (id: string) => void;
}
```

Features:

- Gradient icon background
- Unread indicator glow
- Timestamp with relative time
- Event title reference
- Action buttons (View Event, Mark Read, Dismiss)
- Hover animations and glow effects

Usage:

```tsx
<NotificationCard
  notification={notification}
  onMarkAsRead={handleMarkAsRead}
  onDelete={handleDelete}
/>
```

#### CreateAlertModal

Location: `components/notifications/CreateAlertModal.tsx`

Props:

```tsx
interface CreateAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (alert: AlertData) => void;
}
```

Features:

- Event selection input
- Reminder timing options (1 week, 3 days, 1 day, 3 hours)
- Time picker for preferred reminder time
- Info box with helpful text
- Cancel/Create buttons

Reminder Types:

- 📅 1 Week Before
- 📌 3 Days Before
- ⏳ 1 Day Before
- ⏰ 3 Hours Before

Usage:

```tsx
const [isModalOpen, setIsModalOpen] = useState(false);

return (
  <>
    <button onClick={() => setIsModalOpen(true)}>Create Alert</button>
    <CreateAlertModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSave={handleCreateAlert}
    />
  </>
);
```

#### ActivityTimeline

Location: `components/notifications/ActivityTimeline.tsx`

Props:

```tsx
interface ActivityTimelineProps {
  activities?: ActivityLog[];
}
```

Features:

- Vertical timeline with connecting lines
- Gradient icons by category
- Activity descriptions
- Timestamps
- Category badges
- Hover glow effects
- Load more button

Categories:

- 🔖 Bookmark
- ✅ Registration
- 🔔 Alert
- 📝 Post
- 🎯 Event

Usage:

```tsx
import ActivityTimeline from "@/components/notifications/ActivityTimeline";

export default function Dashboard() {
  return <ActivityTimeline activities={mockActivityLog} />;
}
```

#### EmptyState

Location: `components/notifications/EmptyState.tsx`

Props:

```tsx
interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  variant?: "notifications" | "alerts" | "activity";
}
```

Variants:

- **notifications**: Emerald/Teal gradient
- **alerts**: Cyan/Blue gradient
- **activity**: Purple/Pink gradient

Usage:

```tsx
<EmptyState
  icon="📭"
  title="You're all caught up!"
  description="No notifications at the moment."
  actionText="Explore Events"
  onAction={() => router.push("/events")}
  variant="notifications"
/>
```

### Alerts Page

Location: `app/alerts/page.tsx`

Features:

- 4 tabs: All, Unread, My Alerts, Activity
- Unread count badges
- Mark all as read button
- Create alert button
- Notification list with filtering
- Alert management (toggle active, delete)
- Activity timeline view
- Empty states for each section

Tabs:

1. **All Notifications** - All notifications
2. **Unread** - Only unread notifications
3. **My Alerts** - Alerts user has created
4. **Activity** - User activity log

## 📊 Data Types

```typescript
// Notification
interface Notification {
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

// Alert
interface Alert {
  id: string;
  eventTitle: string;
  reminderType: "1_day" | "3_hours" | "1_week" | "custom";
  reminderTime: string;
  isActive: boolean;
  createdAt: Date;
  nextNotification: Date;
}

// Activity Log
interface ActivityLog {
  id: string;
  action: string;
  description: string;
  icon: string;
  timestamp: Date;
  category: "bookmark" | "registration" | "alert" | "post" | "event";
}
```

## 🎯 Notification Types

### Event Deadline

- 🚀 Icon
- Emerald/Teal gradient
- Urgency: High
- Example: "HackMIT 2026 Deadline Tomorrow"

### Upcoming Event

- 💼 Icon
- Cyan/Blue gradient
- Urgency: Medium
- Example: "Event starts in 3 hours"

### Bookmark Reminder

- ⭐ Icon
- Emerald/Green gradient
- Urgency: Low
- Example: "Bookmarked event starts soon"

### New Opportunity

- 🤖 Icon
- Purple/Pink gradient
- Urgency: Medium
- Example: "New AI event matching your interests"

### Internship Alert

- 🔵 Icon
- Blue/Cyan gradient
- Urgency: High
- Example: "Internship applications closing soon"

### Hackathon Reminder

- 💻 Icon
- Orange/Red gradient
- Urgency: High
- Example: "Your registered hackathon starts"

### AI Event

- 🤖 Icon
- Purple/Pink gradient
- Urgency: Medium
- Example: "Advanced LLM course updated"

## 🎬 Animations

All components use smooth transitions:

- **Duration**: 150-300ms
- **Easing**: ease-out for enter, ease-in for exit
- **Effects**:
  - Fade-in/out
  - Scale transformations
  - Glow animations
  - Slide animations
  - Pulse effects for unread badges

## 📱 Responsive Design

- **Mobile**: Stacked cards, collapsible sections
- **Tablet**: 2-column layout options
- **Desktop**: Full layout with sidebars
- **Touch-friendly**: 44px+ touch targets

## 🚀 Features to Implement

### Currently Implemented

✅ Notification Bell in Navbar
✅ Notification Cards with actions
✅ Create Alert Modal
✅ Alert Management (toggle, delete)
✅ Activity Timeline
✅ Empty States
✅ Responsive Design
✅ Mock Data

### Future Enhancements

- [ ] Backend API integration
- [ ] Real-time notifications (WebSocket)
- [ ] Push notifications
- [ ] Email digests
- [ ] Notification preferences/settings
- [ ] Smart notifications (AI-powered)
- [ ] Notification history
- [ ] Advanced filtering options
- [ ] Notification templates
- [ ] A/B testing for notifications

## 🔗 Integration Points

### Backend Integration

Replace mock data in `lib/data/notifications-data.ts` with API calls:

```typescript
// Fetch notifications
const response = await apiClient.get<Notification[]>("/notifications");

// Create alert
await apiClient.post("/alerts", alertData);

// Mark as read
await apiClient.put(`/notifications/${id}`, { isRead: true });
```

### Routes

- `/alerts` - Main notifications & alerts page
- API endpoints (to be implemented):
  - `GET /api/notifications` - Fetch all notifications
  - `GET /api/notifications/unread` - Fetch unread only
  - `POST /api/alerts` - Create new alert
  - `PUT /api/alerts/:id` - Update alert
  - `DELETE /api/alerts/:id` - Delete alert
  - `GET /api/activity` - Fetch activity log

## 🎨 Customization

### Colors

Edit gradients in component styles:

```tsx
// Example: Change emerald to custom color
from-emerald-600 to-teal-600  // Change these
```

### Icons

Replace emoji icons with custom SVG/components:

```tsx
// Current: {notification.icon} (emoji)
// Replace with: <CustomIcon type={notification.type} />
```

### Animations

Adjust animation durations in classes:

```tsx
// Current: duration-300 (300ms)
// Change to: duration-200 (200ms) for faster
```

## 🧪 Testing

Mock data locations:

- `lib/data/notifications-data.ts` - All mock data and types

To test different states:

1. Modify mock data
2. Change tab in alerts page
3. Test responsive behavior at different breakpoints
4. Test keyboard navigation

## 📝 Code Examples

### Using NotificationBell in Navbar

```tsx
import NotificationBell from "@/components/notifications/NotificationBell";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <Logo />
      <NavLinks />
      <NotificationBell />
      <Profile />
    </nav>
  );
}
```

### Managing Notifications State

```tsx
const [notifications, setNotifications] = useState(mockNotifications);

const handleMarkAsRead = (id: string) => {
  setNotifications((prev) =>
    prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
  );
};

const handleDelete = (id: string) => {
  setNotifications((prev) => prev.filter((n) => n.id !== id));
};
```

### Creating Alerts

```tsx
const [isModalOpen, setIsModalOpen] = useState(false);

const handleCreateAlert = (alertData) => {
  const newAlert = {
    id: `alert-${Date.now()}`,
    ...alertData,
    isActive: true,
    createdAt: new Date(),
  };
  setAlerts((prev) => [newAlert, ...prev]);
  setIsModalOpen(false);
};
```

## 🎯 Performance Tips

1. Memoize notification list items:

   ```tsx
   const NotificationItem = memo(({ notification }) => ...)
   ```

2. Use virtual scrolling for long lists:

   ```tsx
   import { FixedSizeList } from "react-window";
   ```

3. Debounce search input in create alert modal

4. Lazy load activity timeline images/avatars

## 🔒 Security Considerations

- Validate notification data on backend
- Sanitize user-generated content in notifications
- Check user permissions before showing notifications
- Rate limit notification creation
- Validate alert times and frequencies
- Use CSRF tokens for API calls

## 📚 References

- Design Inspiration: Linear, Discord, GitHub, Notion, Raycast, Vercel
- Icons: Emoji (can be replaced with custom SVG)
- Animations: CSS transitions + Tailwind
- Styling: Tailwind CSS with custom glassmorphism utilities

## ✨ Color Palette Reference

```
Emerald: #10B981 (50-950)
Teal: #14B8A6 (50-950)
Cyan: #06B6D4 (50-950)
Purple: #A855F7 (50-950)
Pink: #EC4899 (50-950)
Orange: #F97316 (50-950)
Red: #EF4444 (50-950)
Blue: #3B82F6 (50-950)
```

## 🆘 Troubleshooting

### Notification Bell Not Showing

- Check NavBar import of NotificationBell
- Verify component exists in `components/notifications/`
- Check for console errors

### Dropdown Not Closing

- Ensure ref is properly attached to container
- Check z-index conflicts

### Animations Not Working

- Verify Tailwind CSS is loaded
- Check for conflicting CSS
- Enable animations in Tailwind config

---

Built with ❤️ for Ignita | Dark Futuristic UI | Emerald & Teal Theme
