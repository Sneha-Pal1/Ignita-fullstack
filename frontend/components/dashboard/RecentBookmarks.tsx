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
            className={`group relative rounded-2xl overflow-hidden border border-emerald-500/20 hover:border-emerald-400/30 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-950 ${transitionClass}`}
          >
            {/* Image container with aspect ratio */}
            <div
              className="relative w-full overflow-hidden bg-slate-800"
              style={{ aspectRatio: "16/10" }}
            >
              <Image
                src={bookmark.image}
                alt={bookmark.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`w-full h-full object-cover ${
                  prefersReducedMotion ? "" : "group-hover:scale-110"
                } ${transitionClass}`}
                loading="lazy"
                quality={75}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

              {/* Glow effect on hover */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
              <p className="text-xs text-emerald-400/80 font-medium uppercase tracking-wide mb-2">
                {bookmark.organizer}
              </p>

              <h3
                className={`text-base sm:text-lg font-semibold text-white line-clamp-2 mb-2 group-hover:text-emerald-300 ${transitionClass}`}
              >
                {bookmark.title}
              </h3>

              {/* Meta info */}
              <div className="space-y-1 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <Calendar
                    className="w-3.5 h-3.5 text-teal-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{bookmark.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin
                    className="w-3.5 h-3.5 text-teal-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate">{bookmark.location}</span>
                </div>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-transparent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </article>
        ))}
      </div>
    </section>
  );
};
