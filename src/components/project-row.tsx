"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectThumbnail } from "./project-thumbnail";
import type { ProjectFull } from "@/lib/projects";

// Full-width feature row: large screenshot on one side, description on the
// other, alternating sides each row.
export function ProjectRow({
  project,
  index,
}: {
  project: ProjectFull;
  index: number;
}) {
  const imageRight = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
    >
      {/* screenshot */}
      <a
        href={`/projects/${project.slug}`}
        aria-label={project.title}
        className={`group relative block ${imageRight ? "lg:order-2" : ""}`}
      >
        <div className="glass relative aspect-[16/11] overflow-hidden rounded-3xl transition-all group-hover:-translate-y-1 group-hover:border-accent-violet/40">
          <ProjectThumbnail
            slug={project.slug}
            title={project.title}
            image={project.image}
            tall={project.tall}
          />
          <div className="absolute right-4 top-4 rounded-full bg-black/40 p-2 backdrop-blur-sm transition-transform group-hover:scale-110">
            <ArrowUpRight className="size-4 text-white" />
          </div>
        </div>
      </a>

      {/* copy */}
      <div className={imageRight ? "lg:order-1" : ""}>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-violet">
          Project {String(index + 1).padStart(2, "0")}
        </div>
        <h2 className="display-tight mt-3 text-3xl text-foreground md:text-4xl">
          {project.title}
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-foreground/85">
          {project.longDescription}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border-themed bg-surface px-2.5 py-0.5 text-xs text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href={`/projects/${project.slug}`}
            className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-accent-violet to-accent-blue px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_40px_rgba(124,58,237,0.35)] transition-all hover:shadow-[0_0_60px_rgba(124,58,237,0.55)]"
          >
            View details
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="glass group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent-violet/40"
            >
              Visit website
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : null}
          {project.appUrl ? (
            <a
              href={project.appUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              Open app
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
