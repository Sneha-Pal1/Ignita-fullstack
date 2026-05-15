"use client";

import Image from "next/image";
import Link from "next/link";
import { bookmarks } from "@/lib/data/dashboard";
import { Calendar, MapPin } from "lucide-react";
import { useMotionPreference } from "@/hooks/useMotionPreference";

export const RecentBookmarks = () => {
  const prefersReducedMotion = useMotionPreference();
  const transitionClass = prefersReducedMotion
    ? ""
    : "transition-all duration-200";

  return (
    <section className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Recent Bookmarks
        </h2>
        <Link
          href="/Bookmarks"
          className={`text-cyan-400 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-3 py-2 text-sm font-medium ${transitionClass}`}
        >
          View All
          <span aria-hidden="true" className="ml-2">
            →
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {bookmarks.map((bookmark) => (
          <article
            key={bookmark.id}
            className={`group relative rounded-xl sm:rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-white/20 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-900 ${transitionClass}`}
          >
            {/* Image with aspect ratio for CLS prevention */}
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "2/1.4" }}
            >
              <Image
                src={bookmark.image}
                alt={bookmark.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`w-full h-full object-cover ${prefersReducedMotion ? "" : "group-hover:scale-105"} ${transitionClass}`}
                loading="lazy"
                quality={75}
              />
              <div
                className={`absolute inset-0 bg-black/20 group-hover:bg-black/10 ${transitionClass}`}
              />
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 space-y-4">
              <p className="text-xs sm:text-sm text-slate-400 font-medium uppercase tracking-wide">
                {bookmark.organizer}
              </p>

              <h3 className="text-lg sm:text-xl font-semibold text-white line-clamp-2 leading-snug">
                {bookmark.title}
              </h3>

              {/* Meta info */}
              <div className="space-y-2.5 text-sm sm:text-base text-slate-300">
                <div className="flex items-center gap-3">
                  <Calendar
                    className="w-4 h-4 text-cyan-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{bookmark.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin
                    className="w-4 h-4 text-cyan-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{bookmark.location}</span>
                </div>
              </div>

              {/* Button - Min 44px touch target */}
              <Link
                href="/events"
                className={`inline-flex w-full justify-center items-center min-h-11 px-4 py-3 sm:py-4 mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium text-sm sm:text-base rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 focus:ring-offset-slate-900 ${transitionClass}`}
              >
                View Details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
