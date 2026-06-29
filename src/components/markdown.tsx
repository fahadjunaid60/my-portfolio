import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: (props) => (
          <h1
            className="display-tight mt-12 text-3xl text-foreground md:text-4xl"
            {...props}
          />
        ),
        h2: (props) => (
          <h2
            className="display-tight mt-10 text-2xl text-foreground md:text-3xl"
            {...props}
          />
        ),
        h3: (props) => (
          <h3
            className="mt-8 text-xl font-semibold text-foreground"
            {...props}
          />
        ),
        p: (props) => (
          <p
            className="mt-4 text-base leading-relaxed text-foreground/85"
            {...props}
          />
        ),
        ul: (props) => (
          <ul
            className="mt-4 list-disc space-y-2 pl-6 text-foreground/85"
            {...props}
          />
        ),
        ol: (props) => (
          <ol
            className="mt-4 list-decimal space-y-2 pl-6 text-foreground/85"
            {...props}
          />
        ),
        li: (props) => <li className="leading-relaxed" {...props} />,
        a: (props) => (
          <a
            className="text-accent-violet underline decoration-accent-violet/40 underline-offset-4 transition-colors hover:decoration-accent-violet"
            {...props}
          />
        ),
        strong: (props) => (
          <strong className="font-semibold text-foreground" {...props} />
        ),
        em: (props) => <em className="italic text-foreground/90" {...props} />,
        blockquote: (props) => (
          <blockquote
            className="mt-6 border-l-2 border-accent-violet/60 pl-4 text-foreground/80 italic"
            {...props}
          />
        ),
        code: ({ className, children, ...rest }) => {
          const isBlock = (className ?? "").startsWith("language-");
          if (isBlock) {
            return (
              <code
                className={`block overflow-x-auto rounded-xl border border-border-themed bg-surface p-4 font-mono text-sm text-foreground/90 ${className ?? ""}`}
                {...rest}
              >
                {children}
              </code>
            );
          }
          return (
            <code
              className="rounded-md border border-border-themed bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
              {...rest}
            >
              {children}
            </code>
          );
        },
        pre: (props) => <pre className="mt-4" {...props} />,
        hr: () => <hr className="my-10 border-border-themed" />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
