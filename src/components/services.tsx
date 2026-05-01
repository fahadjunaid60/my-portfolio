"use client";

import { motion } from "framer-motion";
import { Layout, Server, Workflow, ShoppingBag, Bot, Database, type LucideIcon } from "lucide-react";
import { GradientBlobs } from "./gradient-blobs";
import { SectionHeading } from "./section-heading";
import { services } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  Layout,
  Server,
  Workflow,
  ShoppingBag,
  Bot,
  Database,
};

export function Services() {
  return (
    <section id="services" className="relative isolate overflow-hidden py-32">
      <GradientBlobs />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Services"
          title="What I can build for you."
          description="From rapid MVPs to enterprise systems — every engagement starts with understanding the business problem first, then choosing the right stack."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Layout;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass group relative overflow-hidden rounded-2xl p-6 transition-colors hover:border-accent-violet/40"
              >
                <div className="absolute -right-10 -top-10 size-32 rounded-full bg-accent-violet/0 blur-2xl transition-all group-hover:bg-accent-violet/30" />
                <div className="relative">
                  <div className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-accent-violet to-accent-blue">
                    <Icon className="size-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}