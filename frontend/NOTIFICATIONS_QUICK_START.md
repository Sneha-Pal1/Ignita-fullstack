# Notifications & Alerts System - Quick Start Guide

Welcome! This guide will get you up and running with the Ignita Notifications & Alerts System in minutes.

## 🚀 Getting Started (5 Minutes)

### 1. System Already Integrated ✅

The notification system is **already installed and working** with mock data!

- ✅ Notification Bell in Navbar
- ✅ Alerts Page at `/alerts`
- ✅ Mock data pre-loaded
- ✅ All animations and styling applied

### 2. View the System

1. **Start your frontend:**

   ```bash
   cd frontend
   npm run dev
   # or
   pnpm dev
   ```

2. **Navigate to see the notification bell:**
   - Log in first
   - Check the navbar - you'll see the notification bell 🔔
   - Click it to see the dropdown

3. **View full alerts page:**
   - Go to: `http://localhost:3000/alerts`
   - See all notifications, alerts, and activity

## 📂 File Structure

```
frontend/
├── components/notifications/
│   ├── NotificationBell.tsx          ← Navbar bell (dropdown)
│   ├── NotificationCard.tsx          ← Individual notification
│   ├── CreateAlertModal.tsx          ← Create alert dialog
│   ├── ActivityTimeline.tsx          ← Activity feed
│   └── EmptyState.tsx                ← No data state
├── app/
│   └── alerts/page.tsx               ← Main alerts dashboard
├── lib/
│   ├── data/notifications-data.ts    ← Mock data & types
│   ├── notifications-utils.ts        ← Helper functions
│   └── api/notifications-api.ts      ← API calls (create this)
└── styles/notifications.css          ← CSS utilities
```

## 💡 Key Components

### NotificationBell (Navbar)

**Location:** `components/notifications/NotificationBell.tsx`

Shows in navbar when logged in. Click to see dropdown.

```tsx
<NotificationBell />
```

### Alerts Page

**Location:** `app/alerts/page.tsx`

Full dashboard with 4 tabs:

- All Notifications
- Unread
- My Alerts
- Activity

Visit: `http://localhost:3000/alerts`

## 🎨 Design Highlights

- **Dark Theme:** Black background with emerald accents
- **Glassmorphism:** Frosted glass effect with blur
- **Gradients:** Emerald/Teal, Cyan/Blue, Purple/Pink
- **Animations:** Smooth transitions and hover effects
- **Responsive:** Works on mobile, tablet, desktop

## 🔄 Next Steps: Connect Backend

### Step 1: Create API Service

Create `lib/api/notifications-api.ts`:

```typescript
import { apiClient } from "@/lib/api-client";

export const notificationsAPI = {
  getNotifications: () => apiClient.get("/notifications"),

  markAsRead: (id: string) =>
    apiClient.put(`/notifications/${id}`, { isRead: true }),

  createAlert: (data) => apiClient.post("/alerts", data),

  getAlerts: () => apiClient.get("/alerts"),

  deleteAlert: (id: string) => apiClient.delete(`/alerts/${id}`),
};
```

### Step 2: Update Alerts Page

Replace mock data in `app/alerts/page.tsx`:

```typescript
import { notificationsAPI } from "@/lib/api/notifications-api";

export default function AlertsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await notificationsAPI.getNotifications();
      setNotifications(data);
    };
    loadData();
  }, []);

  // ... rest of component
}
```

### Step 3: Backend Endpoints

Create these in your NestJS backend:

```
GET    /api/notifications
GET    /api/notifications/unread
PUT    /api/notifications/:id
DELETE /api/notifications/:id
POST   /api/alerts
GET    /api/alerts
DELETE /api/alerts/:id
GET    /api/activity
```

See `NOTIFICATIONS_BACKEND_INTEGRATION.md` for full details.

## 🎯 Common Tasks

### Show Notification

```typescript
import { mockNotifications } from "@/lib/data/notifications-data";
const [notifs, setNotifs] = useState(mockNotifications);
```

### Mark as Read

```typescript
const handleMarkAsRead = (id: string) => {
  setNotifications((prev) =>
    prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
  );
};
```

### Create Alert

```typescript
const handleCreateAlert = async (alert) => {
  const newAlert = await notificationsAPI.createAlert(alert);
  setAlerts((prev) => [newAlert, ...prev]);
};
```

### Filter by Type

```typescript
import { getNotificationsByType } from "@/lib/notifications-utils";

const deadlineNotifs = getNotificationsByType(notifications, "event_deadline");
```

## 🧪 Test the UI

### With Mock Data (Current)

1. Go to `/alerts`
2. Click tabs to filter
3. Hover cards to see actions
4. Click "Create Alert" button
5. Try "Mark all as read"

### Colors & Types

Each notification has a color and icon:

- 🚀 Event Deadline → Emerald
- 💼 Upcoming Event → Cyan
- ⭐ Bookmark → Emerald
- 🤖 New Opportunity → Purple
- 🔵 Internship → Blue
- 💻 Hackathon → Orange
- 📅 Custom → Various

