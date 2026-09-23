import { NextResponse } from "next/server";
import { Resend } from "resend";
import { PUBLIC_EMAIL } from "@/lib/site-config";
import { testimonialSchema } from "@/lib/testimonial-schema";

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

  const parsed = testimonialSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Please check the form and try again.";
    return NextResponse.json({ ok: false, error: first }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_FROM_EMAIL || "Shoreline Cleaning LLC <quotes@shorelinecleaning757.com>";

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "This form is not connected yet. Please try again later." },
      { status: 503 },
    );
  }

  const data = parsed.data;
  const resend = new Resend(apiKey);
  const text = [
    `Name: ${data.displayName}`,
    `Service: ${data.serviceType}`,
    "",
    data.review,
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to: PUBLIC_EMAIL,
    subject: "Testimonial/Review Submission",
    text,
  });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "We couldn't send that just now. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
