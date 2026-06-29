"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Layout, Server, Workflow, ShoppingBag, Bot, Database, type LucideIcon } from "lucide-react";
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

// Distinct brand-ish gradient per service so the icons read as colorful.
const iconGradient: Record<string, string> = {
  Layout: "from-sky-500 to-cyan-400",
  Server: "from-violet-500 to-indigo-500",
  Workflow: "from-emerald-500 to-teal-400",
  ShoppingBag: "from-amber-500 to-orange-500",
  Bot: "from-fuchsia-500 to-pink-500",
  Database: "from-cyan-500 to-blue-500",
};

export function Services() {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = (i: number) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({
      left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  // Track the active card (mobile carousel) as it scrolls.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onScroll = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      let nearest = 0;
      let min = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
        if (d < min) {
          min = d;
          nearest = i;
        }
      });
      setActive(nearest);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="services" className="relative isolate overflow-hidden py-16 md:py-32">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Services"
          title="What I can build for you."
          description="From rapid MVPs to enterprise systems — every engagement starts with understanding the business problem first, then choosing the right stack."
        />

        <div
          ref={scroller}
          className="relative mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
        >
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Layout;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass group relative w-[80%] shrink-0 snap-center overflow-hidden rounded-2xl p-6 transition-colors hover:border-accent-violet/40 sm:w-[55%] md:w-auto md:shrink"
              >
                <div className="absolute -right-10 -top-10 size-32 rounded-full bg-accent-violet/0 blur-2xl transition-all group-hover:bg-accent-violet/30" />
                <div className="relative">
                  <div
                    className={`mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-linear-to-br ${
                      iconGradient[service.icon] ??
                      "from-accent-violet to-accent-blue"
                    }`}
                  >
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

        {/* Dots nav — mobile only */}
        <div className="mt-6 flex justify-center gap-2 md:hidden">
          {services.map((service, i) => (
            <button
              key={service.title}
              type="button"
              aria-label={`Go to ${service.title}`}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all ${
                active === i ? "w-6 bg-accent-violet" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
