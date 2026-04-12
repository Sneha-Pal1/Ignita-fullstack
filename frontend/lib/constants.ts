// ==============================
// APP INFO
// ==============================
export const APP_NAME = "Ignita";

export const APP_DESCRIPTION =
  "Discover, track, and showcase hackathons, internships, and tech events.";

// ==============================
// ROUTES
// ==============================
export const ROUTES = {
  HOME: "/",
  EVENTS: "/events",
  EVENT_DETAILS: (slug: string) => `/events/${slug}`,
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  BOOKMARKS: "/bookmarks",
  NOTIFICATIONS: "/notifications",
  PROFILE: "/profile",
};

// ==============================
// EVENT TYPES (for filters)
// ==============================
export const EVENT_TYPES = [
  { label: "Hackathon", value: "hackathon" },
  { label: "Internship", value: "internship" },
  { label: "Competition", value: "competition" },
  { label: "Workshop", value: "workshop" },
  { label: "Conference", value: "conference" },
  { label: "Meetup", value: "meetup" },
];

// ==============================
// EVENT MODES
// ==============================
export const EVENT_MODES = [
  { label: "Online", value: "online" },
  { label: "Offline", value: "offline" },
];

// ==============================
// TECH STACK FILTERS
// ==============================
export const TECH_STACKS = [
  "AI",
  "Web Development",
  "Machine Learning",
  "Data Science",
  "Cybersecurity",
  "Blockchain",
  "Cloud",
  "DevOps",
];

// ==============================
// DIFFICULTY LEVELS
// ==============================
export const DIFFICULTY_LEVELS = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
];

// ==============================
// PRICE TYPES
// ==============================
export const PRICE_TYPES = [
  { label: "Free", value: "free" },
  { label: "Paid", value: "paid" },
];

// ==============================
// SORT OPTIONS
// ==============================
export const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Deadline Soon", value: "deadline" },
  { label: "Popular", value: "popular" },
];

// ==============================
// LOCAL STORAGE KEYS
// ==============================
export const STORAGE_KEYS = {
  TOKEN: "ignita_token",
  USER: "ignita_user",
};

// ==============================
// PAGINATION / UI LIMITS
// ==============================
export const LIMITS = {
  EVENTS_PER_PAGE: 6,
};

// ==============================
// DEFAULT FILTERS
// ==============================
export const DEFAULT_FILTERS = {
  search: "",
  eventType: "",
  mode: "",
  techStack: "",
  difficulty: "",
  price: "",
};
