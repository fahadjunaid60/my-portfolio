"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import {
  submitMessage,
  type ContactState,
} from "@/app/(frontend)/contact/actions";

const initialState: ContactState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex items-center justify-center gap-3 rounded-full bg-linear-to-r from-accent-violet to-accent-blue px-7 py-4 text-base font-medium text-white shadow-[0_0_40px_rgba(124,58,237,0.4)] transition-all hover:shadow-[0_0_60px_rgba(124,58,237,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Send className="size-5" />
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

const inputClass =
  "w-full rounded-xl border border-border-themed bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-accent-violet/60";

export function ContactForm() {
  const [state, formAction] = useActionState(submitMessage, initialState);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="sr-only">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Your email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="sr-only">
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell me about your project…"
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

      <div className="mt-2">
        <SubmitButton />
      </div>
    </form>
  );
}
