import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

import { Reveal } from './Reveal';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, eyebrow, title, lead, className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn('relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 md:py-32', className)}
    >
      <Reveal className="mb-12 max-w-3xl md:mb-16">
        <p className="text-pink mb-4 font-mono text-xs tracking-[0.3em] uppercase">
          <span aria-hidden>{'// '}</span>
          {eyebrow}
        </p>
        <h2
          id={`${id}-title`}
          className="font-display text-3xl leading-tight font-semibold text-balance sm:text-4xl md:text-5xl"
        >
          {title}
        </h2>
        {lead ? <p className="text-muted mt-5 text-lg text-pretty">{lead}</p> : null}
      </Reveal>
      {children}
    </section>
  );
}
