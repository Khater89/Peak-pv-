import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Inter, Montserrat } from "next/font/google";
import { company, locale } from "@/content/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TopBar } from "@/components/top-bar";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { siteUrl } from "@/lib/utils";
import "./globals.css";

// Inter for Latin text; Plex Sans Arabic as the Arabic fallback for a future Arabic edition.
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

// Brand wordmark only.
const brand = Montserrat({ subsets: ["latin"], weight: ["600", "800"], variable: "--font-montserrat", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${company.brandName} — Solar PV Supply, Design & Installation`,
    template: `%s | ${company.brandName}`,
  },
  description:
    "Open Energy supplies, designs and installs photovoltaic solar systems for homes and businesses. Request a quote for your solar PV project.",
  applicationName: company.brandName,
  openGraph: {
    type: "website",
    siteName: company.brandName,
    locale: "en",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={locale.lang} dir={locale.dir} className={`${body.variable} ${arabic.variable} ${brand.variable}`}>
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
