import Link from "next/link";
import { Logo } from "@/components/logo";
import { ContactChannels } from "@/components/contact-channels";
import { getContent, getLang } from "@/lib/i18n";
import { lp } from "@/lib/locales";

export async function SiteFooter() {
  const c = await getContent();
  const lang = await getLang();
  const nav = [
    { href: lp(lang, "/"), label: c.nav.home },
    { href: lp(lang, "/services"), label: c.nav.services },
    { href: lp(lang, "/projects"), label: c.nav.projects },
    { href: lp(lang, "/about"), label: c.nav.about },
    { href: lp(lang, "/contact"), label: c.nav.contact },
  ];
  const heading = "text-[0.6875rem] font-semibold uppercase tracking-[0.3em] text-sun-300";
  return (
    <footer className="on-dark bg-navy-950 text-[#c9dccd]">
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Link href={lp(lang, "/")} aria-label={c.header.homeAria} className="inline-block rounded-[2px]">
            <Logo tone="light" tagline={c.company.brandTagline} />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{c.company.tagline}</p>
        </div>

        <nav aria-label={c.footer.company}>
          <h2 className={heading}>{c.footer.company}</h2>
          <ul className="mt-4 space-y-1 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link className="inline-block py-1.5 hover:text-white" href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={heading}>{c.footer.services}</h2>
          <ul className="mt-4 space-y-1 text-sm">
            {c.services.filter((s) => s.enabled).map((s) => (
              <li key={s.slug}>
                <Link className="inline-block py-1.5 hover:text-white" href={lp(lang, `/services#${s.slug}`)}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={heading}>{c.footer.getInTouch}</h2>
          <div className="mt-4 text-sm">
            <ContactChannels tone="dark" />
            <Link href={lp(lang, "/contact")} className="mt-3 inline-block py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-sun-300 hover:text-white">
              {c.footer.requestQuote}
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {c.company.brandName}. {c.footer.rights}</p>
          <p>{c.footer.line}</p>
        </div>
      </div>
    </footer>
  );
}
