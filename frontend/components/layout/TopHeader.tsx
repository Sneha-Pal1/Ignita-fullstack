"use client";

import { useAuthContext } from "@/lib/auth-context";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  BellDotIcon,
  Bookmark01Icon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { useState } from "react";

interface TopHeaderProps {
  savedCount: number;
}

export const TopHeader = ({ savedCount }: TopHeaderProps) => {
  const { user } = useAuthContext();
  const [searchFocused, setSearchFocused] = useState(false);
  const firstName = user?.name?.split(" ")[0] || "User";
  const isAdmin = user?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
      <div className="h-16 sm:h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Welcome & Streak */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block">
              <p className="text-xs sm:text-sm text-zinc-500">Welcome back,</p>
              <p className="text-base sm:text-lg font-semibold text-white">
                {firstName}
              </p>
            </div>
            <div className="sm:hidden">
              <p className="text-sm font-semibold text-white">{firstName}</p>
            </div>
            {/* Live bookmark badge - Hidden on small screens */}
            <div className="ml-auto lg:ml-6 hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 whitespace-nowrap">
              <HugeiconsIcon
                icon={Bookmark01Icon}
                size="16"
                strokeWidth={2}
                className="text-emerald-400"
              />
              <span className="text-sm font-medium text-emerald-400 hidden sm:inline">
                {savedCount} saved
              </span>
            </div>
          </div>
        </div>

        {/* Right: Search + Notifications */}
        <div className="flex items-center gap-2 sm:gap-4">
          {isAdmin && (
            <Link
              href="/create"
              className="hidden sm:inline-flex items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400"
            >
              Create Event
            </Link>
          )}

          {/* Quick Search - Hidden on mobile */}
          <div
            className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
              searchFocused
                ? "border-emerald-500/50 bg-zinc-900"
                : "border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900"
            }`}
          >
            <HugeiconsIcon
              icon={Search01Icon}
              size="16"
              strokeWidth={2}
              className="text-zinc-500"
            />
            <input
              type="text"
              placeholder="Search events, bookmarks..."
              className="bg-transparent text-sm text-white placeholder-zinc-600 outline-none w-40 md:w-48"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>

          {/* Notifications Button */}
          <Link
            href="/Notification"
            className="relative p-2 hover:bg-zinc-900 rounded-lg transition-colors group"
          >
            <HugeiconsIcon
              icon={BellDotIcon}
              size="20"
              strokeWidth={2}
              className="text-zinc-400 group-hover:text-zinc-100 transition-colors"
            />
            {/* Notification Badge */}
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
          </Link>

          {/* User Avatar */}
          <Link
            href="/profile"
            className="ml-2 w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center hover:border-emerald-500/50 transition-colors"
          >
            <span className="font-semibold text-emerald-400 text-sm">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};
