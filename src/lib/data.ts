// Career start year — `yearsOfExperience` derives from this so the number
// stays current every year without manual edits.
export const careerStartYear = 2018;
export const yearsOfExperience =
  new Date().getFullYear() - careerStartYear;

export const site = {
  name: "Fad Junaid",
  shortName: "FAD",
  role: "Software & AI Developer",
  location: "Cotabato City, Philippines",
  email: "fahadjunaid60@gmail.com",
  tagline:
    "Full-stack .NET + Next.js developer & AI automation specialist.",
  bio: `Full-stack developer with ${yearsOfExperience} years of experience building efficient, scalable web applications. I pair the rare .NET + Next.js stack with AI automation — from polished React/Next.js interfaces to performant .NET and Node.js backends, plus agentic workflows that remove manual work.`,
  social: {
    github: "https://github.com/fahadjunaid60",
    linkedin: "https://www.linkedin.com/in/fahad-junaid-72a257166/",
    facebook: "https://www.facebook.com/profile.php?id=61578248434552",
    email: "mailto:fahadjunaid60@gmail.com",
  },
  resumeUrl: "/resume.pdf", // TODO: drop a real resume.pdf in /public
};

export const stats = [
  { value: String(yearsOfExperience), suffix: "Years", label: "Experience" },
  { value: "30+", suffix: "", label: "Projects Shipped" },
  { value: "20+", suffix: "", label: "Happy Clients" },
];

export type SkillItem = {
  name: string;
  // Slug from the `simple-icons` package (omit for items without a brand logo).
  slug?: string;
  // Custom kind handled by the renderer (e.g. inline OpenAI mark, Lucide fallback).
  kind?: "openai" | "vector-db";
};

export const skillGroups: { category: string; items: SkillItem[] }[] = [
  {
    category: "Development",
    items: [
      { name: "React / Next.js", slug: "react" },
      { name: "TypeScript", slug: "typescript" },
      { name: ".NET / C#", slug: "dotnet" },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Umbraco", slug: "umbraco" },
      { name: "Laravel / PHP", slug: "laravel" },
      { name: "SQL / MySQL", slug: "mysql" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
    ],
  },
  {
    category: "Automation",
    items: [
      { name: "n8n", slug: "n8n" },
      { name: "Zapier", slug: "zapier" },
      { name: "Make", slug: "make" },
      { name: "OpenAI", kind: "openai" },
      { name: "Claude", slug: "claude" },
      { name: "LangChain", slug: "langchain" },
      { name: "Vector DBs", kind: "vector-db" },
    ],
  },
];

export const services = [
  {
    title: "Front-End Development",
    description:
      "Modern, responsive interfaces built with React, Next.js, and TypeScript. Pixel-precise, accessible, and performant.",
    icon: "Layout",
  },
  {
    title: "Back-End Development",
    description:
      "Scalable APIs and services using .NET Core and Node.js. Secure auth, optimized queries, and clean architecture.",
    icon: "Server",
  },
  {
    title: "RESTful API Design",
    description:
      "Well-documented, versioned, secure REST APIs designed for long-term maintainability and easy integration.",
    icon: "Workflow",
  },
  {
    title: "CMS & E-commerce",
    description:
      "Umbraco, WordPress, and headless CMS solutions for businesses that need flexible content workflows.",
    icon: "ShoppingBag",
  },
  {
    title: "AI Automation",
    description:
      "LLM integrations, agentic workflows, and intelligent assistants wired into your existing tools to automate the work people shouldn't be doing by hand.",
    icon: "Bot",
  },
  {
    title: "Database Design & Optimization",
    description:
      "Schema design, query tuning, and migrations for SQL and MySQL. From greenfield setups to rescuing slow queries on legacy systems.",
    icon: "Database",
  },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
