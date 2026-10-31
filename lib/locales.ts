/** Client-safe locale helpers (no server-only imports). */
export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string | undefined): value is Locale =>
  !!value && (locales as readonly string[]).includes(value);

export const dirOf = (lang: Locale) => (lang === "ar" ? "rtl" : "ltr");

/** Prefix an app path ("/contact?x=1#y") with the locale: lp("ar", "/contact") -> "/ar/contact". */
export function lp(lang: Locale, path: string) {
  if (path === "/" || path === "") return `/${lang}`;
  return `/${lang}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Same page in another language: "/en/services" -> "/ar/services". */
export function switchLocalePath(pathname: string, to: Locale) {
  const parts = pathname.split("/");
  if (hasLocale(parts[1])) parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join("/") || `/${to}`;
}
