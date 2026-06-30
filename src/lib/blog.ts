import "server-only";
import { getPayloadClient } from "./payload";
import { mediaToOg, type OgImage } from "./settings";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date
  readingMinutes: number;
  tags: string[];
  body: string; // markdown
  ogImage?: string; // per-post social image URL
  // Full OG image incl. width/height — crawlers (Facebook, etc.) need the
  // dimensions to render a preview on first scrape.
  ogImageMeta?: OgImage;
};

type MediaRef =
  | {
      url?: string | null;
      filename?: string | null;
      width?: number | null;
      height?: number | null;
    }
  | string
  | null
  | undefined;

type PostDoc = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingMinutes: number;
  tags?: (string | null)[] | null;
  body: string;
  ogImage?: MediaRef;
};

export type CommentItem = {
  id: string;
  name: string;
  content: string;
  createdAt: string;
};

function toPost(doc: PostDoc): Post {
  const og = mediaToOg(doc.ogImage);
  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    date: doc.date,
    readingMinutes: doc.readingMinutes,
    tags: (doc.tags ?? []).filter((t): t is string => Boolean(t)),
    body: doc.body,
    ogImage: og?.url,
    ogImageMeta: og ?? undefined,
  };
}

export async function getPostsSortedByDate(): Promise<Post[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    where: { published: { equals: true } },
    sort: "-date",
    limit: 100,
    depth: 0,
  });
  return (docs as unknown as PostDoc[]).map(toPost);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug }, published: { equals: true } },
    limit: 1,
    depth: 1,
  });
  const doc = docs[0] as unknown as PostDoc | undefined;
  return doc ? toPost(doc) : undefined;
}

export async function getComments(postId: string): Promise<CommentItem[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "comments",
    where: { post: { equals: postId }, approved: { equals: true } },
    sort: "createdAt",
    limit: 200,
    depth: 0,
  });
  return (docs as unknown as CommentItem[]).map((d) => ({
    id: d.id,
    name: d.name,
    content: d.content,
    createdAt: d.createdAt,
  }));
}

export async function getAllSlugs(): Promise<string[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    where: { published: { equals: true } },
    limit: 1000,
    depth: 0,
    select: { slug: true },
  });
  return (docs as unknown as { slug: string }[]).map((d) => d.slug);
}
