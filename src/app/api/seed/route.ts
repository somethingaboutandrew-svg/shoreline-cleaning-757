import { seed } from "../../../../scripts/seed-sanity.mjs";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET() {
  try {
    const message = await seed();
    return Response.json({ ok: true, message });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Seed failed";
    return Response.json({ ok: false, message }, { status: 500 });
  }
}
