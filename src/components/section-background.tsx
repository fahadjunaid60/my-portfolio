"use client";

import { useId } from "react";

type Kind = "triangle" | "hexagon" | "diamond" | "blob" | "plus" | "pill";
type Grad = "violetBlue" | "fuchsiaViolet" | "blueCyan";
type Variant = "grid" | "dots" | "waves";

const GRADIENTS: Record<Grad, [string, string]> = {
  violetBlue: ["#7c3aed", "#2563eb"],
  fuchsiaViolet: ["#c026d3", "#7c3aed"],
  blueCyan: ["#3b82f6", "#22d3ee"],
};

// A single solid, gradient-filled geometric shape.
export function GradientShape({
  kind,
  grad,
  className = "",
}: {
  kind: Kind;
  grad: Grad;
  className?: string;
}) {
  const gid = "g" + useId().replace(/:/g, "");
  const [from, to] = GRADIENTS[grad];
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <Geometry kind={kind} fill={`url(#${gid})`} />
    </svg>
  );
}

function Geometry({ kind, fill }: { kind: Kind; fill: string }) {
  switch (kind) {
    case "triangle":
      return <polygon points="50,8 92,86 8,86" fill={fill} />;
    case "hexagon":
      return (
        <polygon points="50,5 91,27.5 91,72.5 50,95 9,72.5 9,27.5" fill={fill} />
      );
    case "diamond":
      return <polygon points="50,5 95,50 50,95 5,50" fill={fill} />;
    case "blob":
      return <rect x="8" y="8" width="84" height="84" rx="28" fill={fill} />;
    case "pill":
      return <rect x="4" y="34" width="92" height="32" rx="16" fill={fill} />;
    case "plus":
      return (
        <path
          d="M40 6 H60 V40 H94 V60 H60 V94 H40 V60 H6 V40 H40 Z"
          fill={fill}
        />
      );
  }
}

type Placed = {
  kind: Kind;
  grad: Grad;
  cls: string; // position + size + opacity
  dur: number;
  delay: number;
  spin?: boolean;
  blur?: boolean;
};

const SECTION_SHAPES: Record<Variant, Placed[]> = {
  grid: [
    { kind: "blob", grad: "violetBlue", cls: "-left-16 -top-16 h-56 w-56 opacity-20", dur: 22, delay: 0, blur: true },
    { kind: "hexagon", grad: "fuchsiaViolet", cls: "left-10 top-24 h-16 w-16 opacity-50", dur: 13, delay: 1, spin: true },
    { kind: "triangle", grad: "blueCyan", cls: "right-24 top-16 h-14 w-14 opacity-50", dur: 15, delay: 2 },
    { kind: "diamond", grad: "violetBlue", cls: "-right-12 -bottom-14 h-48 w-48 opacity-20", dur: 19, delay: 0.5, blur: true },
    { kind: "blob", grad: "blueCyan", cls: "right-16 bottom-20 h-12 w-12 opacity-50", dur: 16, delay: 1.6 },
  ],
  dots: [
    { kind: "hexagon", grad: "blueCyan", cls: "-right-16 -top-14 h-52 w-52 opacity-20", dur: 24, delay: 0, blur: true, spin: true },
    { kind: "diamond", grad: "fuchsiaViolet", cls: "right-24 top-20 h-14 w-14 opacity-50", dur: 14, delay: 1.2 },
    { kind: "triangle", grad: "violetBlue", cls: "-left-14 -bottom-12 h-48 w-48 opacity-20", dur: 20, delay: 0.4, blur: true },
    { kind: "plus", grad: "blueCyan", cls: "left-16 bottom-20 h-12 w-12 opacity-50", dur: 12, delay: 2.2, spin: true },
    { kind: "hexagon", grad: "violetBlue", cls: "left-1/3 top-12 h-10 w-10 opacity-40", dur: 17, delay: 0.8 },
  ],
  waves: [
    { kind: "blob", grad: "fuchsiaViolet", cls: "-left-16 -top-16 h-56 w-56 opacity-20", dur: 25, delay: 0, blur: true },
    { kind: "hexagon", grad: "violetBlue", cls: "left-24 top-16 h-14 w-14 opacity-50", dur: 13, delay: 1, spin: true },
    { kind: "diamond", grad: "blueCyan", cls: "-right-14 -bottom-16 h-52 w-52 opacity-20", dur: 21, delay: 0.6, blur: true },
    { kind: "triangle", grad: "fuchsiaViolet", cls: "right-20 bottom-24 h-16 w-16 opacity-50", dur: 14, delay: 2, spin: true },
    { kind: "pill", grad: "blueCyan", cls: "right-1/3 top-10 h-8 w-20 opacity-40", dur: 18, delay: 1.4 },
  ],
};

/**
 * Decorative solid gradient-shape backdrop for a section. Requires the parent
 * <section> to be `relative isolate overflow-hidden`.
 */
export function SectionBackground({ variant = "grid" }: { variant?: Variant }) {
  const shapes = SECTION_SHAPES[variant] ?? SECTION_SHAPES.grid;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)",
      }}
    >
      {shapes.map((s, i) => (
        <div
          key={i}
          className={`hero-float absolute ${s.cls}`}
          style={
            { "--dur": `${s.dur}s`, "--delay": `${s.delay}s` } as React.CSSProperties
          }
        >
          <div
            className={s.spin ? "hero-spin size-full" : "size-full"}
            style={
              s.spin
                ? ({ "--dur": `${s.dur * 2.4}s` } as React.CSSProperties)
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
  );
}
