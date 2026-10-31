import { ar } from "@/content/ar";
import { en, type Content } from "@/content/en";
import type { Locale } from "@/lib/locales";

export const contents: Record<Locale, Content> = { en, ar };
export type { Content };
