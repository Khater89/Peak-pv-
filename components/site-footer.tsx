import Link from "next/link";
import { company, nav, primaryCta } from "@/content/site";
import { activeServices } from "@/content/services";
import { Logo } from "@/components/logo";
import { ContactChannels } from "@/components/contact-channels";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface text-muted">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Link href="/" aria-label="Peak PV — home" className="inline-block rounded-lg">
            <Logo />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{company.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink">Company</h2>
          <ul className="mt-4 space-y-1 text-sm">
            <li><Link className="inline-block py-1.5 hover:text-ink" href="/">Home</Link></li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link className="inline-block py-1.5 hover:text-ink" href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink">Services</h2>
          <ul className="mt-4 space-y-1 text-sm">
            {activeServices.map((s) => (
              <li key={s.slug}>
                <Link className="inline-block py-1.5 hover:text-ink" href={`/services#${s.slug}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink">Get in touch</h2>
          <div className="mt-4 text-sm">
            <ContactChannels />
            <Link href={primaryCta.href} className="mt-3 inline-block py-1.5 font-semibold text-sun-700 hover:text-ink">
              Request a quote →
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-6 text-xs sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {company.brandName}. All rights reserved.</p>
          <p>Solar PV supply · design · installation</p>
        </div>
      </div>
    </footer>
  );
}
