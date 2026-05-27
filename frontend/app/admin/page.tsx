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
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">
              Admin Overview
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              Platform control, events, users, and alerts in one place.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
              Manage IGNITA with a structured SaaS control surface built for
              operations, moderation, and future organizer workflows.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-400">
            <ShieldCheck size={14} />
            Admin only
          </div>
        </div>
      </section>

      {error ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 animate-pulse"
            >
              <div className="h-9 w-9 rounded-lg bg-zinc-800 mb-4" />
              <div className="h-7 w-16 rounded bg-zinc-800 mb-2" />
              <div className="h-4 w-24 rounded bg-zinc-800" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Total Events"
            value={stats?.totalEvents ?? 0}
            icon={CalendarDays}
            accent="emerald"
          />
          <MetricCard
            title="Total Users"
            value={stats?.totalUsers ?? 0}
            icon={Users}
            accent="teal"
          />
          <MetricCard
            title="Total Bookmarks"
            value={stats?.totalBookmarks ?? 0}
            icon={Bookmark}
            accent="cyan"
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
          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <h3 className="text-base font-semibold text-white">
                Recent Events
              </h3>
              <Link
                href="/admin/events"
                className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
              >
                View all
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="divide-y divide-zinc-800">
              {(data?.recentEvents ?? []).map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-white">{event.title}</p>
                    <p className="mt-1 text-sm text-zinc-400">
                      {event.category} · {event.mode} ·{" "}
                      {event.organizer || "No organizer"}
                    </p>
                  </div>
                  <div className="text-sm text-zinc-500">
                    {formatDate(event.createdAt)}
                  </div>
                </div>
              ))}
              {!data?.recentEvents?.length ? (
                <div className="px-5 py-10 text-sm text-zinc-500">
                  No recent events yet.
                </div>
              ) : null}
            </div>
          </section>

          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50">
            <div className="border-b border-zinc-800 px-5 py-4">
              <h3 className="text-base font-semibold text-white">
                User Activity
              </h3>
            </div>
            <div className="divide-y divide-zinc-800">
              {(data?.recentUsers ?? []).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between gap-4 px-5 py-4"
                >
                  <div>
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="mt-1 text-sm text-zinc-400">{user.email}</p>
                  </div>
                  <div className="text-right text-sm text-zinc-500">
                    <p>{user.role || "USER"}</p>
                    <p>{formatDate(user.createdAt)}</p>
                  </div>
                </div>
              ))}
              {!data?.recentUsers?.length ? (
                <div className="px-5 py-10 text-sm text-zinc-500">
                  No user activity yet.
                </div>
              ) : null}
            </div>
          </section>

          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">
                Quick Actions
              </h3>
              <Sparkles size={16} className="text-emerald-400" />
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
          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50">
            <div className="border-b border-zinc-800 px-5 py-4">
              <h3 className="text-base font-semibold text-white">
                Recent Alerts
              </h3>
            </div>
            <div className="divide-y divide-zinc-800">
              {(data?.recentAlerts ?? []).map((alert) => (
                <div key={alert.id} className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 rounded-lg border px-2 py-1 text-[11px] font-medium ${alert.read ? "border-zinc-700 bg-zinc-800/60 text-zinc-400" : "border-amber-500/20 bg-amber-500/10 text-amber-400"}`}
                    >
                      {alert.read ? "Read" : "New"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white">
                        {alert.message}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {alert.user?.name || "System"} ·{" "}
                        {formatDate(alert.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {!data?.recentAlerts?.length ? (
                <div className="px-5 py-10 text-sm text-zinc-500">
                  No alerts available.
                </div>
              ) : null}
            </div>
          </section>

          <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <h3 className="text-base font-semibold text-white">
              Pending Actions
            </h3>
            <div className="mt-4 space-y-3">
              {(data?.pendingActions ?? []).map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-zinc-300">{item.label}</p>
                    <p className="text-lg font-semibold text-white tabular-nums">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5">
            <div className="flex items-start gap-3">
              <Clock3 size={18} className="mt-0.5 text-emerald-400" />
              <div>
                <p className="font-semibold text-emerald-300">
                  Operational note
                </p>
                <p className="mt-2 text-sm leading-6 text-emerald-100/80">
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
  accent,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent: "emerald" | "teal" | "cyan" | "amber";
}) {
  const accentClass: Record<typeof accent, string> = {
    emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    teal: "border-teal-500/20 bg-teal-500/10 text-teal-400",
    cyan: "border-cyan-500/20 bg-cyan-500/10 text-cyan-400",
    amber: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  };

  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900">
      <div
        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${accentClass[accent]}`}
      >
        <Icon size={18} />
      </div>
      <p className="mt-4 text-3xl font-semibold text-white tabular-nums">
        {value}
      </p>
      <p className="mt-1 text-sm text-zinc-400">{title}</p>
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
      className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 transition-colors hover:border-emerald-500/20 hover:bg-zinc-900"
    >
      <p className="font-medium text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
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
