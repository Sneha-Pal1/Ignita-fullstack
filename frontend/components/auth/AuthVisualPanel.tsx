import Link from "next/link";
import Image from "next/image";
import { Search, Bell, Bookmark, BarChart3 } from "lucide-react";

const FEATURES = [
  {
    icon: Search,
    title: "Discover events",
    desc: "Browse hackathons, internships, contests and workshops in one place.",
  },
  {
    icon: Bell,
    title: "Deadline alerts",
    desc: "Get notified before registrations close so you never miss out.",
  },
  {
    icon: Bookmark,
    title: "Save & track",
    desc: "Bookmark events and revisit them from your personal dashboard.",
  },
  {
    icon: BarChart3,
    title: "Track progress",
    desc: "See your participation history and activity over time.",
  },
];

export default function AuthVisualPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 min-h-screen bg-[#161b22] border-r border-[#21262d] select-none">

      {/* Top — Logo */}
      <div>
        <Link href="/" className="inline-flex items-center gap-2.5">
          <Image
            src="/icons/iglogoremovebg.png"
            alt="Ignita"
            width={28}
            height={28}
            priority
          />
          <span className="text-sm font-semibold text-[#e6edf3]">Ignita</span>
        </Link>
      </div>

      {/* Middle */}
      <div className="flex flex-col gap-10 my-auto">

        {/* Headline */}
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-[#e6edf3] leading-snug tracking-tight">
            Your next opportunity<br />is waiting.
          </h2>
          <p className="text-sm text-[#7d8590] leading-relaxed max-w-xs">
            Everything student developers need to find and track tech opportunities — in one place.
          </p>
        </div>

        {/* Feature list */}
        <div className="flex flex-col gap-5">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="flex items-start gap-4">
                <div className="mt-0.5 w-8 h-8 shrink-0 flex items-center justify-center rounded-md bg-[#0d1117] border border-[#21262d]">
                  <Icon className="w-4 h-4 text-[#3fb950]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#e6edf3]">{f.title}</p>
                  <p className="text-sm text-[#7d8590] leading-relaxed mt-0.5">
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#21262d] pt-6">
        <p className="text-xs text-[#484f58]">
          © {new Date().getFullYear()} Ignita. All rights reserved.
        </p>
      </div>
    </div>
  );
}