## 📱 Responsive Testing

The UI is fully responsive:

- **Desktop:** Full layout
- **Tablet:** 2-column layout
- **Mobile:** Single column, stacked

Test by:

1. DevTools → Device Toolbar
2. Resize browser window
3. Check touch targets (44px minimum)

## 🎬 Animations

- Fade in/out
- Scale transforms
- Glow effects
- Pulse animations
- Smooth transitions (150-300ms)

All use CSS, no heavy libraries needed.

## 📊 Data Structure

### Notification

```typescript
{
  id: string;
  type: "event_deadline" | "upcoming_event" | ... ;
  title: string;
  message: string;
  eventTitle?: string;
  timestamp: Date;
  isRead: boolean;
  icon: string;
  color: string;
  actionUrl?: string;
}
```

### Alert

```typescript
{
  id: string;
  eventTitle: string;
  reminderType: "1_day" | "3_hours" | ... ;
  reminderTime: string;
  isActive: boolean;
  createdAt: Date;
  nextNotification: Date;
}
```

### ActivityLog

```typescript
{
  id: string;
  action: string;
  description: string;
  icon: string;
  timestamp: Date;
  category: "bookmark" | "registration" | ... ;
}
```

## 🔧 Customization

### Change Colors

Edit gradient classes:

```css
/* from-emerald-600 to-teal-600 */
```

### Change Icons

Replace emoji with SVG:

```tsx
{notification.icon} → <CustomIcon type={notification.type} />
```

### Change Animation Speed

```tsx
duration-300 → duration-200 (faster)
duration-300 → duration-500 (slower)
```

### Add More Notification Types

1. Update `Notification["type"]` enum
2. Add in `getNotificationIcon()`
3. Add in `getNotificationColor()`

## 🚀 Performance Tips

1. **Memoize components:**

   ```tsx
   const NotificationCard = memo(({ notification }) => ...);
   ```

2. **Virtual scroll for long lists:**

   ```tsx
   import { FixedSizeList } from "react-window";
   ```

3. **Debounce search:**

   ```tsx
   const [query, setQuery] = useState("");
   const debouncedQuery = useDebounce(query, 300);
   ```

4. **Lazy load images:**
   ```tsx
   <img loading="lazy" src={...} />
   ```

## 🐛 Debugging

### Check Mock Data

```typescript
// In browser console
import { mockNotifications } from "@/lib/data/notifications-data";
console.log(mockNotifications);
```

### Check State

Add in component:

```tsx
useEffect(() => {
  console.log("Current notifications:", notifications);
}, [notifications]);
```

### Check Network

- DevTools → Network tab
- Look for API calls when connected to backend

## 📚 Documentation Files

- **NOTIFICATIONS_GUIDE.md** - Complete reference
- **NOTIFICATIONS_BACKEND_INTEGRATION.md** - Backend setup
- **notifications-utils.ts** - Helper functions
- **notifications.css** - Styling utilities

## ❓ FAQ

**Q: Where's the notification bell?**
A: In the navbar, next to your profile. Only shows when logged in.

**Q: How do I change the mock data?**
A: Edit `lib/data/notifications-data.ts`

**Q: How do I connect to real backend?**
A: See "Next Steps: Connect Backend" above and NOTIFICATIONS_BACKEND_INTEGRATION.md

**Q: Can I customize the colors?**
A: Yes! Edit the gradient classes in components.

**Q: Is it mobile responsive?**
A: Yes! Fully responsive from 320px to 2560px.

**Q: How do animations work?**
A: CSS transitions via Tailwind. See `notifications.css`.

**Q: Can I add more notification types?**
A: Yes! Update `Notification["type"]` enum and helper functions.

## 🎓 Learning Path

1. **Explore** - Visit `/alerts` and play with the UI
2. **Read** - Check NOTIFICATIONS_GUIDE.md
3. **Modify** - Change mock data in notifications-data.ts
4. **Connect** - Follow NOTIFICATIONS_BACKEND_INTEGRATION.md
5. **Deploy** - Push to production

## 🆘 Getting Help

### Check These First

1. Console errors (`DevTools → Console`)
2. Network errors (`DevTools → Network`)
3. Component props are correct
4. Mock data is imported properly

### Common Issues

**Notification Bell Not Showing:**

- Make sure you're logged in
- Check NavBar imports NotificationBell

**Dropdown Not Closing:**

- Clear browser cache
- Check z-index in globals.css

**Styles Look Wrong:**

- Run `npm run dev` to rebuild
- Clear Next.js cache: `rm -rf .next`

## 📞 Support

Refer to documentation or check:

- NOTIFICATIONS_GUIDE.md
- NOTIFICATIONS_BACKEND_INTEGRATION.md
- notifications-utils.ts comments

---

## 🎉 You're All Set!

The Notifications & Alerts System is ready to use.

**Next:** Go to `http://localhost:3000/alerts` and explore!

Happy coding! 🚀
