import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, IBM_Plex_Mono, IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TopBar } from "@/components/top-bar";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { getContent, getLang } from "@/lib/i18n";
import { dirOf, locales } from "@/lib/locales";
import { siteUrl } from "@/lib/utils";
import { phones } from "@/content/shared";
import "./globals.css";

// Inter for text; Barlow Condensed for display headings and the wordmark; Plex Mono for small "field labels";
// IBM Plex Sans Arabic for all Arabic text.
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-condensed", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-plex-mono", display: "swap" });
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  const lang = await getLang();
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: c.meta.siteTitle, template: `%s | ${c.company.brandName}` },
    description: c.meta.siteDescription,
    applicationName: c.company.brandName,
    alternates: { languages: { en: "/en", ar: "/ar" } },
    openGraph: { type: "website", siteName: c.company.brandName, locale: lang === "ar" ? "ar_JO" : "en" },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  const c = await getContent();
  return (
    <html lang={lang} dir={dirOf(lang)} className={`${body.variable} ${display.variable} ${mono.variable} ${arabic.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <TopBar />
        <SiteHeader
          lang={lang}
          phone={phones[0]}
          nav={c.nav}
          t={c.header}
          brandTagline={c.company.brandTagline}
        />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppFab />
      </body>
    </html>
  );
}
