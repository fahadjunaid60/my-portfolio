import type { CollectionConfig } from "payload";

// Blog comments. Created via a server action (overrideAccess), then
// readable/moderatable from the admin panel. Uncheck "approved" to hide one.
export const Comments: CollectionConfig = {
  slug: "comments",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "post", "approved", "createdAt"],
    group: "Inbox",
  },
  access: {
    // Public site reads approved comments; creation is server-side only.
    read: () => true,
    create: () => false,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      admin: {
        description: "Optional — not shown publicly.",
      },
    },
    {
      name: "content",
      type: "textarea",
      required: true,
    },
    {
      name: "post",
      type: "relationship",
      relationTo: "posts",
      required: true,
      index: true,
    },
    {
      name: "approved",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Uncheck to hide this comment from the blog.",
        position: "sidebar",
      },
    },
  ],
};
