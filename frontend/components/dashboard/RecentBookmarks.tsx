"use client";

import Image from "next/image";
import Link from "next/link";
import { bookmarks } from "@/lib/data/dashboard";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { Calendar, MapPin } from "lucide-react";

export const RecentBookmarks = () => {
  const prefersReducedMotion = useMotionPreference();
  const transitionClass = prefersReducedMotion
    ? ""
    : "transition-all duration-300";

  return (
    <section className="w-full">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
        Recent Bookmarks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {bookmarks.map((bookmark) => (
          <article
            key={bookmark.id}
            className={`group relative rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:ring-offset-2 focus-within:ring-offset-zinc-950 ${transitionClass}`}
          >
            {/* Image container with aspect ratio */}
            <div
              className="relative w-full overflow-hidden bg-zinc-800"
              style={{ aspectRatio: "16/10" }}
            >
              <Image
                src={bookmark.image}
                alt={bookmark.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`w-full h-full object-cover ${
                  prefersReducedMotion ? "" : "group-hover:scale-105"
                } ${transitionClass}`}
                loading="lazy"
                quality={75}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
              <p className="text-xs text-emerald-400 font-medium uppercase tracking-wide mb-2">
                {bookmark.organizer}
              </p>

              <h3
                className={`text-base sm:text-lg font-semibold text-white line-clamp-2 mb-2 ${transitionClass}`}
              >
                {bookmark.title}
              </h3>

              {/* Meta info */}
              <div className="space-y-1 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <Calendar
                    className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{bookmark.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin
                    className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate">{bookmark.location}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
