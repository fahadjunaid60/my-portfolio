import "server-only";
import { getPayloadClient } from "./payload";

// Card data (grid / home). Detail adds longDescription + app screenshot + url.
export type ProjectCard = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  image: string; // website screenshot
  tall: boolean;
};

export type ProjectFull = ProjectCard & {
  longDescription: string;
  appImage: string; // in-app screenshot
  url?: string; // live website
  appUrl?: string; // app / login
};

type MediaRef =
  | { url?: string | null; filename?: string | null }
  | string
  | null
  | undefined;

// Prefer the media doc's URL (cloud storage when configured); fall back to the
// local /media path otherwise.
function mediaUrl(m: MediaRef): string {
  if (m && typeof m === "object") {
    if (m.url) return m.url;
    if (m.filename) return `/media/${m.filename}`;
  }
  return "";
}

type ProjectDoc = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tech?: (string | null)[] | null;
  websiteImage: MediaRef;
  appImage: MediaRef;
  tall?: boolean | null;
  url?: string | null;
  appUrl?: string | null;
};

function toCard(d: ProjectDoc): ProjectCard {
  return {
    slug: d.slug,
    title: d.title,
    description: d.description,
    tech: (d.tech ?? []).filter((t): t is string => Boolean(t)),
    image: mediaUrl(d.websiteImage),
    tall: Boolean(d.tall),
  };
}

function toFull(d: ProjectDoc): ProjectFull {
  return {
    ...toCard(d),
    longDescription: d.longDescription,
    appImage: mediaUrl(d.appImage),
    url: d.url || undefined,
    appUrl: d.appUrl || undefined,
  };
}

export async function getProjects(limit = 100): Promise<ProjectCard[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "projects",
    where: { published: { equals: true } },
    sort: "order",
    limit,
    depth: 1,
  });
  return (docs as unknown as ProjectDoc[]).map(toCard);
}

export async function getProjectsFull(limit = 100): Promise<ProjectFull[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "projects",
    where: { published: { equals: true } },
    sort: "order",
    limit,
    depth: 1,
  });
  return (docs as unknown as ProjectDoc[]).map(toFull);
}

export async function getProject(slug: string): Promise<ProjectFull | undefined> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "projects",
    where: { slug: { equals: slug }, published: { equals: true } },
    limit: 1,
    depth: 1,
  });
  const doc = docs[0] as unknown as ProjectDoc | undefined;
  return doc ? toFull(doc) : undefined;
}
