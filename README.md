# IGNITA 🚀

**IGNITA** is a modern event discovery and career growth platform designed for students, developers, and tech enthusiasts. It helps users discover hackathons, internships, coding contests, workshops, and other opportunities while providing personalized tracking, analytics, alerts, bookmarks, and LinkedIn post generation.


## 🌟 Features

### 🔐 Authentication & Authorization

* JWT-based Authentication
* Google OAuth Login
* Role-Based Access Control (RBAC)

  * User
  * Admin
* Protected Routes
* Secure Password Hashing using bcrypt

### 🎯 Event Management

* Browse upcoming events
* Search and filter events
* View detailed event information
* Bookmark favorite events
* Admin-only event creation
* Event categorization

### 📌 Bookmark System

* Save events for later
* Personalized bookmark dashboard
* Bookmark analytics

### 🔔 Smart Alerts & Notifications

* Create custom event alerts
* Event deadline reminders
* Notification center
* Read/Unread notification tracking

### 📊 Analytics Dashboard

* Activity Heatmap
* Monthly Activity Trends
* Event Category Insights
* Productivity Metrics
* User Engagement Tracking
* Growth Analytics

### ✍️ LinkedIn Post Generator

Generate professional LinkedIn posts for:

* Hackathon participation
* Internship achievements
* Competition results
* Workshops and certifications
* Personal milestones

### 👤 User Profile

* Profile Management
* Personal Dashboard
* Activity Tracking
* Saved Opportunities

### 🛠 Admin Dashboard

* Platform Overview
* User Management
* Event Management
* Analytics Monitoring
* Alert Management

---

## 🏗 Tech Stack

### Frontend

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* ShadCN UI
* HugeIcons
* Recharts
* Google OAuth

### Backend

* NestJS
* TypeScript
* TypeORM
* PostgreSQL
* JWT Authentication
* Google OAuth Verification
* bcrypt

### Database

* PostgreSQL

### Deployment (Planned)

* Frontend: Vercel
* Backend: Railway / VPS
* Database: PostgreSQL

---

## 📂 Project Structure

```bash
IGNITA/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   └── public/
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── events/
│   │   ├── bookmark/
│   │   ├── alerts/
│   │   ├── notification/
│   │   ├── analytics/
│   │   ├── linkedin-post/
│   │   └── user/
│   │
│   └── database/
│
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/ignita.git
cd ignita
```

---

### 2️⃣ Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=3001

DATABASE_URL=postgresql://username:password@localhost:5432/ignita

JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

JWT_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

GOOGLE_CLIENT_ID=your_google_client_id
```

Run backend:

```bash
npm run start:dev
```

Backend:

```bash
http://localhost:3001
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend

npm install
```

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

Run frontend:

```bash
npm run dev
```

Frontend:

```bash
http://localhost:3000
```

---

## 🔑 User Roles

### User

* Browse Events
* Bookmark Events
* Create Alerts
* View Analytics
* Generate LinkedIn Posts

### Admin

* Create Events
* Manage Events
* Access Admin Dashboard
* Manage Users
* View Platform Analytics

---

## 📸 Screenshots

### Landing Page

*Add screenshot here*

### Dashboard

*Add screenshot here*

### Analytics

*Add screenshot here*

### Admin Dashboard

*Add screenshot here*

### Event Page

*Add screenshot here*

---

## 🛣 Roadmap

### Current Version

* [x] JWT Authentication
* [x] Google Login
* [x] Event Discovery
* [x] Bookmarks
* [x] Alerts
* [x] Notifications
* [x] Analytics Dashboard
* [x] Admin Dashboard
* [x] LinkedIn Post Generator

### Upcoming Features

* [ ] GitHub Login
* [ ] LinkedIn Login
* [ ] Password Recovery via Email
* [ ] Team Finder
* [ ] Community Features
* [ ] Resume Verification System
* [ ] Event Recommendations using AI
* [ ] User Achievement System
* [ ] Resume Builder
* [ ] Opportunity Matching Engine

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Sneha Pal**

Built with ❤️ using **Next.js, NestJS, PostgreSQL, and TypeScript**.

---

### IGNITA Tagline

> Discover opportunities. Track growth. Showcase your journey. 🚀
