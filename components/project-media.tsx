import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { Project, ProjectImage } from "@/content/projects";
import { LogoMark } from "@/components/logo";
import { cn } from "@/lib/utils";

/**
 * The project's own render/photo. Until those are supplied, a neutral branded panel is shown —
 * never a stock photo, so nothing is passed off as this project.
 */
export function ProjectMedia({
  project,
  image = project.images[0],
  sizes,
  priority,
  className,
}: {
  project: Project;
  image?: ProjectImage;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (!image) {
    return (
      <div className={cn("relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-br from-sky-100 via-sky-50 to-sun-100 p-6 text-center", className)}>
        <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
        <LogoMark className="relative size-14 lg:size-16" />
        <p className="relative text-lg font-bold text-ink">{project.capacityKwp} kWp · {project.systemType}</p>
        <p className="relative inline-flex items-center gap-1.5 rounded-[2px] bg-white/80 px-3 py-1 text-xs font-semibold text-muted ring-1 ring-line">
          <ImageIcon aria-hidden className="size-3.5" /> Project renders coming soon
        </p>
      </div>
    );
  }
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-surface", className)}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      <span className="absolute bottom-3 end-3 rounded-[2px] bg-navy-950/75 px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-white backdrop-blur">
        {image.kind === "render" ? "3D render" : "Site photo"}
      </span>
    </div>
  );
}
