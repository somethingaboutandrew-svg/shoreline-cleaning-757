"use client";

import { useState } from "react";
import { SERVICE_OPTIONS } from "@/lib/quote-schema";
import { cn } from "@/lib/utils";

const fieldClass =
  "mt-1.5 min-h-12 w-full rounded-xl border border-border bg-white px-4 text-base text-ink shadow-none outline-none focus:border-aqua focus:ring-2 focus:ring-aqua/30";
const labelClass = "block text-sm font-medium text-navy";

export function QuoteForm({ services }: { services: string[] }) {
  const options = services.length ? services : [...SERVICE_OPTIONS];
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    data.consent = form.querySelector<HTMLInputElement>("#consent")?.checked ? "true" : "false";
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setMessage(json.error || "Something went wrong. Please try again or call us.");
        return;
      }
      setStatus("success");
      setMessage("Thanks — your request is in. We'll follow up by your preferred method with a quote.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("We couldn't send that just now. Please try again in a moment.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[28px] bg-white p-6 shadow-card sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field label="Phone number" name="phone" type="tel" required autoComplete="tel" />
        <Field label="Email address" name="email" type="email" required autoComplete="email" />
        <div>
          <label className={labelClass} htmlFor="preferredContact">
            Preferred contact method
          </label>
          <select id="preferredContact" name="preferredContact" required className={fieldClass} defaultValue="call">
            <option value="call">Call</option>
            <option value="text">Text</option>
            <option value="email">Email</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="serviceNeeded">
            Service needed
          </label>
          <select id="serviceNeeded" name="serviceNeeded" required className={fieldClass} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="propertyType">
            Property type
          </label>
          <select id="propertyType" name="propertyType" required className={fieldClass} defaultValue="home">
            <option value="home">Home</option>
            <option value="apartment">Apartment</option>
            <option value="office">Office</option>
            <option value="rental">Rental</option>
            <option value="other">Other</option>
          </select>
        </div>
        <Field
          label="Bedrooms / bathrooms or square footage"
          name="size"
          placeholder="e.g. 3 bed / 2 bath or 1,400 sq ft"
        />
        <Field label="Desired service date" name="desiredDate" type="date" />
        <div>
          <label className={labelClass} htmlFor="frequency">
            Frequency
          </label>
          <select id="frequency" name="frequency" required className={fieldClass} defaultValue="one-time">
            <option value="one-time">One-time</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <Field label="City or ZIP code" name="cityOrZip" required placeholder="757 area city or ZIP" />
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="message">
            Message / special requests
          </label>
          <textarea id="message" name="message" rows={5} className={cn(fieldClass, "min-h-32 py-3")} />
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="sm:col-span-2 flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            className="mt-1 size-5 rounded border-border text-aqua"
          />
          <label htmlFor="consent" className="text-sm leading-relaxed text-muted">
            I agree that Shoreline Cleaning LLC may contact me by phone, text, or email about this quote request.
          </label>
        </div>
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-aqua px-6 text-base font-medium text-white hover:bg-aqua-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send quote request"}
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
      <p className="mt-4 text-xs text-muted">
        There are no prices on this website. After you submit, the owner will follow up with a quote by call, text, or
        email.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={fieldClass}
      />
    </div>
  );
}
