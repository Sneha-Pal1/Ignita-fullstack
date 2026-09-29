# Ignita

A full-stack platform that centralises opportunity discovery for students and software engineers. Ignita aggregates hackathons, internships, coding contests, and workshops from public APIs into a single searchable index, with bookmark tracking, deadline alerts, notifications, and an admin-managed event pipeline.

**Production:** [ignita.in](https://ignita.in) &nbsp;|&nbsp; **API:** [api.ignita.in](https://api.ignita.in) &nbsp;|&nbsp; **Repository:** [github.com/Sneha-Pal1/Ignita-fullstack](https://github.com/Sneha-Pal1/Ignita-fullstack)

---

## Overview

| | |
|---|---|
| **Frontend** | Next.js + TypeScript, deployed on Vercel |
| **Backend** | NestJS + TypeScript, containerised and deployed on AWS ECS Fargate |
| **Database** | Amazon RDS PostgreSQL, accessed via TypeORM |
| **Media** | Amazon S3 (private) served through Amazon CloudFront CDN |
| **Auth** | JWT (access + refresh tokens), Google OAuth 2.0, bcrypt, RBAC |

---

## Architecture

### System Architecture

![Ignita System Architecture](docs/architecture.jpg)

The diagram above shows the full production architecture:
- **Client** requests hit Vercel (frontend) or `api.ignita.in` (API).
- The ALB terminates HTTPS (ACM), performs health checks, and forwards to ECS Fargate.
- The NestJS container connects outward to RDS, S3 (media upload), Secrets Manager, and CloudWatch.
- S3 media is served exclusively through CloudFront — the bucket is not publicly accessible.
- Secrets Manager injects environment secrets into the ECS task at runtime.
- ECR is the source registry for ECS task definitions.

### Deployment Pipeline

```mermaid
flowchart LR
    GH["GitHub"] --> DB["Docker Build"]
    DB --> ECR["Amazon ECR"]
    ECR --> TD["ECS Task\nDefinition"]
    TD --> ECS["ECS Fargate\nService"]
    ECS --> ALB["Application\nLoad Balancer"]
```

### Media Flow

```
Admin upload → NestJS → S3 (private)
                              ↓
                     key stored in RDS
                              ↓
              EventsService resolves key → CloudFront URL
                              ↓
                         Browser / User
```

---

## Core Features

**Opportunity Discovery**
- Aggregates hackathons, internships, coding contests, workshops, and jobs from public APIs via a background sync service (`EventSyncService`) that runs on startup and refreshes every 6 hours.
- Deduplication by `registrationLink` prevents duplicate records.
- Full-text search and category/mode filtering on the events feed.

**User Features**
- Bookmark events and view a saved collection.
- Receive deadline alerts and in-app notifications.
- Participation analytics dashboard.
- LinkedIn post generator utility for sharing event milestones.
- Google OAuth sign-in and email/password authentication.
- Password reset via secure single-use tokenised email link.

**Admin Features**
- Create, edit, and delete events with optional banner image upload (stored in S3, served via CloudFront).
- Admin dashboard with overview statistics, user management, and alert review.
- Manual event sync trigger via `POST /events/sync`.
- Role-based access control enforced on all write routes.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend framework | Next.js 15 (App Router, Server + Client Components) |
| Frontend styling | Tailwind CSS, Lucide icons |
| Backend framework | NestJS |
| Language | TypeScript (frontend and backend) |
| ORM | TypeORM |
| Database | PostgreSQL (Amazon RDS in production) |
| Authentication | Passport JWT, bcrypt, Google OAuth 2.0 |
| Media storage | Amazon S3 + CloudFront CDN |
| Containerisation | Docker (multi-stage build), Docker Compose |
| Container registry | Amazon ECR |
| Container runtime | Amazon ECS Fargate |
| Load balancing | AWS Application Load Balancer |
| TLS | AWS ACM |
| Secrets | AWS Secrets Manager |
| Logging | Amazon CloudWatch |
| Frontend deployment | Vercel |

---

## Authentication and Authorisation

The backend uses a dual-token JWT strategy:

- **Access token** — short-lived, signed with `JWT_SECRET`, carries `{ sub, role }` payload used by `JwtAuthGuard` and `RolesGuard`.
- **Refresh token** — long-lived, signed with `JWT_REFRESH_SECRET`, used by `POST /auth/refresh` to issue new access tokens without re-login.
- **Google OAuth** — `POST /auth/google` accepts a Google ID token, finds or provisions a user record, and returns the same token pair.
- **Password reset** — a SHA-256 hashed one-time token is stored in `password_reset_tokens`, emailed as a raw link, and invalidated on use or expiry (15 minutes).

Two roles exist: `USER` (default) and `ADMIN`. Admin accounts are created either by direct database promotion or via `POST /auth/admin/register` (requires an existing admin JWT).

---

## Backend Module Reference

| Module | Path | Responsibility |
|---|---|---|
| `AuthModule` | `src/auth` | Registration, login, Google OAuth, JWT strategy, password reset, token refresh |
| `UserModule` | `src/user` | User profile read and update |
| `EventsModule` | `src/events` | Event CRUD, banner upload to S3, `EventSyncService` background ingestion |
| `AdminModule` | `src/admin` | Admin-scoped event and user management endpoints, analytics aggregation |
| `BookmarkModule` | `src/bookmark` | Create and remove user-event bookmark relationships |
| `AlertsModule` | `src/alerts` | Create and query deadline alert records |
| `NotificationModule` | `src/notification` | In-app notification delivery and read-state management |
| `AnalyticsModule` | `src/analytics` | Aggregated usage statistics for the client dashboard |
| `LinkedinPostModule` | `src/linkedin-post` | Generate formatted LinkedIn announcement text from event data |
| `StorageModule` | `src/storage` | AWS S3 file upload (`PutObject`) and delete (`DeleteObject`) via AWS SDK v3 |
| `HealthModule` | `src/health` | `GET /health` — public endpoint used as ALB health check target |

---

## Database Schema

```mermaid
erDiagram
    USERS ||--o{ BOOKMARKS : creates
    USERS ||--o{ ALERTS : receives
    USERS ||--o{ EVENTS : creates
    USERS ||--o{ PASSWORD_RESET_TOKENS : requests
    EVENTS ||--o{ BOOKMARKS : referenced_in
    EVENTS ||--o{ ALERTS : triggers

    USERS {
        uuid id PK
        string name
        string email UK
        string phone
        string password
        enum role "USER | ADMIN"
        timestamp createdAt
        timestamp updatedAt
    }

    EVENTS {
        uuid id PK
        string title
        text description
        enum category "HACKATHON | INTERNSHIP | CODING_FEST | WORKSHOP"
        enum mode "ONLINE | OFFLINE | HYBRID"
        string organizer
        string location
        string registrationLink UK
        timestamp startDate
        timestamp endDate
        timestamp deadline
        string bannerImage
        json tags
        uuid createdById FK
        timestamp createdAt
        timestamp updatedAt
    }

    BOOKMARKS {
        uuid id PK
        uuid userId FK
        uuid eventId FK
        timestamp createdAt
    }

    ALERTS {
        uuid id PK
        uuid userId FK
        string message
        boolean isRead
        timestamp createdAt
    }

    PASSWORD_RESET_TOKENS {
        uuid id PK
        string tokenHash
        uuid userId FK
        timestamp expiresAt
        timestamp createdAt
    }
```

`bannerImage` stores the raw S3 object key (e.g. `events/uuid.jpg`). The `EventsService.resolveImageUrl()` method converts it to a CloudFront URL on every read. External URLs from the sync pipeline pass through unchanged.

---

## S3 and CloudFront Media

The S3 bucket (`ignita-2026`, region `ap-south-1`) is fully private — Block Public Access is enabled, ACLs are disabled, and SSE-S3 encryption is on. The backend IAM user holds a minimal policy (`IgnitaS3Access`) restricted to the bucket.

CloudFront serves as the only public access path to S3 objects via Origin Access Control (OAC). The `AWS_CLOUDFRONT_URL` environment variable is read once at `EventsService` startup and prepended to S3 keys when returning event responses.

---

## AWS Infrastructure

| Service | Role |
|---|---|
| ECS Fargate | Serverless container runtime for the NestJS backend |
| Application Load Balancer | HTTPS termination, health check routing, ECS target group |
| Amazon ECR | Private Docker image registry; images are pulled by ECS task definitions |
| Amazon RDS PostgreSQL | Managed relational database; `synchronize: false`, migrations run manually |
| Amazon S3 | Private object storage for event banner images |
| Amazon CloudFront | CDN distribution serving S3 media without exposing bucket URLs |
| AWS Secrets Manager | Stores production secrets injected into ECS task environment at runtime |
| AWS ACM | TLS certificates for `api.ignita.in` attached to the ALB |
| AWS IAM | Scoped roles and policies for ECS task execution and S3 access |
| Amazon CloudWatch | Container log group for ECS task stdout/stderr |

DNS resolution: `ignita.in` → Vercel, `api.ignita.in` → ALB. The ECS security group accepts inbound traffic from the ALB security group only; the containers are not publicly reachable.

---

## Docker and Deployment

### Image Build (multi-stage)

`Dockerfile.prod` uses a two-stage build:

1. **Build stage** (`node:22-slim`) — installs all dependencies via pnpm, runs `pnpm run build` to compile TypeScript to `dist/`.
2. **Production stage** (`node:22-slim`) — installs production-only dependencies, copies `dist/`, exposes port `3001`, and runs `node dist/main`.

### Local Development with Docker Compose

`docker-compose.dev.yml` defines three services: a PostgreSQL container, the NestJS backend (with volume-mounted source for hot reload), and the Next.js frontend.

```bash
docker compose -f docker-compose.dev.yml up --build
```

Backend: `http://localhost:3001` &nbsp;|&nbsp; Frontend: `http://localhost:3000`

### Production Deployment to ECS

1. Build and tag the Docker image.
2. Push to Amazon ECR.
3. Update the ECS task definition with the new image URI.
4. Deploy the updated service; ECS performs a rolling replacement.
5. The ALB health check (`GET /health`) determines when new tasks are healthy before draining old ones.

---

## Health Check

```
GET /health
```

Returns HTTP 200 with no authentication required:

```json
{
  "status": "ok",
  "service": "ignita-backend"
}
```

This endpoint is the configured health check path on the ALB target group. ECS tasks that fail this check are replaced automatically.

---

## Project Structure

```
Ignita/
├── frontend/
│   ├── app/
│   │   ├── login/                      # Email/password login
│   │   ├── register/                   # User registration
│   │   ├── forgot-password/            # Password reset request
│   │   ├── reset-password/             # Password reset confirmation
│   │   ├── Dashboard/                  # Authenticated user home
│   │   ├── events/                     # Event discovery and detail views
│   │   ├── create/                     # Admin event create / edit form
│   │   ├── Bookmarks/                  # Saved events
│   │   ├── alerts/                     # Deadline alerts
│   │   ├── Notification/               # In-app notifications
│   │   ├── analytics/                  # Usage statistics
│   │   ├── linkedin-post-generator/    # Post copy generator
│   │   ├── profile/                    # User profile settings
│   │   └── admin/                      # Admin management portal
│   ├── components/                     # Shared UI components
│   └── lib/                            # API client, auth context, hooks
│
├── Backend/
│   ├── src/
│   │   ├── auth/                       # Auth controllers, strategies, guards, DTOs
│   │   ├── user/                       # User profile module
│   │   ├── events/                     # Events CRUD, sync service, entities
│   │   ├── admin/                      # Admin-scoped handlers
│   │   ├── bookmark/                   # Bookmark module
│   │   ├── alerts/                     # Alerts module
│   │   ├── notification/               # Notification module
│   │   ├── analytics/                  # Analytics module
│   │   ├── linkedin-post/              # Post generation module
│   │   ├── storage/                    # S3 upload/delete service
│   │   ├── health/                     # Health check endpoint
│   │   ├── migrations/                 # TypeORM migration files
│   │   ├── app.module.ts               # Root module
│   │   └── main.ts                     # Bootstrap, CORS, ValidationPipe
│   ├── Dockerfile.dev
│   └── Dockerfile.prod
│
├── docs/
│   └── architecture.jpg                # System architecture diagram
├── docker-compose.dev.yml
├── docker-compose.prod.yml
└── README.md
```

---

## Local Development Setup

### Prerequisites

- Node.js 22+
- pnpm
- PostgreSQL (or Docker)

### Without Docker

```bash
# Backend
cd Backend
pnpm install
pnpm run start:dev
# API available at http://localhost:3001

# Frontend (separate terminal)
cd frontend
npm install
npm run dev
# Client available at http://localhost:3000
```

### With Docker Compose

```bash
docker compose -f docker-compose.dev.yml up --build
```

---

## Environment Variables

### Backend (`Backend/.env.development`)

```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ignita_db

JWT_SECRET=
JWT_EXPIRY=15m
JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRY=7d

FRONTEND_URL=http://localhost:3000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET_NAME=ignita-2026
AWS_CLOUDFRONT_URL=https://d1dzmn8cgl7n9m.cloudfront.net
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
```

In production, secrets are injected into ECS tasks from AWS Secrets Manager rather than committed `.env` files.

---

## Database Migrations

TypeORM `synchronize` is disabled in all environments. Schema changes are managed through migration files in `src/migrations/`.

```bash
# Generate a migration (after modifying entities)
cd Backend
pnpm run migration:generate -- src/migrations/MigrationName

# Run pending migrations
pnpm run migration:run

# Revert the last migration
pnpm run migration:revert
```

---

## Production Deployment

### Steps

1. Build and push the Docker image to ECR:
   ```bash
   aws ecr get-login-password --region ap-south-1 | \
     docker login --username AWS --password-stdin <account_id>.dkr.ecr.ap-south-1.amazonaws.com

   docker build -f Backend/Dockerfile.prod -t ignita-backend ./Backend

   docker tag ignita-backend:latest \
     <account_id>.dkr.ecr.ap-south-1.amazonaws.com/ignita-backend:latest

   docker push <account_id>.dkr.ecr.ap-south-1.amazonaws.com/ignita-backend:latest
   ```

2. Update the ECS task definition to reference the new image URI.

3. Deploy the updated ECS service:
   ```bash
   aws ecs update-service \
     --cluster ignita-cluster \
     --service ignita-backend-service \
     --force-new-deployment
   ```

4. ECS performs a rolling update. The ALB health check (`GET /health`) gates traffic to new tasks.

### Frontend

The frontend is deployed via Vercel. Push to the connected branch triggers an automatic build and deployment. `NEXT_PUBLIC_API_URL=https://api.ignita.in` is set in Vercel project environment variables.

---

## Current Production Setup

| Component | Details |
|---|---|
| Frontend URL | https://ignita.in |
| API URL | https://api.ignita.in |
| Health check | https://api.ignita.in/health |
| Frontend host | Vercel |
| Backend host | AWS ECS Fargate (ap-south-1) |
| Database | Amazon RDS PostgreSQL (ap-south-1) |
| Media | S3 bucket `ignita-2026` via CloudFront |
| TLS | AWS ACM on ALB |
| Secrets | AWS Secrets Manager → ECS task environment |
| Logs | Amazon CloudWatch (ECS log group) |

---

## Future Improvements

- Automated CI/CD pipeline (GitHub Actions → ECR → ECS deployment)
- TypeORM migration execution as an ECS task pre-hook
- Redis-backed caching for the events feed
- Rate limiting on public and auth endpoints
- Structured JSON logging with correlation IDs
- End-to-end and integration test suite

---

## Author

**Sneha Pal**
[github.com/Sneha-Pal1](https://github.com/Sneha-Pal1)
