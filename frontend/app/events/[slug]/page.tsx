"use client";

import { useEffect, useState } from "react";
import { events } from "@/lib/data/events";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Bookmark, Gift, CheckCircle, Calendar, Clock, MapPin, Users } from "lucide-react";
import { useBookmark } from "@/lib/hooks/useBookmark";
import { eventsAPI, type Event as BackendEvent } from "@/lib/api-endpoints";

type DetailData = {
  title: string;
  image: string;
  organizer?: string;
  tags?: string[];
  date: string;
  applicationDeadline: string;
  location: string;
  prizes: string;
  participants: string;
  requirements: string;
  about: string;
  schedule?: { time: string; activity: string }[];
  registrationLink?: string;
};

function formatDate(value?: string) {
  if (!value) return "TBA";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "TBA";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function mapBackendEvent(event: BackendEvent): DetailData {
  return {
    title: event.title,
    image: event.bannerImage || "/images/event1.png",
    organizer: event.organizer ? `by ${event.organizer}` : "IGNITA",
    tags: event.tags || [],
    date:
      event.startDate && event.endDate
        ? `${formatDate(event.startDate)} - ${formatDate(event.endDate)}`
        : formatDate(event.startDate),
    applicationDeadline: formatDate(event.deadline),
    location: event.location || "TBA",
    prizes: event.mode || event.category || "Live event",
    participants: event.tags?.length
      ? event.tags.join(", ")
      : "Open registration",
    requirements: event.registrationLink
      ? "Registration available"
      : "Check event details",
    about: event.description || "Event details will be shared by the organizer.",
    registrationLink: event.registrationLink,
  };
}

const EventDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const mockEvent = events.find((e) => e.slug === slug);
  const [backendEvent, setBackendEvent] = useState<DetailData | null>(null);
  const [isLoadingEvent, setIsLoadingEvent] = useState(!mockEvent);

  useEffect(() => {
    if (mockEvent) {
      setIsLoadingEvent(false);
      return;
    }

    const fetchEvent = async () => {
      try {
        setIsLoadingEvent(true);
        const data = await eventsAPI.getById(slug);
        setBackendEvent(mapBackendEvent(data));
      } catch (error) {
        console.error("Failed to fetch event details:", error);
        setBackendEvent(null);
      } finally {
        setIsLoadingEvent(false);
      }
    };

    fetchEvent();
  }, [mockEvent, slug]);

  const event = mockEvent
    ? {
        title: mockEvent.title,
        image: mockEvent.image,
        organizer: mockEvent.organizer,
        tags: mockEvent.tags,
        date: mockEvent.date,
        applicationDeadline: mockEvent.applicationDeadline,
        location: mockEvent.location,
        prizes: mockEvent.prizes,
        participants: mockEvent.participants,
        requirements: mockEvent.requirements,
        about: mockEvent.about,
        schedule: mockEvent.schedule,
      }
    : backendEvent;

  const { isBookmarked, isLoading, toggleBookmark } = useBookmark(
    slug,
    event?.title || "",
  );

  if (isLoadingEvent) {
    return (
      <main className="px-6 py-20 max-w-4xl mx-auto font-mono text-[#8a8a86]">
        <p>LOADING EVENT DETAILS...</p>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="px-6 py-20 max-w-4xl mx-auto font-mono text-[#8a8a86]">
        <p>EVENT NOT FOUND.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0e0e0d] text-[#f4f4f0] px-6 py-12 max-w-5xl mx-auto font-mono">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-[#8a8a86] border border-white/10 hover:border-white/40 hover:text-white bg-[#141413] transition-colors mb-8 cursor-pointer"
      >
        <ArrowLeft size={16} />
        <span>BACK TO EVENTS</span>
      </button>

      {/* 01 Overview Section Header */}
      <div className="mb-8">
        <div className="levo-eyebrow mb-3">
          <span className="h-1.5 w-1.5 bg-[#FFB100]" />
          <span>01 / EVENT SPECIFICATION</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-[#141413] border border-white/10 text-[#FFB100] text-[10px] uppercase font-bold tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight font-sans mb-3">
          {event.title}
        </h1>
        <p className="text-xs text-[#8a8a86] uppercase">{event.organizer}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-10">
        {event.registrationLink ? (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3.5 bg-[#FFB100] text-black font-semibold text-xs tracking-widest uppercase hover:bg-[#ffbe25] transition-colors"
          >
            APPLY NOW →
          </a>
        ) : (
          <button className="px-8 py-3.5 bg-[#FFB100] text-black font-semibold text-xs tracking-widest uppercase hover:bg-[#ffbe25] transition-colors cursor-pointer">
            APPLY NOW →
          </button>
        )}
        <button
          onClick={toggleBookmark}
          disabled={isLoading}
          className="px-8 py-3.5 border border-white/20 text-white font-semibold text-xs tracking-widest uppercase hover:border-[#FFB100] hover:text-[#FFB100] transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          <Bookmark size={16} fill={isBookmarked ? "#FFB100" : "none"} className={isBookmarked ? "text-[#FFB100]" : ""} />
          <span>{isLoading ? "..." : isBookmarked ? "SAVED ✓" : "SAVE BOOKMARK"}</span>
        </button>
      </div>

      {/* Header Image */}
      <div className="mb-12 border border-white/10 overflow-hidden bg-[#141413]">
        <Image
          src={event.image}
          alt={event.title}
          width={900}
          height={450}
          className="w-full h-80 sm:h-96 object-cover"
        />
      </div>

      {/* 02 Key Specifications Grid */}
      <div className="mb-12 border border-white/10 bg-[#141413] p-6 sm:p-8">
        <div className="levo-eyebrow mb-6">
          <span className="h-1.5 w-1.5 bg-[#FFB100]" />
          <span>02 / KEY PARAMETERS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 border border-white/10 bg-[#1c1c1a]">
            <div className="flex items-center gap-2 mb-2 text-[#FFB100]">
              <Calendar size={14} />
              <span className="text-[10px] uppercase text-[#8a8a86]">DATE</span>
            </div>
            <p className="text-sm font-bold text-white uppercase">{event.date}</p>
          </div>

          <div className="p-4 border border-white/10 bg-[#1c1c1a]">
            <div className="flex items-center gap-2 mb-2 text-[#FFB100]">
              <Clock size={14} />
              <span className="text-[10px] uppercase text-[#8a8a86]">DEADLINE</span>
            </div>
            <p className="text-sm font-bold text-white uppercase">{event.applicationDeadline}</p>
          </div>

          <div className="p-4 border border-white/10 bg-[#1c1c1a]">
            <div className="flex items-center gap-2 mb-2 text-[#FFB100]">
              <MapPin size={14} />
              <span className="text-[10px] uppercase text-[#8a8a86]">LOCATION</span>
            </div>
            <p className="text-sm font-bold text-white uppercase">{event.location}</p>
          </div>

          <div className="p-4 border border-white/10 bg-[#1c1c1a]">
            <div className="flex items-center gap-2 mb-2 text-[#FFB100]">
              <Gift size={14} />
              <span className="text-[10px] uppercase text-[#8a8a86]">PRIZES / MODE</span>
            </div>
            <p className="text-sm font-bold text-white uppercase">{event.prizes}</p>
          </div>

          <div className="p-4 border border-white/10 bg-[#1c1c1a]">
            <div className="flex items-center gap-2 mb-2 text-[#FFB100]">
              <Users size={14} />
              <span className="text-[10px] uppercase text-[#8a8a86]">ELIGIBILITY</span>
            </div>
            <p className="text-sm font-bold text-white uppercase">{event.participants}</p>
          </div>

          <div className="p-4 border border-white/10 bg-[#1c1c1a]">
            <div className="flex items-center gap-2 mb-2 text-[#FFB100]">
              <CheckCircle size={14} />
              <span className="text-[10px] uppercase text-[#8a8a86]">REQUIREMENTS</span>
            </div>
            <p className="text-sm font-bold text-white uppercase">{event.requirements}</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="mb-12 border border-white/10 bg-[#141413] p-6 sm:p-8">
        <div className="levo-eyebrow mb-4">
          <span className="h-1.5 w-1.5 bg-[#FFB100]" />
          <span>03 / ABOUT THIS EVENT</span>
        </div>
        <p className="text-sm text-[#8a8a86] leading-relaxed font-sans font-normal">{event.about}</p>
      </div>

      {/* Schedule */}
      {event.schedule && event.schedule.length > 0 && (
        <div className="border border-white/10 bg-[#141413] p-6 sm:p-8">
          <div className="levo-eyebrow mb-6">
            <span className="h-1.5 w-1.5 bg-[#FFB100]" />
            <span>04 / SCHEDULE & AGENDA</span>
          </div>
          <div className="space-y-4">
            {event.schedule.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-6 p-3 border-b border-white/10 last:border-0">
                <span className="text-xs font-bold text-[#FFB100] min-w-[120px]">
                  {item.time}
                </span>
                <span className="text-xs text-white">{item.activity}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default EventDetailPage;
