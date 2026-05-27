"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/lib/auth-context";
import { eventsAPI } from "@/lib/api-endpoints";
import { ArrowLeft, Loader2, Plus } from "lucide-react";

type FormState = {
  title: string;
  description: string;
  category: string;
  mode: string;
  organizer: string;
  location: string;
  registrationLink: string;
  startDate: string;
  endDate: string;
  bannerImage: string;
  tags: string;
  deadline: string;
};

const initialState: FormState = {
  title: "",
  description: "",
  category: "HACKATHON",
  mode: "ONLINE",
  organizer: "",
  location: "",
  registrationLink: "",
  startDate: "",
  endDate: "",
  bannerImage: "",
  tags: "",
  deadline: "",
};

const categoryOptions = [
  { label: "Hackathon", value: "HACKATHON" },
  { label: "Internship", value: "INTERNSHIP" },
  { label: "Coding Fest", value: "CODING_FEST" },
  { label: "Workshop", value: "WORKSHOP" },
];

const modeOptions = [
  { label: "Online", value: "ONLINE" },
  { label: "Offline", value: "OFFLINE" },
  { label: "Hybrid", value: "HYBRID" },
];

export default function CreateEventPage() {
  const { user, isLoading: authLoading } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [isLoadingEvent, setIsLoadingEvent] = useState(false);
  const isEditing = Boolean(editId);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role !== "ADMIN") {
      router.replace("/Dashboard");
    }
  }, [authLoading, router, user]);

  useEffect(() => {
    if (!editId || authLoading || !user || user.role !== "ADMIN") {
      return;
    }

    const loadEvent = async () => {
      try {
        setIsLoadingEvent(true);
        const event = await eventsAPI.getById(editId);

        setForm({
          title: event.title ?? "",
          description: event.description ?? "",
          category: event.category ?? "HACKATHON",
          mode: event.mode ?? "ONLINE",
          organizer: event.organizer ?? "",
          location: event.location ?? "",
          registrationLink: event.registrationLink ?? "",
          startDate: toLocalDateTime(event.startDate),
          endDate: toLocalDateTime(event.endDate),
          bannerImage: event.bannerImage ?? "",
          tags: Array.isArray(event.tags) ? event.tags.join(", ") : "",
          deadline: toLocalDateTime(event.deadline),
        });
      } catch (loadError) {
        console.error("Failed to load event for editing:", loadError);
        setErrorMessage("Unable to load the event details for editing.");
      } finally {
        setIsLoadingEvent(false);
      }
    };

    loadEvent();
  }, [authLoading, editId, user]);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const validate = () => {
    const errors: Partial<Record<keyof FormState, string>> = {};

    if (!form.title.trim()) errors.title = "Event title is required.";
    if (!form.description.trim())
      errors.description = "Description is required.";
    if (!form.organizer.trim()) errors.organizer = "Organizer is required.";
    if (!form.location.trim()) errors.location = "Location is required.";
    if (!form.startDate) errors.startDate = "Start date is required.";
    if (!form.endDate) errors.endDate = "End date is required.";
    if (!form.deadline) errors.deadline = "Deadline is required.";

    if (
      form.startDate &&
      form.endDate &&
      new Date(form.endDate) < new Date(form.startDate)
    ) {
      errors.endDate = "End date must be after the start date.";
    }

    if (
      form.deadline &&
      form.startDate &&
      new Date(form.deadline) > new Date(form.startDate)
    ) {
      errors.deadline = "Deadline should be before the start date.";
    }

    if (form.registrationLink) {
      try {
        new URL(form.registrationLink);
      } catch {
        errors.registrationLink = "Enter a valid registration URL.";
      }
    }

    if (form.bannerImage) {
      try {
        new URL(form.bannerImage);
      } catch {
        errors.bannerImage = "Enter a valid banner image URL.";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        mode: form.mode,
        organizer: form.organizer.trim(),
        location: form.location.trim(),
        registrationLink: form.registrationLink.trim() || undefined,
        startDate: new Date(form.startDate).toISOString(),
        endDate: new Date(form.endDate).toISOString(),
        bannerImage: form.bannerImage.trim() || undefined,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        deadline: new Date(form.deadline).toISOString(),
      };

      if (isEditing && editId) {
        await eventsAPI.update(editId, payload);
        setSuccessMessage("Event updated successfully. Redirecting to events...");
      } else {
        await eventsAPI.create(payload);
        setSuccessMessage("Event created successfully. Redirecting to events...");
      }
      setForm(initialState);

      window.setTimeout(() => {
        router.push("/events");
      }, 1200);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to create event.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || !user || user.role !== "ADMIN" || isLoadingEvent) {
    return (
      <main className="min-h-dvh bg-zinc-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
          <p className="text-zinc-400">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-zinc-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            href="/Dashboard"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-emerald-400"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            Admin Only
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
                  {isEditing ? "Edit Event" : "Create Event"}
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                  {isEditing
                    ? "Update the event details"
                    : "Publish a new IGNITA opportunity"}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
                  {isEditing
                    ? "Update the event with the latest details. Changes will appear on the live events feed once saved."
                    : "Add a new event with the key details the platform needs. The event will be visible on the live events feed once saved."}
                </p>
              </div>
              <div className="hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400 md:block">
                <Plus size={24} />
              </div>
            </div>

            {successMessage && (
              <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Event Title" error={fieldErrors.title}>
                  <input
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className={inputClass}
                    placeholder="Ignita Hackathon 2026"
                  />
                </Field>

                <Field label="Organizer" error={fieldErrors.organizer}>
                  <input
                    value={form.organizer}
                    onChange={(e) => handleChange("organizer", e.target.value)}
                    className={inputClass}
                    placeholder="IGNITA x Google Developer Group"
                  />
                </Field>
              </div>

              <Field label="Description" error={fieldErrors.description}>
                <textarea
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className={`${inputClass} min-h-32 resize-y`}
                  placeholder="Describe the event, audience, agenda, and why it matters."
                />
              </Field>

              <div className="grid gap-6 md:grid-cols-3">
                <Field label="Category">
                  <select
                    value={form.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className={inputClass}
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Mode">
                  <select
                    value={form.mode}
                    onChange={(e) => handleChange("mode", e.target.value)}
                    className={inputClass}
                  >
                    {modeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Location" error={fieldErrors.location}>
                  <input
                    value={form.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className={inputClass}
                    placeholder="Bengaluru, India / Online"
                  />
                </Field>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Start Date" error={fieldErrors.startDate}>
                  <input
                    type="datetime-local"
                    value={form.startDate}
                    onChange={(e) => handleChange("startDate", e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field label="End Date" error={fieldErrors.endDate}>
                  <input
                    type="datetime-local"
                    value={form.endDate}
                    onChange={(e) => handleChange("endDate", e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Deadline" error={fieldErrors.deadline}>
                  <input
                    type="datetime-local"
                    value={form.deadline}
                    onChange={(e) => handleChange("deadline", e.target.value)}
                    className={inputClass}
                  />
                </Field>

                <Field
                  label="Registration Link"
                  error={fieldErrors.registrationLink}
                >
                  <input
                    value={form.registrationLink}
                    onChange={(e) =>
                      handleChange("registrationLink", e.target.value)
                    }
                    className={inputClass}
                    placeholder="https://..."
                  />
                </Field>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Banner Image URL" error={fieldErrors.bannerImage}>
                  <input
                    value={form.bannerImage}
                    onChange={(e) =>
                      handleChange("bannerImage", e.target.value)
                    }
                    className={inputClass}
                    placeholder="https://images.example.com/banner.jpg"
                  />
                </Field>

                <Field label="Tags / Skills">
                  <input
                    value={form.tags}
                    onChange={(e) => handleChange("tags", e.target.value)}
                    className={inputClass}
                    placeholder="AI, React, Product Design"
                  />
                </Field>
              </div>

              <div className="flex flex-col gap-3 border-t border-zinc-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-zinc-500">
                  Only admins can publish events. Newly created events are
                  immediately available in the events feed.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    isEditing ? "Update Event" : "Publish Event"
                  )}
                </button>
              </div>
            </form>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h2 className="text-lg font-semibold text-white">
                Admin checklist
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li>• Verify the content is ready for production.</li>
                <li>
                  • Use a valid registration URL if applicants need to register
                  externally.
                </li>
                <li>• Keep deadline before the event start date.</li>
                <li>• Add tags so the event is easier to filter later.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-300">
                Live workflow
              </p>
              <p className="mt-3 text-sm leading-6 text-emerald-100/90">
                Once the event is saved, the backend persists it to PostgreSQL
                and the Events page reads the live records directly.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-zinc-200">{label}</span>
      {children}
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
    </label>
  );
}

function toLocalDateTime(value?: string) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const inputClass =
  "w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-emerald-500/60 focus:bg-zinc-900";
