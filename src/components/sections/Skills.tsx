import { Bot, Boxes, FlaskConical, Layers, Server, Wrench, type LucideIcon } from 'lucide-react';

import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Tag } from '@/components/ui/Tag';
import type { Dictionary } from '@/content';
import { cn } from '@/lib/cn';

const groupIcons: Record<string, LucideIcon> = {
  frontend: Layers,
  backend: Server,
  testing: FlaskConical,
  devops: Boxes,
  ai: Bot,
  tools: Wrench,
};

// Wide and narrow tiles alternate so the bento grid fills three even rows on desktop.
const wideGroups = new Set(['frontend', 'devops', 'ai']);

export function Skills({ skills }: { skills: Dictionary['skills'] }) {
  const allItems = skills.groups.flatMap((group) => group.items);
  const half = Math.ceil(allItems.length / 2);

  return (
    <Section id="skills" eyebrow={skills.eyebrow} title={skills.title}>
      <div
        aria-hidden
        className="relative -mx-4 mb-14 space-y-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)] sm:-mx-6"
      >
        <Marquee items={allItems.slice(0, half)} />
        <Marquee items={allItems.slice(half)} reverse />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.groups.map((group, index) => {
          const Icon = groupIcons[group.id] ?? Layers;
          return (
            <Reveal
              key={group.id}
              delay={0.06 * index}
              className={cn(wideGroups.has(group.id) && 'lg:col-span-2')}
            >
              <SpotlightCard className="h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="bg-sunset grid size-10 place-items-center rounded-xl text-white">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="font-display text-lg font-semibold">{group.name}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li key={skill}>
                      <Tag>{skill}</Tag>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <p className="text-muted mt-8 font-mono text-sm">{skills.languages}</p>
      </Reveal>
    </Section>
  );
}

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  // The list is doubled so the -50% keyframe loops seamlessly.
  const loop = [...items, ...items];
  return (
    <div className="flex w-max">
      <div
        className="animate-marquee flex gap-4 pr-4 hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="border-line bg-surface font-display text-muted rounded-2xl border px-6 py-3 text-xl whitespace-nowrap sm:text-2xl"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
