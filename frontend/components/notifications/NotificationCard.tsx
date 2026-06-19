"use client";

import { type NotificationRecord } from "@/lib/api-endpoints";
import Link from "next/link";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Clock01Icon,
  Calendar01Icon,
  Note01Icon,
  BellDotIcon,
} from "@hugeicons/core-free-icons";

interface NotificationCardProps {
  notification: NotificationRecord;
  onMarkAsRead?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function NotificationCard({
  notification,
  onMarkAsRead,
  onDelete,
}: NotificationCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatTime = (value: string) => {
    const date = new Date(value);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getCategory = (type?: string) => {
    const t = (type || "").toLowerCase();
    if (t.includes("dead") || t.includes("deadline"))
      return { label: "Deadline Alert", accent: "amber" };
    if (t.includes("remind") || t.includes("event"))
      return { label: "Event Reminder", accent: "blue" };
    if (t.includes("opportun") || t.includes("new"))
      return { label: "New Opportunity", accent: "green" };
    if (t.includes("bookmark"))
      return { label: "Bookmark Activity", accent: "purple" };
    return { label: "System Notification", accent: "neutral" };
  };

  const cat = getCategory(notification.type);

  const accentBg: Record<string, string> = {
    amber: "bg-amber-500/10 text-amber-400 border-amber-400/20",
    blue: "bg-sky-500/10 text-sky-300 border-sky-400/20",
    green: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
    purple: "bg-violet-500/10 text-violet-300 border-violet-400/20",
    neutral: "bg-zinc-800 text-gray-300 border-zinc-700",
  };

  const badgeClass = accentBg[cat.accent] || accentBg.neutral;

  const getIcon = () => {
    if (cat.accent === "amber") return Clock01Icon;
    if (cat.accent === "blue") return Calendar01Icon;
    if (cat.accent === "green") return BellDotIcon;
    if (cat.accent === "purple") return Note01Icon;
    return Note01Icon;
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative transition-colors duration-150 rounded-md border ${
        !notification.isRead
          ? "border-emerald-600/30"
          : "border-zinc-700"
      } bg-zinc-900/50 hover:bg-zinc-800/50 p-3 flex items-start gap-3`}
    >
      <div className="shrink-0 w-10 h-10 rounded-md flex items-center justify-center bg-zinc-800">
        <HugeiconsIcon
          icon={getIcon()}
          size="18"
          className="text-white"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-semibold text-white truncate">
              {notification.title}
            </span>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full border ${badgeClass} ml-1 whitespace-nowrap`}
            >
              {cat.label}
            </span>
          </div>
          <div className="text-xs text-gray-400 whitespace-nowrap shrink-0">
            {formatTime(notification.timestamp)}
          </div>
        </div>

        <p className="text-xs text-gray-300 mt-1 line-clamp-2">
          {notification.message}
        </p>

        <div className="mt-2 flex items-center gap-2">
          {notification.actionUrl && (
            <Link
              href={notification.actionUrl}
              className="text-xs text-emerald-300 bg-emerald-600/10 px-2 py-1 rounded-md hover:bg-emerald-600/20 transition-colors"
            >
              View
            </Link>
          )}
          {!notification.isRead && onMarkAsRead && (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="text-xs text-gray-300 px-2 py-1 rounded-md hover:bg-zinc-700 transition-colors"
            >
              Mark read
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(notification.id)}
              className="text-xs text-red-300 px-2 py-1 rounded-md hover:bg-red-600/10 transition-colors"
            >
              Dismiss
            </button>
          )}
        </div>
      </div>

      {/* Unread indicator */}
      {!notification.isRead && (
        <span className="shrink-0 w-2 h-2 rounded-full bg-emerald-500 mt-1" />
      )}

      {/* suppress unused variable warning */}
      {isHovered && null}
    </div>
  );
}
