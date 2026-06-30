import Link from "next/link";
import {
  Bot,
  Database,
  Layout,
  Server,
  ShoppingBag,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/data";

const process = [
  {
    step: "01",
    title: "Discovery call",
    duration: "30 minutes · no charge",
    body: "We talk through the problem, the constraints you're working within, and what success actually looks like. I ask blunt questions about scope and budget — better to find out now than three weeks in.",
  },
  {
    step: "02",
    title: "Written proposal",
    duration: "Within 48 hours",
    body: "You get a one-page scope: what's in, what's out, milestones, fixed price, and a change-request process. No deck, no pitch — just the contract you can sign or red-line.",
  },
  {
    step: "03",
    title: "Build sprints",
    duration: "Weekly demos",
    body: "I work in week-long sprints with a Friday demo. You see real progress every seven days, can change direction cheaply, and never wonder where the budget is going.",
  },
  {
    step: "04",
    title: "Handover & support",
    duration: "30-day warranty included",
    body: "Code is delivered with deployment docs, runbooks for the messy parts, and a short walkthrough call. Bugs in delivered scope are fixed free for 30 days.",
  },
];

const faqs = [
  {
    q: "Hourly or fixed price?",
    a: "Fixed-price for defined scopes — that's most engagements. Hourly only for retainers, ongoing maintenance, or genuinely exploratory work where scope is the question we're trying to answer.",
  },
  {
    q: "How long do projects usually take?",
    a: "Small builds (landing site, single feature): 1–2 weeks. Medium (full product MVP, dashboard, integration): 4–8 weeks. Larger engagements ship in milestones, never as one big-bang delivery.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes, mutual NDAs before scoping detailed work. I keep a standard one ready, but I'm happy to sign yours if you have a preferred format.",
  },
  {
    q: "Can you take over an existing codebase?",
    a: "Often, yes. I do a paid audit first (usually 4–8 hours) so we both know what we're dealing with. From there, you decide what's worth fixing, what's worth rewriting, and what we can leave alone.",
  },
  {
    q: "What if requirements change mid-build?",
    a: "Expected. Anything inside the original scope gets absorbed; anything outside gets a small change-request quote — always before I start the work, never as a surprise on the invoice.",
  },
  {
    q: "Do you handle hosting and DevOps?",
    a: "I can set up Vercel, AWS, Azure, or a small VM, and I'll wire up CI/CD, monitoring, and backups. For long-term ops I prefer to hand the keys to your team or a dedicated DevOps partner.",
  },
];

export const metadata = {
  title: "Services — Fad Junaid",
  description:
    "Front-end, back-end, API design, AI automation, CMS, and database work. What's included, how I work, and what 'done' looks like.",
  alternates: { canonical: "/services" },
};

const iconMap: Record<string, LucideIcon> = {
  Layout,
  Server,
  Workflow,
  ShoppingBag,
  Bot,
  Database,
};

type ServiceDetail = {
  whatYouGet: string[];
  approach: string;
  idealFor: string;
};

const details: Record<string, ServiceDetail> = {
  "Front-End Development": {
    whatYouGet: [
      "Design-system-driven components built with React + Tailwind",
      "Accessibility audited against WCAG 2.1 AA",
      "Lighthouse performance > 90 on representative pages",
      "Type-safe contracts to your API generated from OpenAPI",
    ],
    approach:
      "I start by translating your design into a small set of primitives, then assemble pages on top of those. Animations, dark/light theming, and responsive behavior are designed in, not bolted on at the end.",
    idealFor:
      "Teams shipping a new product, redesigning an existing one, or modernizing a legacy front end without a full rewrite.",
  },
  "Back-End Development": {
    whatYouGet: [
      "Versioned REST or gRPC API with OpenAPI documentation",
      "Authentication, authorization, and rate limiting",
      "Structured logging and error reporting wired up day one",
      "Unit + integration tests for the critical paths",
    ],
    approach:
      "Pragmatic .NET Core or Node.js services, single-codebase by default. Microservices only when the seams genuinely exist. I optimize for clean migrations and observability over clever abstractions.",
    idealFor:
      "Products that need to scale past a prototype — auth, data integrity, and operational reliability matter more than novelty.",
  },
  "RESTful API Design": {
    whatYouGet: [
      "API specification in OpenAPI / Swagger",
      "Consistent resource naming, pagination, and error envelopes",
      "Versioning strategy that won't paint you into a corner",
      "Postman / Bruno collection for QA and partner integrations",
    ],
    approach:
      "I treat the API as a product, not an implementation detail. Every endpoint has a clear contract, predictable responses, and documented edge cases — so the front end and any third-party integrators don't guess.",
    idealFor:
      "Backends that other teams or partner systems will consume, where breakage costs more than the original build.",
  },
  "CMS & E-commerce": {
    whatYouGet: [
      "Headless or traditional CMS setup tuned to your editorial workflow",
      "Custom content models and permissions for your team",
      "Storefront integration with Stripe, PayPal, or your existing PSP",
      "Editor handover docs and a short training session",
    ],
    approach:
      "Umbraco for serious content workflows, WordPress when budget is tight, headless when the front end already exists. I optimize for the editor experience — the people using the CMS daily are the real users.",
    idealFor:
      "Marketing teams, content-driven SaaS, and stores that have outgrown a SaaS template but don't need a custom platform.",
  },
  "AI Automation": {
    whatYouGet: [
      "LLM integration (OpenAI / Claude) with cost controls and observability",
      "Vector search over your existing content, with chunking + ranking tuned for your data",
      "Agentic workflows or pipelines wired into n8n / Make / Zapier",
      "Eval harness so you can measure quality, not just vibes",
    ],
    approach:
      "I start with the workflow, not the model. Most 'AI features' ship better as careful pipelines with one or two LLM calls in the middle. I add agent loops only where the path genuinely branches based on intermediate results.",
    idealFor:
      "Businesses with a clear repetitive process, an existing data corpus, or a customer-facing experience that would benefit from natural-language input.",
  },
  "Database Design & Optimization": {
    whatYouGet: [
      "Normalized schema with documented invariants",
      "Migration scripts that are safe to run in production",
      "Query plans reviewed and indexed where it matters",
      "Backup, restore, and rollback procedures verified",
    ],
    approach:
      "Most performance problems aren't performance problems — they're query and index problems. I profile real workloads, fix the slow paths, and leave the schema clearer than I found it.",
    idealFor:
      "Teams whose queries 'used to be fast,' and greenfield projects that want to skip the year of regret around a hasty schema.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="What I can build for you."
        description="Every engagement starts with the business problem. The stack follows. Here's what each offering actually includes."
      />

      <section className="relative pb-32">
        <div className="mx-auto max-w-7xl space-y-10 px-6 lg:px-10">
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Layout;
            const detail = details[service.title];
            return (
              <article
                key={service.title}
                className="glass grid gap-8 rounded-2xl p-8 lg:grid-cols-12 lg:p-10"
              >
                <header className="lg:col-span-4">
                  <div className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-accent-violet to-accent-blue">
                    <Icon className="size-6 text-white" />
                  </div>
                  <h2 className="display-tight text-2xl text-foreground md:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </header>

                {detail && (
                  <div className="space-y-6 lg:col-span-8">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                        What you get
                      </h3>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {detail.whatYouGet.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2 text-sm leading-relaxed text-foreground/85"
                          >
                            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-accent-violet" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                          My approach
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                          {detail.approach}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                          Ideal for
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                          {detail.idealFor}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}

          <div className="glass rounded-2xl p-10 text-center">
            <h2 className="display-tight text-2xl text-foreground md:text-3xl">
              Not sure which fits?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">
              Most projects start with a 30-minute call so we can scope the work
              honestly. No deck, no pitch — just questions and a written
              follow-up.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-accent-violet to-accent-blue px-6 py-3 text-sm font-medium text-white"
            >
              Book a scoping call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
