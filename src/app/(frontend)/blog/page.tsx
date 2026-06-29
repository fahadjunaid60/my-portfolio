import { PageHero } from "@/components/page-hero";
import { PostCard } from "@/components/post-card";
import { getPostsSortedByDate } from "@/lib/blog";

export const metadata = {
  title: "Blog — Fad Junaid",
  description:
    "Notes from real client work — stack choices, AI in production, freelancing, and the messy parts in between.",
};

// Content is served from Payload, so render per-request.
export const dynamic = "force-dynamic";

export default async function BlogIndex() {
  const posts = await getPostsSortedByDate();

  return (
    <>
      <PageHero
        eyebrow="Writing"
        title="Notes from the workshop."
        description="Things I've actually shipped or learned the hard way. No hot takes, no listicles."
      />

      <section className="relative pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {posts.length === 0 ? (
            <p className="text-center text-muted">
              No posts yet — check back soon.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
