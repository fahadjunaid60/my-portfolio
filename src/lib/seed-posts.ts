import type { Post } from "./blog";

// Original hardcoded posts, used once to seed the Payload "posts" collection.
// After seeding, posts are managed in the admin panel; this file is only the
// initial content source (see `npm run seed`).
export const seedPosts: Omit<Post, "id">[] = [
  {
    slug: "default-stack-dotnet-nextjs",
    title: "Why I default to .NET + Next.js for client work",
    excerpt:
      "After seven years across stacks, this is the pairing I keep coming back to — and the trade-offs I've actually felt in production.",
    date: "2026-04-22",
    readingMinutes: 6,
    tags: [".NET", "Next.js", "Architecture"],
    body: `Most "what stack should I use" posts read like a tournament bracket. This isn't that. It's the answer I give clients when they ask why I keep showing up with the same two tools.

## The split

The pairing is simple: **Next.js for the front end, .NET (Core / 8+) for the back end.** They communicate over a small REST or gRPC surface. The browser never talks to the database directly.

Why split at all? Because the things a web framework is good at and the things a service framework is good at have diverged. Next.js gets routing, hydration, image optimization, and edge rendering right out of the box. .NET gets long-lived processes, structured concurrency, EF Core, and a typing system that survives refactors a year later.

## What I actually feel in production

A few things I never have to fight:

- **Type safety across the boundary.** I generate TS types from the .NET OpenAPI spec. When the contract changes, the front end stops compiling — not the way you find out at 2am.
- **Performance baseline.** A hot ASP.NET endpoint hovers around half a millisecond. I don't optimize until I have a reason.
- **EF Core migrations.** Schema changes are a single command, version-controlled, reviewable. I've been burned enough by ad-hoc SQL in Node projects to never go back.

## The honest trade-offs

- **Two languages, two toolchains.** New devs joining a project pay a real onboarding cost. I keep the ceremony low — no microservices, one solution, one front-end app.
- **Hosting story is more involved than "deploy to Vercel."** I usually run the API on a small VM or App Service, with the front end on Vercel. It's not hard, but it's not click-once either.
- **Cold starts on serverless .NET aren't great.** I avoid serverless on the API side and stick to long-lived containers.

## When I deviate

- **Pure marketing site, no auth, no real backend?** Just Next.js. .NET would be ceremony.
- **Real-time-heavy (chat, presence, collaborative editing)?** Node still has the ergonomics edge for sockets at small scale.
- **Heavy AI/ML pipelines?** Python service alongside the .NET one. .NET's ML story is fine but the ecosystem isn't where Python is yet.

## TL;DR

Pick the stack you can debug at 2am with no internet. For me that's still C# on the server and TypeScript in the browser.`,
  },
  {
    slug: "vector-dbs-in-production",
    title: "Vector DBs in production: what to know before you ship",
    excerpt:
      "Embeddings look magical in a notebook. Three lessons from putting them behind a real client product.",
    date: "2026-03-30",
    readingMinutes: 7,
    tags: ["AI", "Vector DBs", "Postgres"],
    body: `Vector search demos are easy. Vector search in production — under load, with stale data, and a real budget — is a different animal. Three lessons from the trenches.

## 1. Postgres + pgvector is enough longer than you'd think

Every "best vector DB" post starts with a benchmark of seven specialized engines. You probably don't need any of them.

For most B2B products, the corpus fits in tens of millions of rows, latency tolerance is 100–300ms, and recall is bottlenecked by your *prompt* and *chunking*, not the index. \`pgvector\` with HNSW gets you all of that, while keeping your operational surface area at one database.

The day you genuinely outgrow Postgres, you'll know. Until then, every other engine is one more thing that pages someone at 3am.

## 2. Chunking matters more than the model

I've spent more time tuning chunk size and overlap than picking embedding models. The differences between OpenAI's, Cohere's, and the open-source contenders are real but small. The differences between 200-token chunks vs 800-token chunks, with 0% vs 20% overlap, are *huge*.

Rules I follow:

- **Start at 500 tokens, 15% overlap.** Adjust based on document type.
- **Respect natural boundaries.** Splitting mid-sentence wrecks recall. Use heading and paragraph boundaries.
- **Store the parent.** Index the chunk, but return enough surrounding context to ground the LLM. Retrieval-then-rerank with the full parent works better than just returning the matching chunk.

## 3. Re-embed on schedule, not on every change

The naive approach: every time a document changes, regenerate its embeddings. Fine for low-write apps. Painful when a client's content team makes 5,000 small edits a day.

I queue re-embedding jobs and batch them — usually nightly. The user-facing latency stays low, the API costs stay predictable, and stale-by-a-day is fine for almost every use case I've shipped.

If you genuinely need real-time freshness, that's a different conversation — and probably means a different architecture.

## What I'd skip

- **Specialty vector DBs** until Postgres groans. Pinecone and friends are fine, just not the first reach.
- **Premature reranking layers.** Get retrieval right first. A reranker on top of bad chunks is just makeup.
- **"Hybrid search" before you've measured.** It usually helps, but pick a baseline first so you know.

The hard part of "AI features" is rarely the model. It's the boring data plumbing around it.`,
  },
  {
    slug: "agentic-workflows-that-dont-break",
    title: "Building agentic workflows that don't break",
    excerpt:
      "An agent loop is one bad tool call away from a runaway. Here's the small set of guardrails I add to every production deploy.",
    date: "2026-03-12",
    readingMinutes: 5,
    tags: ["AI", "Automation", "n8n"],
    body: `Agents are seductive. You hand the model some tools, write a system prompt, and watch it figure out a multi-step task. Then you put it in front of real users and watch it loop, hallucinate a tool name, or quietly do nothing for forty seconds.

These are the guardrails I add to every agentic flow before it touches real users.

## Hard step limits

Every loop has a maximum step count. Five for simple flows. Twenty for the most complex. If the agent hasn't converged by then, it returns whatever partial result it has, with a flag.

This single rule has saved me more money on token bills than every other optimization combined.

## Tool-call timeouts

Each tool gets its own timeout — usually two to ten seconds depending on the call. The agent never blocks the request indefinitely waiting on a slow API.

When a tool times out, I return a structured error to the agent. Half the time it recovers and tries something else. The other half it gives up cleanly, which is also fine.

## A small, opinionated tool surface

The first version of every agent has the wrong tools. Too many "read" tools, no clear "this is the final answer" tool, vague names like \`get_data\`.

What works:

- **Verbs in tool names.** \`fetch_invoice\`, not \`invoice_helper\`.
- **One way to do each thing.** If two tools could plausibly answer the same question, the agent will pick wrong half the time.
- **A terminal tool.** Some explicit \`submit_answer\` or \`finalize\` so the agent knows when it's done.

## Observability is non-negotiable

I log every step: input, model thoughts (if any), tool called, tool result, final output. In something searchable — Postgres, ClickHouse, Datadog, anything.

Without this, debugging an agent is fortune-telling. With it, you find the actual failure mode in five minutes.

## Where n8n fits

For a lot of "agent" requirements, you don't actually need an agent loop. You need a deterministic pipeline with one or two LLM steps in the middle. n8n shines here — visual, debuggable, easy to hand off to a non-technical client.

I reach for a real agent loop when the path genuinely branches based on intermediate results. Otherwise: pipeline, every time.

The unsexy lesson: most "agentic" features ship better as careful pipelines.`,
  },
  {
    slug: "pricing-project-work-after-7-years",
    title: "Pricing project work after 7 years",
    excerpt:
      "How I moved from hourly rates to fixed-price scopes — the math, the conversations, and what I'd do differently.",
    date: "2026-02-18",
    readingMinutes: 6,
    tags: ["Freelance", "Business"],
    body: `Pricing is the hardest part of freelancing. Not because the math is hard — the math is fine. Because every conversation about price is also a conversation about *value*, and clients don't always know how to have that one.

After seven years and a few hundred quotes, here's how I think about it now.

## Hourly is a trap (eventually)

Hourly rates are the right place to start. They're easy to quote, easy to track, easy to defend. For the first year or two of freelancing, just charge a fair hourly rate and ship.

The trap kicks in once you're efficient. A client gets the same outcome whether you spend 20 hours or 80 — but you make four times less if you're four times faster. You're punished for being good.

## What I do now: fixed price, with scope guards

I quote a project price for a defined scope. Three things make this work:

1. **A written scope** — what's in, what's out, what counts as "done". One page, plain English, signed.
2. **A change-request process** — anything outside scope gets a separate quote. Not "billed extra" — *quoted* and accepted before I touch it.
3. **A rate for the gray zone** — small unscoped tweaks during the build are charged hourly at a defined rate, capped per week.

The first two protect me from scope creep. The third protects the client from feeling nickel-and-dimed.

## How I land on a number

Two anchors:

- **Outcome value.** What does this work do for the client's business? A lead-capture funnel that doubles their conversion is worth more than the same code on a low-traffic info site.
- **Time + risk premium.** Estimate the hours, add 30% buffer, multiply by a higher hourly rate than my usual. The premium pays for the risk of being wrong on the estimate.

The number I quote is roughly the higher of those two. Outcome value usually wins.

## What I'd do differently

- **Walk away from sub-budget projects faster.** Spending a week negotiating a too-small project costs me a real one.
- **Get the down payment up front, every time.** No exceptions, no "we'll sort it after the first milestone." It filters out tire-kickers in 24 hours.
- **Quote in writing, with options.** Three tiers — small, medium, with-everything — anchor the conversation around scope, not just price.

## The thing nobody tells you

The clients who push hardest on price are almost always the ones you'll regret. The ones who say "yes, that's fair, when can you start" are the ones who'll refer you to three more good clients.

Charge enough that you're excited to do the work. The rest sorts itself out.`,
  },
];
