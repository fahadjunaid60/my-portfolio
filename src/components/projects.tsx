"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { ProjectThumbnail } from "./project-thumbnail";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects I'm proud of."
          description="A handful of recent builds across law, e-learning, e-commerce, and analytics."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.a
              key={project.slug}
              href={project.url ?? "#"}
              target={project.url ? "_blank" : undefined}
              rel={project.url ? "noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass group relative flex flex-col overflow-hidden rounded-2xl transition-all hover:border-accent-violet/40 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <ProjectThumbnail
                  slug={project.slug}
                  title={project.title}
                  image={project.image}
                />
                <div className="absolute right-3 top-3 rounded-full bg-black/40 p-2 backdrop-blur-sm transition-transform group-hover:scale-110">
                  <ArrowUpRight className="size-4 text-white" />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}