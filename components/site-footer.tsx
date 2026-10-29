import Link from "next/link";
import { company, nav, primaryCta } from "@/content/site";
import { activeServices } from "@/content/services";
import { Logo } from "@/components/logo";
import { ContactChannels } from "@/components/contact-channels";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink text-[#cfc8bb]">
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Link href="/" aria-label="Peak PV — home" className="inline-block rounded-[2px]">
            <Logo tone="light" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{company.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.3em] text-sun-300">Company</h2>
          <ul className="mt-4 space-y-1 text-sm">
            <li><Link className="inline-block py-1.5 hover:text-white" href="/">Home</Link></li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link className="inline-block py-1.5 hover:text-white" href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.3em] text-sun-300">Services</h2>
          <ul className="mt-4 space-y-1 text-sm">
            {activeServices.map((s) => (
              <li key={s.slug}>
                <Link className="inline-block py-1.5 hover:text-white" href={`/services#${s.slug}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.3em] text-sun-300">Get in touch</h2>
          <div className="mt-4 text-sm">
            <ContactChannels tone="dark" />
            <Link href={primaryCta.href} className="mt-3 inline-block py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-sun-300 hover:text-white">
              Request a quote →
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {company.brandName}. All rights reserved.</p>
          <p>Solar PV supply · design · installation</p>
        </div>
      </div>
    </footer>
  );
}
