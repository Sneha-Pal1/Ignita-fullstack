"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Note01Icon } from "@hugeicons/core-free-icons";
import React from "react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  variant?: "notifications" | "alerts" | "activity";
}

export default function EmptyState({
  icon = (
    <HugeiconsIcon icon={Note01Icon} size="36" className="text-[#FFB100]" />
  ),
  title,
  description,
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="w-full py-16 px-6 text-center font-mono">
      {/* Icon container */}
      <div className="flex justify-center mb-6">
        <div
          className="w-20 h-20 flex items-center justify-center border border-[#FFB100]/30 bg-[#FFB100]/10 text-[#FFB100]"
          style={{
            boxShadow: `0 0 40px rgba(255, 177, 0, 0.15)`,
          }}
        >
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white font-sans mb-2">{title}</h3>

      {/* Description */}
      <p className="text-xs text-[#8a8a86] max-w-sm mx-auto mb-6 leading-relaxed font-mono">{description}</p>

      {/* CTA Button */}
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FFB100] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#ffbe26] transition-colors"
        >
          <span>{actionText}</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      )}

      {/* Decorative dots */}
      <div className="mt-10 flex justify-center gap-3">
        <div className="w-1.5 h-1.5 bg-[#FFB100]/40 animate-pulse" />
        <div className="w-1.5 h-1.5 bg-[#FFB100]/60 animate-pulse" />
        <div className="w-1.5 h-1.5 bg-[#FFB100]/40 animate-pulse" />
      </div>
    </div>
  );
}
