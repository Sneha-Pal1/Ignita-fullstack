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
      <section className="rounded-md border border-[#242422] bg-[#141413] p-6 shadow-2xl shadow-black/40">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#FFB100]">
          Users
        </p>
        <h2 className="mt-2 text-2xl font-bold text-[#f4f4f0] sm:text-3xl">
          View every account in a clean operational table.
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8a8a86]">
          Keep this page intentionally simple so admins can inspect roles, email
          addresses, and sign-up timing quickly.
        </p>
      </section>

      {error ? (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 font-mono text-sm text-red-400">
          {error}
        </div>
      ) : null}

      <section className="rounded-md border border-[#242422] bg-[#141413] p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-xs text-[#8a8a86]">
            <Users size={16} className="text-[#FFB100]" />
            {filteredUsers.length} users
          </div>
          <label className="rounded-md border border-[#242422] bg-[#0e0e0d] px-4 py-2">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search users"
              className="bg-transparent text-sm text-[#f4f4f0] outline-none placeholder:text-[#8a8a86]/50"
            />
          </label>
        </div>

        {isLoading ? (
          <div className="space-y-3 animate-pulse">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-16 rounded-md bg-[#242422]" />
            ))}
          </div>
        ) : filteredUsers.length ? (
          <div className="overflow-hidden rounded-md border border-[#242422]">
            <table className="min-w-full divide-y divide-[#242422] text-sm">
              <thead className="bg-[#0e0e0d] font-mono text-xs text-[#8a8a86]">
                <tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>Joined</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242422] bg-[#141413]">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-[#181816] transition-colors"
                  >
                    <Td>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[#242422] bg-[#0e0e0d] text-[#FFB100]">
                          <UserCircle2 size={18} />
                        </div>
                        <div>
                          <p className="font-medium text-[#f4f4f0]">{user.name}</p>
                          <p className="mt-0.5 font-mono text-[11px] text-[#8a8a86]">
                            ID: {user.id}
                          </p>
                        </div>
                      </div>
                    </Td>
                    <Td><span className="font-mono text-xs text-[#8a8a86]">{user.email}</span></Td>
                    <Td>
                      <RolePill role={user.role || "USER"} />
                    </Td>
                    <Td><span className="font-mono text-xs text-[#8a8a86]">{formatDate(user.createdAt)}</span></Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-[#242422] px-6 py-16 text-center font-mono text-sm text-[#8a8a86]">
            No users match the current search.
          </div>
        )}
      </section>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a8a86]">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-4 align-top text-[#f4f4f0]">{children}</td>;
}

function RolePill({ role }: { role: string }) {
  const className =
    role === "ADMIN"
      ? "border-[#FFB100]/30 bg-[#FFB100]/10 text-[#FFB100]"
      : "border-[#242422] bg-[#181816] text-[#8a8a86]";

  return (
    <span
      className={`inline-flex rounded-md border px-2.5 py-0.5 font-mono text-xs font-medium ${className}`}
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
