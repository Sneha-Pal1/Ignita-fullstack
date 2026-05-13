"use client";

import Image from "next/image";
import Link from "next/link";
import { bookmarks } from "@/lib/data/dashboard";
import { Calendar, MapPin } from "lucide-react";

export const RecentBookmarks = () => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Recent Bookmarks</h2>
        <Link
          href="/Bookmarks"
          className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="group relative rounded-xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-40 overflow-hidden">
              <Image
                src={bookmark.image}
                alt={bookmark.title}
                width={400}
                height={200}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <p className="text-xs text-gray-400 font-medium">
                {bookmark.organizer}
              </p>

              <h3 className="text-lg font-semibold text-white line-clamp-2">
                {bookmark.title}
              </h3>

              {/* Meta info */}
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>{bookmark.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>{bookmark.location}</span>
                </div>
              </div>

              {/* Button */}
              <Link
                href="/events"
                className="inline-block w-full mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-center rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
