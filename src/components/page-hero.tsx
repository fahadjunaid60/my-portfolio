import { GradientBlobs } from "./gradient-blobs";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: Props) {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-16">
      <GradientBlobs />
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <span className="rounded-full border border-accent-violet/40 bg-accent-violet/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-accent-violet">
          {eyebrow}
        </span>
        <h1 className="display-tight mt-6 text-5xl text-foreground md:text-7xl">
          <span className="gradient-text">{title}</span>
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
