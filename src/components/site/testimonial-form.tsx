"use client";

import { useState } from "react";
import { TESTIMONIAL_SERVICES } from "@/lib/testimonial-schema";
import { cn } from "@/lib/utils";

const fieldClass =
  "mt-1.5 min-h-12 w-full rounded-xl border border-border bg-white px-4 text-base text-ink shadow-none outline-none focus:border-aqua focus:ring-2 focus:ring-aqua/30";
const labelClass = "block text-sm font-medium text-navy";

export function TestimonialForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setMessage(json.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setMessage("Thank you. Your testimonial was submitted.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("We couldn't send that just now. Please try again in a moment.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[28px] bg-white p-6 shadow-card sm:p-8" noValidate>
      <h2 className="text-2xl sm:text-3xl">LEAVE A CLIENT TESTIMONIAL OR REVIEW HERE</h2>
      <div className="mt-6 grid gap-5">
        <div>
          <label className={labelClass} htmlFor="displayName">
            First name and last initial
          </label>
          <input
            id="displayName"
            name="displayName"
            required
            placeholder="e.g. Andrew P"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="serviceType">
            Type of service
          </label>
          <select id="serviceType" name="serviceType" required className={fieldClass} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {TESTIMONIAL_SERVICES.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="review">
            Your review
          </label>
          <textarea
            id="review"
            name="review"
            required
            rows={8}
            className={cn(fieldClass, "min-h-40 py-3")}
            placeholder="Tell us about the service."
          />
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-aqua px-6 text-base font-medium text-white hover:bg-aqua-dark disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Submit"}
      </button>
      {status === "success" ? (
        <p className="mt-4 rounded-xl bg-sky-soft px-4 py-3 text-sm text-navy" role="status">
          {message}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-4 rounded-xl bg-sample-bg px-4 py-3 text-sm text-sample" role="alert">
          {message}
        </p>
      ) : null}
    </form>
  );
}
