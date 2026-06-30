import type { MetadataRoute } from "next";
import { getPostsSortedByDate } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

// Re-fetch on each request so newly published posts appear without a rebuild.
export const dynamic = "force-dynamic";

const STATIC_ROUTES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Blog posts are dynamic — fall back gracefully if Payload is unreachable.
  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPostsSortedByDate();
    postEntries = posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.date),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    postEntries = [];
  }

  return [...staticEntries, ...postEntries];
}
