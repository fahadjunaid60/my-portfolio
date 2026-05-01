"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Briefcase, Mail } from "lucide-react";
import { GradientBlobs } from "./gradient-blobs";
import { SectionHeading } from "./section-heading";
import { site } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="relative isolate overflow-hidden py-32">
      <GradientBlobs />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="About Me"
          title="Tech with business value."
          description="I started building things in 2018 and haven't stopped since. Today I split my time between long-term clients and freelance engagements — always shipping software people actually want to use."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-4 rounded-4xl bg-linear-to-br from-accent-violet via-accent-fuchsia to-accent-blue opacity-40 blur-2xl" />
              <div className="glass relative aspect-square overflow-hidden rounded-4xl">
                <Image
                  src="/images/fad.png"
                  alt={site.name}
                  fill
                  sizes="(min-width: 1024px) 24rem, (min-width: 640px) 24rem, 100vw"
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 lg:col-span-7"
          >
            <p className="text-lg leading-relaxed text-foreground/85">
              {site.bio}
            </p>
            <p className="leading-relaxed text-muted">
              I&apos;ve worked across technology, e-commerce, and enterprise
              applications — building everything from custom CMS implementations
              and lead-capture funnels to analytics dashboards and large-scale
              APIs. I care about clean architecture, fast feedback loops, and
              code that&apos;s honest about what it does.
            </p>

            <div className="grid gap-4 pt-2 sm:grid-cols-3">
              <InfoCard icon={<MapPin className="size-4" />} label="Based in" value={site.location} />
              <InfoCard icon={<Briefcase className="size-4" />} label="Status" value="Available for work" />
              <InfoCard icon={<Mail className="size-4" />} label="Email" value={site.email} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
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