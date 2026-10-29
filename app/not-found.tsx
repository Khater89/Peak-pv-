import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-lg text-lg text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/contact" variant="outline">Request a quote</ButtonLink>
      </div>
    </section>
  );
}
