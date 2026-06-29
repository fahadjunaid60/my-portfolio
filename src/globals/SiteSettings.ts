import type { GlobalConfig } from "payload";

// Site-wide settings. The OG image is used for link previews across every page.
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    group: "Settings",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "ogImage",
      type: "upload",
      relationTo: "media",
      label: "Default OG image",
      admin: {
        description:
          "Default social share image for link previews (recommended 1200×630). Used on any page without its own image.",
      },
    },
    {
      name: "aboutOgImage",
      type: "upload",
      relationTo: "media",
      label: "About page OG image",
      admin: {
        description: "Overrides the default on the /about page.",
      },
    },
    {
      name: "contactOgImage",
      type: "upload",
      relationTo: "media",
      label: "Contact page OG image",
      admin: {
        description: "Overrides the default on the /contact page.",
      },
    },
  ],
};
