"use client";

import { designTokens } from "@/lib/design-tokens";

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  variant?: "text" | "avatar" | "card" | "button";
  count?: number;
}

export const Skeleton = ({
  width = "100%",
  height = "1rem",
  className = "",
  variant = "text",
  count = 1,
}: SkeletonProps) => {
  const baseClasses =
    "bg-gray-200 rounded animate-pulse dark:bg-gray-700";

  const variantClasses = {
    text: `${baseClasses} h-4`,
    avatar: `${baseClasses} rounded-full`,
    card: `${baseClasses} rounded-lg`,
    button: `${baseClasses} h-10 rounded-md`,
  };

  const skeletons = Array.from({ length: count });

  if (count > 1) {
    return (
      <div className="space-y-2">
        {skeletons.map((_, i) => (
          <div
            key={i}
            className={variantClasses[variant]}
            style={{
              width,
              height,
              animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${variantClasses[variant]} ${className}`}
      style={{
        width,
        height,
        animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
      }}
      role="status"
      aria-label="Loading content"
    />
  );
};

// Skeleton for stats card
export const StatCardSkeleton = () => (
  <div
    className="p-6 rounded-lg space-y-4"
    style={{
      backgroundColor: "#f5f5f5",
      border: "1px solid #e0e0e0",
    }}
  >
    <Skeleton height="2.5rem" className="w-2/3" />
    <Skeleton height="1rem" className="w-1/2" />
  </div>
);

// Skeleton for event card
export const EventCardSkeleton = () => (
  <div
    className="rounded-lg overflow-hidden"
    style={{
      backgroundColor: "#f5f5f5",
      border: "1px solid #e0e0e0",
    }}
  >
    <Skeleton variant="card" width="100%" height="12rem" />
    <div className="p-4 space-y-3">
      <Skeleton height="1rem" className="w-1/3" />
      <Skeleton height="1.5rem" className="w-full" />
      <Skeleton height="1rem" count={2} />
    </div>
  </div>
);

// Skeleton for timeline item
export const TimelineItemSkeleton = () => (
  <div className="flex gap-4">
    <Skeleton variant="avatar" width="2.5rem" height="2.5rem" />
    <div className="flex-1 space-y-2">
      <Skeleton height="1rem" className="w-3/4" />
      <Skeleton height="0.875rem" className="w-1/2" />
    </div>
  </div>
);
