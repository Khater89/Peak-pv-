import "server-only";
import { lang } from "next/root-params";
import { contents } from "@/content";
import { defaultLocale, hasLocale, type Locale } from "@/lib/locales";

/** Current locale from the [lang] root segment (usable in any Server Component). */
export async function getLang(): Promise<Locale> {
  const value = await lang();
  return hasLocale(value) ? value : defaultLocale;
}

/** Content and UI strings for the current locale. */
export async function getContent() {
  return contents[await getLang()];
}
