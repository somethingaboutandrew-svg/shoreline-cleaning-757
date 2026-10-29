import { NextResponse } from "next/server";
import { Resend } from "resend";
import { PUBLIC_EMAIL } from "@/lib/site-config";
import { quoteSchema } from "@/lib/quote-schema";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;
  if (typeof raw.company === "string" && raw.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const parsed = quoteSchema.safeParse({
    ...raw,
    consent: raw.consent === true || raw.consent === "true" || raw.consent === "on",
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Please check the form and try again.";
    return NextResponse.json({ ok: false, error: first }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL || PUBLIC_EMAIL;
  const from =
    process.env.QUOTE_FROM_EMAIL || "Shoreline Cleaning LLC <quotes@shorelinecleaning757.com>";

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "The quote form is not connected to email yet. Please try again later or email us directly.",
      },
      { status: 503 },
    );
  }

  const data = parsed.data;
  const resend = new Resend(apiKey);
  const subject = `Quote request: ${data.name}, ${data.serviceNeeded}`;
  const text = [
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Preferred contact: ${data.preferredContact}`,
    `Service: ${data.serviceNeeded}`,
    `Property type: ${data.propertyType}`,
    `Size: ${data.size || "not provided"}`,
    `Desired start up date: ${data.desiredDate || "not provided"}`,
    `Frequency: ${data.frequency}`,
    `City and ZIP: ${data.cityOrZip}`,
    "",
    data.message || "(no additional info)",
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject,
    text,
  });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "We couldn't send that just now. Please try again or email us." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
