const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

export class APIError extends Error {
  constructor(
    public status: number,
    public data?: unknown,
    message?: string,
  ) {
    super(message || `API Error: ${status}`);
    this.name = "APIError";
  }
}

// Refresh token function - call the backend to get a new access token
async function refreshAccessToken(): Promise<string | null> {
  // Prevent multiple simultaneous refresh calls
  if (isRefreshing) {
    return refreshPromise;
  }

  isRefreshing = true;

  refreshPromise = (async () => {
    try {
      // Retrieve refresh token if available
      let refreshToken: string | null = null;
      if (
        typeof window !== "undefined" &&
        typeof localStorage !== "undefined"
      ) {
        refreshToken = localStorage.getItem("refresh_token");
      }

      if (!refreshToken) {
        console.warn("⚠️ No refresh token available. Logging out.");
        // No refresh token, clear auth and logout
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
          localStorage.removeItem("refresh_token");
          window.dispatchEvent(new Event("auth-change"));
        }
        return null;
      }

      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
        credentials: "include",
      });

      if (!response.ok) {
        console.warn("⚠️ Token refresh failed:", response.status);
        // Refresh failed, clear auth
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
          localStorage.removeItem("refresh_token");
          window.dispatchEvent(new Event("auth-change"));
        }
        return null;
      }

      const data = await response.json();
      const newAccessToken = data.accessToken || data.access_token;

      if (newAccessToken) {
        if (typeof window !== "undefined") {
          localStorage.setItem("auth_token", newAccessToken);
          console.log("✅ Access token refreshed successfully");
        }
        return newAccessToken;
      }

      return null;
    } catch (error) {
      console.error("❌ Token refresh error:", error);
      // On error, clear auth
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        localStorage.removeItem("refresh_token");
        window.dispatchEvent(new Event("auth-change"));
      }
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  retryCount = 0,
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  // Retrieve token from localStorage on client side
  let token: string | null = null;
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    token = localStorage.getItem("auth_token");
  }

  console.log("🌐 API Request:", {
    endpoint,
    url,
    hasToken: !!token,
    tokenLength: token?.length || 0,
  });

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options.headers) {
    Object.assign(headers, options.headers);
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
    console.log("✅ Authorization header added");
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });

    let data: unknown = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    // Handle 401 Unauthorized - try to refresh token
    if (response.status === 401 && retryCount === 0 && token) {
      console.warn("⚠️ Received 401 Unauthorized. Attempting token refresh...");
      const newToken = await refreshAccessToken();

      if (newToken) {
        console.log("🔄 Retrying request with refreshed token...");
        // Retry the request with new token
        return request<T>(endpoint, options, retryCount + 1);
      } else {
        console.error("❌ Token refresh failed. User logged out.");
        // Token refresh failed, throw error
        throw new APIError(401, data, "Session expired. Please log in again.");
      }
    }

    if (!response.ok) {
      const responseData = data as Record<string, unknown> | null;
      console.error("❌ API Error:", {
        status: response.status,
        statusText: response.statusText,
        endpoint,
        data,
      });
      throw new APIError(
        response.status,
        data,
        responseData && typeof responseData.message === "string"
          ? responseData.message
          : "API request failed",
      );
    }

    console.log("✅ API Success:", { endpoint, status: response.status });
    return data as T;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    console.error("❌ Network Error:", error);
    throw new APIError(0, null, "Network request failed");
  }
}

export const apiClient = {
  get: <T>(endpoint: string) => request<T>(endpoint, { method: "GET" }),
  post: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, { method: "PUT", body: JSON.stringify(body) }),
  patch: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, { method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: "DELETE" }),
};

// Bookmark API methods
export const bookmarkAPI = {
  saveBookmark: (eventSlug: string, eventTitle: string) =>
    apiClient.post("/bookmark", { eventSlug, eventTitle }),

  getBookmarks: () =>
    apiClient.get<Array<{ id: string; eventSlug: string; eventTitle: string }>>(
      "/bookmark",
    ),

  removeBookmark: (bookmarkId: string) =>
    apiClient.delete(`/bookmark/${bookmarkId}`),
};
