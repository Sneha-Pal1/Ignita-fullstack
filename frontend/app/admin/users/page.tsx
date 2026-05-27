"use client";

import { useEffect, useMemo, useState } from "react";
import { adminAPI } from "@/lib/api-endpoints";
import { Users, UserCircle2 } from "lucide-react";

type AdminUser = Awaited<ReturnType<typeof adminAPI.getUsers>>[number];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const items = await adminAPI.getUsers();
        if (isMounted) {
          setUsers(items);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load users.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return users;
    }

    return users.filter((user) =>
      [user.name, user.email, user.role].some((value) =>
        value?.toLowerCase().includes(query),
      ),
    );
  }, [search, users]);

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">
          Users
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          View every account in a clean operational table.
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
          Keep this page intentionally simple so admins can inspect roles, email
          addresses, and sign-up timing quickly.
        </p>
      </section>

      {error ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Users size={16} className="text-emerald-400" />
            {filteredUsers.length} users
          </div>
          <label className="rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 py-2">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search users"
              className="bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
            />
          </label>
        </div>

        {isLoading ? (
          <div className="space-y-3 animate-pulse">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-16 rounded-xl bg-zinc-800/60" />
            ))}
          </div>
        ) : filteredUsers.length ? (
          <div className="overflow-hidden rounded-xl border border-zinc-800">
            <table className="min-w-full divide-y divide-zinc-800 text-sm">
              <thead className="bg-zinc-950/80 text-zinc-400">
                <tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>Joined</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 bg-zinc-900/50">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-zinc-900/80 transition-colors"
                  >
                    <Td>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/70 text-emerald-400">
                          <UserCircle2 size={18} />
                        </div>
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="mt-1 text-xs text-zinc-500">
                            ID: {user.id}
                          </p>
                        </div>
                      </div>
                    </Td>
                    <Td>{user.email}</Td>
                    <Td>
                      <RolePill role={user.role || "USER"} />
                    </Td>
                    <Td>{formatDate(user.createdAt)}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-zinc-800 px-6 py-16 text-center text-sm text-zinc-500">
            No users match the current search.
          </div>
        )}
      </section>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em]">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-4 align-top text-zinc-300">{children}</td>;
}

function RolePill({ role }: { role: string }) {
  const className =
    role === "ADMIN"
      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
      : role === "STUDENT"
        ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-400"
        : "border-zinc-700 bg-zinc-800/60 text-zinc-400";

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {role}
    </span>
  );
}

function formatDate(value?: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
