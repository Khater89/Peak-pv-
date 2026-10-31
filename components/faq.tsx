import { Plus } from "lucide-react";
import { getContent } from "@/lib/i18n";

export async function Faq({ limit }: { limit?: number }) {
  const { faqs } = await getContent();
  const items = limit ? faqs.slice(0, limit) : faqs;
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-5 text-start font-serif text-[1.375rem] font-semibold tracking-[0.01em] [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="inline-flex size-8 shrink-0 items-center justify-center border border-line text-leaf-600 transition-transform duration-200 group-open:rotate-45">
              <Plus aria-hidden className="size-4" />
            </span>
          </summary>
          <p className="-mt-1 pb-5 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
