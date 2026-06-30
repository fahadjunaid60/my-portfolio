import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { GradientBlobs } from "@/components/gradient-blobs";
import { Markdown } from "@/components/markdown";
import { Comments } from "@/components/comments";
import { getPost, getPostsSortedByDate, getComments } from "@/lib/blog";
import { getOgImage, ogMetadata } from "@/lib/settings";
import { JsonLd } from "@/components/json-ld";
import { blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/seo";

// Content is served from Payload, so render per-request.
export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  // Prefer the post's own OG image (with width/height so crawlers render it on
  // first scrape); fall back to the site default.
  const image = post.ogImageMeta ?? (await getOgImage("default"));
  return ogMetadata({
    title: `${post.title} — Fad Junaid`,
    description: post.excerpt,
    image,
    path: `/blog/${post.slug}`,
    article: {
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: ["Fad Junaid"],
      tags: post.tags,
    },
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const all = await getPostsSortedByDate();
  const idx = all.findIndex((p) => p.slug === post.slug);
  const next = idx > 0 ? all[idx - 1] : undefined;
  const prev = idx < all.length - 1 ? all[idx + 1] : undefined;

  const comments = await getComments(post.id);

  return (
    <>
      <JsonLd
        data={[
          blogPostingJsonLd(post),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <section className="relative isolate overflow-hidden pt-36 pb-12">
        <GradientBlobs />
        <div className="relative mx-auto max-w-3xl px-6 lg:px-10">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            All posts
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-muted">
            <time dateTime={post.date}>
              {dateFormatter.format(new Date(post.date))}
            </time>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>

          <h1 className="display-tight mt-4 text-4xl text-foreground md:text-6xl">
            <span className="gradient-text">{post.title}</span>
          </h1>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-accent-violet/40 bg-accent-violet/10 px-2.5 py-0.5 text-xs font-medium uppercase tracking-widest text-accent-violet"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <article className="relative pb-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Markdown>{post.body}</Markdown>
        </div>
      </article>

      <Comments postId={post.id} comments={comments} />

      <nav className="relative pb-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="grid gap-4 border-t border-border-themed pt-8 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="glass group rounded-2xl p-5 transition-colors hover:border-accent-violet/40"
              >
                <span className="text-xs uppercase tracking-widest text-muted">
                  ← Previous
                </span>
                <span className="mt-2 block font-medium text-foreground group-hover:text-accent-violet">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="glass group rounded-2xl p-5 text-right transition-colors hover:border-accent-violet/40"
              >
                <span className="text-xs uppercase tracking-widest text-muted">
                  Next →
                </span>
                <span className="mt-2 block font-medium text-foreground group-hover:text-accent-violet">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
