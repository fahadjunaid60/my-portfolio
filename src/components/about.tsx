"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Globe, Sparkles, ArrowRight, Mail } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { site, stats, skillGroups } from "@/lib/data";

const techTags = skillGroups
  .flatMap((g) => g.items.map((i) => i.name))
  .slice(0, 12);

export function About() {
  return (
    <section id="about" className="relative isolate overflow-hidden py-16 md:py-28">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="About Me"
          title="A bit about how I work."
          description="Seven years shipping software people actually use — from polished React interfaces to reliable .NET and Node.js backends."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="mt-14 grid gap-4 lg:grid-cols-3"
        >
          {/* Left — photo only (col-4) */}
          <Card className="relative min-h-[420px] overflow-hidden p-0 lg:col-span-1 lg:min-h-0">
            <Image
              src="/images/fad.png"
              alt={site.name}
              fill
              sizes="(min-width: 1024px) 24rem, 100vw"
              priority
              className="object-cover object-center"
            />
          </Card>

          {/* Right — content (col-8) */}
          <div className="grid gap-4 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Timezone */}
              <Card>
                <Globe className="size-6 text-accent-violet" />
                <div className="mt-auto pt-6">
                  <h3 className="text-base font-semibold text-foreground">
                    Flexible across time zones
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Based in {site.location} (UTC+8) — I overlap comfortably with
                    EU mornings and US afternoons.
                  </p>
                </div>
              </Card>

              {/* Tech stack */}
              <Card>
                <h3 className="text-base font-semibold text-foreground">
                  My tech stack
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {techTags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border-themed bg-surface px-2.5 py-1 text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {/* Stats */}
              <Card>
                <div className="mt-auto">
                  <div className="display-tight text-4xl text-foreground">
                    {stats[0].value}
                    <span className="ml-1 text-base font-normal text-muted">
                      {stats[0].suffix}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{stats[0].label}</p>
                  <p className="mt-3 text-xs text-muted">
                    {stats[1].value} {stats[1].label.toLowerCase()} ·{" "}
                    {stats[2].value} {stats[2].label.toLowerCase()}
                  </p>
                </div>
              </Card>

              {/* Currently */}
              <Card>
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted">
                  <Sparkles className="size-4 text-accent-violet" />
                  Inside scoop
                </div>
                <p className="mt-auto pt-6 text-sm font-medium leading-snug text-foreground">
                  Currently wiring agentic AI workflows into production —
                  pipelines, retrieval, and guardrails that hold up.
                </p>
              </Card>

              {/* Contact CTA */}
              <Card className="group">
                <Mail className="size-6 text-accent-violet" />
                <div className="mt-auto pt-6">
                  <h3 className="text-base font-semibold text-foreground">
                    Like what you see?
                  </h3>
                  <Link
                    href={site.social.email}
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-accent-violet"
                  >
                    Let&apos;s work together
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`glass flex flex-col rounded-2xl p-6 transition-colors hover:border-accent-violet/40 ${className}`}
    >
      {children}
    </div>
  );
}
