import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";

import { Users } from "./src/collections/Users";
import { Posts } from "./src/collections/Posts";
import { Messages } from "./src/collections/Messages";
import { Media } from "./src/collections/Media";
import { Projects } from "./src/collections/Projects";
import { Comments } from "./src/collections/Comments";
import { SiteSettings } from "./src/globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, "src/app/(payload)"),
    },
  },
  collections: [Users, Posts, Projects, Messages, Comments, Media],
  globals: [SiteSettings],
  // Optional one-time seed: set SEED_ON_INIT=true and start the app. Seeds the
  // original posts and projects only when each collection is empty, then is a
  // no-op. Useful on Windows/Node 24 where the `payload run` CLI can fail.
  onInit: async (payload) => {
    if (process.env.SEED_ON_INIT !== "true") return;

    const { totalDocs: postCount } = await payload.count({
      collection: "posts",
    });
    if (postCount === 0) {
      const { seedPosts } = await import("./src/lib/seed-posts");
      for (const post of seedPosts) {
        await payload.create({
          collection: "posts",
          data: { ...post, published: true },
        });
      }
      payload.logger.info(`Seeded ${seedPosts.length} posts.`);
    }

    {
      const { seedProjects } = await import("./src/lib/seed-projects");
      const imgDir = path.resolve(dirname, "public/projects");
      for (const p of seedProjects) {
        // Idempotent by slug: only create projects that don't exist yet, so new
        // entries added to seed-projects.ts get picked up on the next boot.
        const { totalDocs } = await payload.count({
          collection: "projects",
          where: { slug: { equals: p.slug } },
        });
        if (totalDocs > 0) continue;
        const website = await payload.create({
          collection: "media",
          data: { alt: `${p.title} website screenshot` },
          filePath: path.join(imgDir, p.imageFile),
        });
        const app = await payload.create({
          collection: "media",
          data: { alt: `${p.title} app screenshot` },
          filePath: path.join(imgDir, p.appImageFile),
        });
        await payload.create({
          collection: "projects",
          data: {
            slug: p.slug,
            title: p.title,
            description: p.description,
            longDescription: p.longDescription,
            tech: p.tech,
            websiteImage: website.id,
            appImage: app.id,
            tall: p.tall,
            order: p.order,
            url: p.url,
            appUrl: p.appUrl,
            published: true,
          },
        });
      }
      payload.logger.info(`Seeded ${seedProjects.length} projects.`);
    }
  },
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
