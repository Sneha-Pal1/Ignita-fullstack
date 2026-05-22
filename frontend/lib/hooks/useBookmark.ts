// import { useState } from "react";
// import { apiClient } from "@/lib/api-client";

// export const useBookmark = (
//   eventSlug: string,
//   eventTitle: string,
//   eventData?: any,
// ) => {
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const toggleBookmark = async () => {
//     setIsLoading(true);
//     try {
//       if (isBookmarked) {
//         // Remove bookmark
//         await apiClient.delete(`/bookmark/${eventSlug}`);
//         setIsBookmarked(false);
//       } else {
//         // Add bookmark with full event data
//         await apiClient.post("/bookmark", {
//           eventSlug,
//           eventTitle,
//           eventData: eventData || {},
//         });
//         setIsBookmarked(true);
//       }
//     } catch (error) {
//       console.error("Failed to toggle bookmark:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { isBookmarked, isLoading, toggleBookmark, setIsBookmarked };
// };
"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import { authStorage } from "@/lib/auth";

export const useBookmark = (
  eventSlug: string,
  eventTitle: string,
  eventData?: any,
) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check bookmark status after mount
  useEffect(() => {
    if (!mounted) return;

    const token = authStorage.getToken();

    // User not logged in
    if (!token) {
      setIsBookmarked(false);
      return;
    }

    // Optional:
    // Later you can fetch bookmark status from backend here
  }, [mounted, eventSlug]);

  const toggleBookmark = async () => {
    // Prevent SSR/localStorage issues
    if (!mounted) return;

    const token = authStorage.getToken();

    // Prevent API calls without auth
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    try {
      setIsLoading(true);

      if (isBookmarked) {
        // Remove bookmark
        await apiClient.delete(`/bookmark/${eventSlug}`);

        setIsBookmarked(false);
      } else {
        // Add bookmark
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

  return {
    isBookmarked,
    isLoading,
    toggleBookmark,
    setIsBookmarked,
  };
};
