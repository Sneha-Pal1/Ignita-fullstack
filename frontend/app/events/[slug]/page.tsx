"use client";

import { useEffect, useState } from "react";
import { events } from "@/lib/data/events";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Bookmark, Gift, CheckCircle } from "lucide-react";
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
    about: event.description || "Event details will be shared by the admin.",
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
      <main className="px-6 py-10 max-w-4xl mx-auto">
        <p className="text-gray-400">Loading event...</p>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="px-6 py-10 max-w-4xl mx-auto">
        <p className="text-gray-400">Event not found</p>
      </main>
    );
  }

  return (
    <main className="px-6 py-10 max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors"
      >
        <ArrowLeft size={20} /> Back to Events
      </button>

      {/* Event Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {event.tags?.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/30"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Event Title */}
      <h1 className="text-4xl font-bold text-white mb-2">{event.title}</h1>
      <p className="text-gray-400 mb-6">{event.organizer}</p>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        {event.registrationLink ? (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Apply Now
          </a>
        ) : (
          <button className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
            Apply Now
          </button>
        )}
        <button
          onClick={toggleBookmark}
          disabled={isLoading}
          className="px-6 py-2 border border-white/20 text-white font-semibold rounded-lg hover:border-white/40 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
          {isLoading ? "..." : isBookmarked ? "Saved ✓" : "Bookmark Event"}
        </button>
      </div>

      {/* Event Header Image */}
      <div className="mb-8 rounded-lg overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          width={800}
          height={400}
          className="w-full h-96 object-cover"
        />
      </div>

      {/* Event Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border border-white/10 rounded-lg p-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Image
              src="/icons/calendar.svg"
              alt="date"
              width={16}
              height={16}
            />
            <p className="text-gray-400 text-sm">Date</p>
          </div>
          <p className="text-white font-semibold">{event.date}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Image
              src="/icons/clock.svg"
              alt="deadline"
              width={16}
              height={16}
            />
            <p className="text-gray-400 text-sm">Application Deadline</p>
          </div>
          <p className="text-white font-semibold">
            {event.applicationDeadline}
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Image
              src="/icons/pin.svg"
              alt="location"
              width={16}
              height={16}
              style={{ width: "auto", height: "auto" }}
            />
            <p className="text-gray-400 text-sm">Location</p>
          </div>
          <p className="text-white font-semibold">{event.location}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Gift size={16} className="text-gray-400" />
            <p className="text-gray-400 text-sm">Prizes</p>
          </div>
          <p className="text-white font-semibold">{event.prizes}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Image
              src="/icons/audience.svg"
              alt="participants"
              width={16}
              height={16}
            />
            <p className="text-gray-400 text-sm">Participants</p>
          </div>
          <p className="text-white font-semibold">{event.participants}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={16} className="text-gray-400" />
            <p className="text-gray-400 text-sm">Requirements</p>
          </div>
          <p className="text-white font-semibold">{event.requirements}</p>
        </div>
      </div>

      {/* About This Event */}
      <div className="mb-8 border border-white/10 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">About This Event</h2>
        <p className="text-gray-300 leading-relaxed">{event.about}</p>
      </div>

      {/* Event Schedule */}

      {event.schedule && event.schedule.length > 0 && (
        <div className="border border-white/10 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Event Schedule</h2>
          <div className="space-y-3">
            {event.schedule.map((item, index) => (
              <div key={index} className="flex gap-4">
                <p className="text-primary font-semibold min-w-fit">
                  {item.time}
                </p>
                <p className="text-gray-300">{item.activity}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default EventDetailPage;
