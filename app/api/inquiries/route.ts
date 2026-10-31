import { NextResponse, type NextRequest } from "next/server";
import { fieldErrors, inquirySchema, type InquiryResponse } from "@/lib/inquiry-schema";
import { saveInquiry } from "@/lib/inquiry-store";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024;

function reply(body: InquiryResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export async function POST(req: NextRequest) {
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return reply({ ok: false, error: "unsupported" }, 415);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const limit = rateLimit(ip);
  if (!limit.allowed) {
    return reply(
      { ok: false, error: "rate_limited" },
      429,
      { "Retry-After": String(limit.retryAfterSec) },
    );
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return reply({ ok: false, error: "too_large" }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return reply({ ok: false, error: "bad_request" }, 400);
  }

  // Honeypot: real visitors never see or fill this field.
  if (body && typeof body === "object" && "website" in body && (body as { website?: unknown }).website) {
    return reply({ ok: false, error: "rejected" }, 400);
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return reply(
      { ok: false, error: "invalid", fieldErrors: fieldErrors(parsed.error) },
      422,
    );
  }

  try {
    const saved = await saveInquiry(parsed.data);
    return reply({ ok: true, reference: saved.reference }, 201);
  } catch (err) {
    console.error("[inquiries] failed to store inquiry:", err instanceof Error ? err.message : err);
    return reply({ ok: false, error: "store_failed" }, 503);
  }
}
