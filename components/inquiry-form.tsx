"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import {
  fieldErrors as toFieldErrors,
  inquirySchema,
  projectTypes,
  serviceInterests,
  type FieldErrors,
  type InquiryInput,
  type InquiryResponse,
} from "@/lib/inquiry-schema";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Values = {
  name: string;
  phone: string;
  email: string;
  company: string;
  projectType: string;
  serviceInterest: string;
  location: string;
  message: string;
  consent: boolean;
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; reference: string }
  | { kind: "error"; message: string };

const empty: Values = {
  name: "",
  phone: "",
  email: "",
  company: "",
  projectType: "",
  serviceInterest: "",
  location: "",
  message: "",
  consent: false,
};

const FIELD_ORDER: (keyof Values)[] = ["name", "phone", "email", "company", "projectType", "serviceInterest", "location", "message", "consent"];
const LABELS: Record<keyof Values, string> = {
  name: "Full name",
  phone: "Phone",
  email: "Email",
  company: "Company",
  projectType: "Property type",
  serviceInterest: "Service needed",
  location: "Project location",
  message: "Project details",
  consent: "Contact consent",
};
const TIMEOUT_MS = 15000;

function toPayload(v: Values, sourcePage: string): InquiryInput {
  return { ...v, consent: v.consent as true, sourcePage };
}

export type InquiryPrefill = Partial<Pick<Values, "projectType" | "serviceInterest" | "location">>;

