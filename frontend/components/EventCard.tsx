"use client";

import Link from "next/link";
import Image from "next/image";
import { useBookmark } from "@/lib/hooks/useBookmark";

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  organizer?: string;
  participants?: string;
  showDetailsButton?: boolean;
}

const EventCard = ({
  title,
  image,
  slug,
  location,
  date,
  time,
  organizer,
  participants,
  showDetailsButton = true,
}: Props) => {
  const { isBookmarked, isLoading, toggleBookmark } = useBookmark(slug, title);

  return (
    <div
      id="event-card"
      className="bg-gray-900/50 border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-all duration-300"
    >
      <Image
        src={image}
        alt={title}
        width={410}
        height={250}
        className="w-full h-48 object-cover"
        style={{ width: "100%", height: "auto" }}
        loading="eager"
      />

      <div className="p-4 space-y-3">
        <p className="text-xs text-gray-400">{organizer}</p>

        <h3 className="text-lg font-semibold text-white line-clamp-2">
          {title}
        </h3>

        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/pin.svg"
              alt="location"
              width={14}
              height={14}
              style={{ width: "auto", height: "auto" }}
            />
            <p>{location}</p>
          </div>

          <div className="flex items-center gap-2">
            <Image
              src="/icons/calendar.svg"
              alt="date"
              width={14}
              height={14}
              style={{ width: "auto", height: "auto" }}
            />
            <p>{date}</p>
          </div>

          <div className="flex items-center gap-2">
            <Image
              src="/icons/pin.svg"
              alt="participants"
              width={14}
              height={14}
              style={{ width: "auto", height: "auto" }}
            />
            <p>{participants}</p>
          </div>
        </div>

        <p className="text-sm text-gray-400 line-clamp-2">{time}</p>

        <div className="flex gap-2 mt-4">
          {showDetailsButton && (
            <Link
              href={`/events/${slug}`}
              className="flex-1 px-4 py-2 bg-white text-black font-medium rounded-lg text-center hover:bg-gray-200 transition-colors"
            >
              View Details
            </Link>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleBookmark();
            }}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-white/20 text-white font-medium rounded-lg hover:border-white/40 transition-colors disabled:opacity-50"
          >
            {isLoading ? "..." : isBookmarked ? "Saved ✓" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
