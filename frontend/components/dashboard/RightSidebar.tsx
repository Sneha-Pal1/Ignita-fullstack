"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Clock01Icon,
  ArrowRight01Icon,
  Calendar01Icon,
  Alert01Icon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";

interface Notification {
  id: string;
  type: "alert" | "reminder";
  title: string;
  description: string;
  action?: string;
  actionHref?: string;
}

interface DeadlineItem {
  id: string;
  title: string;
  description: string;
  urgency: "Urgent" | "Soon" | "Upcoming";
  href: string;
}

interface RightSidebarProps {
  notifications: Notification[];
  deadlines: DeadlineItem[];
  recommendations: Array<{
    id: string;
    title: string;
    description: string;
    href: string;
  }>;
}

export const RightSidebar = ({
  notifications,
  deadlines,
  recommendations,
}: RightSidebarProps) => {
  return (
    <aside className="hidden lg:flex flex-col gap-6 font-mono">
      {/* Notifications Panel */}
      <section className="border border-white/10 bg-[#141413]">
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-[#FFB100]" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-white">NOTIFICATIONS</h2>
        </div>

        <div className="divide-y divide-white/10">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5 text-[#FFB100]">
                    <HugeiconsIcon icon={Alert01Icon} size="14" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white uppercase">
                      {notification.title}
                    </p>
                    <p className="text-[11px] text-[#8a8a86] mt-1 line-clamp-2 leading-relaxed">
                      {notification.description}
                    </p>
                    {notification.actionHref && (
                      <Link
                        href={notification.actionHref}
                        className="text-[10px] text-[#FFB100] hover:underline uppercase tracking-widest mt-2 inline-flex items-center gap-1 transition-colors"
                      >
                        <span>{notification.action}</span>
                        <HugeiconsIcon
                          icon={ArrowRight01Icon}
                          size="12"
                          strokeWidth={2}
                        />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-xs text-[#8a8a86]">
              NO LIVE NOTIFICATIONS.
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Deadlines */}
      <section className="border border-white/10 bg-[#141413]">
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-[#FFB100]" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-white">
            UPCOMING DEADLINES
          </h2>
        </div>

        <div className="p-4 space-y-3">
          {deadlines.length > 0 ? (
            deadlines.map((deadline) => (
              <Link
                key={deadline.id}
                href={deadline.href}
                className="block p-3 bg-[#1c1c1a] border border-white/10 hover:border-[#FFB100] transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-white uppercase font-sans">
                      {deadline.title}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <HugeiconsIcon
                        icon={Calendar01Icon}
                        size="12"
                        strokeWidth={2}
                        className="text-[#FFB100]"
                      />
                      <p className="text-[10px] text-[#8a8a86]">
                        {deadline.description}
                      </p>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase bg-[#FFB100]/20 text-[#FFB100] border border-[#FFB100]/40 shrink-0">
                    {deadline.urgency}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-3 bg-[#1c1c1a] border border-white/10 text-xs text-[#8a8a86]">
              NO UPCOMING DEADLINES.
            </div>
          )}
        </div>
      </section>

      {/* Recommendations */}
      <section className="border border-white/10 bg-[#141413]">
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-[#FFB100]" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-white">
            RECOMMENDED FOR YOU
          </h2>
        </div>
        <div className="p-4 space-y-4">
          {recommendations.length > 0 ? (
            recommendations.map((item) => (
              <div key={item.id} className="space-y-1">
                <p className="text-xs text-white font-bold uppercase font-sans">
                  {item.title}
                </p>
                <p className="text-[11px] text-[#8a8a86] leading-relaxed line-clamp-2">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-[#FFB100] hover:underline transition-colors uppercase tracking-widest mt-1"
                >
                  <span>EXPLORE NOW</span>
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size="12"
                    strokeWidth={2}
                  />
                </Link>
              </div>
            ))
          ) : (
            <p className="text-xs text-[#8a8a86]">
              NO RECOMMENDATIONS AT THIS TIME.
            </p>
          )}
        </div>
      </section>
    </aside>
  );
};
