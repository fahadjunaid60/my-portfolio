import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Payload admin + API surface — no SEO value, keep out of the index.
      disallow: ["/admin", "/api"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
