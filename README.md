# Ignita

Ignita is a full-stack, decoupled platform designed to centralize and automate opportunity discovery, deadline tracking, and participation analytics for students and software engineers. The platform unifies distributed listings for hackathons, engineering internships, competitive programming contests, and technical conferences into a single searchable index with automated alerting and role-based administrative workflows.

---

## Architecture Overview

The system is implemented as a decoupled client-server architecture. The presentation tier utilizes Next.js with React Server and Client Components, while the core business domain is managed by a modular NestJS application serving structured REST APIs over PostgreSQL managed via TypeORM.

```mermaid
flowchart TB
    %% Styling Definitions - Eraser.io Style Clean Minimalist Theme
    classDef clientStyle fill:#1e293b,stroke:#475569,stroke-width:1.5px,color:#f8fafc;
    classDef edgeStyle fill:#0f172a,stroke:#334155,stroke-width:1.5px,color:#f8fafc;
    classDef gwStyle fill:#111827,stroke:#374151,stroke-width:1.5px,color:#f8fafc;
    classDef appStyle fill:#18181b,stroke:#3f3f46,stroke-width:1.5px,color:#f8fafc;
    classDef dataStyle fill:#022c22,stroke:#065f46,stroke-width:1.5px,color:#f8fafc;
    classDef extStyle fill:#312e81,stroke:#4338ca,stroke-width:1.5px,color:#f8fafc;

    subgraph CLIENT_TIER ["1. Client Tier"]
        Browser["Desktop & Mobile Clients"]:::clientStyle
    end

    subgraph PRESENTATION_TIER ["2. Presentation & Rendering Tier (Next.js / Vercel Edge)"]
        direction TB
        AppRouter["App Router (SSR & Static Pages)"]:::edgeStyle
        AuthContext["Auth Context & State Store"]:::edgeStyle
        APIClient["API Client / Axios Interceptors"]:::edgeStyle
        
        AppRouter <--> AuthContext
        AppRouter --> APIClient
    end

    subgraph GATEWAY_TIER ["3. Ingress & Security Middleware Tier (NestJS)"]
        direction TB
        CORS["CORS & ValidationPipe"]:::gwStyle
        JWTGuard["JwtAuthGuard (Passport JWT)"]:::gwStyle
        RolesGuard["RolesGuard (RBAC: ADMIN / USER)"]:::gwStyle
        
        CORS --> JWTGuard --> RolesGuard
    end

    subgraph SERVICE_TIER ["4. Core Domain Services Tier (NestJS / Render)"]
        direction TB
        AuthService["Auth & OAuth Service"]:::appStyle
        EventService["Events Management Service"]:::appStyle
        BookmarkService["Bookmark & Tracking Service"]:::appStyle
        AlertService["Alerts & Notifications Service"]:::appStyle
        AnalyticsService["Participation Analytics Service"]:::appStyle
        LinkedInService["LinkedIn Post Generator Service"]:::appStyle
        AdminService["Admin Control Service"]:::appService
    end

    subgraph DATA_TIER ["5. Persistence Tier (PostgreSQL / TypeORM)"]
        direction TB
        ORM["TypeORM Entity Manager"]:::dataStyle
        
        subgraph TABLES ["PostgreSQL Schemas"]
            UserTable[("users")]:::dataStyle
            EventTable[("events")]:::dataStyle
            BookmarkTable[("bookmarks")]:::dataStyle
            AlertTable[("alerts")]:::dataStyle
            TokenTable[("password_reset_tokens")]:::dataStyle
        end
        
        ORM --> UserTable
        ORM --> EventTable
        ORM --> BookmarkTable
        ORM --> AlertTable
        ORM --> TokenTable
    end

    subgraph EXTERNAL_SERVICES ["6. External Integrations"]
        GoogleAuth["Google OAuth 2.0 API"]:::extStyle
        SMTPService["SMTP Email Provider"]:::extStyle
    end

    %% Communication Flow
    Browser -->|"HTTPS / JSON"| AppRouter
    APIClient -->|"REST API Requests (Bearer Token)"| CORS
    
    RolesGuard --> AuthService
    RolesGuard --> EventService
    RolesGuard --> BookmarkService
    RolesGuard --> AlertService
    RolesGuard --> AnalyticsService
    RolesGuard --> LinkedInService
    RolesGuard --> AdminService

    AuthService <-->|"OAuth Validation"| GoogleAuth
    AlertService -->|"Dispatch Email Alerts"| SMTPService
    AuthService -->|"Password Reset Mails"| SMTPService

    AuthService --> ORM
    EventService --> ORM
    BookmarkService --> ORM
    AlertService --> ORM
    AnalyticsService --> ORM
    AdminService --> ORM
```

---

## Core System Modules

### 1. Opportunity Aggregation and Filtering
* Full-text search and category-based filtering across Hackathons, Internships, Coding Contests, and Workshops.
* Event detail schema capturing registration deadlines, participation modes (Online / In-Person), organizer metadata, and direct external application links.
* Fallback rendering mechanisms for unauthenticated guest sessions to maintain page responsiveness and indexing efficiency.

### 2. User State, Bookmarks, and Tracking
* Relational bookmarking engine establishing foreign-key constraints between user identifiers and event entities.
* Persistent bookmark status synchronization across UI cards and detailed view pages with optimistic UI updates.

### 3. Automated Alerts and Notification Delivery
* Event deadline tracking system delivering structured notification payloads to prevent missed application cutoffs.
* Direct integration with SMTP email transport for account notifications and transactional authentication messages.

