'use client';

import { ChevronDown, Target, Trophy, Wrench } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useId, useState } from 'react';

import type { CaseStudy, Dictionary } from '@/content/types';
import { cn } from '@/lib/cn';

type Labels = Pick<
  Dictionary['experience'],
  'problemLabel' | 'solutionLabel' | 'resultLabel' | 'showCase' | 'hideCase'
>;

interface CaseStudyItemProps {
  study: CaseStudy;
  index: number;
  labels: Labels;
}

export function CaseStudyItem({ study, index, labels }: CaseStudyItemProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border transition-colors duration-300',
        open
          ? 'border-line-strong bg-surface-strong'
          : 'border-line bg-surface hover:border-line-strong',
      )}
    >
      <h4>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="group flex w-full items-start gap-4 p-4 text-left sm:p-5"
        >
          <span className="text-gradient font-mono text-sm font-semibold tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="flex-1">
            <span className="text-fg block font-semibold">{study.title}</span>
            <span className="text-muted mt-1 block text-sm">{study.teaser}</span>
          </span>
          <span className="sr-only">{open ? labels.hideCase : labels.showCase}</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="border-line text-muted group-hover:text-fg grid size-8 shrink-0 place-items-center rounded-full border"
            aria-hidden
          >
            <ChevronDown className="size-4" />
          </motion.span>
        </button>
      </h4>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border-line grid gap-5 border-t p-4 sm:p-5">
              <CaseBlock
                icon={<Target className="size-4" />}
                label={labels.problemLabel}
                tone="blue"
              >
                <p>{study.problem}</p>
              </CaseBlock>
              <CaseBlock
                icon={<Wrench className="size-4" />}
                label={labels.solutionLabel}
                tone="pink"
              >
                <ul className="space-y-2">
                  {study.solution.map((step) => (
                    <li key={step} className="flex gap-3">
                      <span className="bg-pink mt-2.5 size-1.5 shrink-0 rounded-full" aria-hidden />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </CaseBlock>
              <CaseBlock
                icon={<Trophy className="size-4" />}
                label={labels.resultLabel}
                tone="orange"
              >
                <p className="text-fg font-medium">{study.result}</p>
              </CaseBlock>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const toneClasses = {
  blue: 'text-blue bg-blue/10 border-blue/30',
  pink: 'text-pink bg-pink/10 border-pink/30',
  orange: 'text-orange bg-orange/10 border-orange/30',
} as const;

function CaseBlock({
  icon,
  label,
  tone,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  tone: keyof typeof toneClasses;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-4">
      <div
        className={cn(
          'inline-flex h-fit w-fit items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs font-semibold tracking-wider uppercase',
          toneClasses[tone],
        )}
      >
        {icon}
        {label}
      </div>
      <div className="text-muted text-sm leading-relaxed sm:text-base">{children}</div>
    </div>
  );
}
