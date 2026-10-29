import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BatteryCharging, Check, Grid3x3, MapPin, Zap } from "lucide-react";
import { projects, statusLabel } from "@/content/projects";
import { ProjectMedia } from "@/components/project-media";
import { AgentCard } from "@/components/agent-card";
import { CtaBand } from "@/components/cta-band";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Solar Project`,
    description: `${project.summary} ${project.location}.`,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const [main, ...rest] = project.images;
  const thumbs = rest.slice(0, 4);

  return (
    <>
      <div className="container-x pt-6">
        <Link href="/projects" className="inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-muted hover:text-ink">
          <ArrowLeft aria-hidden className="size-4 rtl:-scale-x-100" /> All projects
        </Link>
      </div>

      {/* Listing-style gallery: one large image + up to four thumbnails. */}
      <section aria-label="Project images" className="container-x mt-3">
        <div className={thumbs.length ? "grid gap-2 overflow-hidden rounded-[2px] md:grid-cols-[2fr_1fr_1fr] md:grid-rows-2" : "overflow-hidden rounded-[2px]"}>
          <div className={thumbs.length ? "relative aspect-[16/10] md:row-span-2 md:aspect-auto" : "relative aspect-[16/9] max-h-[34rem] w-full"}>
            <ProjectMedia project={project} image={main} sizes="(min-width: 768px) 60vw, 100vw" priority />
          </div>
          {thumbs.map((img) => (
            <a key={img.src} href={img.src} target="_blank" rel="noopener noreferrer" className="relative hidden aspect-[4/3] md:block">
              <ProjectMedia project={project} image={img} sizes="20vw" />
            </a>
          ))}
        </div>
        {project.images.length > 5 && (
          <p className="mt-2 text-sm text-muted">+{project.images.length - 5} more images</p>
        )}
      </section>

      <section className="container-x grid gap-10 py-10 lg:grid-cols-[1fr_22rem] lg:gap-14 lg:py-14">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-[2px] bg-sun-400 px-3 py-1 text-xs font-bold text-ink">{project.systemType}</span>
            <span className="rounded-[2px] bg-surface px-3 py-1 text-xs font-semibold capitalize">{project.segment}</span>
            <span className="rounded-[2px] bg-surface px-3 py-1 text-xs font-semibold">{statusLabel[project.status]}</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">{project.title}</h1>
          <p className="mt-3 flex items-center gap-1.5 text-muted">
            <MapPin aria-hidden className="size-5 shrink-0 text-sun-700" /> {project.location}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[2px] bg-line ring-1 ring-line sm:grid-cols-4">
            <Stat label="Capacity" value={`${project.capacityKwp} kWp`} icon={Zap} />
            <Stat label="Panels" value={project.keyFacts.panels} icon={Grid3x3} />
            <Stat label="Inverter" value={project.keyFacts.inverter} icon={Zap} />
            {project.keyFacts.storage && <Stat label="Storage" value={project.keyFacts.storage} icon={BatteryCharging} />}
          </dl>

          <h2 className="mt-12 text-2xl font-bold">About the project</h2>
          <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted">
            {project.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <h2 className="mt-12 text-2xl font-bold">Technical specifications</h2>
          <dl className="mt-4 divide-y divide-line rounded-[2px] ring-1 ring-line">
            {project.specs.map((s) => (
              <div key={s.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[14rem_1fr]">
                <dt className="font-semibold">{s.label}</dt>
                <dd className="text-muted">{s.value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-12 text-2xl font-bold">Our scope</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.scope.map((s) => (
              <li key={s} className="inline-flex items-center gap-1.5 rounded-[2px] bg-surface px-4 py-2 text-sm font-semibold">
                <Check aria-hidden className="size-4 text-success" strokeWidth={3} /> {s}
              </li>
            ))}
          </ul>
        </div>

        <aside aria-label="Contact Peak PV about this project" className="lg:sticky lg:top-28 lg:self-start">
          <AgentCard context={project.title} />
        </aside>
      </section>

      <CtaBand title="Want a system like this?" body="Tell us about your site and loads — we'll design a system around them." />
    </>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Zap }) {
  return (
    <div className="bg-white p-5">
      <dt className="flex items-center gap-1.5 text-sm text-muted">
        <Icon aria-hidden className="size-4 text-sun-700" /> {label}
      </dt>
      <dd className="mt-1 font-display text-xl font-bold">{value}</dd>
    </div>
  );
}
