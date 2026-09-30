import { Award, GraduationCap } from 'lucide-react';

import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import type { Dictionary } from '@/content';
import { cn } from '@/lib/cn';

export function Education({ education }: { education: Dictionary['education'] }) {
  return (
    <Section id="education" eyebrow={education.eyebrow} title={education.title}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {education.items.map((item, index) => {
          const Icon = item.primary ? GraduationCap : Award;
          return (
            <li key={item.title} className={cn(item.primary && 'sm:col-span-2 lg:col-span-1')}>
              <Reveal delay={0.06 * index} className="h-full">
                <SpotlightCard
                  className={cn('flex h-full flex-col p-6', item.primary && 'gradient-border')}
                >
                  <Icon
                    className={cn('size-6', item.primary ? 'text-orange' : 'text-blue')}
                    aria-hidden
                  />
                  <h3 className="mt-5 font-semibold text-balance">{item.title}</h3>
                  <p className="text-muted mt-1 text-sm">{item.org}</p>
                  <p className="text-muted mt-auto pt-6 font-mono text-xs">{item.year}</p>
                </SpotlightCard>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
