import type { Content } from "@/content";
import { projectTypeValues, serviceValues } from "@/lib/inquiry-schema";

/** Serializable form strings for the client InquiryForm (functions are pre-evaluated here, on the server). */
export function formText(c: Content) {
  const { summary, ...rest } = c.form;
  const serviceTitle = (slug: string) => c.services.find((s) => s.slug === slug)?.title ?? slug;
  return {
    ...rest,
    summaryLabels: Array.from({ length: 12 }, (_, n) => summary(n)),
    projectTypeOptions: projectTypeValues.map((v) => ({ value: v, label: c.form.projectTypes[v] })),
    serviceOptions: serviceValues.map((v) => ({
      value: v,
      label: v === "full-project" ? c.form.fullProject : v === "not-sure" ? c.form.notSure : serviceTitle(v),
    })),
  };
}

export type FormText = ReturnType<typeof formText>;
