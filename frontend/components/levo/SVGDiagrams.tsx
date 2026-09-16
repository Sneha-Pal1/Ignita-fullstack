"use client";

import React from "react";

export function HackathonDiagram() {
  return (
    <svg
      viewBox="0 0 500 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-h-[300px] text-white/80 select-none"
    >
      <rect width="500" height="320" rx="4" fill="#141413" stroke="rgba(255,255,255,0.08)" />
      {/* Grid pattern background */}
      <pattern id="grid1" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      </pattern>
      <rect width="500" height="320" fill="url(#grid1)" />

      {/* Nodes */}
      {/* Node 1: Sources */}
      <g transform="translate(40, 60)">
        <rect width="100" height="48" rx="2" fill="#1a1a18" stroke="#FFB100" strokeWidth="1.5" />
        <text x="50" y="24" fill="#FFB100" fontSize="10" fontFamily="monospace" textAnchor="middle" dominantBaseline="middle">SOURCES</text>
        <text x="50" y="36" fill="#8a8a86" fontSize="8" fontFamily="sans-serif" textAnchor="middle">Devpost / MLH</text>
      </g>

      {/* Node 2: Pipeline */}
      <g transform="translate(200, 60)">
        <rect width="100" height="48" rx="2" fill="#1a1a18" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <text x="50" y="24" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" dominantBaseline="middle">PARSER</text>
        <text x="50" y="36" fill="#8a8a86" fontSize="8" fontFamily="sans-serif" textAnchor="middle">AI Extraction</text>
      </g>

      {/* Node 3: Database */}
      <g transform="translate(360, 60)">
        <rect width="100" height="48" rx="2" fill="#1a1a18" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <text x="50" y="24" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle" dominantBaseline="middle">STORAGE</text>
        <text x="50" y="36" fill="#8a8a86" fontSize="8" fontFamily="sans-serif" textAnchor="middle">PostgreSQL DB</text>
      </g>

      {/* Connecting lines top */}
      <path d="M 140 84 L 200 84" stroke="#FFB100" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="170" cy="84" r="3" fill="#FFB100" />
      <path d="M 300 84 L 360 84" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

      {/* Center Flow Box */}
      <g transform="translate(100, 160)">
        <rect width="300" height="110" rx="2" fill="#181816" stroke="rgba(255,177,0,0.3)" strokeWidth="1" />
        <line x1="0" y1="30" x2="300" y2="30" stroke="rgba(255,255,255,0.08)" />
        <circle cx="15" cy="15" r="4" fill="#FFB100" />
        <text x="28" y="19" fill="#ffffff" fontSize="10" fontFamily="monospace">LIVE MATCH ENGINE</text>
        
        {/* Signal waves */}
        <path d="M 30 65 Q 80 40 130 65 T 230 65" fill="none" stroke="#FFB100" strokeWidth="1.5" />
        <path d="M 30 85 Q 80 60 130 85 T 230 85" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        
        <circle cx="130" cy="65" r="4" fill="#FFB100" />
        <text x="140" y="68" fill="#FFB100" fontSize="9" fontFamily="monospace">MATCH 98%</text>
      </g>

      {/* Down arrow connector */}
      <path d="M 250 108 L 250 160" stroke="#FFB100" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

export function InternshipDiagram() {
  return (
    <svg
      viewBox="0 0 500 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-h-[300px] text-white/80 select-none"
    >
      <rect width="500" height="320" rx="4" fill="#141413" stroke="rgba(255,255,255,0.08)" />
      
      {/* Timeline Pipeline */}
      <g transform="translate(40, 40)">
        <text x="0" y="15" fill="#8a8a86" fontSize="10" fontFamily="monospace">APPLICATION PIPELINE</text>
        
        {/* Step 1 */}
        <g transform="translate(0, 40)">
          <rect width="420" height="42" rx="2" fill="#181816" stroke="rgba(255,255,255,0.1)" />
          <circle cx="20" cy="21" r="5" fill="#FFB100" />
          <text x="35" y="25" fill="#ffffff" fontSize="11" fontFamily="monospace">01 / SDE Intern @ Google 2026</text>
          <rect x="310" y="12" width="90" height="18" rx="2" fill="rgba(255,177,0,0.15)" stroke="#FFB100" />
          <text x="355" y="24" fill="#FFB100" fontSize="8" fontFamily="monospace" textAnchor="middle">APPLICATIONS OPEN</text>
        </g>

        {/* Step 2 */}
        <g transform="translate(0, 95)">
          <rect width="420" height="42" rx="2" fill="#181816" stroke="rgba(255,255,255,0.1)" />
          <circle cx="20" cy="21" r="5" fill="#8a8a86" />
          <text x="35" y="25" fill="#ffffff" fontSize="11" fontFamily="monospace">02 / Backend Fellow @ Stripe</text>
          <rect x="310" y="12" width="90" height="18" rx="2" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
          <text x="355" y="24" fill="#8a8a86" fontSize="8" fontFamily="monospace" textAnchor="middle">CLOSING SOON</text>
        </g>

        {/* Step 3 */}
        <g transform="translate(0, 150)">
          <rect width="420" height="42" rx="2" fill="#181816" stroke="rgba(255,255,255,0.1)" />
          <circle cx="20" cy="21" r="5" fill="#8a8a86" />
          <text x="35" y="25" fill="#ffffff" fontSize="11" fontFamily="monospace">03 / AI Research @ OpenAI</text>
          <rect x="310" y="12" width="90" height="18" rx="2" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
          <text x="355" y="24" fill="#8a8a86" fontSize="8" fontFamily="monospace" textAnchor="middle">VERIFIED LISTING</text>
        </g>
      </g>

      {/* Bottom info bar */}
      <g transform="translate(40, 255)">
        <line x1="0" y1="0" x2="420" y2="0" stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
        <text x="0" y="20" fill="#FFB100" fontSize="9" fontFamily="monospace">● AUTOMATED DEADLINE TRACKER ACTIVE</text>
        <text x="420" y="20" fill="#8a8a86" fontSize="9" fontFamily="monospace" textAnchor="end">14 NEW ROLES TODAY</text>
      </g>
    </svg>
  );
}

export function ContestDiagram() {
  return (
    <svg
      viewBox="0 0 500 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-h-[300px] text-white/80 select-none"
    >
      <rect width="500" height="320" rx="4" fill="#141413" stroke="rgba(255,255,255,0.08)" />

      {/* Bar Chart / Leaderboard radar */}
      <g transform="translate(50, 40)">
        <text x="0" y="15" fill="#8a8a86" fontSize="10" fontFamily="monospace">COMPETITION PERFORMANCE & TIMINGS</text>

        {/* Axis */}
        <line x1="40" y1="180" x2="400" y2="180" stroke="rgba(255,255,255,0.15)" />
        <line x1="40" y1="40" x2="40" y2="180" stroke="rgba(255,255,255,0.15)" />

        {/* Bars */}
        {/* Codeforces */}
        <rect x="70" y="90" width="36" height="90" fill="#1a1a18" stroke="rgba(255,255,255,0.2)" />
        <text x="88" y="195" fill="#8a8a86" fontSize="8" fontFamily="monospace" textAnchor="middle">CF</text>

        {/* LeetCode */}
        <rect x="150" y="60" width="36" height="120" fill="#1a1a18" stroke="#FFB100" strokeWidth="1.5" />
        <rect x="150" y="60" width="36" height="120" fill="rgba(255,177,0,0.15)" />
        <text x="168" y="195" fill="#FFB100" fontSize="8" fontFamily="monospace" textAnchor="middle">LC</text>

        {/* CodeChef */}
        <rect x="230" y="110" width="36" height="70" fill="#1a1a18" stroke="rgba(255,255,255,0.2)" />
        <text x="248" y="195" fill="#8a8a86" fontSize="8" fontFamily="monospace" textAnchor="middle">CC</text>

        {/* AtCoder */}
        <rect x="310" y="75" width="36" height="105" fill="#1a1a18" stroke="rgba(255,255,255,0.2)" />
        <text x="328" y="195" fill="#8a8a86" fontSize="8" fontFamily="monospace" textAnchor="middle">AC</text>

        {/* Trend Line */}
        <path d="M 88 120 L 168 80 L 248 135 L 328 100" fill="none" stroke="#FFB100" strokeWidth="2" />
        <circle cx="168" cy="80" r="4" fill="#FFB100" />
      </g>

      <g transform="translate(50, 260)">
        <rect width="400" height="30" rx="2" fill="#1a1a18" stroke="rgba(255,255,255,0.08)" />
        <text x="15" y="19" fill="#ffffff" fontSize="9" fontFamily="monospace">UPCOMING: LeetCode Weekly Contest 440</text>
        <text x="385" y="19" fill="#FFB100" fontSize="9" fontFamily="monospace" textAnchor="end">IN 04H 12M</text>
      </g>
    </svg>
  );
}

export function WorkshopDiagram() {
  return (
    <svg
      viewBox="0 0 500 265"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto max-h-[300px] text-white/80 select-none"
    >
      <rect width="500" height="265" rx="4" fill="#141413" stroke="rgba(255,255,255,0.08)" />

      {/* Main container */}
      <g transform="translate(35, 25)">
        <text x="0" y="12" fill="#8a8a86" fontSize="10" fontFamily="monospace" letterSpacing="0.05em">LIVE WORKSHOPS & MASTERCLASSES</text>

        {/* Card 1 */}
        <g transform="translate(0, 30)">
          <rect width="205" height="105" rx="3" fill="#181816" stroke="#FFB100" strokeWidth="1.5" />
          <circle cx="15" cy="20" r="3.5" fill="#FFB100" />
          <text x="25" y="23" fill="#FFB100" fontSize="9" fontFamily="monospace" fontWeight="bold">SYSTEM DESIGN 101</text>
          <text x="15" y="46" fill="#ffffff" fontSize="10.5" fontFamily="sans-serif" fontWeight="bold">Distributed Systems at Scale</text>
          <text x="15" y="65" fill="#8a8a86" fontSize="9" fontFamily="monospace">Sat, Oct 14 · 18:00 UTC</text>
          <rect x="15" y="75" width="75" height="18" rx="2" fill="rgba(255,177,0,0.15)" stroke="rgba(255,177,0,0.4)" strokeWidth="1" />
          <text x="52.5" y="87" fill="#FFB100" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">RSVP ACTIVE</text>
        </g>

        {/* Card 2 */}
        <g transform="translate(225, 30)">
          <rect width="205" height="105" rx="3" fill="#181816" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <circle cx="15" cy="20" r="3.5" fill="#8a8a86" />
          <text x="25" y="23" fill="#8a8a86" fontSize="9" fontFamily="monospace" fontWeight="bold">AI & LLM INFRA</text>
          <text x="15" y="46" fill="#ffffff" fontSize="10.5" fontFamily="sans-serif" fontWeight="bold">Building RAG with LangChain</text>
          <text x="15" y="65" fill="#8a8a86" fontSize="9" fontFamily="monospace">Sun, Oct 15 · 15:00 UTC</text>
          <rect x="15" y="75" width="68" height="18" rx="2" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <text x="49" y="87" fill="#8a8a86" fontSize="7.5" fontFamily="monospace" textAnchor="middle">UPCOMING</text>
        </g>

        {/* Card 3 */}
        <g transform="translate(0, 150)">
          <rect width="430" height="60" rx="3" fill="#181816" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <text x="15" y="24" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">03 / RUST KERNEL DEV WORKSHOP</text>
          <text x="15" y="42" fill="#8a8a86" fontSize="9" fontFamily="sans-serif">Hosted by Rust Foundation · Free Certification Included</text>
          <rect x="325" y="16" width="90" height="28" rx="2" fill="#FFB100" />
          <text x="370" y="33" fill="#000000" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">REGISTER</text>
        </g>
      </g>
    </svg>
  );
}
