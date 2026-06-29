"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProjectThumbnail } from "./project-thumbnail";
import type { ProjectCard } from "@/lib/projects";

export function ProjectGrid({
  projects,
  columns = 3,
}: {
  projects: ProjectCard[];
  columns?: 2 | 3;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState<Set<string>>(new Set());

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Mobile only: auto-scroll a card's screenshot while it sits in the band just
  // below the navbar (desktop keeps the hover behavior).
  useEffect(() => {
    if (!isMobile) {
      setActive(new Set());
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const cards = Array.from(
      el.querySelectorAll<HTMLElement>("[data-card]"),
    );
    const obs = new IntersectionObserver(
      (entries) => {
        setActive((prev) => {
          const next = new Set(prev);
          entries.forEach((e) => {
            const slug = (e.target as HTMLElement).dataset.card;
            if (!slug) return;
            if (e.isIntersecting) next.add(slug);
            else next.delete(slug);
          });
          return next;
        });
      },
      // Active band: from just under the navbar to ~halfway down the viewport.
      { rootMargin: "-72px 0px -50% 0px", threshold: 0 },
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, [isMobile, projects]);

  return (
    <div
      ref={containerRef}
      className={
        columns === 2
          ? "grid gap-6 md:grid-cols-2"
          : "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      }
    >
      {projects.map((project, i) => (
        <motion.a
          key={project.slug}
          href={`/projects/${project.slug}`}
          data-card={project.slug}
          data-active={active.has(project.slug) ? "true" : "false"}
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
              tall={project.tall}
            />
            <div className="absolute right-3 top-3 rounded-full bg-black/40 p-2 backdrop-blur-sm transition-transform group-hover:scale-110">
              <ArrowUpRight className="size-4 text-white" />
            </div>
          </div>

          <div className="flex flex-1 flex-col border-t border-border-faint bg-background p-6">
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
                  className="rounded-full border border-border-themed bg-surface px-2.5 py-0.5 text-xs text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
