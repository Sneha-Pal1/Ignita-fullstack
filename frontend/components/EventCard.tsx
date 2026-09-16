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
      className="group relative flex flex-col bg-[#141413] border border-white/10 overflow-hidden transition-all duration-200 hover:border-[#FFB100]/60 hover:bg-[#181816]"
    >
      {/* Top Amber Accent Line on Hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#FFB100] transition-colors z-20" />

      {/* Thumbnail */}
      <div className="relative overflow-hidden h-44 bg-[#0e0e0d]">
        <Image
          src={image || "/images/event1.png"}
          alt={title || "Event"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141413] via-transparent to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1 font-mono">
        {organizer && (
          <div className="levo-eyebrow text-[10px]">
            <span className="h-1.5 w-1.5 bg-[#FFB100]" />
            <span className="truncate">{organizer}</span>
          </div>
        )}

        <h3 className="text-base font-bold text-white leading-snug line-clamp-2 group-hover:text-[#FFB100] transition-colors font-sans">
          <Link href={`/events/${slug}`}>{title}</Link>
        </h3>

        <div className="flex flex-col gap-1.5 text-xs text-[#8a8a86] mt-1">
          {location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[#FFB100]" />
              <span className="truncate">{location}</span>
            </div>
          )}
          {date && (
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 shrink-0 text-[#FFB100]" />
              <span className="truncate">{date}</span>
            </div>
          )}
          {participants && (
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 shrink-0 text-[#8a8a86]" />
              <span className="truncate">{participants}</span>
            </div>
          )}
          {time && (
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 shrink-0 text-[#8a8a86]" />
              <span className="line-clamp-1">{time}</span>
            </div>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Admin Actions */}
        {showAdminActions && (onEdit || onDelete) && (
          <div className="flex gap-2 pt-2 border-t border-white/10">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit();
                }}
                className="flex-1 py-1.5 text-[11px] font-semibold text-[#FFB100] border border-[#FFB100]/40 hover:bg-[#FFB100] hover:text-black transition-colors uppercase cursor-pointer"
              >
                EDIT
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete();
                }}
                className="flex-1 py-1.5 text-[11px] font-semibold text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors uppercase cursor-pointer"
              >
                DELETE
              </button>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3">
          {showDetailsButton && (
            <Link
              href={`/events/${slug}`}
              className="flex-1 py-2 text-[11px] font-bold text-center text-black bg-[#FFB100] hover:bg-[#ffbe25] transition-colors uppercase tracking-widest"
            >
              DETAILS →
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
                className="flex-1 py-2 text-[11px] font-semibold text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors disabled:opacity-50 uppercase cursor-pointer"
              >
                {isLoading ? "..." : "REMOVE"}
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleBookmark();
                }}
                disabled={isLoading}
                className={`flex-1 py-2 text-[11px] font-semibold border transition-colors disabled:opacity-50 uppercase cursor-pointer ${
                  isBookmarked
                    ? "text-[#FFB100] border-[#FFB100] bg-[#FFB100]/10"
                    : "text-[#8a8a86] border-white/10 hover:border-white/40 hover:text-white"
                }`}
              >
                {isLoading ? "..." : isBookmarked ? "SAVED ✓" : "SAVE"}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
