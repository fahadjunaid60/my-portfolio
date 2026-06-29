import type { CollectionConfig } from "payload";

// Blog posts. Body is authored as Markdown (textarea) so it renders through the
// existing <Markdown> component on the public site with zero conversion.
export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "date", "published"],
  },
  access: {
    // Public site needs to read posts; writes stay admin-only (default).
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "URL segment, e.g. why-i-default-to-dotnet-nextjs",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
    },
    {
      name: "date",
      type: "date",
      required: true,
      admin: {
        date: { pickerAppearance: "dayOnly", displayFormat: "yyyy-MM-dd" },
      },
    },
    {
      name: "readingMinutes",
      type: "number",
      required: true,
      defaultValue: 5,
      min: 1,
    },
    {
      name: "tags",
      type: "text",
      hasMany: true,
    },
    {
      name: "body",
      type: "textarea",
      required: true,
      admin: {
        description: "Markdown supported (headings, lists, code, links, etc.)",
        rows: 24,
      },
    },
    {
      name: "ogImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Social share image for this post's link preview (falls back to the site default).",
        position: "sidebar",
      },
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Uncheck to hide this post from the public blog.",
        position: "sidebar",
      },
    },
  ],
};
