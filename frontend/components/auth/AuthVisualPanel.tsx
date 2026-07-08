"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const BOOT_LINES = [
  "ignita-kernel v2.6.0 booting...",
  "loading event aggregator............[OK]",
  "mounting campus feed.................[OK]",
  "connecting to 100+ orgs..............[OK]",
  "syncing hackathon registry...........[OK]",
  "indexing 10,000+ developer profiles..[OK]",
  "spawning opportunity daemon..........[OK]",
  "> system ready. welcome back.",
];

const LIVE_EVENTS = [
  {
    tag: "HACK",
    name: "Ignita Winter Hackathon",
    date: "Oct 24–26, 2026",
    prize: "$10,000",
    spots: "80 left",
  },
  {
    tag: "CONT",
    name: "CodeForces Mirror Round #921",
    date: "Jul 12, 2026",
    prize: null,
    spots: "open",
  },
  {
    tag: "INTL",
    name: "Google STEP Internship",
    date: "Deadline Aug 01",
    prize: null,
    spots: "apply",
  },
  {
    tag: "WORK",
    name: "MLOps Workshop — IIT Bombay",
    date: "Jul 18, 2026",
    prize: null,
    spots: "240 left",
  },
];

export default function AuthVisualPanel() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (visibleLines < BOOT_LINES.length) {
      const t = setTimeout(
        () => setVisibleLines((v) => v + 1),
        visibleLines === 0 ? 300 : 130,
      );
      return () => clearTimeout(t);
    }
  }, [visibleLines]);

  useEffect(() => {
    const i = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-10 relative min-h-screen overflow-hidden bg-[#090c0a] border-r border-[#1a2a1a] select-none font-martian-mono">
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,80,0.015) 2px, rgba(0,255,80,0.015) 4px)",
        }}
      />

      {/* Faint green grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,80,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,80,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-[-80px] left-[-80px] w-[420px] h-[420px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* ── TOP: Logo ─────────────────────────────── */}
      <div className="relative z-10 flex items-center gap-2.5">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <Image
            src="/icons/iglogoremovebg.png"
            alt="logo"
            width={34}
            height={34}
            priority
          />
          <span className="text-base font-bold tracking-[0.15em] text-emerald-400 uppercase">
            IGNITA
          </span>
        </Link>
        <span className="ml-2 text-[10px] text-zinc-600 tracking-widest uppercase">
          // student dev platform
        </span>
      </div>

      {/* ── MIDDLE: Terminal ──────────────────────── */}
      <div className="relative z-10 flex flex-col gap-6 my-auto">
        {/* Boot terminal */}
        <div className="bg-[#0c110d] border border-[#1e301e] rounded-lg overflow-hidden shadow-[0_0_40px_rgba(0,255,80,0.04)]">
          {/* Terminal bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1e301e] bg-[#0a0f0b]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            <span className="ml-3 text-[10px] text-zinc-600 tracking-widest">
              ignita@shell ~ %
            </span>
          </div>

          <div className="p-5 text-[11.5px] leading-6 text-emerald-400/90 min-h-[220px]">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-emerald-600 shrink-0">$</span>
                <span>{line}</span>
              </div>
            ))}
            {visibleLines < BOOT_LINES.length && (
              <div className="flex items-start gap-2">
                <span className="text-emerald-600 shrink-0">$</span>
                <span
                  className="inline-block w-2 h-3.5 bg-emerald-400 mt-0.5"
                  style={{ opacity: blink ? 1 : 0 }}
                />
              </div>
            )}
            {visibleLines >= BOOT_LINES.length && (
              <span
                className="inline-block w-2 h-3.5 bg-emerald-400 ml-4 mt-1"
                style={{ opacity: blink ? 1 : 0, verticalAlign: "middle" }}
              />
            )}
          </div>
        </div>

        {/* Live event feed */}
        <div className="border border-[#1e301e] rounded-lg overflow-hidden bg-[#0c110d]">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1e301e] bg-[#0a0f0b]">
            <span className="text-[10px] text-emerald-500 uppercase tracking-[0.2em] font-bold">
              ● live_feed
            </span>
            <span className="text-[10px] text-zinc-600">
              updated 2m ago
            </span>
          </div>
          <div className="divide-y divide-[#141e15]">
            {LIVE_EVENTS.map((ev, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-500/[0.03] transition-colors"
              >
                <span className="text-[9px] font-bold tracking-wider text-zinc-600 border border-zinc-800 rounded px-1.5 py-0.5 shrink-0 w-10 text-center">
                  {ev.tag}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-zinc-200 truncate">{ev.name}</p>
                  <p className="text-[10px] text-zinc-600">{ev.date}</p>
                </div>
                <div className="text-right shrink-0">
                  {ev.prize && (
                    <p className="text-[10px] font-bold text-emerald-400">{ev.prize}</p>
                  )}
                  <p className="text-[10px] text-zinc-600">{ev.spots}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "devs_online", value: "10k+" },
            { label: "events_live", value: "247" },
            { label: "prizes_paid", value: "$45k" },
          ].map((s) => (
            <div
              key={s.label}
              className="border border-[#1e301e] rounded-lg px-3 py-3 bg-[#0c110d] text-center"
            >
              <p className="text-base font-bold text-emerald-400">{s.value}</p>
              <p className="text-[9px] text-zinc-600 mt-0.5 tracking-wider">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM: Footer ───────────────────────── */}
      <div className="relative z-10 border-t border-[#1a2a1a] pt-5">
        <p className="text-[10px] text-zinc-700 leading-5 tracking-wide">
          © 2026 IGNITA — built for builders.{" "}
          <span className="text-zinc-600">v2.6.0-stable</span>
        </p>
      </div>
    </div>
  );
}
