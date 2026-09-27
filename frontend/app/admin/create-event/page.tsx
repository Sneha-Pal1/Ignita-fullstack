"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { adminAPI, type Event } from "@/lib/api-endpoints";
import { ArrowLeft, Loader2, Plus, Save } from "lucide-react";

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
  deadline: string;
  tags: string;
  bannerImage: string;
};

const initialForm: FormState = {
  title: "",
  description: "",
  category: "HACKATHON",
  mode: "ONLINE",
  organizer: "",
  location: "",
  registrationLink: "",
  startDate: "",
  endDate: "",
  deadline: "",
  tags: "",
  bannerImage: "",
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

function AdminCreateEventForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditing = Boolean(editId);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingEvent, setIsLoadingEvent] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!editId) {
      return;
    }

    let isMounted = true;

    const loadEvent = async () => {
      try {
        setIsLoadingEvent(true);
        const event = await adminAPI.getEventById(editId);

        if (isMounted) {
          setForm(mapEventToForm(event));
        }
      } catch (loadError) {
        if (isMounted) {
          setErrorMessage(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load event details.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingEvent(false);
        }
      }
    };

    loadEvent();

    return () => {
      isMounted = false;
    };
  }, [editId]);

  const title = useMemo(
    () => (isEditing ? "Edit Event" : "Create Event"),
    [isEditing],
  );

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.title.trim()) nextErrors.title = "Title is required.";
    if (!form.description.trim())
      nextErrors.description = "Description is required.";
    if (!form.organizer.trim()) nextErrors.organizer = "Organizer is required.";
    if (!form.location.trim()) nextErrors.location = "Location is required.";
    if (!form.startDate) nextErrors.startDate = "Start date is required.";
    if (!form.endDate) nextErrors.endDate = "End date is required.";
    if (!form.deadline) nextErrors.deadline = "Deadline is required.";

    if (
      form.startDate &&
      form.endDate &&
      new Date(form.endDate) < new Date(form.startDate)
    ) {
      nextErrors.endDate = "End date must be after the start date.";
    }

    if (
      form.deadline &&
      form.startDate &&
      new Date(form.deadline) > new Date(form.startDate)
    ) {
      nextErrors.deadline = "Deadline must be before the start date.";
    }

    if (form.registrationLink) {
      try {
        new URL(form.registrationLink);
      } catch {
        nextErrors.registrationLink = "Enter a valid URL.";
      }
    }

    if (form.bannerImage) {
      try {
        new URL(form.bannerImage);
      } catch {
        nextErrors.bannerImage = "Enter a valid image URL.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
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
        deadline: form.deadline
          ? new Date(form.deadline).toISOString()
          : undefined,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        bannerImage: form.bannerImage.trim() || undefined,
      };

      if (isEditing && editId) {
        await adminAPI.updateEvent(editId, payload);
        setSuccessMessage("Event updated successfully.");
      } else {
        await adminAPI.createEvent(payload);
        setSuccessMessage("Event created successfully.");
        setForm(initialForm);
      }

      window.setTimeout(() => {
        router.push("/admin/events");
      }, 900);
    } catch (submitError) {
      setErrorMessage(
        submitError instanceof Error
          ? submitError.message
          : "Failed to save event.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingEvent) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl rounded-md border border-[#242422] bg-[#141413] p-6 text-[#8a8a86]">
          <div className="flex items-center gap-3">
            <Loader2 className="animate-spin text-[#FFB100]" size={20} />
            <span className="font-mono text-sm">Loading event details...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="mb-2 flex items-center justify-between gap-4">
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-2 font-mono text-xs text-[#8a8a86] transition-colors hover:text-[#FFB100]"
        >
          <ArrowLeft size={16} /> Back to Admin Events
        </Link>
        <span className="rounded-md border border-[#FFB100]/30 bg-[#FFB100]/10 px-3 py-1 font-mono text-xs font-medium text-[#FFB100]">
          Admin Portal
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-md border border-[#242422] bg-[#141413] p-6 shadow-2xl shadow-black/40 sm:p-8">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#FFB100]">
                {isEditing ? "Edit Event" : "Create Event"}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#f4f4f0] sm:text-4xl">
                {isEditing
                  ? "Update the event details"
                  : "Publish a new IGNITA opportunity"}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8a8a86] sm:text-base">
                {isEditing
                  ? "Update the event with the latest details. Changes will appear on the live events feed once saved."
                  : "Add a new event with the key details the platform needs. The event will be visible on the live events feed once saved."}
              </p>
            </div>
            <div className="hidden rounded-md border border-[#FFB100]/30 bg-[#FFB100]/10 p-4 text-[#FFB100] md:block">
              <Plus size={24} />
            </div>
          </div>

          {successMessage && (
            <div className="mb-6 rounded-md border border-[#FFB100]/30 bg-[#FFB100]/10 px-4 py-3 font-mono text-sm text-[#FFB100]">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 font-mono text-sm text-red-400">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Event Title" error={errors.title}>
                <input
                  value={form.title}
                  onChange={(event) =>
                    handleChange("title", event.target.value)
                  }
                  className={inputClass}
                  placeholder="Ignita Hackathon 2026"
                />
              </Field>

              <Field label="Organizer" error={errors.organizer}>
                <input
                  value={form.organizer}
                  onChange={(event) =>
                    handleChange("organizer", event.target.value)
                  }
                  className={inputClass}
                  placeholder="IGNITA x Google Developer Group"
                />
              </Field>
            </div>

            <Field label="Description" error={errors.description}>
              <textarea
                value={form.description}
                onChange={(event) =>
                  handleChange("description", event.target.value)
                }
                className={`${inputClass} min-h-32 resize-y`}
                placeholder="Describe the event, audience, agenda, and why it matters."
              />
            </Field>

            <div className="grid gap-6 md:grid-cols-3">
              <Field label="Category">
                <select
                  value={form.category}
                  onChange={(event) =>
                    handleChange("category", event.target.value)
                  }
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
                  onChange={(event) => handleChange("mode", event.target.value)}
                  className={inputClass}
                >
                  {modeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Location" error={errors.location}>
                <input
                  value={form.location}
                  onChange={(event) =>
                    handleChange("location", event.target.value)
                  }
                  className={inputClass}
                  placeholder="Bengaluru, India / Online"
                />
              </Field>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Start Date" error={errors.startDate}>
                <input
                  value={form.startDate}
                  onChange={(event) =>
                    handleChange("startDate", event.target.value)
                  }
                  className={inputClass}
                  type="datetime-local"
                />
              </Field>

              <Field label="End Date" error={errors.endDate}>
                <input
                  value={form.endDate}
                  onChange={(event) =>
                    handleChange("endDate", event.target.value)
                  }
                  className={inputClass}
                  type="datetime-local"
                />
              </Field>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Deadline" error={errors.deadline}>
                <input
                  value={form.deadline}
                  onChange={(event) =>
                    handleChange("deadline", event.target.value)
                  }
                  className={inputClass}
                  type="datetime-local"
                />
              </Field>

              <Field label="Registration Link" error={errors.registrationLink}>
                <input
                  value={form.registrationLink}
                  onChange={(event) =>
                    handleChange("registrationLink", event.target.value)
                  }
                  className={inputClass}
                  placeholder="https://..."
                />
              </Field>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Banner Image URL" error={errors.bannerImage}>
                <input
                  value={form.bannerImage}
                  onChange={(event) =>
                    handleChange("bannerImage", event.target.value)
                  }
                  className={inputClass}
                  placeholder="https://images..."
                />
              </Field>

              <Field label="Tags / Skills">
                <input
                  value={form.tags}
                  onChange={(event) => handleChange("tags", event.target.value)}
                  className={inputClass}
                  placeholder="AI, React, Product Design"
                />
              </Field>
            </div>

            <div className="flex flex-col gap-3 border-t border-[#242422] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[#8a8a86]">
                Only admins can publish events. Newly created events are
                immediately available in the events feed.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#FFB100] px-5 py-3 text-sm font-semibold text-[#0e0e0d] transition-all hover:bg-[#FFB100]/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    {isEditing ? "Update Event" : "Publish Event"}
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        <aside className="space-y-6">
          <div className="rounded-md border border-[#242422] bg-[#141413] p-6">
            <h2 className="font-schibsted-grotesk text-lg font-semibold text-[#f4f4f0]">
              Admin checklist
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-[#8a8a86]">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFB100]" />
                <span>Verify content is ready for production.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFB100]" />
                <span>Use a valid external registration URL.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFB100]" />
                <span>Keep deadline before event start date.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFB100]" />
                <span>Add tags for quick category filtering.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-md border border-[#FFB100]/30 bg-[#FFB100]/10 p-6">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#FFB100]">
              LIVE WORKFLOW
            </p>
            <p className="mt-2 text-sm leading-6 text-[#f4f4f0]/90">
              Once saved, the backend persists the record directly to PostgreSQL
              and updates the platform feed in real time.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function mapEventToForm(event: Event): FormState {
  return {
    title: event.title ?? "",
    description: event.description ?? "",
    category: event.category ?? "HACKATHON",
    mode: event.mode ?? "ONLINE",
    organizer: event.organizer ?? "",
    location: event.location ?? "",
    registrationLink: event.registrationLink ?? "",
    startDate: toDateTimeLocal(event.startDate),
    endDate: toDateTimeLocal(event.endDate),
    deadline: toDateTimeLocal(event.deadline),
    tags: Array.isArray(event.tags) ? event.tags.join(", ") : "",
    bannerImage: event.bannerImage ?? "",
  };
}

function toDateTimeLocal(value?: string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
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
      <span className="font-mono text-xs font-medium uppercase tracking-wider text-[#8a8a86]">
        {label}
      </span>
      {children}
      {error ? <span className="font-mono text-xs text-red-400">{error}</span> : null}
    </label>
  );
}

function ChecklistItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-[#FFB100]" />
      <span>{label}</span>
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-[#242422] bg-[#0e0e0d] px-4 py-3 text-sm text-[#f4f4f0] outline-none transition-colors placeholder:text-[#8a8a86]/50 focus:border-[#FFB100]/60 focus:ring-1 focus:ring-[#FFB100]/40";

export default function AdminCreateEventPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen bg-[#0e0e0d] text-[#f4f4f0] items-center justify-center">
        <Loader2 className="animate-spin text-[#FFB100]" size={32} />
      </div>
    }>
      <AdminCreateEventForm />
    </Suspense>
  );
}
