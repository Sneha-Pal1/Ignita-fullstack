"use client";

import { NotificationRecord } from "@/lib/api-endpoints";
import Link from "next/link";
import { useState } from "react";

interface NotificationCardProps {
  notification: NotificationRecord & { timestamp: string | Date };
  onMarkAsRead?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function NotificationCard({
  notification,
  onMarkAsRead,
  onDelete,
}: NotificationCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatTime = (date: Date) => {
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

  const timestamp =
    notification.timestamp instanceof Date
      ? notification.timestamp
      : new Date(notification.timestamp);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group transition-all duration-300 ${
        !notification.isRead ? "border-emerald-500/50" : "border-white/10"
      }`}
    >
      {/* Glass background with glow */}
      <div
        className={`absolute inset-0 rounded-xl transition-all duration-300 ${
          !notification.isRead
            ? "bg-linear-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/30"
            : "bg-white/3 border border-white/10"
        } ${isHovered ? "border-emerald-500/50 bg-emerald-500/10" : ""}`}
        style={{
          boxShadow: isHovered
            ? "0 0 20px rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            : "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        }}
      />

      {/* Unread indicator */}
      {!notification.isRead && (
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-linear-to-b from-emerald-500 to-teal-500 rounded-full animate-pulse" />
      )}

      <div className="relative p-4 flex gap-4">
        {/* Icon */}
        <div
          className={`shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-xl transition-all duration-300 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          style={{
            background: `linear-gradient(135deg, ${notification.color})`,
            opacity: 0.8,
          }}
        >
          {notification.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm font-semibold text-white truncate">
              {notification.title}
            </h3>
            <span className="text-xs text-gray-400 shrink-0 whitespace-nowrap">
              {formatTime(timestamp)}
            </span>
          </div>

          <p className="text-xs text-gray-400 mb-3 line-clamp-2">
            {notification.message}
          </p>

          {notification.eventTitle && (
            <div className="text-xs text-emerald-400/80 mb-3">
              📌 {notification.eventTitle}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {notification.actionUrl && (
              <Link
                href={notification.actionUrl}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-linear-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 transition-all duration-200"
              >
                View Event
              </Link>
            )}
            {!notification.isRead && onMarkAsRead && (
              <button
                onClick={() => onMarkAsRead(notification.id)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 transition-all duration-200"
              >
                Mark Read
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(notification.id)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-200"
              >
                Dismiss
              </button>
            )}
          </div>
        </div>

        {/* Unread badge */}
        {!notification.isRead && (
          <div className="shrink-0 w-2 h-2 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 mt-1.5 animate-pulse" />
        )}
      </div>
    </div>
  );
}
