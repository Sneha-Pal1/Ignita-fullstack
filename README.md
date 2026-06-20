# Ignita

Ignita is a modern, high-performance platform designed to help developers **discover, track, and showcase their tech journey**. It provides a centralized hub for hackathons, internships, coding contests, and tech opportunities.

Live Production URL: [https://ignita.in](https://ignita.in)

---

## 🚀 Tech Stack

### Frontend

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Component Library**: shadcn/ui, Radix UI

### Backend

- **Framework**: NestJS (Node.js)
- **Database ORM**: TypeORM
- **Database**: PostgreSQL (Supabase in Production)
- **Security**: JWT tokens, bcrypt password hashing, Google OAuth
- **Emails**: Nodemailer (Gmail SMTP)

---

## 📁 Repository Structure

```text
├── Backend/                # NestJS Backend API code
│   ├── src/                # Source code (auth, events, bookmarks, analytics, etc.)
│   ├── Dockerfile.dev      # Development Docker configuration
│   └── Dockerfile.prod     # Production Docker configuration
├── frontend/               # Next.js Frontend code
│   ├── app/                # App router pages (dashboard, login, events, etc.)
│   ├── components/         # Reusable UI components
│   ├── Dockerfile.dev      # Development Docker configuration
│   └── Dockerfile.prod     # Production Docker configuration
├── docker-compose.dev.yml  # Docker Compose for local development
├── docker-compose.prod.yml # Docker Compose for production containers
└── README.md               # Project documentation
```

---

## 🛠️ Local Development Setup

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v22 or higher)
- **pnpm** (for Backend package management)
- **npm** (for Frontend package management)
- **Docker** & **Docker Compose**

### Step-by-Step Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Sneha-Pal1/Ignita-fullstack.git
   cd Ignita-fullstack
   ```

2. **Configure Environment Variables**:
   - Create a root `.env` file for your local database credentials:
     ```env
     POSTGRES_USER=postgres
     POSTGRES_PASSWORD=sneha
     POSTGRES_DB=postgres
     ```
   - Create `/Backend/.env.development` (copy the template) and add your development JWT secrets and Google OAuth credentials.
   - Create `/frontend/.env.development` and set:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:3001
     NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
     ```

3. **Start the Development Environment (Docker Compose)**:
   In the root directory, run:

   ```bash
   docker compose -f docker-compose.dev.yml up --build
   ```

   This will spin up:
   - PostgreSQL database container on port `5432`
   - NestJS API container on port `3001`
   - Next.js Frontend container on port `3000`

4. **Verify Locally**:
   - Access the Web application: `http://localhost:3000`
   - Access the Backend health: `http://localhost:3001`

---

## 🚢 Production Deployment

Ignita is optimized for cloud deployment using separated modern services:

1. **Database**: Hosted on **Supabase** (Serverless PostgreSQL) using the **Supavisor Connection Pooler** (IPv4 compatible) to allow secure connections from IPv4-only hosting environments.
2. **Backend**: Containerized and deployed on **Render** (or Koyeb) using `Dockerfile.prod`. On startup, TypeORM automatically synchronizes the database schema.
3. **Frontend**: Hosted on **Vercel** with Next.js **standalone output** enabled to minimize container footprint and compile assets at build time.

---

## ✨ Features

- **Event Tracker**: Discover, filter, and bookmark tech events, hackathons, and internships.
- **Dynamic Dashboard**: View personalized statistics, upcoming deadlines, and event metrics.
- **Secure Authentication**: Traditional credentials (email/password), password strength meter, secure password recovery system (Gmail SMTP), and Google OAuth sign-in.
- **Admin Panel**: Manage user roles, create/update/delete events, and view system logs.
- **LinkedIn Generator**: AI-assisted post generator to help developers share their event updates directly on social media.
