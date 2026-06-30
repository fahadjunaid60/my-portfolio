import { site, skillGroups, yearsOfExperience } from "./data";

// Public origin for canonical URLs, sitemap, robots, and JSON-LD. No trailing
// slash. NEXT_PUBLIC_ so it's inlined for both server and client bundles.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

/** Resolve a path to an absolute URL against the configured site origin. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}

const sameAs = [
  site.social.github,
  site.social.linkedin,
  site.social.facebook,
];

const knowsAbout = skillGroups.flatMap((g) => g.items.map((i) => i.name));

/** schema.org Person — the site owner. Used on the home page. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: siteUrl,
    jobTitle: site.role,
    description: `Full-stack developer with ${yearsOfExperience} years of experience.`,
    email: site.email,
    image: absoluteUrl("/icon"),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location,
    },
    knowsAbout,
    sameAs,
  };
}

/** schema.org WebSite — the portfolio itself. Used on the home page. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site.name} — Portfolio`,
    url: siteUrl,
    description: site.tagline,
    inLanguage: "en",
    author: { "@type": "Person", name: site.name, url: siteUrl },
  };
}

/** schema.org BlogPosting — a single blog article. */
export function blogPostingJsonLd(post: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  ogImage?: string;
}) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: post.ogImage ? absoluteUrl(post.ogImage) : undefined,
    keywords: post.tags.length ? post.tags.join(", ") : undefined,
    author: { "@type": "Person", name: site.name, url: siteUrl },
    publisher: { "@type": "Person", name: site.name, url: siteUrl },
  };
}

/** schema.org BreadcrumbList from an ordered list of [name, path] crumbs. */
export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}