### 4. Participation Analytics
* Client dashboard visualizer calculating user interaction rates, saved event ratios, and engagement trends.
* Server-side metric aggregation endpoints supporting reporting queries.

### 5. Content Generation Utility
* LinkedIn post formulation utility creating structured announcement copy from event milestones.

### 6. Role-Based Access Control (RBAC) and Admin Management
* Dual-role permission hierarchy (`ADMIN`, `USER`) enforced via metadata reflection decorators (`@Roles()`) and custom NestJS execution guards (`RolesGuard`).
* Administrative interface for creating, modifying, categorizing, and deleting live event records.

---

## Technical Specifications

| Layer | Technology | Key Details |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js (React 19) | Server Components, App Router, Client Component hydration |
| **Frontend Styling** | Tailwind CSS, Lucide | Design system with responsive layout boundaries |
| **Client Auth** | Google OAuth React | Token storage abstraction, Axios request interceptors |
| **Backend Framework** | NestJS | Dependency injection, module encapsulation, TypeScript |
| **Database & ORM** | PostgreSQL, TypeORM | Relational schema definitions, automatic sync/migrations |
| **Security & Auth** | Passport-JWT, Bcrypt | Stateless Bearer token verification, password hashing |
| **Containerization** | Docker, Docker Compose | Isolated multi-stage production and development containers |
| **Infrastructure** | Vercel, Render | Edge-hosted frontend and cloud-hosted API and managed PostgreSQL |

---

## Database Entity Relationship Diagram

```mermaid
erDiagram
    USERS ||--o{ BOOKMARKS : creates
    USERS ||--o{ ALERTS : receives
    USERS ||--o{ EVENTS : organizes
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
        enum category "HACKATHON | INTERNSHIP | CONTEST | WORKSHOP"
        enum mode "ONLINE | OFFLINE | HYBRID"
        string organizer
        string location
        string registrationLink
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
        uuid eventId FK
        string message
        boolean isRead
        timestamp createdAt
    }

    PASSWORD_RESET_TOKENS {
        uuid id PK
        string token
        uuid userId FK
        timestamp expiresAt
        timestamp createdAt
    }
```

---

## Directory Structure

```
Ignita/
├── frontend/
│   ├── app/
│   │   ├── (auth)/                 # Login, Registration, Password Reset routes
│   │   ├── admin/                  # Protected administrative management portal
│   │   ├── alerts/                 # Deadline notifications dashboard
│   │   ├── analytics/              # Participation statistics view
│   │   ├── Bookmarks/              # User-saved event collection
│   │   ├── Dashboard/              # Authenticated user landing portal
│   │   ├── events/                 # Discovery listings and slug-based detail routes
│   │   ├── linkedin-post-generator/# Copywriting generator utility
│   │   └── profile/                # User profile settings
│   ├── components/                 # Atomic UI components, cards, navigation wrappers
│   ├── lib/                        # Axios client, auth context provider, custom hooks
│   └── public/                     # Static media and brand assets
│
├── Backend/
│   ├── src/
│   │   ├── admin/                  # Admin-specific handlers and service overrides
│   │   ├── alerts/                 # Alert generation and query controllers
│   │   ├── analytics/              # Metric calculation and reporting modules
│   │   ├── auth/                   # JWT strategies, guards, login/register controllers
│   │   ├── bookmark/               # User-event relational bookmarking handlers
│   │   ├── events/                 # CRUD operations and filtering for event records
│   │   ├── linkedin-post/          # Structured text generation utilities
│   │   ├── notification/           # Email transport and notification dispatchers
│   │   ├── user/                   # User profile and account query logic
│   │   ├── app.module.ts           # Root dependency injection tree
│   │   └── main.ts                 # Bootstrap entry point, CORS, and ValidationPipe
│   ├── Dockerfile.dev              # Development environment container spec
│   └── Dockerfile.prod             # Multi-stage optimized production build spec
│
├── docker-compose.dev.yml          # Local container composition (Client, Server, DB)
├── docker-compose.prod.yml         # Production orchestration manifest
└── README.md
```

---

## Environment Configuration

### Backend Environment Configuration (`Backend/.env.development` or `Backend/.env.production`)

```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ignita_db
JWT_SECRET=your_production_grade_jwt_secret_key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password
```

### Frontend Environment Configuration (`frontend/.env.local` or `frontend/.env.production`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
```

---

## Local Development and Deployment

### Option A: Native Node Execution

#### 1. Database Provisioning
Ensure a PostgreSQL server instance is running and accessible via the `DATABASE_URL` specified in your backend environment configuration.

#### 2. Backend Service
```bash
cd Backend
npm install
npm run start:dev
```
The NestJS API will be available at `http://localhost:3001`.

#### 3. Frontend Client
```bash
cd frontend
npm install
npm run dev
```
The Next.js client interface will be available at `http://localhost:3000`.

---

### Option B: Docker Orchestration

To initialize the entire service mesh (PostgreSQL, NestJS API, and Next.js Frontend) in isolated network containers:

```bash
docker compose -f docker-compose.dev.yml up --build
```

To stop all running services and remove container volumes:
```bash
docker compose -f docker-compose.dev.yml down
```

---

## Production Build Verification

To execute production compilation and type checks:

```bash
# Backend compilation
cd Backend
npm run build

# Frontend static and server bundle optimization
cd ../frontend
npm run build
```
