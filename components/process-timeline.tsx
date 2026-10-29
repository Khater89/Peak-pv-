import { processSteps } from "@/content/site";

/** Numbered step cards with a large faded index, as on facility-services sites. */
export function ProcessTimeline() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {processSteps.map((step, i) => (
        <li key={step.title} className="relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-white p-7">
          <span aria-hidden className="absolute -top-3 end-3 select-none text-[5.5rem] font-extrabold leading-none tracking-tighter text-surface-2">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="sr-only">Step {i + 1}: </span>
          <h3 className="relative text-lg font-bold tracking-tight">{step.title}</h3>
          <p className="relative mt-2 text-[0.9375rem] leading-relaxed text-muted">{step.body}</p>
          <span aria-hidden className="relative mt-5 block h-1 w-10 rounded-full bg-sun-400" />
        </li>
      ))}
    </ol>
  );
}
