"use client";

import { GradientShape } from "./section-background";

type Kind = "triangle" | "hexagon" | "diamond" | "blob" | "plus" | "pill";
type Grad = "violetBlue" | "fuchsiaViolet" | "blueCyan";

type Item = {
  kind: Kind;
  grad: Grad;
  top: string;
  left: string;
  size: number;
  opacity: number;
  dur: number;
  delay: number;
  spin?: boolean;
  spinDur?: number;
  blur?: boolean;
};

// Large soft shapes for ambient color depth.
const AMBIENT: Item[] = [
  { kind: "blob", grad: "violetBlue", top: "-10%", left: "-8%", size: 420, opacity: 0.3, dur: 28, delay: 0, blur: true },
  { kind: "hexagon", grad: "fuchsiaViolet", top: "42%", left: "74%", size: 460, opacity: 0.22, dur: 32, delay: 2, blur: true, spin: true, spinDur: 110 },
  { kind: "diamond", grad: "blueCyan", top: "78%", left: "30%", size: 300, opacity: 0.18, dur: 26, delay: 1, blur: true },
];

// Crisp solid shapes floating in front.
const SHAPES: Item[] = [
  { kind: "triangle", grad: "violetBlue", top: "15%", left: "9%", size: 72, opacity: 0.7, dur: 13, delay: 0, spin: true, spinDur: 46 },
  { kind: "hexagon", grad: "blueCyan", top: "60%", left: "15%", size: 92, opacity: 0.55, dur: 17, delay: 1.5 },
  { kind: "diamond", grad: "fuchsiaViolet", top: "24%", left: "84%", size: 62, opacity: 0.65, dur: 15, delay: 0.8, spin: true, spinDur: 40 },
  { kind: "blob", grad: "violetBlue", top: "70%", left: "82%", size: 70, opacity: 0.55, dur: 19, delay: 0.4 },
  { kind: "plus", grad: "blueCyan", top: "12%", left: "57%", size: 46, opacity: 0.6, dur: 12, delay: 2, spin: true, spinDur: 34 },
  { kind: "triangle", grad: "blueCyan", top: "82%", left: "46%", size: 52, opacity: 0.5, dur: 16, delay: 1 },
  { kind: "diamond", grad: "violetBlue", top: "48%", left: "92%", size: 40, opacity: 0.6, dur: 18, delay: 0.2, spin: true, spinDur: 52 },
  { kind: "hexagon", grad: "fuchsiaViolet", top: "32%", left: "39%", size: 34, opacity: 0.45, dur: 14, delay: 2.6 },
];

function Floaty({ item }: { item: Item }) {
  return (
    <div
      className="hero-float absolute"
      style={
        {
          top: item.top,
          left: item.left,
          width: item.size,
          height: item.size,
          opacity: item.opacity,
          "--dur": `${item.dur}s`,
          "--delay": `${item.delay}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={item.spin ? "hero-spin size-full" : "size-full"}
        style={
          item.spin
            ? ({ "--dur": `${item.spinDur ?? 48}s` } as React.CSSProperties)
            : undefined
        }
      >
        <GradientShape
          kind={item.kind}
          grad={item.grad}
          className={`size-full ${item.blur ? "blur-2xl" : ""}`}
        />
      </div>
    </div>
  );
}

export function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {AMBIENT.map((item, i) => (
        <Floaty key={`a${i}`} item={item} />
      ))}
      {SHAPES.map((item, i) => (
        <Floaty key={`s${i}`} item={item} />
      ))}
    </div>
  );
}
