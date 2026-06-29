// Initial portfolio projects, used once to seed the Payload "projects" and
// "media" collections. After seeding, projects are managed in the admin panel.
// Image files are read from /public/projects/*.webp (the committed seed source).
export type SeedProject = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  imageFile: string; // website screenshot, in /public/projects
  appImageFile: string; // app screenshot, in /public/projects
  tall: boolean;
  order: number;
  url?: string; // live website
  appUrl?: string; // app / login
};

export const seedProjects: SeedProject[] = [
  {
    slug: "yomacofo",
    title: "YoMaCoFo",
    description:
      "An AI-SEO platform that measures and improves how brands surface inside ChatGPT and other AI assistants.",
    longDescription:
      "YoMaCoFo helps businesses understand and improve their visibility in AI-generated answers. It runs automated analyses of ChatGPT conversations for a brand's target queries, audits the company website, and surfaces concrete actions to rank inside generative engines. The dashboard tracks every analysis with status and query volume, while a tiered SaaS plan and a companion Chrome extension let teams check AI answers directly in the browser.",
    tech: ["Next.js", "TypeScript", "OpenAI", "PostgreSQL", "Stripe"],
    imageFile: "yomacofo.webp",
    appImageFile: "yomacofo-app.webp",
    tall: true,
    order: 1,
    url: "https://yomacofo.com/",
    appUrl: "https://app.yomacofo.com/",
  },
  {
    slug: "cppa",
    title: "Conscious Physicians Psychedelics Academy",
    description:
      "A continuing-education platform for psychedelic-assisted therapy — cohorts, live sessions, faculty, and evaluations.",
    longDescription:
      "A learning-management and continuing-education platform for a psychedelics medical academy. Administrators manage members, faculty, and CE-accrediting organizations; schedule and run live sessions tied to cohorts; publish courses; and collect structured evaluations. The dashboard gives staff an at-a-glance view of active members, faculty, and completed sessions, with quick actions for the most common workflows.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Tailwind"],
    imageFile: "cppa.webp",
    appImageFile: "cppa-app.webp",
    tall: true,
    order: 2,
    url: "https://cppa.care/",
    appUrl: "https://app.cppa.care/",
  },
  {
    slug: "time2shine",
    title: "Time 2 Shine",
    description:
      "An inventory-sync engine for a multi-supplier bicycle superstore — scraping, AI product tagging, and audit tooling.",
    longDescription:
      "Time 2 Shine aggregates product catalogs from dozens of bicycle suppliers into a single storefront. The platform runs scheduled scrapers and sync jobs across suppliers, logs every run with product counts and error rates, and includes a spot checker and weekly audit to catch drift. An AI tagger normalizes and categorizes thousands of products automatically so the catalog stays clean at scale.",
    tech: ["Node.js", "Playwright", "MySQL", "OpenAI"],
    imageFile: "time2shine.webp",
    appImageFile: "time2shine-app.webp",
    tall: true,
    order: 3,
    url: "https://time2shinebmx.com/",
    appUrl: "https://time-2-shine-production.up.railway.app/admin/login",
  },
  {
    slug: "worldsfair",
    title: "World's Fair Co.",
    description:
      "Admin for an immersive virtual-tour platform — scene management, NDA workflows, and Google Drive/Gmail integrations.",
    longDescription:
      "The control panel behind an immersive virtual-tour product. It connects a brand's Google account to pull tour scenes from Drive and to send NDA emails, password resets, and invitations through Gmail. Admins manage immersive scenes, control user access, and launch the public tour — all from a single focused dashboard.",
    tech: ["Next.js", "Google APIs", "TypeScript", "Tailwind"],
    imageFile: "worldsfair.webp",
    appImageFile: "worldsfair-app.webp",
    tall: false,
    order: 5,
    url: "https://preview.worldsfair.co/",
    appUrl: "https://preview.worldsfair.co/admin",
  },
  {
    slug: "guardair",
    title: "Guardair",
    description:
      "A customer and product management portal for an industrial distributor — inline editing, account types, and exports.",
    longDescription:
      "A back-office portal for an industrial air-tool distributor managing hundreds of dealer, distributor, and partner accounts. Staff search and filter customers, edit records inline, classify accounts by type and status, and export the full book to XLSX. A companion products module keeps catalog data alongside the customer base.",
    tech: ["React", ".NET", "SQL Server"],
    imageFile: "guardair.webp",
    appImageFile: "guardair-app.webp",
    tall: true,
    order: 4,
    url: "https://guardair.com/",
    appUrl: "https://guardair-ai-email.vercel.app/",
  },
  {
    slug: "goozamready",
    title: "GoozamReady",
    description:
      "A HIPAA-compliant emergency-preparedness platform for healthcare teams — secure messaging, case management, and disaster response.",
    longDescription:
      "GoozamReady is a comprehensive emergency-preparedness and response platform for healthcare organizations. It pairs HIPAA-compliant secure messaging and real-time responder coordination with a deep operations suite — case and ticket management, assets and facilities, hazard information, mass assessments, disaster recovery, document signing, and an e-learning module — all behind end-to-end encryption with full audit trails and compliance reporting.",
    tech: ["React", ".NET", "SQL Server", "Azure"],
    imageFile: "goozamready.webp",
    appImageFile: "goozamready-app.webp",
    tall: true,
    order: 6,
    url: "https://goozamready.com/",
    appUrl: "https://goozamready.com/log-in/",
  },
];
