import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPayload } from "payload";
import config from "@payload-config";
import { seedPosts } from "./lib/seed-posts";
import { seedProjects } from "./lib/seed-projects";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Seeds the original posts and projects into Payload.
// Idempotent: skips any slug that already exists. Run with `npm run seed`.
async function seed() {
  const payload = await getPayload({ config });

  for (const post of seedPosts) {
    const existing = await payload.find({
      collection: "posts",
      where: { slug: { equals: post.slug } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      payload.logger.info(`Skipping existing post: ${post.slug}`);
      continue;
    }

    await payload.create({
      collection: "posts",
      data: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        readingMinutes: post.readingMinutes,
        tags: post.tags,
        body: post.body,
        published: true,
      },
    });
    payload.logger.info(`Created post: ${post.slug}`);
  }

  const imgDir = path.resolve(dirname, "../public/projects");
  for (const p of seedProjects) {
    const existing = await payload.find({
      collection: "projects",
      where: { slug: { equals: p.slug } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      payload.logger.info(`Skipping existing project: ${p.slug}`);
      continue;
    }

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
    payload.logger.info(`Created project: ${p.slug}`);
  }

  payload.logger.info("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
