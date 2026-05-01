"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  variant?: "hero" | "section";
};

/**
 * Lightweight gradient blob backdrop. Two blobs max, capped at blur-2xl.
 * Heavier presets (blur-3xl + 3 blobs + animations everywhere) caused
 * paint thrashing on integrated GPUs.
 */
export function GradientBlobs({ className = "", variant = "section" }: Props) {
  if (variant === "hero") {
    return <HeroBlobs className={className} />;
  }

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute left-1/4 top-1/4 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,#7c3aed_0%,transparent_70%)] opacity-20 blur-2xl" />
      <div className="absolute right-1/4 bottom-1/4 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,#2563eb_0%,transparent_70%)] opacity-20 blur-2xl" />
    </div>
  );
}

function HeroBlobs({ className }: { className: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorBlobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const blob = cursorBlobRef.current;
    if (!container || !blob) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let initialized = false;
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      if (!initialized) {
        current.x = target.x;
        current.y = target.y;
        initialized = true;
      }
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      blob.style.transform = `translate3d(${current.x - 280}px, ${current.y - 280}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="blob-a absolute -left-32 top-20 h-105 w-105 rounded-full bg-[radial-gradient(circle_at_30%_30%,#7c3aed_0%,#4f46e5_40%,transparent_70%)] opacity-60 blur-2xl" />
      <div className="blob-b absolute -right-24 -bottom-10 h-115 w-115 rounded-full bg-[radial-gradient(circle_at_70%_70%,#c026d3_0%,#7c3aed_30%,#2563eb_60%,transparent_80%)] opacity-50 blur-2xl" />
      <div
        ref={cursorBlobRef}
        className="absolute left-0 top-0 h-140 w-140 rounded-full bg-[radial-gradient(circle,#a78bfa_0%,#7c3aed_25%,transparent_60%)] opacity-30 blur-2xl will-change-transform"
        style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
      />
    </div>
  );
}
