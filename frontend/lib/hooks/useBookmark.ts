import { useState } from "react";
import { apiClient } from "@/lib/api-client";

export const useBookmark = (
  eventSlug: string,
  eventTitle: string,
  eventData?: any,
) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleBookmark = async () => {
    setIsLoading(true);
    try {
      if (isBookmarked) {
        // Remove bookmark
        await apiClient.delete(`/bookmark/${eventSlug}`);
        setIsBookmarked(false);
      } else {
        // Add bookmark with full event data
        await apiClient.post("/bookmark", {
          eventSlug,
          eventTitle,
          eventData: eventData || {},
        });
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isBookmarked, isLoading, toggleBookmark, setIsBookmarked };
};
