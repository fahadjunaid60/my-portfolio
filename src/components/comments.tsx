"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Send, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import { submitComment, type CommentState } from "@/app/(frontend)/blog/actions";
import type { CommentItem } from "@/lib/blog";

const initialState: CommentState = { status: "idle" };

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

const inputClass =
  "w-full rounded-xl border border-border-themed bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-accent-violet/60";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent-violet px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(115,21,255,0.6)] transition-all hover:bg-accent-violet/90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Send className="size-4" />
      {pending ? "Posting…" : "Post comment"}
    </button>
  );
}

export function Comments({
  postId,
  comments,
}: {
  postId: string;
  comments: CommentItem[];
}) {
  const [state, formAction] = useActionState(submitComment, initialState);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // On success, clear the form and re-fetch the server-rendered comment list.
  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      router.refresh();
    }
  }, [state, router]);

  return (
    <section className="relative pb-8">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
          <MessageSquare className="size-5 text-accent-violet" />
          Comments
          <span className="text-muted">({comments.length})</span>
        </h2>

        {/* Existing comments */}
        <ul className="mt-6 space-y-4">
          {comments.length === 0 ? (
            <li className="text-sm text-muted">
              No comments yet — be the first to share your thoughts.
            </li>
          ) : (
            comments.map((c) => (
              <li key={c.id} className="glass rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-accent-violet to-accent-blue text-sm font-semibold text-white">
                    {c.name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {c.name}
                    </div>
                    <div className="text-xs text-muted">
                      {dateFormatter.format(new Date(c.createdAt))}
                    </div>
                  </div>
                </div>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                  {c.content}
                </p>
              </li>
            ))
          )}
        </ul>

        {/* Comment form */}
        <form
          ref={formRef}
          action={formAction}
          className="glass mt-8 flex flex-col gap-4 rounded-2xl p-6"
        >
          <h3 className="text-base font-semibold text-foreground">
            Leave a comment
          </h3>
          <input type="hidden" name="postId" value={postId} />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="c-name" className="sr-only">
                Your name
              </label>
              <input
                id="c-name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="c-email" className="sr-only">
                Your email (optional)
              </label>
              <input
                id="c-email"
                name="email"
                type="email"
                placeholder="Email (optional, not shown)"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="c-content" className="sr-only">
              Your comment
            </label>
            <textarea
              id="c-content"
              name="content"
              required
              rows={4}
              placeholder="Share your thoughts…"
              className={inputClass}
            />
          </div>

          {state.status !== "idle" && state.message && (
            <p
              role="status"
              className={`flex items-center gap-2 text-sm ${
                state.status === "success" ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {state.status === "success" ? (
                <CheckCircle2 className="size-4 shrink-0" />
              ) : (
                <AlertCircle className="size-4 shrink-0" />
              )}
              {state.message}
            </p>
          )}

          <div>
            <SubmitButton />
          </div>
        </form>
      </div>
    </section>
  );
}
