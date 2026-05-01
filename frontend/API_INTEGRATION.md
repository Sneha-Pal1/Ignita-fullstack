# Frontend-Backend Integration Guide

This guide explains the API integration setup for your Ignita frontend and NestJS backend.

## Setup

### 1. Environment Configuration

Create a `.env.local` file in the `frontend/` directory:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**For production**, update this to your backend URL:

```bash
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

### 2. Backend Requirements

Ensure your backend has CORS enabled to allow requests from your frontend. In your NestJS `main.ts`:

```typescript
app.enableCors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
});
```

## Files Created

### API Client (`lib/api-client.ts`)

- Reusable fetch-based HTTP client
- Automatic token attachment to requests
- Centralized error handling
- All requests go through this client

### Authentication (`lib/auth.ts`)

- `authAPI` - API calls for login/register
- `authStorage` - Token and user storage management
- Handles JWT token lifecycle

### Auth Hook (`lib/use-auth.ts`)

- React hook for managing auth state
- `login(credentials)` - Login with email/password
- `register(credentials)` - Register with name, email, phone, password
- `logout()` - Clear auth and redirect
- `loading` - Request loading state
- `error` - Error messages from API
- `isAuthenticated` - Check if user is logged in

### Type Definitions (`lib/auth-types.ts`)

- TypeScript interfaces for login/register payloads
- User and AuthResponse types

## Usage in Components

### Login Example

```typescript
"use client";
import { useAuth } from "@/lib/use-auth";

export function LoginForm() {
  const { login, loading, error } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      // User is logged in and token is stored
    } catch (err) {
      // Error is in the error state
    }
  };
}
```

### Making API Calls

```typescript
import { apiClient } from "@/lib/api-client";

// GET request
const events = await apiClient.get("/events");

// POST request
const response = await apiClient.post("/events", { name: "New Event" });

// PUT request
await apiClient.put(`/events/${id}`, { name: "Updated" });

// DELETE request
await apiClient.delete(`/events/${id}`);
```

### Checking Auth Status

```typescript
import { authStorage } from "@/lib/auth";

const token = authStorage.getToken();
const user = authStorage.getUser();
const isAuthenticated = !!token;
```

## Authentication Flow

1. User fills login/register form
2. Form handler calls `useAuth().login()` or `.register()`
3. `authAPI` makes POST request to backend
4. Backend returns `{ access_token, user }`
5. Token is stored in `localStorage`
6. User is redirected to `/events`
7. Subsequent API requests include token in `Authorization: Bearer <token>` header

## Error Handling

API errors are thrown as `APIError` class:

```typescript
try {
  await login({ email, password });
} catch (err) {
  if (err instanceof APIError) {
    console.error(`Error ${err.status}: ${err.message}`);
  }
}
```

The `useAuth()` hook automatically catches errors and exposes them in the `error` state.

## Updated Pages

### `/login`

- Connects to `POST /auth/login`
- Shows loading and error states
- Redirects to `/events` on success

### `/register`

- **Added phone field** (required by backend)
- Connects to `POST /auth/register`
- Validates password confirmation
- Shows loading and error states
- Redirects to `/events` on success

## Next Steps

1. Create an `.env.local` file with your backend API URL
2. Ensure your NestJS backend is running
3. Test login/register on the frontend
4. Create protected route wrapper (optional) to redirect unauthenticated users
5. Add logout functionality to navbar
6. Create authenticated API calls for events, bookmarks, etc.

## Notes

- Tokens are stored in `localStorage` - consider adding refresh token logic later
- CORS must be enabled on backend for requests to work
- All API requests are centralized through `apiClient`
- Errors from backend are properly propagated to the UI
