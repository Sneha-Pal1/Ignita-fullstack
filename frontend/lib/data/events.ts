// Ignita live event data structure - hardcoded dummy data has been removed.
// Real event data is ingested dynamically from backend API endpoints (/events).
export const events: Array<{
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  organizer?: string;
  participants?: string;
  applicationDeadline?: string;
  prizes?: string;
  requirements?: string;
  about?: string;
  tags?: string[];
  schedule?: Array<{ time: string; activity: string }>;
}> = [];
