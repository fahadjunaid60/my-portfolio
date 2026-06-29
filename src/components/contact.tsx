"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { SectionBackground } from "./section-background";
import { SectionHeading } from "./section-heading";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "./brand-icons";
import { site } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden py-16 md:py-32">
      <SectionBackground variant="waves" />
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Let's build something."
          description="I'm currently available for freelance and remote opportunities. If you have a project in mind, or just want to chat — drop me a line."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <a
            href={site.social.email}
            className="group inline-flex items-center gap-3 rounded-full bg-linear-to-r from-accent-violet to-accent-blue px-7 py-4 text-base font-medium text-white shadow-[0_0_40px_rgba(124,58,237,0.4)] transition-all hover:shadow-[0_0_60px_rgba(124,58,237,0.6)]"
          >
            <Mail className="size-5" />
            {site.email}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>

          <div className="flex items-center gap-3">
            <SocialLink href={site.social.github} label="GitHub">
              <GithubIcon size={20} />
            </SocialLink>
            <SocialLink href={site.social.linkedin} label="LinkedIn">
              <LinkedinIcon size={20} />
            </SocialLink>
            <SocialLink href={site.social.facebook} label="Facebook">
              <FacebookIcon size={20} />
            </SocialLink>
          </div>
        </motion.div>
      </div>
    </section>
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
      className="glass flex size-12 items-center justify-center rounded-full text-muted transition-colors hover:border-accent-violet/40 hover:text-foreground"
    >
      {children}
    </a>
  );
}