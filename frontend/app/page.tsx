import React from "react";
import { LevoHero } from "@/components/levo/LevoHero";
import { LevoPhilosophy } from "@/components/levo/LevoPhilosophy";
import { LevoCapabilityCard } from "@/components/levo/LevoCapabilityCard";
import { LevoFeaturesGrid } from "@/components/levo/LevoFeaturesGrid";
import { LevoCTA } from "@/components/levo/LevoCTA";
import Footer from "@/components/Footer";
import {
  HackathonDiagram,
  InternshipDiagram,
  ContestDiagram,
  WorkshopDiagram,
} from "@/components/levo/SVGDiagrams";

export default function Home() {
  return (
    <div className="relative w-full bg-[#0e0e0d] text-[#f4f4f0]">
      {/* 01 Hero Section */}
      <LevoHero />

      {/* 02 Philosophy Text Crawl Section */}
      <LevoPhilosophy />

      {/* 03 Hackathons Capability */}
      <LevoCapabilityCard
        num="03"
        category="HACKATHONS"
        title="Global Hackathons & Build-athons"
        description="Scrape and aggregate major hackathons from Devpost, Unstop, MLH, and university portals. Filter by track, prize pool, team size, and remote vs. in-person."
        tags={["DEVPOST", "MLH", "UNSTOP", "PRIZE RADAR"]}
        href="/events?category=Hackathon"
        ctaText="Explore Hackathons"
        diagram={<HackathonDiagram />}
      />

      {/* 04 Internships Capability */}
      <LevoCapabilityCard
        num="04"
        category="INTERNSHIPS"
        title="Verified Tech Internships & Fellowships"
        description="Never miss an application window for SDE, AI/ML, DevOps, or product management internships. Track early applications, batch releases, and referral opportunities."
        tags={["SDE ROLES", "AI FELLOWSHIPS", "SUMMER 2026", "AUTOMATED TRACKER"]}
        href="/events?category=Internship"
        ctaText="Explore Internships"
        diagram={<InternshipDiagram />}
      />

      {/* 05 Contests Capability */}
      <LevoCapabilityCard
        num="05"
        category="COMPETITIVE CODING"
        title="Coding Contests & Algorithmic Clashes"
        description="Unified schedule for LeetCode, Codeforces, CodeChef, and AtCoder contests. Sync your calendar to receive reminder alerts 30 minutes before round start."
        tags={["LEETCODE", "CODEFORCES", "CODECHEF", "ATCODER"]}
        href="/events?category=Contest"
        ctaText="Explore Contests"
        diagram={<ContestDiagram />}
      />

      {/* 06 Workshops Capability */}
      <LevoCapabilityCard
        num="06"
        category="WORKSHOPS & SESSIONS"
        title="Developer Masterclasses & Bootcamps"
        description="Live technical webinars on System Design, LLM Engineering, Rust, and Open Source contribution hosted by industry leads and open-source maintainers."
        tags={["SYSTEM DESIGN", "LLM INFRA", "OPEN SOURCE", "CERTIFICATIONS"]}
        href="/events?category=Workshop"
        ctaText="Explore Workshops"
        diagram={<WorkshopDiagram />}
      />

      {/* 07 Core Features Grid */}
      <LevoFeaturesGrid />

      {/* 08 Terminal CTA */}
      <LevoCTA />

      {/* 09 Footer */}
      <Footer />
    </div>
  );
}
