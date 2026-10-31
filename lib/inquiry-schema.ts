import { z } from "zod";
import { en } from "@/content/en";
import { projectTypeValues } from "@/content/shared";

/**
 * Shared by the form (client) and the API route (server). The server is authoritative.
 * Messages are message keys (see content/<lang>.form.errors), so each language renders its own text.
 */

export { projectTypeValues };
export const serviceValues = [
  "full-project",
  ...en.services.filter((s) => s.enabled).map((s) => s.slug),
  "not-sure",
] as [string, ...string[]];

/** `missing` is the message key used when the field is absent or not a string. */
const trimmed = (max: number, missing = "too_long") => z.string({ error: missing }).trim().max(max, "too_long");
const optional = (max: number) =>
  trimmed(max)
    .optional()
    .transform((v) => (v ? v : undefined));

export const inquirySchema = z.object({
  name: trimmed(120, "name").min(2, "name"),
  phone: trimmed(32, "phone_required")
    .min(1, "phone_required")
    .regex(/^\+?[0-9\s\-().]{7,}$/, "phone_invalid")
    .refine((v) => v.replace(/\D/g, "").length >= 7, "phone_invalid"),
  email: trimmed(200, "email_required").min(1, "email_required").pipe(z.email("email_invalid")),
  company: optional(160),
  projectType: z.enum(projectTypeValues, { error: "projectType" }),
  serviceInterest: z.enum(serviceValues, { error: "serviceInterest" }),
  location: optional(160),
  message: optional(2000),
  consent: z.literal(true, { error: "consent" }),
  sourcePage: optional(200),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type Inquiry = z.output<typeof inquirySchema>;
/** Field -> message key. */
export type FieldErrors = Partial<Record<keyof InquiryInput, string>>;

export function fieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof InquiryInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

/** API error codes, translated by the form (content/<lang>.form.api). */
export type InquiryErrorCode = "invalid" | "rate_limited" | "too_large" | "bad_request" | "rejected" | "unsupported" | "store_failed";

export type InquiryResponse =
  | { ok: true; reference: string }
  | { ok: false; error: InquiryErrorCode; fieldErrors?: FieldErrors };
