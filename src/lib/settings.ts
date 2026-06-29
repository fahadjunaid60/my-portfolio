import "server-only";
import type { Metadata } from "next";
import { getPayloadClient } from "./payload";

export type OgImage = { url: string; width?: number; height?: number };

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

export function mediaToOg(m: MediaRef): OgImage | null {
  if (m && typeof m === "object" && (m.url || m.filename)) {
    return {
      url: m.url || `/media/${m.filename}`,
      width: m.width ?? undefined,
      height: m.height ?? undefined,
    };
  }
  return null;
}

type OgPage = "default" | "about" | "contact";
const FIELD: Record<OgPage, string> = {
  default: "ogImage",
  about: "aboutOgImage",
  contact: "contactOgImage",
};

// Returns the OG image for a page: its own override if set, else the site
// default. Wrapped in try/catch so metadata never fails the render.
export async function getOgImage(page: OgPage = "default"): Promise<OgImage | null> {
  try {
    const payload = await getPayloadClient();
    const settings = (await payload.findGlobal({
      slug: "site-settings",
      depth: 1,
    })) as Record<string, MediaRef>;
    const specific = page !== "default" ? mediaToOg(settings[FIELD[page]]) : null;
    return specific ?? mediaToOg(settings.ogImage);
  } catch {
    return null;
  }
}

// Builds OG + Twitter metadata for a page. metadataBase is inherited from the
// root layout, so relative /media URLs resolve to absolute for crawlers.
export function ogMetadata(opts: {
  title: string;
  description: string;
  image: OgImage | null;
}): Metadata {
  const { title, description, image } = opts;
  const images = image
    ? [{ url: image.url, width: image.width, height: image.height }]
    : undefined;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image.url] : undefined,
    },
  };
}
