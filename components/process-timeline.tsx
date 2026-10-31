import { getContent } from "@/lib/i18n";

/** Numbered step cards with a large faded index, as on facility-services sites. */
export async function ProcessTimeline() {
  const c = await getContent();
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {c.processSteps.map((step, i) => (
        <li key={step.title} className="corner-brackets relative overflow-hidden border border-line bg-white p-8">
          <span aria-hidden className="absolute top-4 end-6 select-none font-mono text-4xl leading-none text-sun-400">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="sr-only">{c.processSection.stepSr(i + 1)}</span>
          <h3 className="relative mt-8 font-serif text-2xl font-semibold uppercase">{step.title}</h3>
          <p className="relative mt-2 text-[0.9375rem] leading-relaxed text-muted">{step.body}</p>
          <span aria-hidden className="relative mt-6 block h-px w-12 bg-sun-400" />
        </li>
      ))}
    </ol>
  );
}
