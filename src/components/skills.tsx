"use client";

import { Database } from "lucide-react";
import {
  siClaude,
  siDotnet,
  siLangchain,
  siLaravel,
  siMake,
  siMysql,
  siN8n,
  siNodedotjs,
  siReact,
  siTailwindcss,
  siTypescript,
  siUmbraco,
  siZapier,
  type SimpleIcon,
} from "simple-icons";
import { OpenAiIcon } from "./brand-icons";
import { SectionHeading } from "./section-heading";
import { SectionBackground } from "./section-background";
import { skillGroups, type SkillItem } from "@/lib/data";

const iconBySlug: Record<string, SimpleIcon> = {
  react: siReact,
  typescript: siTypescript,
  dotnet: siDotnet,
  nodedotjs: siNodedotjs,
  umbraco: siUmbraco,
  laravel: siLaravel,
  mysql: siMysql,
  tailwindcss: siTailwindcss,
  n8n: siN8n,
  zapier: siZapier,
  make: siMake,
  claude: siClaude,
  langchain: siLangchain,
};

// Use each brand's official color, but fall back to near-white for very dark
// logos so they stay visible on the dark background.
function brandColor(hex: string) {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance < 45 ? "#e5e7eb" : `#${hex}`;
}

function TechIcon({ skill }: { skill: SkillItem }) {
  if (skill.kind === "openai") {
    return <OpenAiIcon size={28} className="text-foreground" />;
  }
  if (skill.kind === "vector-db") {
    return <Database className="size-7 text-accent-violet" />;
  }
  const icon = skill.slug ? iconBySlug[skill.slug] : undefined;
  if (!icon) return <Database className="size-7 text-accent-violet" />;
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ color: brandColor(icon.hex) }}
    >
      <path d={icon.path} />
    </svg>
  );
}

function SkillTile({ skill }: { skill: SkillItem }) {
  return (
    <div className="glass group flex w-40 shrink-0 flex-col items-center justify-center gap-2 rounded-xl px-3 py-4 transition-colors hover:border-accent-violet/40">
      <div className="opacity-80 transition-opacity group-hover:opacity-100">
        <TechIcon skill={skill} />
      </div>
      <span className="text-center text-xs font-medium text-muted transition-colors group-hover:text-foreground">
        {skill.name}
      </span>
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: SkillItem[];
  direction: "left" | "right";
}) {
  // Duplicate the list so the -50% translation loop is seamless.
  const doubled = [...items, ...items];
  return (
    <div
      className="marquee-mask relative overflow-hidden"
      // Soft edge fade so tiles don't pop in/out abruptly.
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className={`marquee-track flex gap-3 ${
          direction === "left" ? "marquee-left" : "marquee-right"
        }`}
      >
        {doubled.map((skill, i) => (
          <SkillTile key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative isolate overflow-hidden py-16 md:py-32">
      <SectionBackground variant="grid" />
      <div className="mx-auto max-w-7xl">
        <div className="px-6 lg:px-10">
          <SectionHeading
            eyebrow="Skills"
            title="Tools of the trade."
            description="Years of focused practice across the stack. These are the tools I reach for daily — not just résumé filler."
          />
        </div>

        <div className="mt-16 space-y-8">
          {skillGroups.map((group, idx) => (
            <div key={group.category}>
              <h3 className="mb-4 px-6 text-xs font-semibold uppercase tracking-[0.22em] text-muted lg:px-10">
                {group.category}
              </h3>
              <MarqueeRow
                items={group.items}
                direction={idx % 2 === 0 ? "left" : "right"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
