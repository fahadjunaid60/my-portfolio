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

type Props = {
  slug: string;
  title: string;
  image?: string;
};

export function ProjectThumbnail({ slug, title, image }: Props) {
  // If user later drops a real (tall) screenshot, auto-scroll it on hover.
  // Technique: background-size 100% auto lets the image overflow downward,
  // and transitioning background-position from top→bottom scrolls it.
  const hasRealImage = image && !image.endsWith(".svg");
  if (hasRealImage) {
    return (
      <div
        role="img"
        aria-label={title}
        className="absolute inset-0 bg-size-[100%_auto] bg-top bg-no-repeat transition-[background-position] duration-4000 ease-linear motion-safe:group-hover:bg-bottom"
        style={{ backgroundImage: `url(${image})` }}
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