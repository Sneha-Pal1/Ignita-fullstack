# Ignita

A full-stack opportunity discovery and career growth platform for students, developers, and tech enthusiasts.

Ignita brings hackathons, internships, coding contests, workshops, jobs, and other technical opportunities into a single platform where users can discover opportunities, save them, track deadlines, receive alerts, and analyze their activity.

## Live Application

https://ignita.in/

## Repository

https://github.com/Sneha-Pal1/Ignita-fullstack


## Overview

Ignita is built using a decoupled frontend and backend architecture.

The frontend is developed with Next.js and React, while the backend is built with NestJS and TypeScript. PostgreSQL is used as the primary database through TypeORM.

The production backend is containerized with Docker and deployed on AWS ECS Fargate behind an Application Load Balancer. Amazon RDS provides the production PostgreSQL database, while Amazon S3 and CloudFront handle media storage and delivery.

Authentication is implemented using JWT, Passport, bcrypt, and Google OAuth, with role-based authorization for ADMIN and USER accounts.


## Architecture

```mermaid
flowchart TB

    USER["User"]

    DNS["DNS
    ignita.in
    api.ignita.in"]

    VERCEL["Vercel
    Next.js Frontend"]

    ALB["AWS Application Load Balancer
    HTTPS :443"]

    ECS["AWS ECS Fargate
    NestJS Backend
    Port :10000"]

    RDS["Amazon RDS
    PostgreSQL"]

    S3["Amazon S3
    Private Media Storage"]

    CF["Amazon CloudFront
    CDN"]

    ECR["Amazon ECR
    Docker Images"]

    SM["AWS Secrets Manager
    Production Secrets"]

    CW["Amazon CloudWatch
    Application Logs"]

    USER --> DNS

    DNS --> VERCEL
    DNS --> ALB

    VERCEL -->|"HTTPS REST API"| ALB

    ALB -->|"HTTP :10000"| ECS

    ECS -->|"PostgreSQL"| RDS
    ECS -->|"Upload / Delete"| S3

    S3 --> CF
    CF --> USER

    ECS -->|"Read Secrets"| SM
    ECS -->|"Logs"| CW

    ECR -->|"Container Image"| ECS

## Production Architecture
                         Users
                           |
                           v
                    DNS / Domain
                    /           \
                   /             \
                  v               v
             ignita.in       api.ignita.in
                 |                |
                 v                v
              Vercel             ALB
                 |                |
                 | HTTPS           | HTTP :10000
                 |                |
                 +--------------> ECS Fargate
                                      |
                       +--------------+--------------+
                       |              |              |
                       v              v              v
                    RDS            S3          Secrets Manager
                 PostgreSQL       Storage
                                      |
                                      v
                                  CloudFront

                       ECS
                        |
                        v
                   CloudWatch

                       ECR
                        |
                        v
                  Docker Image

Core Features
Opportunity Discovery

Discover opportunities across multiple categories:

Hackathons
Internships
Coding contests
Workshops
Jobs
Interviews
Quizzes
Coding festivals

Each opportunity can contain:

Title
Description
Organization
Category
Location
Participation mode
Registration URL
Start date
End date
Registration deadline
Tags
Banner image
Search and Filtering

Users can search and filter opportunities based on their requirements.

The discovery interface provides category-based filtering and event-specific information.

Event Details

Every opportunity has a dedicated details page containing the relevant event information and registration details.

Users can directly access the external registration page from Ignita.

Bookmarks

Authenticated users can bookmark opportunities for later.
Bookmarks are persisted in PostgreSQL and associated with the authenticated user.

Alerts and Notifications

Ignita provides deadline-related alerts and notification functionality to help users keep track of important opportunity deadlines.

The backend contains dedicated alert and notification modules for managing this functionality.

Analytics

The analytics module provides insights into user activity and opportunity engagement.

It can track information such as:

Saved opportunities
User interactions
Engagement metrics
Participation-related statistics
LinkedIn Post Generator

Ignita includes a LinkedIn post generation utility that helps users create structured LinkedIn content based on opportunity or participation information.

Authentication

Ignita supports:

Email/password authentication
JWT authentication
Google OAuth
Password hashing with bcrypt
Password reset functionality
Protected routes
Role-Based Access Control

The platform supports two roles:

USER
ADMIN

Administrative functionality is protected using NestJS guards and role-based authorization.

Admins can:

Create opportunities
Update opportunities
Delete opportunities
Manage event information
Upload event banner images
Technology Stack
Frontend
Next.js
React
TypeScript
Tailwind CSS
Lucide React
Axios
App Router
Backend
NestJS
TypeScript
TypeORM
PostgreSQL
Passport
JWT
bcrypt
class-validator
Authentication
JWT
Passport JWT
Google OAuth
bcrypt
Role-Based Access Control
Cloud and Infrastructure
AWS ECS Fargate
AWS Application Load Balancer
Amazon RDS PostgreSQL
Amazon S3
Amazon CloudFront
Amazon ECR
AWS Secrets Manager
Amazon CloudWatch
AWS IAM
AWS ACM
Deployment and Development
Docker
Docker Compose
Vercel
GitHub
AWS
Backend Architecture

The backend follows a modular NestJS architecture.

Backend/
└── src/
    ├── admin/
    ├── alerts/
    ├── analytics/
    ├── auth/
    ├── bookmark/
    ├── events/
    ├── health/
    ├── linkedin-post/
    ├── migrations/
    ├── notification/
    ├── storage/
    ├── user/
    ├── app.module.ts
    ├── data-source.ts
    └── main.ts

Each major domain is separated into its own NestJS module.

This keeps authentication, events, bookmarks, alerts, analytics, storage, and administrative functionality independently maintainable.

Frontend Architecture
frontend/
├── app/
│   ├── (auth)/
│   ├── admin/
│   ├── alerts/
│   ├── analytics/
│   ├── bookmarks/
│   ├── dashboard/
│   ├── events/
│   ├── linkedin-post-generator/
│   └── profile/
│
├── components/
├── lib/
└── public/

The frontend uses the Next.js App Router with a combination of server and client components.

API communication is handled through a centralized API client.

Database

Ignita uses PostgreSQL with TypeORM.

Production PostgreSQL is hosted on Amazon RDS.

The main entities include:

Users
Events
Bookmarks
Alerts
PasswordResetTokens

Relationships include:

Authentication Flow
User
 |
 v
Next.js Frontend
 |
 | Login
 v
NestJS Auth API
 |
 v
Validate Credentials
 |
 v
PostgreSQL
 |
 v
Generate JWT
 |
 v
Frontend
 |
 | Bearer Token
 v
Protected API
 |
 v
JwtAuthGuard
 |
 v
RolesGuard
 |
 v
Controller
 |
 v
Service
 |
 v
Database
Security

Ignita uses multiple security layers.

Application Security
JWT authentication
Passport JWT
Role-Based Access Control
bcrypt password hashing
DTO validation
CORS configuration
Protected admin routes
AWS Security
HTTPS through AWS Application Load Balancer
AWS Security Groups
Private S3 bucket
IAM permissions
AWS Secrets Manager
CloudFront Origin Access Control
RDS authentication
Container-level isolation through ECS
S3 and CloudFront

Event banner images are stored in a private Amazon S3 bucket.

The upload flow is:

Admin
 |
 v
Next.js
 |
 | multipart/form-data
 v
NestJS
 |
 v
StorageService
 |
 v
Amazon S3
 |
 v
CloudFront
 |
 v
User

The backend stores the S3 object key and resolves it to the CloudFront URL when returning event data.

This keeps the S3 bucket private while allowing media to be delivered efficiently through CloudFront.

Docker

Ignita provides separate Docker configurations for development and production.

docker-compose.dev.yml
docker-compose.prod.yml

The production backend uses a dedicated production Dockerfile.

Backend/
├── Dockerfile.dev
└── Dockerfile.prod

The container image is stored in Amazon ECR and deployed to ECS Fargate.

AWS Deployment Flow
Developer
    |
    v
GitHub
    |
    v
Docker Build
    |
    v
Amazon ECR
    |
    v
ECS Task Definition
    |
    v
ECS Fargate
    |
    v
Application Load Balancer
    |
    v
api.ignita.in

The frontend is independently deployed through Vercel.

GitHub
   |
   v
Vercel
   |
   v
Next.js
   |
   v
ignita.in
AWS Services
Service	Purpose
Amazon ECS Fargate	Runs the NestJS backend container
Application Load Balancer	Routes HTTPS traffic to ECS
Amazon RDS	Hosts production PostgreSQL
Amazon S3	Stores uploaded media
Amazon CloudFront	Delivers media through CDN
Amazon ECR	Stores Docker images
AWS Secrets Manager	Stores production secrets
Amazon CloudWatch	Stores application logs
AWS IAM	Controls AWS permissions
AWS ACM	Provides TLS certificate for the API domain
Vercel	Hosts the Next.js frontend
Health Check

The backend exposes:

GET /health

Response:

{
  "status": "ok",
  "service": "ignita-backend"
}

The Application Load Balancer uses this endpoint to determine whether the ECS backend is healthy.

Local Development
Prerequisites
Node.js
npm
Docker
Docker Compose
PostgreSQL
Git
Clone the Repository
git clone https://github.com/Sneha-Pal1/Ignita-fullstack.git

cd Ignita-fullstack
Backend
cd Backend

npm install

npm run start:dev

Backend:

http://localhost:3001

Health check:

http://localhost:3001/health
Frontend

Open another terminal:

cd frontend

npm install

npm run dev

Frontend:

http://localhost:3000
Environment Variables
Backend

Create:

Backend/.env.development

Example:

NODE_ENV=development
PORT=3001

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ignita_db

JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

FRONTEND_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

AWS_REGION=ap-south-1
AWS_S3_BUCKET_NAME=your_bucket
AWS_CLOUDFRONT_URL=https://your-cloudfront-domain
Frontend

Create:

frontend/.env.local

Example:

NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

Never commit real credentials or secrets to Git.

Docker Development

Start the complete development environment:

docker compose -f docker-compose.dev.yml up --build

Stop the environment:

docker compose -f docker-compose.dev.yml down
Database Migrations

Production database synchronization is disabled.

synchronize: false

Database schema changes are managed through TypeORM migrations.

Run migrations with:

cd Backend

npm run migration:run
Production Build
Backend
cd Backend

npm run build

docker build -f Dockerfile.prod -t ignita-backend:latest .
Frontend
cd frontend

npm run build
API Structure

The backend is organized around domain-specific REST APIs.

/auth
/users
/events
/bookmarks
/alerts
/analytics
/notifications
/linkedin-post
/admin
/health

Authentication and authorization are applied to protected endpoints through NestJS guards.

Project Structure
Ignita-fullstack/
│
├── Backend/
│   ├── src/
│   │   ├── admin/
│   │   ├── alerts/
│   │   ├── analytics/
│   │   ├── auth/
│   │   ├── bookmark/
│   │   ├── events/
│   │   ├── health/
│   │   ├── linkedin-post/
│   │   ├── migrations/
│   │   ├── notification/
│   │   ├── storage/
│   │   ├── user/
│   │   ├── app.module.ts
│   │   ├── data-source.ts
│   │   └── main.ts
│   │
│   ├── Dockerfile.dev
│   └── Dockerfile.prod
│
├── frontend/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── admin/
│   │   ├── alerts/
│   │   ├── analytics/
│   │   ├── bookmarks/
│   │   ├── dashboard/
│   │   ├── events/
│   │   ├── linkedin-post-generator/
│   │   └── profile/
│   │
│   ├── components/
│   ├── lib/
│   └── public/
│
├── docker-compose.dev.yml
├── docker-compose.prod.yml
└── README.md
Current Production Setup
Frontend
    Vercel
    https://ignita.in/

Backend
    AWS ECS Fargate
    |
    +-- Application Load Balancer
    |
    +-- https://api.ignita.in

Database
    Amazon RDS PostgreSQL

Object Storage
    Amazon S3

CDN
    Amazon CloudFront

Container Registry
    Amazon ECR

Secrets
    AWS Secrets Manager

Monitoring
    Amazon CloudWatch
Future Improvements

Planned improvements include:

GitHub Actions CI/CD
Automated ECS deployments
Terraform for Infrastructure as Code
Redis and BullMQ for background jobs
Automated opportunity ingestion workers
ECS auto scaling
CloudWatch alarms and dashboards
Improved observability
API rate limiting
Additional automated testing
Private networking for production database infrastructure
Project Goals

Ignita is designed around three primary goals:

Centralize fragmented technical opportunities.
Help users track and manage opportunities efficiently.
Provide a scalable production architecture that can support additional opportunity sources and platform features.
Author

Sneha Pal

B.Tech Computer Science and Engineering

GitHub:
https://github.com/Sneha-Pal1

License

This project is maintained as a personal engineering and portfolio project.
