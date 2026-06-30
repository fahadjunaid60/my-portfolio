import Image from "next/image";
import {
  Briefcase,
  Compass,
  MapPin,
  Mail,
  Sparkles,
  Wrench,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { GradientShape } from "@/components/section-background";
import { getOgImage, ogMetadata } from "@/lib/settings";
import { site, yearsOfExperience } from "@/lib/data";

const journey = [
  {
    year: "2018",
    title: "First professional code",
    body: "Started as a junior at a small Davao agency. Learned the difference between code that works and code other people can read.",
  },
  {
    year: "2019 – 2020",
    title: "Going full-stack",
    body: "Picked up .NET and Umbraco on real projects. Shipped my first multi-month enterprise build — and broke production exactly twice.",
  },
  {
    year: "2021 – 2022",
    title: "Owning bigger surface area",
    body: "Led teams on law-firm sites, e-learning platforms, and analytics dashboards. Started caring about deployment, observability, and the things that don't show up in pull requests.",
  },
  {
    year: "2023",
    title: "Going independent",
    body: "Took on my first long-term direct clients. Learned that pricing, scope, and clear writing matter more than another framework.",
  },
  {
    year: "2024 – 2025",
    title: "AI in production",
    body: "Wired Claude and OpenAI into existing client products — pipelines, agentic workflows, retrieval-augmented search. Most of it ships better as a careful pipeline than a true agent.",
  },
  {
    year: "2026",
    title: "Where I am now",
    body: "Splitting time between a small set of long-term clients and selective freelance work. Writing more, saying no more often, and shipping things I'm willing to put my name on.",
  },
];

const faqs = [
  {
    q: "Do you work alone or with a team?",
    a: "Both. I take solo end-to-end engagements, and I also join existing teams as a senior contributor when the role is well-scoped.",
  },
  {
    q: "Do you work on-site?",
    a: "Almost always remote. I'm in the Philippines (UTC+8) and overlap comfortably with EU mornings and US afternoons. On-site visits are possible for kickoffs.",
  },
  {
    q: "Do you take long-term retainers?",
    a: "Yes — I keep room for two retainer clients at a time. They pay for guaranteed weekly hours, faster turnaround on requests, and someone who already knows the codebase.",
  },
  {
    q: "Are you available right now?",
    a: "Usually yes for new scopes starting in the following 4–6 weeks. The fastest way to find out is a quick email.",
  },
];

export async function generateMetadata() {
  return ogMetadata({
    title: "About — Fad Junaid",
    description: `Full-stack developer with ${yearsOfExperience} years of experience. Background, working style, and what I care about when I build software.`,
    image: await getOgImage("about"),
    path: "/about",
  });
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Me"
        title="Tech with business value."
        description="Seven years in, still curious. I build the boring parts well so the interesting parts have somewhere to live."
      />

      <section className="relative pb-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:sticky lg:top-32">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-12"
              >
                <div
                  className="hero-float absolute -left-6 -top-6 h-24 w-24 opacity-80"
                  style={{ "--dur": "12s" } as React.CSSProperties}
                >
                  <div
                    className="hero-spin size-full"
                    style={{ "--dur": "40s" } as React.CSSProperties}
                  >
                    <GradientShape
                      kind="hexagon"
                      grad="violetBlue"
                      className="size-full"
                    />
                  </div>
                </div>
                <div
                  className="hero-float absolute -bottom-6 -right-6 h-28 w-28 opacity-80"
                  style={
                    { "--dur": "16s", "--delay": "1s" } as React.CSSProperties
                  }
                >
                  <GradientShape
                    kind="diamond"
                    grad="blueCyan"
                    className="size-full"
                  />
                </div>
              </div>
              <div className="glass relative aspect-square overflow-hidden rounded-4xl">
                <Image
                  src="/images/fad.png"
                  alt={site.name}
                  fill
                  sizes="(min-width: 1024px) 24rem, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-6 grid gap-3">
                <InfoRow
                  icon={<MapPin className="size-4" />}
                  label="Based in"
                  value={site.location}
                />
                <InfoRow
                  icon={<Briefcase className="size-4" />}
                  label="Status"
                  value="Available for freelance & remote roles"
                />
                <InfoRow
                  icon={<Mail className="size-4" />}
                  label="Email"
                  value={site.email}
                />
              </div>
            </div>
          </div>

          <div className="space-y-8 lg:col-span-7">
            <Prose>
              <p>
                I&apos;m a full-stack developer with {yearsOfExperience} years of
                professional experience. I started writing code in 2018 and
                never quite got
                tired of it — I still get a kick out of shipping something that
                people actually use the next day.
              </p>
              <p>
                Most of my work sits at the intersection of polished React
                interfaces and reliable .NET / Node.js services. I&apos;ve built
                marketing sites for US law firms, e-learning platforms with
                real-time progress tracking, multi-version e-commerce systems,
                analytics dashboards, and more. Lately I spend a lot of time on
                AI automation — wiring LLMs into the boring middle of business
                processes where they earn their keep.
              </p>
              <p>
                I split my time between long-term clients and selective
                freelance work. I prefer engagements where I can own a feature
                end-to-end, or join a small team where the lines between
                front-end, back-end, and infrastructure are deliberately blurry.
              </p>
            </Prose>

            <Pillar
              icon={<Compass className="size-5" />}
              title="How I work"
            >
              <p>
                I lead with the business problem, not the framework. Most
                projects don&apos;t fail at the code — they fail at scope,
                expectations, and the honest conversation about what&apos;s
                worth building. I write down the scope, agree on what
                &quot;done&quot; means, and quote in a way that doesn&apos;t
                punish the client for asking thoughtful questions.
              </p>
              <p>
                In the codebase I optimize for the next person — clear naming,
                small surface area, no clever abstractions until they&apos;ve
                earned their place. I&apos;d rather repeat three lines than ship
                a premature helper.
              </p>
            </Pillar>

            <Pillar
              icon={<Wrench className="size-5" />}
              title="The stack I reach for"
            >
              <p>
                Front end: React, Next.js, TypeScript, Tailwind. Back end: .NET
                Core (8+) and Node.js, occasionally Laravel for legacy systems.
                Database: PostgreSQL or SQL Server, with EF Core or Prisma
                depending on the team. CMS: Umbraco when content workflows are
                the point of the project.
              </p>
              <p>
                For AI work I lean on the OpenAI and Anthropic APIs, with
                LangChain only when the abstraction earns it, and pgvector for
                most retrieval workloads. n8n and Make handle the deterministic
                automation that doesn&apos;t need an agent loop.
              </p>
            </Pillar>

            <Pillar
              icon={<Sparkles className="size-5" />}
              title="What I&apos;m good at"
            >
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Owning a small product end-to-end — design system, API,
                  database, deploy.
                </li>
                <li>
                  Untangling messy legacy code without rewriting everything from
                  scratch.
                </li>
                <li>
                  Translating vague client requirements into a written scope
                  someone can sign.
                </li>
                <li>
                  Wiring AI features into existing products without making the
                  rest of the app worse.
                </li>
              </ul>
            </Pillar>
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="Journey"
            title="Eight years, six pivots."
            description="Roughly how I got here. The condensed version — fewer dead ends, more honesty about what stuck."
          />

          <ol className="relative mt-16 space-y-10 border-l border-border-themed pl-8">
            {journey.map((step) => (
              <li key={step.year} className="relative">
                <span className="absolute -left-[2.6rem] top-1 inline-flex size-5 items-center justify-center rounded-full bg-linear-to-br from-accent-violet to-accent-blue ring-4 ring-background" />
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-violet">
                  {step.year}
                </div>
                <h3 className="mt-1 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-foreground/85">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative pb-32 pt-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions."
            description="If yours isn't here, just send a quick email — I read everything."
          />

          <div className="mt-12 space-y-4">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="glass group rounded-2xl p-6 transition-colors hover:border-accent-violet/40"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-medium text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-border-themed text-muted transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-foreground/85">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4 text-base leading-relaxed text-foreground/85 md:text-lg">
      {children}
    </div>
  );
}

function Pillar({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-3">
        <div className="inline-flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-accent-violet to-accent-blue text-white">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      </div>
      <div className="mt-4 space-y-3 leading-relaxed text-foreground/85">
        {children}
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}
