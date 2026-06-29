import type { CollectionConfig } from "payload";

// Admin users for the Payload dashboard. Auth is enabled so the first user
// you create at /admin gains access to manage posts and read messages.
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
  ],
};
