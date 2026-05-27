export const AdminShellSkeleton = () => {
  return (
    <div className="flex h-dvh overflow-hidden bg-zinc-950 animate-pulse">
      <aside className="hidden lg:flex fixed left-0 top-0 h-dvh w-64 flex-col border-r border-zinc-800 bg-zinc-950">
        <div className="h-20 border-b border-zinc-800 px-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-zinc-800" />
          <div className="h-5 w-24 rounded bg-zinc-800" />
        </div>
        <div className="p-4 space-y-3">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="h-11 rounded-xl bg-zinc-900/70" />
          ))}
        </div>
      </aside>

      <div className="flex-1 lg:pl-64 flex flex-col overflow-hidden">
        <header className="h-20 border-b border-zinc-800 bg-zinc-950 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="h-5 w-40 rounded bg-zinc-800" />
          <div className="flex items-center gap-3">
            <div className="h-10 w-64 rounded-xl bg-zinc-900/70 hidden md:block" />
            <div className="h-10 w-10 rounded-full bg-zinc-800" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
              >
                <div className="h-9 w-9 rounded-lg bg-zinc-800 mb-4" />
                <div className="h-7 w-16 rounded bg-zinc-800 mb-2" />
                <div className="h-4 w-24 rounded bg-zinc-800" />
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
            <div className="space-y-6">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                <div className="h-6 w-40 rounded bg-zinc-800 mb-6" />
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-14 rounded-xl bg-zinc-800/60"
                    />
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                <div className="h-6 w-48 rounded bg-zinc-800 mb-6" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="h-40 rounded-xl bg-zinc-800/60" />
                  <div className="h-40 rounded-xl bg-zinc-800/60" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                <div className="h-6 w-32 rounded bg-zinc-800 mb-4" />
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-20 rounded-xl bg-zinc-800/60"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
