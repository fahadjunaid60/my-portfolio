import type { CollectionConfig } from "payload";

// Portfolio projects. Each has a marketing-site screenshot (scrolled on hover)
// and an in-app screenshot, both shown on the project detail page.
export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "order", "published"],
  },
  access: {
    read: () => true,
  },
  defaultSort: "order",
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
        description: "URL segment, e.g. yomacofo",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      admin: {
        description: "Short summary shown on project cards.",
      },
    },
    {
      name: "longDescription",
      type: "textarea",
      required: true,
      admin: {
        description: "Full write-up shown on the project detail page.",
        rows: 8,
      },
    },
    {
      name: "tech",
      type: "text",
      hasMany: true,
      admin: {
        description: "Tech stack tags, e.g. Next.js, OpenAI, PostgreSQL",
      },
    },
    {
      name: "websiteImage",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "Marketing-site screenshot (used as the card thumbnail).",
      },
    },
    {
      name: "appImage",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "In-app / dashboard screenshot.",
      },
    },
    {
      name: "tall",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description:
          "Website screenshot is a tall full-page capture (scrolls on hover). Uncheck for short single-viewport captures.",
        position: "sidebar",
      },
    },
    {
      name: "url",
      type: "text",
      admin: {
        description: "Live website URL (optional). Adds a 'Visit website' button.",
        position: "sidebar",
      },
    },
    {
      name: "appUrl",
      type: "text",
      admin: {
        description: "App / login URL (optional). Adds an 'Open app' button.",
        position: "sidebar",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Lower numbers appear first.",
        position: "sidebar",
      },
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Uncheck to hide this project from the public site.",
        position: "sidebar",
      },
    },
  ],
};
