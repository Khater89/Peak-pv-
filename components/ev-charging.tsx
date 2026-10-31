import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { images } from "@/content/shared";
import { getContent, getLang } from "@/lib/i18n";
import { lp } from "@/lib/locales";

/** EV charging point installation by setting: homes, charging stations, car parks. */
export async function EvChargingGrid() {
  const c = await getContent();
  const lang = await getLang();
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {c.evSettings.map((e) => (
        <li key={e.title}>
          <article className="corner-brackets group flex h-full flex-col border border-line bg-white">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={images[e.img as keyof typeof images]}
                alt={e.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <h3 className="font-serif text-2xl font-semibold uppercase">{e.title}</h3>
              <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">{e.body}</p>
              <Link
                href={lp(lang, `/contact?service=ev-charging&type=${e.type}`)}
                className="mt-6 inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ink hover:text-leaf-600"
              >
                {c.evSection.requestCharger} <ArrowRight aria-hidden className="size-4 rtl:-scale-x-100" />
              </Link>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
