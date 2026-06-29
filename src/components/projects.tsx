import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { SectionBackground } from "./section-background";
import { ProjectGrid } from "./project-grid";
import type { ProjectCard } from "@/lib/projects";

export function Projects({ projects }: { projects: ProjectCard[] }) {
  return (
    <section id="projects" className="relative isolate overflow-hidden py-16 md:py-32">
      <SectionBackground variant="dots" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects I'm proud of."
          description="A handful of recent builds across AI-SEO, e-commerce, healthcare education, and B2B tooling."
        />

        <div className="mt-16">
          <ProjectGrid projects={projects} columns={2} />
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-accent-violet"
          >
            <span className="border-b border-accent-violet/40 pb-0.5 transition-colors group-hover:border-accent-violet">
              View more projects
            </span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
