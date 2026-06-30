import { PageHero } from "@/components/page-hero";
import { ProjectRow } from "@/components/project-row";
import { getProjectsFull } from "@/lib/projects";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projects — Fad Junaid | .NET + Next.js & AI Builds",
  description:
    "Full-stack portfolio: selected work across AI-SEO, e-commerce, healthcare education, immersive tours, and B2B tooling, built with .NET, Next.js, and AI automation.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getProjectsFull();

  return (
    <>
      <PageHero
        eyebrow="Selected Work"
        title="Projects I'm proud of."
        description="A representative slice across AI-SEO, e-commerce, healthcare, immersive tours, and B2B tooling. A few of thirty-plus shipped — happy to talk through any of them."
      />

      <section className="relative pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="space-y-24 lg:space-y-32">
            {projects.map((project, i) => (
              <ProjectRow key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
