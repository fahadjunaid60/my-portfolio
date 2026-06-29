"use client";

import { useEffect, useState } from "react";

const palettes = [
  ["#7c3aed", "#2563eb"],
  ["#c026d3", "#7c3aed"],
  ["#2563eb", "#06b6d4"],
  ["#a855f7", "#ec4899"],
  ["#6366f1", "#8b5cf6"],
  ["#3b82f6", "#a855f7"],
];

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

// Card is 16:10, so the visible portion is 0.625 image-widths tall.
const CARD_ASPECT = 10 / 16;
// YoMaCoFo (1000×1717) scrolls its full page in 4s. That distance is
// (1717/1000 − 0.625) = 1.092 image-widths → this is the shared px/sec rate.
const RATE_PER_SECOND = 1.092 / 4;

type Props = {
  slug: string;
  title: string;
  image?: string;
  // Tall full-page screenshot → scroll it top→bottom on hover. Short captures
  // just cover the card.
  tall?: boolean;
};

export function ProjectThumbnail({ slug, title, image, tall = true }: Props) {
  const hasRealImage = image && !image.endsWith(".svg");
  // Scroll duration is derived per image so every project scrolls at the same
  // speed as YoMaCoFo (taller screenshots simply take proportionally longer).
  const [durationMs, setDurationMs] = useState(4000);

  useEffect(() => {
    if (!tall || !hasRealImage || !image) return;
    const img = new window.Image();
    img.onload = () => {
      if (!img.naturalWidth) return;
      const ratio = img.naturalHeight / img.naturalWidth;
      const seconds = Math.max(1, (ratio - CARD_ASPECT) / RATE_PER_SECOND);
      setDurationMs(Math.round(seconds * 1000));
    };
    img.src = image;
  }, [image, tall, hasRealImage]);

  if (hasRealImage) {
    return (
      <div
        role="img"
        aria-label={title}
        className={
          tall
            ? "absolute inset-0 bg-size-[100%_auto] bg-top bg-no-repeat transition-[background-position] ease-linear motion-safe:group-hover:bg-bottom motion-safe:group-data-[active=true]:bg-bottom"
            : "absolute inset-0 bg-cover bg-top bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-105"
        }
        style={{
          backgroundImage: `url(${image})`,
          ...(tall ? { transitionDuration: `${durationMs}ms` } : {}),
        }}
      />
    );
  }

  const [from, to] = palettes[hash(slug) % palettes.length];
  const initials = title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div
      className="relative flex size-full items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage:
          "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.25) 0%, transparent 40%)",
      }} />
      <span className="display-tight relative text-6xl text-white drop-shadow-lg">
        {initials}
      </span>
    </div>
  );
}
