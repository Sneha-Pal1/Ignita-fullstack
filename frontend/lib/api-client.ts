const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

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

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  let token: string | null = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("auth_token");
  }

  console.log("🌐 API Request:", {
    endpoint,
    url,
    hasToken: !!token,
    tokenLength: token?.length || 0,
  });

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
    console.log("✅ Authorization header added");
  } else {
    console.warn("⚠️ No token found for request to", endpoint);
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

    if (!response.ok) {
      console.error("❌ API Error:", {
        status: response.status,
        statusText: response.statusText,
        endpoint,
        data,
      });
      throw new APIError(
        response.status,
        data,
        data && typeof data === "object" && "message" in data
          ? (data as any).message
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
