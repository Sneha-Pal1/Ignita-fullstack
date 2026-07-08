# 🚀 Ignita

Ignita is a full-stack platform that helps students discover, track, and manage opportunities such as hackathons, internships, coding contests, workshops, scholarships, and tech events — all in one place.

Built with a modern microservice-inspired architecture, Ignita provides personalized event discovery, bookmarking, notifications, analytics, and authentication for students looking to accelerate their tech journey.

---

## ✨ Features

### 🎯 Event Discovery

* Browse hackathons, internships, coding contests, and workshops.
* Search and filter opportunities by category.
* View detailed event information including deadlines, eligibility, and registration links.

### 🔖 Bookmark Events

* Save opportunities for later.
* Maintain a personalized collection of events.

### 🔐 Authentication & Authorization

* JWT-based authentication.
* Secure login and registration.
* Role-based access control.

### 🔔 Notifications

* Stay updated with upcoming deadlines and opportunities.
* Personalized alerts and reminders.

### 📊 Analytics Dashboard

* Track user engagement.
* Monitor event interactions and trends.

### 👨‍💼 Admin Controls

* Create and manage events.
* Update event information.
* Monitor platform activity.

---

## 🏗️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Shadcn UI

### Backend

* NestJS
* TypeORM
* PostgreSQL
* JWT Authentication

### DevOps & Deployment

* Docker
* Docker Compose
* Vercel
* Render

---

## 📂 Project Structure

```bash
Ignita/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── public/
│
├── Backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── events/
│   │   ├── notifications/
│   │   ├── analytics/
│   │   └── users/
│   ├── Dockerfile.dev
│   └── Dockerfile.prod
│
├── docker-compose.dev.yml
├── docker-compose.prod.yml
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js 22+
* PostgreSQL
* Docker (Optional)

### Clone Repository

```bash
git clone https://github.com/yourusername/ignita.git
cd ignita
```

### Backend Setup

```bash
cd Backend

npm install

npm run start:dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🐳 Docker Setup

Run the entire application locally:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Frontend:

```bash
http://localhost:3000
```

Backend:

```bash
http://localhost:3001
```

---

## 🔒 Environment Variables

Create environment files:

```env
DATABASE_URL=
JWT_SECRET=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Never commit `.env` files to GitHub.

---

## 📈 Future Improvements

* AI-powered opportunity recommendations
* Smart deadline reminders
* LinkedIn post generator
* Resume-based opportunity matching
* Event registration tracking
* Community discussions

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit a pull request.

---

### Built with ❤️ for students, developers, and future innovators.

