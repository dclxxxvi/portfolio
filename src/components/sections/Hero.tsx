'use client';

import { ArrowDown } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

import { HeroBackdrop } from '@/components/hero/HeroBackdrop';
import { TelegramIcon } from '@/components/ui/BrandIcons';
import { Counter } from '@/components/ui/Counter';
import type { Dictionary } from '@/content';
import { links } from '@/content/site';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero({ hero }: { hero: Dictionary['hero'] }) {
  const reduceMotion = useReducedMotion();
  // Split the name so each word can rise separately.
  const nameWords = hero.name.split(' ');

  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden pt-24 pb-16"
    >
      <HeroBackdrop />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6"
        variants={container}
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
      >
        <motion.p
          variants={item}
          className="border-line bg-surface text-muted mb-8 inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm backdrop-blur-md"
        >
          <span className="animate-pulse-dot size-2 rounded-full bg-green-400" aria-hidden />
          {hero.status}
        </motion.p>

        <motion.p variants={item} className="text-muted mb-3 font-mono text-sm sm:text-base">
          {hero.greeting}
        </motion.p>

        <h1 className="font-display text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.95] font-bold tracking-tight">
          {nameWords.map((word, index) => (
            <span key={word} className="block overflow-hidden pb-2">
              <motion.span
                className={index === nameWords.length - 1 ? 'text-gradient block' : 'block'}
                variants={{
                  hidden: { y: '110%' },
                  show: { y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          variants={item}
          className="font-display text-fg/90 mt-6 text-xl font-medium sm:text-2xl"
        >
          {hero.role}
        </motion.p>

        <motion.p
          variants={item}
          className="text-muted mt-5 max-w-xl text-base leading-relaxed text-pretty sm:text-lg"
        >
          {hero.lead}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={links.telegram}
            target="_blank"
            rel="noreferrer"
            className="group bg-sunset relative inline-flex items-center gap-3 rounded-full px-7 py-4 font-semibold text-white shadow-[0_10px_40px_-10px_var(--accent-pink)] transition-transform hover:-translate-y-0.5"
          >
            <TelegramIcon className="size-5 transition-transform group-hover:rotate-12" />
            {hero.ctaPrimary}
          </a>
          <a
            href="#experience"
            className="group border-line-strong bg-surface hover:bg-surface-strong inline-flex items-center gap-2 rounded-full border px-7 py-4 font-semibold backdrop-blur-md transition-colors"
          >
            {hero.ctaSecondary}
            <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </motion.div>

        <motion.dl
          variants={item}
          className="border-line bg-line mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border sm:grid-cols-3 lg:grid-cols-5"
        >
          {hero.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={
                'bg-bg/80 flex flex-col gap-2 p-5 backdrop-blur-md sm:p-6' +
                (index === hero.stats.length - 1 ? ' col-span-2 sm:col-span-1' : '')
              }
            >
              <dt className="text-muted order-2 text-xs leading-snug sm:text-sm">{stat.label}</dt>
              <dd className="font-display order-1 text-3xl font-semibold tabular-nums sm:text-4xl">
                <Counter
                  from={stat.from}
                  to={stat.to}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="text-gradient"
                />
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
