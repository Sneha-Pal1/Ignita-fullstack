"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminAPI, type AdminOverviewResponse } from "@/lib/api-endpoints";
import {
  ArrowUpRight,
  BellRing,
  CalendarDays,
  Bookmark,
  Users,
  Clock3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function AdminOverviewPage() {
  const [data, setData] = useState<AdminOverviewResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadOverview = async () => {
      try {
        setIsLoading(true);
        const overview = await adminAPI.getOverview();
        if (isMounted) {
          setData(overview);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load admin overview.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadOverview();

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = data?.stats;

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <section className="rounded-md border border-[#242422] bg-[#141413] p-6 shadow-2xl shadow-black/40">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#FFB100]">
              Admin Overview
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#f4f4f0] sm:text-3xl">
              Platform control, events, users, and alerts in one place.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8a8a86]">
              Manage IGNITA with a structured control surface built for
              operations, moderation, and future organizer workflows.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-[#FFB100]/30 bg-[#FFB100]/10 px-3 py-2 font-mono text-xs font-medium text-[#FFB100]">
            <ShieldCheck size={14} />
            Admin only
          </div>
        </div>
      </section>

      {error ? (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 font-mono text-sm text-red-400">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-md border border-[#242422] bg-[#141413] p-5 animate-pulse"
            >
              <div className="h-9 w-9 rounded-md bg-[#242422] mb-4" />
              <div className="h-7 w-16 rounded bg-[#242422] mb-2" />
              <div className="h-4 w-24 rounded bg-[#242422]" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Total Events"
            value={stats?.totalEvents ?? 0}
            icon={CalendarDays}
            accent="amber"
          />
          <MetricCard
            title="Total Users"
            value={stats?.totalUsers ?? 0}
            icon={Users}
            accent="amber"
          />
          <MetricCard
            title="Total Bookmarks"
            value={stats?.totalBookmarks ?? 0}
            icon={Bookmark}
            accent="amber"
          />
          <MetricCard
            title="Active Alerts"
            value={stats?.activeAlerts ?? 0}
            icon={BellRing}
            accent="amber"
          />
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
        <div className="space-y-6">
          <section className="rounded-md border border-[#242422] bg-[#141413]">
            <div className="flex items-center justify-between border-b border-[#242422] px-5 py-4">
              <h3 className="font-schibsted-grotesk text-base font-semibold text-[#f4f4f0]">
                Recent Events
              </h3>
              <Link
                href="/admin/events"
                className="inline-flex items-center gap-2 font-mono text-xs font-medium text-[#FFB100] transition-colors hover:text-[#FFB100]/80"
              >
                View all
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="divide-y divide-[#242422]">
              {(data?.recentEvents ?? []).map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-[#f4f4f0]">{event.title}</p>
                    <p className="mt-1 text-sm text-[#8a8a86]">
                      {event.category} · {event.mode} ·{" "}
                      {event.organizer || "No organizer"}
                    </p>
                  </div>
                  <div className="font-mono text-xs text-[#8a8a86]">
                    {formatDate(event.createdAt)}
                  </div>
                </div>
              ))}
              {!data?.recentEvents?.length ? (
                <div className="px-5 py-10 font-mono text-sm text-[#8a8a86]">
                  No recent events yet.
                </div>
              ) : null}
            </div>
          </section>

          <section className="rounded-md border border-[#242422] bg-[#141413]">
            <div className="border-b border-[#242422] px-5 py-4">
              <h3 className="font-schibsted-grotesk text-base font-semibold text-[#f4f4f0]">
                User Activity
              </h3>
            </div>
            <div className="divide-y divide-[#242422]">
              {(data?.recentUsers ?? []).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between gap-4 px-5 py-4"
                >
                  <div>
                    <p className="font-medium text-[#f4f4f0]">{user.name}</p>
                    <p className="mt-1 text-sm text-[#8a8a86]">{user.email}</p>
                  </div>
                  <div className="text-right font-mono text-xs text-[#8a8a86]">
                    <p className="text-[#FFB100]">{user.role || "USER"}</p>
                    <p>{formatDate(user.createdAt)}</p>
                  </div>
                </div>
              ))}
              {!data?.recentUsers?.length ? (
                <div className="px-5 py-10 font-mono text-sm text-[#8a8a86]">
                  No user activity yet.
                </div>
              ) : null}
            </div>
          </section>

          <section className="rounded-md border border-[#242422] bg-[#141413] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-schibsted-grotesk text-base font-semibold text-[#f4f4f0]">
                Quick Actions
              </h3>
              <Sparkles size={16} className="text-[#FFB100]" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <ActionCard
                href="/admin/create-event"
                title="Create Event"
                description="Publish a new opportunity"
              />
              <ActionCard
                href="/admin/events"
                title="Manage Events"
                description="Edit and delete listings"
              />
              <ActionCard
                href="/admin/users"
                title="Review Users"
                description="Inspect accounts and roles"
              />
              <ActionCard
                href="/admin/analytics"
                title="View Analytics"
                description="Track platform growth"
              />
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-md border border-[#242422] bg-[#141413]">
            <div className="border-b border-[#242422] px-5 py-4">
              <h3 className="font-schibsted-grotesk text-base font-semibold text-[#f4f4f0]">
                Recent Alerts
              </h3>
            </div>
            <div className="divide-y divide-[#242422]">
              {(data?.recentAlerts ?? []).map((alert) => (
                <div key={alert.id} className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium ${alert.read ? "border-[#242422] bg-[#181816] text-[#8a8a86]" : "border-[#FFB100]/30 bg-[#FFB100]/10 text-[#FFB100]"}`}
                    >
                      {alert.read ? "Read" : "New"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#f4f4f0]">
                        {alert.message}
                      </p>
                      <p className="mt-1 font-mono text-xs text-[#8a8a86]">
                        {alert.user?.name || "System"} ·{" "}
                        {formatDate(alert.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {!data?.recentAlerts?.length ? (
                <div className="px-5 py-10 font-mono text-sm text-[#8a8a86]">
                  No alerts available.
                </div>
              ) : null}
            </div>
          </section>

          <section className="rounded-md border border-[#242422] bg-[#141413] p-5">
            <h3 className="font-schibsted-grotesk text-base font-semibold text-[#f4f4f0]">
              Pending Actions
            </h3>
            <div className="mt-4 space-y-3">
              {(data?.pendingActions ?? []).map((item) => (
                <div
                  key={item.label}
                  className="rounded-md border border-[#242422] bg-[#0e0e0d] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-[#8a8a86]">{item.label}</p>
                    <p className="font-mono text-lg font-bold text-[#FFB100] tabular-nums">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-md border border-[#FFB100]/30 bg-[#FFB100]/10 p-5">
            <div className="flex items-start gap-3">
              <Clock3 size={18} className="mt-0.5 text-[#FFB100]" />
              <div>
                <p className="font-mono text-xs font-semibold text-[#FFB100] uppercase tracking-wider">
                  Operational note
                </p>
                <p className="mt-2 text-sm leading-6 text-[#f4f4f0]/90">
                  Keep this panel focused on moderation, approvals, and routing
                  future organizer workflows without changing the public user
                  experience.
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent?: string;
}) {
  return (
    <article className="rounded-md border border-[#242422] bg-[#141413] p-5 transition-all duration-200 hover:border-[#FFB100]/30">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#FFB100]/30 bg-[#FFB100]/10 text-[#FFB100]">
        <Icon size={18} />
      </div>
      <p className="mt-4 font-mono text-3xl font-bold text-[#f4f4f0] tabular-nums">
        {value}
      </p>
      <p className="mt-1 font-mono text-xs text-[#8a8a86] uppercase tracking-wider">{title}</p>
    </article>
  );
}

function ActionCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-md border border-[#242422] bg-[#0e0e0d] p-4 transition-all hover:border-[#FFB100]/40 hover:bg-[#181816]"
    >
      <p className="font-medium text-[#f4f4f0]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[#8a8a86]">{description}</p>
    </Link>
  );
}

function formatDate(value?: string) {
  if (!value) {
    return "Recently";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