export function InquiryForm({ sourcePage = "/contact", initial }: { sourcePage?: string; initial?: InquiryPrefill }) {
  const uid = useId();
  const [values, setValues] = useState<Values>({ ...empty, ...initial });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  // Submission is handled in JS only; keep the button disabled until hydration so a native
  // submit can never send personal data in a URL or skip validation.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const id = (k: keyof Values) => `${uid}-${k}`;

  function validateField(k: keyof Values, next: Values) {
    const result = inquirySchema.safeParse(toPayload(next, sourcePage));
    const errs = result.success ? {} : toFieldErrors(result.error);
    setErrors((prev) => ({ ...prev, [k]: errs[k as keyof FieldErrors] }));
  }

  function update<K extends keyof Values>(k: K, v: Values[K]) {
    const next = { ...values, [k]: v };
    setValues(next);
    if (touched[k] || errors[k as keyof FieldErrors]) validateField(k, next);
    if (status.kind === "error") setStatus({ kind: "idle" });
  }

  function focusFirstError(errs: FieldErrors) {
    const first = FIELD_ORDER.find((k) => errs[k as keyof FieldErrors]);
    if (first) document.getElementById(id(first))?.focus();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status.kind === "submitting") return;

    const parsed = inquirySchema.safeParse(toPayload(values, sourcePage));
    if (!parsed.success) {
      const errs = toFieldErrors(parsed.error);
      setErrors(errs);
      setTouched(Object.fromEntries(FIELD_ORDER.map((k) => [k, true])));
      setStatus({ kind: "idle" });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setErrors({});
    setStatus({ kind: "submitting" });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...toPayload(values, sourcePage), website: honeypotRef.current?.value ?? "" }),
        signal: controller.signal,
      });
      const data = (await res.json().catch(() => null)) as InquiryResponse | null;

      if (res.status === 201 && data?.ok) {
        setStatus({ kind: "success", reference: data.reference });
        setValues(empty);
        setTouched({});
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }
      if (data && !data.ok && data.fieldErrors) {
        setErrors(data.fieldErrors);
        setStatus({ kind: "idle" });
        requestAnimationFrame(() => focusFirstError(data.fieldErrors!));
        return;
      }
      setStatus({
        kind: "error",
        message: (data && !data.ok && data.error) || "Something went wrong and your request was not saved. Please try again.",
      });
    } catch (err) {
      const aborted = err instanceof DOMException && err.name === "AbortError";
      setStatus({
        kind: "error",
        message: aborted
          ? "The request took too long and may not have been saved. Please check your connection and try again."
          : "We couldn't reach our server, so your request was not sent. Please check your connection and try again.",
      });
    } finally {
      clearTimeout(timer);
    }
  }

  if (status.kind === "success") {
    return (
      <div role="status" className="rounded-[1.25rem] border border-success/30 bg-success-bg p-8 text-center sm:p-10">
        <CheckCircle2 aria-hidden className="mx-auto size-12 text-success" />
        <h3 ref={successRef} tabIndex={-1} className="mt-4 text-2xl font-bold outline-none">
          Thank you — your request has been received
        </h3>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Your reference number is{" "}
          <strong className="font-mono text-lg text-ink">{status.reference}</strong>. Our team will review your details and
          contact you to arrange a consultation. Please keep the reference for any follow-up.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus({ kind: "idle" })}>
          Send another request
        </Button>
      </div>
    );
  }

  const errorList = FIELD_ORDER.filter((k) => errors[k as keyof FieldErrors]);
  const submitting = status.kind === "submitting";

  const fieldProps = (k: keyof Values, required: boolean) => ({
    id: id(k),
    name: k,
    "aria-invalid": errors[k as keyof FieldErrors] ? true : undefined,
    "aria-describedby": [errors[k as keyof FieldErrors] ? `${id(k)}-error` : null, `${id(k)}-hint`].filter(Boolean).join(" ") || undefined,
    "aria-required": required || undefined,
    onBlur: () => {
      setTouched((t) => ({ ...t, [k]: true }));
      validateField(k, values);
    },
  });

  return (
    <form ref={formRef} method="post" noValidate onSubmit={onSubmit} aria-busy={submitting} data-ready={ready || undefined} className="space-y-6">
      {errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-danger/30 bg-danger-bg p-4 text-danger outline-none focus-visible:ring-2 focus-visible:ring-danger"
        >
          <p className="flex items-center gap-2 font-semibold">
            <AlertCircle aria-hidden className="size-5" />
            Please fix {errorList.length === 1 ? "1 field" : `${errorList.length} fields`} before sending:
          </p>
          <ul className="mt-2 list-disc space-y-1 ps-9 text-sm">
            {errorList.map((k) => (
              <li key={k}>
                <a href={`#${id(k)}`} className="underline underline-offset-2" onClick={(e) => { e.preventDefault(); document.getElementById(id(k))?.focus(); }}>
                  {LABELS[k]}: {errors[k as keyof FieldErrors]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {status.kind === "error" && (
        <div role="alert" className="flex gap-3 rounded-xl border border-danger/30 bg-danger-bg p-4 text-danger">
          <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0" />
          <div>
            <p className="font-semibold">Your request was not sent</p>
            <p className="mt-0.5 text-sm">{status.message} Your answers are still filled in below.</p>
          </div>
        </div>
      )}

      <p className="text-sm text-muted">
        Fields marked <span aria-hidden className="font-semibold text-danger">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={LABELS.name} required error={errors.name} htmlFor={id("name")} className="sm:col-span-2">
          <input {...fieldProps("name", true)} className="field" type="text" autoComplete="name" value={values.name} onChange={(e) => update("name", e.target.value)} />
        </Field>

        <Field label={LABELS.phone} required error={errors.phone} htmlFor={id("phone")} hint="Include the country code if outside Jordan.">
          <input {...fieldProps("phone", true)} className="field" type="tel" inputMode="tel" autoComplete="tel" placeholder="079 000 0000" value={values.phone} onChange={(e) => update("phone", e.target.value)} />
        </Field>

        <Field label={LABELS.email} required error={errors.email} htmlFor={id("email")}>
          <input {...fieldProps("email", true)} className="field" type="email" inputMode="email" autoComplete="email" placeholder="name@company.com" value={values.email} onChange={(e) => update("email", e.target.value)} />
        </Field>

        <Field label={LABELS.projectType} required error={errors.projectType} htmlFor={id("projectType")}>
          <select {...fieldProps("projectType", true)} className="field" value={values.projectType} onChange={(e) => update("projectType", e.target.value)}>
            <option value="">Select property type</option>
            {projectTypes.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </Field>

        <Field label={LABELS.serviceInterest} required error={errors.serviceInterest} htmlFor={id("serviceInterest")}>
          <select {...fieldProps("serviceInterest", true)} className="field" value={values.serviceInterest} onChange={(e) => update("serviceInterest", e.target.value)}>
            <option value="">Select a service</option>
            {serviceInterests.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </Field>

        <Field label={LABELS.company} error={errors.company} htmlFor={id("company")}>
          <input {...fieldProps("company", false)} className="field" type="text" autoComplete="organization" value={values.company} onChange={(e) => update("company", e.target.value)} />
        </Field>

        <Field label={LABELS.location} error={errors.location} htmlFor={id("location")} hint="City or area is enough.">
          <input {...fieldProps("location", false)} className="field" type="text" autoComplete="address-level2" value={values.location} onChange={(e) => update("location", e.target.value)} />
        </Field>

        <Field
          label={LABELS.message}
          error={errors.message}
          htmlFor={id("message")}
          className="sm:col-span-2"
          hint="E.g. roof type and size, monthly electricity bill, whether you want battery backup."
        >
          <textarea {...fieldProps("message", false)} className="field min-h-32 resize-y" rows={5} maxLength={2000} value={values.message} onChange={(e) => update("message", e.target.value)} />
        </Field>
      </div>

      {/* Honeypot — hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website" as keyof Values)}>Website</label>
        <input ref={honeypotRef} id={id("website" as keyof Values)} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <div className="flex gap-3">
          <input
            {...fieldProps("consent", true)}
            type="checkbox"
            className="mt-0.5 size-5 shrink-0 accent-navy-900"
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
          />
          <label htmlFor={id("consent")} className="text-[0.9375rem]">
            I agree that Peak PV may contact me about this request. <span aria-hidden className="font-semibold text-danger">*</span>
          </label>
        </div>
        <span id={`${id("consent")}-hint`} className="sr-only">Required.</span>
        {errors.consent && (
          <p id={`${id("consent")}-error`} className="mt-1.5 flex items-center gap-1.5 ps-8 text-sm font-medium text-danger">
            <AlertCircle aria-hidden className="size-4 shrink-0" />
            {errors.consent}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={submitting || !ready} className="w-full sm:w-auto">
          {submitting ? (
            <>
              <Loader2 aria-hidden className="animate-spin motion-reduce:animate-none" />
              Sending…
            </>
          ) : (
            <>
              Send quote request
              <ArrowRight aria-hidden className="rtl:-scale-x-100" />
            </>
          )}
        </Button>
        <p className="text-sm text-muted">We only use your details to respond to this request.</p>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {submitting ? "Sending your request…" : ""}
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  hint,
  htmlFor,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-[0.9375rem] font-semibold">
        {label}
        {required ? (
          <>
            {" "}
            <span aria-hidden className="text-danger">*</span>
          </>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {children}
      <span id={`${htmlFor}-hint`} className={cn("text-sm text-muted", !hint && "sr-only")}>
        {hint ?? (required ? "Required." : "")}
      </span>
      {error && (
        <p id={`${htmlFor}-error`} className="flex items-center gap-1.5 text-sm font-medium text-danger">
          <AlertCircle aria-hidden className="size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
