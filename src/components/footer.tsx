import { site } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-sm text-muted lg:flex-row lg:px-10">
        <p>
          © {year} {site.name}. Built with Next.js & Tailwind.
        </p>
        <p className="text-xs">{site.location}</p>
      </div>
    </footer>
  );
}