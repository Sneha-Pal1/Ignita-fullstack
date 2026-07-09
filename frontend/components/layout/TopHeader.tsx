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
  savedCount?: number;
}

export const TopHeader = ({ savedCount }: TopHeaderProps) => {
  const { user } = useAuthContext();
  const [searchFocused, setSearchFocused] = useState(false);
  const firstName = user?.name?.split(" ")[0] || "User";
  const isAdmin = user?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-30 border-b border-[#21262d] bg-[#0d1117]/95 backdrop-blur-sm">
      <div className="h-16 sm:h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Welcome & Streak */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block">
              <p className="text-xs text-[#7d8590]">Welcome back,</p>
              <p className="text-base font-semibold text-[#e6edf3]">
                {firstName}
              </p>
            </div>
            <div className="sm:hidden">
              <p className="text-sm font-semibold text-[#e6edf3]">{firstName}</p>
            </div>
            {/* Live bookmark badge - Hidden on small screens */}
            <div className="ml-auto lg:ml-6 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#2ea043]/10 border border-[#238636]/30 whitespace-nowrap">
              <HugeiconsIcon
                icon={Bookmark01Icon}
                size="14"
                strokeWidth={2}
                className="text-[#3fb950]"
              />
              <span className="text-xs font-semibold text-[#3fb950] hidden sm:inline">
                {savedCount ?? 0} saved
              </span>
            </div>
          </div>
        </div>

        {/* Right: Search + Notifications */}
        <div className="flex items-center gap-2 sm:gap-4">
          {isAdmin && (
            <Link
              href="/create"
              className="hidden sm:inline-flex items-center justify-center rounded-md bg-[#2ea043] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#3fb950] transition-colors"
            >
              Create Event
            </Link>
          )}

          {/* Quick Search - Hidden on shadow */}
          <div
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all duration-200 ${
              searchFocused
                ? "border-[#2ea043] bg-[#0d1117] ring-1 ring-[#2ea043]/30"
                : "border-[#30363d] bg-[#161b22] hover:bg-[#21262d]"
            }`}
          >
            <HugeiconsIcon
              icon={Search01Icon}
              size="14"
              strokeWidth={2}
              className="text-[#7d8590]"
            />
            <input
              type="text"
              placeholder="Search events, bookmarks..."
              className="bg-transparent text-xs text-[#e6edf3] placeholder-[#484f58] outline-none w-40 md:w-48"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>

          {/* Notifications Button */}
          <Link
            href="/Notification"
            className="relative p-2 hover:bg-[#21262d] rounded-md transition-colors group"
          >
            <HugeiconsIcon
              icon={BellDotIcon}
              size="18"
              strokeWidth={2}
              className="text-[#7d8590] group-hover:text-[#e6edf3] transition-colors"
            />
            {/* Notification Badge */}
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#2ea043]" />
          </Link>

          {/* User Avatar */}
          <Link
            href="/profile"
            className="ml-2 w-8 h-8 rounded-full bg-[#2ea043]/10 border border-[#238636]/30 flex items-center justify-center hover:border-[#2ea043] transition-colors"
          >
            <span className="font-semibold text-[#3fb950] text-xs">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};
