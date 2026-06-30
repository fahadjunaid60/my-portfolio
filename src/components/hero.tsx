"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Award, Mail } from "lucide-react";
import { GradientShape } from "./section-background";
import { site, stats } from "@/lib/data";

type HeroShape = {
  kind: "triangle" | "hexagon" | "diamond" | "blob" | "plus" | "pill";
  grad: "violetBlue" | "fuchsiaViolet" | "blueCyan";
  cls: string; // position + size + opacity
  dur: number;
  delay: number;
  spin?: boolean;
  blur?: boolean;
};

const HERO_SHAPES: HeroShape[] = [
  // Shown on all sizes (small on mobile, larger on desktop).
  { kind: "blob", grad: "fuchsiaViolet", cls: "-left-12 -top-10 h-36 w-36 opacity-20 lg:-left-20 lg:-top-16 lg:h-72 lg:w-72", dur: 26, delay: 0, blur: true },
  { kind: "triangle", grad: "violetBlue", cls: "left-[6%] top-[12%] h-12 w-12 opacity-50 lg:left-[5%] lg:top-[14%] lg:h-32 lg:w-32", dur: 16, delay: 0, spin: true },
  { kind: "hexagon", grad: "fuchsiaViolet", cls: "right-[8%] top-[10%] h-14 w-14 opacity-40 lg:right-[7%] lg:top-[12%] lg:h-32 lg:w-32", dur: 17, delay: 0.8, spin: true },
  { kind: "diamond", grad: "blueCyan", cls: "right-[10%] bottom-[14%] h-12 w-12 opacity-40 lg:right-[5%] lg:bottom-auto lg:top-[54%] lg:h-28 lg:w-28", dur: 15, delay: 2, spin: true },

  // Desktop only.
  { kind: "blob", grad: "blueCyan", cls: "hidden -right-24 top-1/3 h-80 w-80 opacity-15 lg:block", dur: 30, delay: 1.5, blur: true },
  { kind: "hexagon", grad: "blueCyan", cls: "hidden left-[9%] top-[64%] h-40 w-40 opacity-40 lg:block", dur: 19, delay: 1.2, spin: true },
  { kind: "diamond", grad: "fuchsiaViolet", cls: "hidden left-[43%] top-[8%] h-28 w-28 opacity-45 lg:block", dur: 14, delay: 1.8, spin: true },
  { kind: "plus", grad: "blueCyan", cls: "hidden left-[36%] bottom-[12%] h-24 w-24 opacity-45 lg:block", dur: 13, delay: 2.4, spin: true },
  { kind: "triangle", grad: "blueCyan", cls: "hidden right-[22%] bottom-[10%] h-32 w-32 opacity-40 lg:block", dur: 15, delay: 2, spin: true },
  { kind: "diamond", grad: "violetBlue", cls: "hidden left-[20%] bottom-[8%] h-24 w-24 opacity-40 lg:block", dur: 20, delay: 0.6, spin: true },
];

const RubiksCube = dynamic(
  () => import("./rubiks-cube").then((m) => m.RubiksCube),
  { ssr: false, loading: () => <div className="size-full" /> },
);

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
      className="relative isolate flex min-h-[90vh] items-center overflow-hidden pt-28 lg:pt-24"
    >
      {/* spotlight backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 h-[520px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.22),transparent_70%)] blur-2xl" />
      </div>

      {/* animated random shapes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {HERO_SHAPES.map((s, i) => (
          <div
            key={i}
            className={`hero-float absolute ${s.cls}`}
            style={
              {
                "--dur": `${s.dur}s`,
                "--delay": `${s.delay}s`,
              } as React.CSSProperties
            }
          >
            <div
              className={s.spin ? "hero-spin size-full" : "size-full"}
              style={
                s.spin
                  ? ({ "--dur": `${s.dur * 2.2}s` } as React.CSSProperties)
                  : undefined
              }
            >
              <GradientShape
                kind={s.kind}
                grad={s.grad}
                className={`size-full ${s.blur ? "blur-2xl" : ""}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/*
        Desktop: 2 columns — left has the copy (top) + cards/CTA (bottom), right
        has the cube spanning both rows. Mobile: single column in DOM order, so
        it stacks heading+description → cube → cards → CTA.
      */}
      <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-6 lg:grid-cols-2 lg:content-center lg:gap-x-6 lg:gap-y-3 lg:px-10">
        {/* Copy */}
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <motion.h1
            initial="hidden"
            animate="show"
            custom={0}
            variants={fadeUp}
            className="display-tight text-[clamp(2.4rem,4.5vw,3.75rem)] leading-[1.05]"
          >
            Building <span className="text-accent-violet">products</span> that
            move fast and scale far.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={0.15}
            variants={fadeUp}
            className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg lg:mx-0"
          >
            Full-stack developer crafting efficient, scalable web applications
            with React, Next.js, and .NET — turning ideas into polished,
            production-ready products.
          </motion.p>
        </div>

        {/* Rubik's cube — right column on desktop (spans both rows) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[320px] w-full sm:h-[420px] lg:row-span-2 lg:h-full lg:min-h-[460px]"
        >
          <RubiksCube className="absolute inset-0 size-full lg:translate-x-10" />
        </motion.div>

        {/* Cards + CTA */}
        <div className="mx-auto w-full max-w-xl lg:mx-0">
          <motion.div
            initial="hidden"
            animate="show"
            custom={0.45}
            variants={fadeUp}
            className="grid gap-3 text-left sm:grid-cols-2"
          >
            {/* Stats */}
            <div className="glass flex items-center gap-3 rounded-2xl p-4">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-amber-500 to-orange-500 text-white">
                <Award className="size-5" />
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="display-tight text-2xl text-foreground">
                  {stats[0].value} {stats[0].suffix}
                </span>
                <span className="text-sm text-muted">{stats[0].label}</span>
              </div>
            </div>

            {/* Contact */}
            <div className="glass group flex items-start gap-3 rounded-2xl p-4">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-blue-500 text-white">
                <Mail className="size-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Like what you see?
                </h3>
                <Link
                  href={site.social.email}
                  className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-accent-violet"
                >
                  Let&apos;s work together
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            custom={0.55}
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent-violet px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(115,21,255,0.6)] transition-all hover:bg-accent-violet/90 hover:shadow-[0_10px_40px_-8px_rgba(115,21,255,0.85)]"
            >
              Show my work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
