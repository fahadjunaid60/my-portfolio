import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Full-Stack Developer`,
    short_name: site.shortName,
    description: site.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#000319",
    theme_color: "#000319",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
