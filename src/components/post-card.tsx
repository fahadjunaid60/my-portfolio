import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/lib/blog";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="glass group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all hover:border-accent-violet/40 hover:-translate-y-1"
    >
      <div className="flex items-center gap-2 text-xs text-muted">
        <time dateTime={post.date}>
          {dateFormatter.format(new Date(post.date))}
        </time>
        <span aria-hidden>·</span>
        <span>{post.readingMinutes} min read</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold text-foreground group-hover:text-accent-violet">
        {post.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {post.excerpt}
      </p>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border-themed bg-surface px-2.5 py-0.5 text-xs text-muted"
            >
              {t}
            </span>
          ))}
        </div>
        <ArrowUpRight className="size-4 shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-violet" />
      </div>
    </Link>
  );
}
