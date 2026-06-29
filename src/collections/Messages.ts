import type { CollectionConfig } from "payload";

// Contact-form submissions. Created via a server action with overridden access,
// then readable/manageable from the admin panel.
export const Messages: CollectionConfig = {
  slug: "messages",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "createdAt"],
    group: "Inbox",
  },
  access: {
    // Reading/editing/deleting requires an authenticated admin (Payload default).
    // Creation happens server-side via the local API with overrideAccess.
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
      required: true,
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
  ],
};
