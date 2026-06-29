import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { GradientBlobs } from "@/components/gradient-blobs";
import { getProject } from "@/lib/projects";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Fad Junaid`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <>
      <section className="relative isolate overflow-hidden pt-36 pb-12">
        <GradientBlobs />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            All projects
          </Link>

          <h1 className="display-tight mt-8 text-4xl text-foreground md:text-6xl">
            <span className="gradient-text">{project.title}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/85">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-accent-violet/40 bg-accent-violet/10 px-2.5 py-0.5 text-xs font-medium uppercase tracking-widest text-accent-violet"
              >
                {t}
              </span>
            ))}
          </div>

          {project.url || project.appUrl ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-accent-violet to-accent-blue px-6 py-3 text-sm font-medium text-white shadow-[0_0_40px_rgba(124,58,237,0.4)] transition-all hover:shadow-[0_0_60px_rgba(124,58,237,0.6)]"
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
                  className="glass group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent-violet/40"
                >
                  Open app
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      {project.appImage ? (
        <section className="relative pb-12">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <SectionLabel>Inside the app</SectionLabel>
            <BrowserFrame label={`${project.title} — dashboard`}>
              <img
                src={project.appImage}
                alt={`${project.title} application interface`}
                className="block w-full"
                loading="lazy"
              />
            </BrowserFrame>
          </div>
        </section>
      ) : null}

      {project.image ? (
        <section className="relative pb-16">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <SectionLabel>The website</SectionLabel>
            <BrowserFrame label={`${project.title} — website`}>
              <div
                className={
                  project.tall
                    ? "max-h-[640px] overflow-y-auto"
                    : "overflow-hidden"
                }
              >
                <img
                  src={project.image}
                  alt={`${project.title} marketing website`}
                  className="block w-full"
                  loading="lazy"
                />
              </div>
            </BrowserFrame>
            {project.tall ? (
              <p className="mt-3 text-center text-xs text-muted">
                Scroll inside the frame to view the full page.
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="relative pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <SectionLabel>About this project</SectionLabel>
          <p className="text-base leading-relaxed text-foreground/85">
            {project.longDescription}
          </p>
        </div>
      </section>

      <nav className="relative pb-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="border-t border-border-themed pt-8 text-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              Want something like this? Let&apos;s talk
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted">
      {children}
    </h2>
  );
}

function BrowserFrame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="flex items-center gap-2 border-b border-border-themed bg-surface px-4 py-3">
        <span className="size-3 rounded-full bg-red-400/70" />
        <span className="size-3 rounded-full bg-yellow-400/70" />
        <span className="size-3 rounded-full bg-green-400/70" />
        <span className="ml-3 truncate text-xs text-muted">{label}</span>
      </div>
      {children}
    </div>
  );
}
