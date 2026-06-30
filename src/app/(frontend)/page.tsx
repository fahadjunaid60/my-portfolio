import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Services } from "@/components/services";
import { Projects } from "@/components/projects";
import { SectionHeading } from "@/components/section-heading";
import { PostCard } from "@/components/post-card";
import { Contact } from "@/components/contact";
import { getPostsSortedByDate } from "@/lib/blog";
import { getProjects } from "@/lib/projects";
import { JsonLd } from "@/components/json-ld";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function Home() {
  const latestPosts = (await getPostsSortedByDate()).slice(0, 3);
  const featuredProjects = await getProjects(4);

  return (
    <>
      <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects projects={featuredProjects} />

      <section id="writing" className="relative py-16 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="Writing"
            title="Notes from the workshop."
            description="Practical lessons from real client work — stack choices, AI in production, and the messy parts of freelancing."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-medium text-accent-violet"
            >
              <span className="border-b border-accent-violet/40 pb-0.5 transition-colors group-hover:border-accent-violet">
                Read all posts
              </span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
