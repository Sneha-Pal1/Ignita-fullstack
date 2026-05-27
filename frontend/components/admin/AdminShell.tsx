"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useAuthContext } from "@/lib/auth-context";
import { AdminShellSkeleton } from "./AdminShellSkeleton";
import {
  BellRing,
  CalendarDays,
  ChartColumnIncreasing,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusSquare,
  Search,
  Settings2,
  Users,
  X,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
};

const navItems: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Events", href: "/admin/events", icon: CalendarDays },
  { label: "Create Event", href: "/admin/create-event", icon: PlusSquare },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: ChartColumnIncreasing },
  { label: "Alerts", href: "/alerts", icon: BellRing },
  { label: "Settings", href: "/profile", icon: Settings2 },
];

export const AdminShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, logout } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!isAdmin) {
      router.replace("/Dashboard");
    }
  }, [isAdmin, isLoading, router, user]);

  const activeSection = useMemo(
    () =>
      navItems.find(
        (item) =>
          pathname === item.href || pathname.startsWith(`${item.href}/`),
      ),
    [pathname],
  );

  if (isLoading || !user || !isAdmin) {
    return <AdminShellSkeleton />;
  }

  const handleLogout = async () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Close admin navigation"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-72 flex-col overflow-y-auto border-r border-zinc-800 bg-zinc-950 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-zinc-800 px-6">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 font-semibold">
              I
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-emerald-400 uppercase">
                IGNITA
              </p>
              <p className="text-xs text-zinc-500">Admin Control Room</p>
            </div>
          </Link>

          <button
            type="button"
            className="rounded-lg border border-zinc-800 p-2 text-zinc-400 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-5">
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                    : "border-transparent text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900 hover:text-zinc-100"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-zinc-800 p-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Signed in as
            </p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {user.name}
                </p>
                <p className="truncate text-xs text-zinc-500">{user.email}</p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 text-zinc-300 transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
                aria-label="Sign out"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
          <div className="flex h-20 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 text-zinc-300 lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open admin navigation"
            >
              <Menu size={18} />
            </button>

            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">
                Admin Dashboard
              </p>
              <div className="flex items-center gap-2 min-w-0">
                <h1 className="truncate text-base font-semibold text-white sm:text-lg">
                  Welcome back, {user.name.split(" ")[0] || "Admin"}
                </h1>
                {activeSection ? (
                  <span className="hidden rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-400 sm:inline-flex">
                    {activeSection.label}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="hidden items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2 md:flex md:w-80">
              <Search size={16} className="text-zinc-500" />
              <input
                type="text"
                placeholder="Quick search"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
              />
            </div>

            <Link
              href="/alerts"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
              aria-label="View alerts"
            >
              <BellRing size={18} />
            </Link>

            <Link
              href="/profile"
              className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/15"
            >
              {user.name.charAt(0).toUpperCase()}
            </Link>
          </div>
        </header>

        <main className="flex-1 bg-zinc-950">{children}</main>
      </div>
    </div>
  );
};
