import { ArrowUpRight, Mail } from 'lucide-react';
import type { ReactNode } from 'react';

import { GithubIcon, TelegramIcon } from '@/components/ui/BrandIcons';
import { Reveal } from '@/components/ui/Reveal';
import type { Dictionary } from '@/content';
import { links, site } from '@/content/site';

import { CopyButton } from './CopyButton';

export function Contact({ contact }: { contact: Dictionary['contact'] }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 md:py-32"
    >
      <Reveal>
        <div className="gradient-border border-line bg-bg-elevated relative overflow-hidden rounded-[2rem] border p-8 sm:p-12 md:p-16">
          <div
            aria-hidden
            className="animate-aurora bg-pink/25 absolute -top-24 -right-24 size-80 rounded-full blur-[100px]"
          />
          <div
            aria-hidden
            className="animate-aurora bg-blue/25 absolute -bottom-24 -left-24 size-80 rounded-full blur-[100px]"
            style={{ animationDelay: '-8s' }}
          />

          <div className="relative">
            <p className="text-pink mb-4 font-mono text-xs tracking-[0.3em] uppercase">
              <span aria-hidden>{'// '}</span>
              {contact.eyebrow}
            </p>
            <h2
              id="contact-title"
              className="font-display text-4xl leading-tight font-bold sm:text-5xl md:text-6xl"
            >
              <span className="text-gradient">{contact.title}</span>
            </h2>
            <p className="text-muted mt-6 max-w-2xl text-lg text-pretty">{contact.lead}</p>

            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              <ContactLink
                href={links.telegram}
                icon={<TelegramIcon className="size-5" />}
                label={contact.telegram}
                value={`@${site.contacts.telegram}`}
                external
              />
              <ContactLink
                href={links.email}
                icon={<Mail className="size-5" />}
                label={contact.email}
                value={site.contacts.email}
                action={
                  <CopyButton
                    value={site.contacts.email}
                    label={contact.copy}
                    copiedLabel={contact.copied}
                  />
                }
              />
              <ContactLink
                href={links.github}
                icon={<GithubIcon className="size-5" />}
                label={contact.github}
                value={site.contacts.github}
                external
              />
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

interface ContactLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
  value: string;
  external?: boolean;
  action?: ReactNode;
}

function ContactLink({ href, icon, label, value, external, action }: ContactLinkProps) {
  return (
    <li className="group border-line bg-surface hover:border-line-strong hover:bg-surface-strong relative flex items-center gap-4 rounded-2xl border p-5 transition-all hover:-translate-y-1">
      <span className="bg-sunset grid size-11 shrink-0 place-items-center rounded-xl text-white">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="text-muted block font-mono text-xs tracking-wider uppercase">{label}</span>
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
          className="block truncate font-semibold after:absolute after:inset-0"
        >
          {value}
        </a>
      </span>
      {action ?? (
        <ArrowUpRight
          className="text-muted group-hover:text-fg size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      )}
    </li>
  );
}
