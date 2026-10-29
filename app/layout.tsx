import type { Metadata, Viewport } from "next";
import { Amiri, Cormorant_Garamond, IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { company, locale } from "@/content/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TopBar } from "@/components/top-bar";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { siteUrl } from "@/lib/utils";
import "./globals.css";

// Inter for text and UI; Cormorant Garamond for display headings and the wordmark; Plex Sans Arabic as Arabic fallback.
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
// Amiri for the Arabic "بيك" in the wordmark.
const arabicDisplay = Amiri({ subsets: ["arabic"], weight: ["700"], variable: "--font-amiri", display: "swap" });
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-cormorant", display: "swap" });
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${company.brandName} — Solar PV Supply, Design & Installation`,
    template: `%s | ${company.brandName}`,
  },
  description:
    "Peak PV supplies, designs and installs photovoltaic solar systems for homes and businesses. Request a quote for your solar PV project.",
  applicationName: company.brandName,
  openGraph: {
    type: "website",
    siteName: company.brandName,
    locale: "en",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#faf8f4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={locale.lang} dir={locale.dir} className={`${body.variable} ${serif.variable} ${arabic.variable} ${arabicDisplay.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <TopBar />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppFab />
      </body>
    </html>
  );
}
