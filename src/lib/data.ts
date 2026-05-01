export const site = {
  name: "Fad Junaid",
  shortName: "FAD",
  role: "Full-Stack Developer",
  location: "Davao City, Philippines",
  email: "hello@fad-junaid.site", // TODO: replace with real email
  tagline: "Full-Stack Developer crafting scalable web solutions.",
  bio: "Full-stack developer with seven years of experience building efficient, scalable web applications. I specialize in bridging tech with business value — from polished React interfaces to performant .NET and Node.js backends.",
  social: {
    github: "#", // TODO
    linkedin: "#", // TODO
    twitter: "#", // TODO
    email: "mailto:hello@fad-junaid.site",
  },
  resumeUrl: "/resume.pdf", // TODO: drop a real resume.pdf in /public
};

export const stats = [
  { value: "7", suffix: "Years", label: "Experience" },
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

export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  url?: string;
};

export const projects: Project[] = [
  {
    slug: "jj-morris",
    title: "JJ Morris",
    description:
      "Marketing and intake site for a US law firm. Built for performance and lead conversion.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    image: "/projects/jj-morris.svg",
  },
  {
    slug: "goozam-learning",
    title: "Goozam Learning",
    description:
      "E-learning platform with course management, progress tracking, and integrated payments.",
    tech: ["React", ".NET Core", "SQL"],
    image: "/projects/goozam-learning.svg",
  },
  {
    slug: "james-flynn-law",
    title: "James Flynn Law",
    description:
      "Conversion-focused law firm site with case-intake automation and CRM integration.",
    tech: ["Umbraco", "C#", "jQuery"],
    image: "/projects/james-flynn.svg",
  },
  {
    slug: "the-rack",
    title: "The Rack",
    description:
      "Multi-version e-commerce build supporting custom merchandising and inventory rules.",
    tech: ["Laravel", "MySQL", "Vue"],
    image: "/projects/the-rack.svg",
  },
  {
    slug: "viribuz-statistics",
    title: "Viribuz Statistics",
    description:
      "Analytics dashboard with real-time charts, role-based access, and exportable reports.",
    tech: ["Node.js", "React", "PostgreSQL"],
    image: "/projects/viribuz.svg",
  },
  {
    slug: "funnel",
    title: "Funnel",
    description:
      "Lead capture and marketing funnel builder. Drag-and-drop editor with A/B testing.",
    tech: ["Next.js", "Node.js", "Redis"],
    image: "/projects/funnel.svg",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
