'use client';

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import { useTheme } from '@/lib/useTheme';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Gradient orbs render immediately; the WebGL scene is mounted after the page is idle
 * so it never competes with the first paint, and is skipped for reduced motion.
 */
export function HeroBackdrop() {
  const container = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  const light = useTheme() === 'light';

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start'],
  });
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    scrollProgress.current = value;
  });
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  useEffect(() => {
    if (reduceMotion || !supportsWebGL()) return;
    const start = () => setEnabled(true);
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 400);
    return () => clearTimeout(id);
  }, [reduceMotion]);

  // Stop rendering frames once the hero is off screen.
  useEffect(() => {
    const node = container.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry?.isIntersecting ?? false),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={container}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="animate-aurora bg-blue/25 absolute -top-40 -left-32 size-[34rem] rounded-full blur-[120px]" />
      <div
        className="animate-aurora bg-pink/20 absolute top-1/4 -right-40 size-[30rem] rounded-full blur-[120px]"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="animate-aurora bg-orange/20 absolute -bottom-40 left-1/3 size-[26rem] rounded-full blur-[120px]"
        style={{ animationDelay: '-12s' }}
      />

      {enabled ? (
        <motion.div className="absolute inset-0 md:left-[42%]" style={{ opacity: sceneOpacity }}>
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Dimmed on small screens, where the scene sits behind the text. */}
            <div className="absolute inset-0 opacity-30 md:opacity-100">
              <HeroScene scrollRef={scrollProgress} light={light} active={visible} />
            </div>
          </motion.div>
        </motion.div>
      ) : null}

      <div className="to-bg absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent" />
    </div>
  );
}
