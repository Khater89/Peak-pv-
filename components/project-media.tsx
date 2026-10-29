import Image from "next/image";
import type { Project, ProjectImage } from "@/content/projects";
import { artVariantFor, ProjectArt } from "@/components/art/project-art";
import { cn } from "@/lib/utils";

/** Real render/photo when available; otherwise a clearly-labelled illustration. */
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
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-surface", className)}>
      {image ? (
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <ProjectArt variant={project.segment === "commercial" && artVariantFor(project.systemType) === "roof" ? "flat" : artVariantFor(project.systemType)} label={`Illustration of the ${project.title} solar system`} />
      )}
      <span className="absolute bottom-3 end-3 rounded-md bg-navy-950/75 px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-white backdrop-blur">
        {image ? (image.kind === "render" ? "3D render" : "Site photo") : "Illustration — photos coming soon"}
      </span>
    </div>
  );
}
