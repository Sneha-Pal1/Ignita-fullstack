"use client";

import Link from "next/link";
import Image from "next/image";
import { useBookmark } from "@/lib/hooks/useBookmark";
import { MapPin, Calendar, Users, Clock } from "lucide-react";

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
  eventData?: any;
  isBookmarkCard?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
  showAdminActions?: boolean;
  hideBookmarkButton?: boolean;
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
  eventData,
  isBookmarkCard = false,
  onDelete,
  onEdit,
  showAdminActions = false,
  hideBookmarkButton = false,
}: Props) => {
  const { isBookmarked, isLoading, toggleBookmark } = useBookmark(
    slug,
    title,
    eventData,
  );

  return (
    <div
      id="event-card"
      className="flex flex-col bg-[#161b22] border border-[#21262d] rounded-md overflow-hidden hover:border-[#30363d] transition-all duration-200"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-44 bg-[#0d1117]">
        <Image
          src={image || "/images/event1.png"}
          alt={title || "Event"}
          fill
          className="object-cover"
          loading="eager"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        {organizer && (
          <p className="text-xs text-[#7d8590]">{organizer}</p>
        )}

        <h3 className="text-sm font-semibold text-[#e6edf3] leading-snug line-clamp-2 hover:text-[#3fb950] transition-colors">
          <Link href={`/events/${slug}`}>{title}</Link>
        </h3>

        <div className="flex flex-col gap-1.5 text-xs text-[#7d8590] mt-1">
          {location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[#7d8590]" />
              <span className="truncate">{location}</span>
            </div>
          )}
          {date && (
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 shrink-0 text-[#7d8590]" />
              <span className="truncate">{date}</span>
            </div>
          )}
          {participants && (
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 shrink-0 text-[#7d8590]" />
              <span className="truncate">{participants}</span>
            </div>
          )}
          {time && (
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 shrink-0 text-[#7d8590]" />
              <span className="line-clamp-2 leading-relaxed">{time}</span>
            </div>
          )}
        </div>

        {/* Spacer to push buttons to bottom */}
        <div className="flex-1" />

        {/* Admin actions */}
        {showAdminActions && (onEdit || onDelete) && (
          <div className="flex gap-2 pt-1">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit();
                }}
                className="flex-1 px-3 py-1.5 text-xs font-semibold text-[#3fb950] border border-[#238636]/50 hover:border-[#2ea043] rounded-md transition-colors cursor-pointer"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete();
                }}
                className="flex-1 px-3 py-1.5 text-xs font-semibold text-[#f85149] border border-[#f85149]/30 hover:border-[#f85149]/60 rounded-md transition-colors cursor-pointer"
              >
                Delete
              </button>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 mt-2">
          {showDetailsButton && (
            <Link
              href={`/events/${slug}`}
              className="flex-1 px-3 py-1.5 text-xs font-semibold text-center text-white bg-[#2ea043] hover:bg-[#3fb950] rounded-md transition-colors"
            >
              View details
            </Link>
          )}
          {!hideBookmarkButton &&
            (isBookmarkCard ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete?.();
                }}
                disabled={isLoading}
                className="flex-1 px-3 py-1.5 text-xs font-semibold text-[#f85149] border border-[#f85149]/30 hover:border-[#f85149]/60 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? "..." : "Remove"}
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleBookmark();
                }}
                disabled={isLoading}
                className={`flex-1 px-3 py-1.5 text-xs font-semibold border rounded-md transition-colors disabled:opacity-50 cursor-pointer ${
                  isBookmarked
                    ? "text-[#3fb950] border-[#238636]/60 bg-[#2ea043]/10"
                    : "text-[#7d8590] border-[#30363d] hover:border-[#484f58] hover:text-[#e6edf3]"
                }`}
              >
                {isLoading ? "..." : isBookmarked ? "Saved ✓" : "Save"}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
