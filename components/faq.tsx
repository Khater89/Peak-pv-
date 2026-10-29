import { Plus } from "lucide-react";
import { faqs } from "@/content/site";

export function Faq({ limit }: { limit?: number }) {
  const items = limit ? faqs.slice(0, limit) : faqs;
  return (
    <div className="divide-y divide-line rounded-[var(--radius-card)] border border-line bg-white">
      {items.map((f) => (
        <details key={f.q} className="group px-5 sm:px-7">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-start text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-surface transition-transform duration-200 group-open:rotate-45">
              <Plus aria-hidden className="size-4" />
            </span>
          </summary>
          <p className="-mt-1 pb-5 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
