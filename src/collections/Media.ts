import type { CollectionConfig } from "payload";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Uploaded images (project screenshots, etc.). Files are written into
// /public/media so they're served statically at /media/<filename>.
// NOTE: on immutable hosts (e.g. Vercel) /public is read-only at runtime —
// switch to a storage adapter (S3 / Supabase Storage) before deploying there.
export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  upload: {
    staticDir: path.resolve(dirname, "../../public/media"),
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      admin: {
        description: "Accessible description of the image.",
      },
    },
  ],
};
