import { Mail, MessageSquare, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import {
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
} from "@/components/brand-icons";
import { ContactForm } from "@/components/contact-form";
import { getOgImage, ogMetadata } from "@/lib/settings";
import { site } from "@/lib/data";

export async function generateMetadata() {
  return ogMetadata({
    title: "Contact — Fad Junaid",
    description:
      "Available for freelance and remote roles. Send a message and I'll get back to you within a business day.",
    image: await getOgImage("contact"),
    path: "/contact",
  });
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Let's build something."
        description="I'm currently available for freelance and remote opportunities. Send me a message below or reach out directly."
      />

      <section className="relative pb-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="grid gap-3 md:grid-cols-3 md:gap-6">
            <InfoTile
              icon={<Mail className="size-5" />}
              label="Email"
              value={site.email}
              href={site.social.email}
            />
            <InfoTile
              icon={<MessageSquare className="size-5" />}
              label="Where I work"
              value={site.location}
            />
            <InfoTile
              icon={<Clock className="size-5" />}
              label="Response time"
              value="Within one business day"
            />
          </div>

          <div className="glass mt-8 rounded-2xl p-8 md:p-10">
            <h2 className="display-tight text-2xl text-foreground md:text-3xl">
              Send a message
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/85">
              Tell me a little about what you&apos;re building. Most engagements
              start with a 30-minute call so we can scope the problem honestly —
              I&apos;ll reply within a business day.
            </p>

            <ContactForm />

            <div className="mt-10 flex items-center gap-3 border-t border-border-themed pt-8">
              <span className="text-xs uppercase tracking-widest text-muted">
                Or find me on
              </span>
              <SocialLink href={site.social.github} label="GitHub">
                <GithubIcon size={18} />
              </SocialLink>
              <SocialLink href={site.social.linkedin} label="LinkedIn">
                <LinkedinIcon size={18} />
              </SocialLink>
              <SocialLink href={site.social.facebook} label="Facebook">
                <FacebookIcon size={18} />
              </SocialLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="glass flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:border-accent-violet/40 hover:text-foreground"
    >
      {children}
    </a>
  );
}

function InfoTile({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="glass group flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-accent-violet/40 md:block md:p-6">
      <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-accent-violet to-accent-blue text-white">
        {icon}
      </div>
      <div className="min-w-0 md:mt-4">
        <div className="text-xs uppercase tracking-widest text-muted">
          {label}
        </div>
        <div className="truncate text-base font-medium text-foreground group-hover:text-accent-violet md:mt-1">
          {value}
        </div>
      </div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}
