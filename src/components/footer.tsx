import Link from "next/link";
import { Mail } from "lucide-react";
import { LogoMark } from "./logo";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "./brand-icons";
import { site, navLinks, services } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-faint">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + contact */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label={`${site.name} home`}
            >
              <LogoMark className="h-9 w-auto" />
              <span className="display-tight text-xl tracking-tight">
                <span className="text-foreground">Fad </span>
                <span className="text-accent-violet">Junaid</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {site.tagline} Available for freelance and remote work — based in{" "}
              {site.location}.
            </p>

            <a
              href={site.social.email}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent-violet"
            >
              <Mail className="size-4" />
              {site.email}
            </a>

            <div className="mt-6 flex items-center gap-3">
              <Social href={site.social.github} label="GitHub">
                <GithubIcon size={16} />
              </Social>
              <Social href={site.social.linkedin} label="LinkedIn">
                <LinkedinIcon size={16} />
              </Social>
              <Social href={site.social.facebook} label="Facebook">
                <FacebookIcon size={16} />
              </Social>
            </div>

            <p className="mt-8 text-xs text-muted">
              © {year} {site.name}. All rights reserved.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <FooterCol title="Navigation">
              {navLinks.map((l) => (
                <FooterLink key={l.href} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </FooterCol>

            <FooterCol title="Services">
              {services.map((s) => (
                <FooterLink key={s.title} href="/services">
                  {s.title}
                </FooterLink>
              ))}
            </FooterCol>

            <FooterCol title="Connect">
              <FooterLink href={site.social.github} external>
                GitHub
              </FooterLink>
              <FooterLink href={site.social.linkedin} external>
                LinkedIn
              </FooterLink>
              <FooterLink href={site.social.facebook} external>
                Facebook
              </FooterLink>
              <FooterLink href={site.social.email}>Email</FooterLink>
            </FooterCol>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-4 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        {children}
      </Link>
    </li>
  );
}

function Social({
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
      className="glass flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:border-accent-violet/40 hover:text-foreground"
    >
      {children}
    </a>
  );
}
