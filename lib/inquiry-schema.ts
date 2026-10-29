import { z } from "zod";
import { activeServices } from "@/content/services";

/** Shared by the form (client) and the API route (server). The server is authoritative. */

export const projectTypes = [
  { value: "residential", label: "Residential (home, villa, apartment)" },
  { value: "commercial", label: "Commercial (office, shop, hotel)" },
  { value: "industrial", label: "Industrial (factory, warehouse)" },
  { value: "agricultural", label: "Agricultural (farm, water pumping)" },
  { value: "other", label: "Other" },
] as const;

export const serviceInterests = [
  { value: "full-project", label: "Full project — design, supply & installation" },
  ...activeServices.map((s) => ({ value: s.slug, label: s.title })),
  { value: "not-sure", label: "Not sure yet" },
];

const projectTypeValues = projectTypes.map((p) => p.value) as [string, ...string[]];
const serviceValues = serviceInterests.map((s) => s.value) as [string, ...string[]];

const trimmed = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters.`);
const optional = (max: number) =>
  trimmed(max)
    .optional()
    .transform((v) => (v ? v : undefined));

export const inquirySchema = z.object({
  name: trimmed(120).min(2, "Please enter your full name."),
  phone: trimmed(32)
    .min(1, "Please enter a phone number.")
    .regex(/^\+?[0-9\s\-().]{7,}$/, "Enter a valid phone number, e.g. 079 000 0000.")
    .refine((v) => v.replace(/\D/g, "").length >= 7, "Enter a valid phone number, e.g. 079 000 0000."),
  email: trimmed(200).min(1, "Please enter your email address.").pipe(z.email("Enter a valid email address, e.g. name@company.com.")),
  company: optional(160),
  projectType: z.enum(projectTypeValues, { error: "Choose the type of property." }),
  serviceInterest: z.enum(serviceValues, { error: "Choose the service you need." }),
  location: optional(160),
  message: optional(2000),
  consent: z.literal(true, { error: "Please confirm we may contact you about this request." }),
  sourcePage: optional(200),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type Inquiry = z.output<typeof inquirySchema>;
export type FieldErrors = Partial<Record<keyof InquiryInput, string>>;

export function fieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof InquiryInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

export type InquiryResponse =
  | { ok: true; reference: string }
  | { ok: false; error: string; fieldErrors?: FieldErrors };
