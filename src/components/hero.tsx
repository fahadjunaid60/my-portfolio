"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { GradientBlobs } from "./gradient-blobs";
import { site, stats } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen items-center overflow-hidden pt-24"
    >
      <GradientBlobs variant="hero" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left column — copy */}
          <div className="lg:col-span-7">
            <motion.p
              initial="hidden"
              animate="show"
              custom={0}
              variants={fadeUp}
              className="text-2xl font-light text-muted md:text-3xl"
            >
              Hi, I&apos;m
            </motion.p>

            <motion.h1
              initial="hidden"
              animate="show"
              custom={0.1}
              variants={fadeUp}
              className="display-tight mt-2 leading-[0.9] text-[clamp(2.75rem,7vw,6rem)]"
            >
              <span className="gradient-text">FAD JUNAID</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="show"
              custom={0.25}
              variants={fadeUp}
              className="mt-4 text-2xl font-light text-foreground/80 md:text-3xl"
            >
              full-stack developer.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              custom={0.4}
              variants={fadeUp}
              className="mt-6 max-w-xl"
            >
              <p className="text-base leading-relaxed text-muted">
                {site.bio}
              </p>
              <a
                href="#projects"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-violet"
              >
                <span className="border-b border-accent-violet/40 pb-0.5 transition-colors group-hover:border-accent-violet">
                  View My Work
                </span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>

          {/* Right column — cards inline with name */}
          <motion.div
            initial="hidden"
            animate="show"
            custom={0.55}
            variants={fadeUp}
            className="lg:col-span-5"
          >
            <div className="flex flex-wrap items-stretch justify-start gap-3 sm:gap-4 lg:justify-end">
              <div className="glass flex aspect-square w-28 items-center justify-center rounded-2xl sm:w-32">
                <div className="rounded-full bg-linear-to-br from-accent-violet to-accent-blue p-3">
                  <Sparkles className="size-7 text-white" />
                </div>
              </div>
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass flex w-32 flex-col items-center justify-center rounded-2xl px-4 py-5 sm:w-36"
                >
                  <div className="display-tight text-3xl text-foreground sm:text-4xl">
                    {s.value}
                    {s.suffix && (
                      <span className="ml-1 text-base font-normal text-muted">
                        {s.suffix}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-center text-xs text-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
