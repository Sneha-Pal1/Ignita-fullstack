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
  const firstName = user?.name?.split(" ")[0] || "DEVELOPER";
  const isAdmin = user?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0e0e0d]/95 backdrop-blur-md font-mono">
      <div className="h-16 px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Left: User Welcome */}
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 bg-[#FFB100] animate-pulse" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#8a8a86] uppercase">WELCOME,</span>
            <span className="text-xs font-bold text-white uppercase">{firstName}</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-[#1c1c1a] border border-white/10 text-[10px] text-[#FFB100]">
            <HugeiconsIcon icon={Bookmark01Icon} size="12" strokeWidth={2} />
            <span>{savedCount ?? 0} SAVED</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link
              href="/create"
              className="hidden sm:inline-flex items-center justify-center bg-[#FFB100] text-black font-semibold px-3 py-1.5 text-xs uppercase tracking-wider hover:bg-[#ffbe25] transition-colors"
            >
              + CREATE EVENT
            </Link>
          )}

          {/* Quick Search */}
          <div
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 border transition-all duration-200 ${
              searchFocused
                ? "border-[#FFB100] bg-[#141413]"
                : "border-white/10 bg-[#1c1c1a]"
            }`}
          >
            <HugeiconsIcon
              icon={Search01Icon}
              size="14"
              strokeWidth={2}
              className="text-[#8a8a86]"
            />
            <input
              type="text"
              placeholder="SEARCH EVENTS..."
              className="bg-transparent text-xs text-white placeholder-[#555] outline-none w-36 md:w-48 font-mono"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>

          {/* Notifications Link */}
          <Link
            href="/Notification"
            className="p-2 border border-white/10 bg-[#141413] hover:border-[#FFB100] transition-colors relative"
          >
            <HugeiconsIcon
              icon={BellDotIcon}
              size="16"
              strokeWidth={2}
              className="text-[#8a8a86]"
            />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#FFB100]" />
          </Link>

          {/* User Profile avatar */}
          <Link
            href="/profile"
            className="w-8 h-8 bg-[#1c1c1a] border border-[#FFB100] flex items-center justify-center text-xs font-bold text-[#FFB100] hover:bg-[#FFB100] hover:text-black transition-colors"
          >
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </Link>
        </div>

      </div>
    </header>
  );
};
