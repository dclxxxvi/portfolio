import Image from 'next/image';

import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import type { Dictionary } from '@/content';
import photo from '@/content/photo.jpg';

export function About({ about }: { about: Dictionary['about'] }) {
  return (
    <Section id="about" eyebrow={about.eyebrow} title={about.title}>
      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <Reveal>
          <SpotlightCard tilt className="gradient-border group overflow-hidden p-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem]">
              <Image
                src={photo}
                alt={about.photoAlt}
                placeholder="blur"
                sizes="(min-width: 768px) 40vw, 100vw"
                className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="from-bg/70 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
            </div>
          </SpotlightCard>
        </Reveal>

        <div>
          <div className="text-muted space-y-5 text-lg leading-relaxed text-pretty">
            {about.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph} delay={0.08 * index}>
                <p className={index === 0 ? 'text-fg' : undefined}>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <dl className="mt-10 grid grid-cols-2 gap-3">
              {about.facts.map((fact) => (
                <SpotlightCard key={fact.label} className="rounded-2xl p-4">
                  <dt className="text-muted font-mono text-xs tracking-wider uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 font-semibold">{fact.value}</dd>
                </SpotlightCard>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
