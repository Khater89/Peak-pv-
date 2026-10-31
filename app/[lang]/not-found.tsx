import { ButtonLink } from "@/components/ui/button";
import { getContent, getLang } from "@/lib/i18n";
import { lp } from "@/lib/locales";

export default async function NotFound() {
  const c = await getContent();
  const lang = await getLang();
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{c.notFound.title}</h1>
      <p className="mt-4 max-w-lg text-lg text-muted">{c.notFound.body}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={lp(lang, "/")}>{c.notFound.home}</ButtonLink>
        <ButtonLink href={lp(lang, "/contact")} variant="outline">{c.notFound.quote}</ButtonLink>
      </div>
    </section>
  );
}
