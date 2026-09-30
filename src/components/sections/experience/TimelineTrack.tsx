'use client';

import { motion, useScroll, useSpring } from 'motion/react';
import { useRef, type ReactNode } from 'react';

/** Vertical timeline whose gradient line fills in as the visitor scrolls through it. */
export function TimelineTrack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} className="relative">
      <div
        aria-hidden
        className="bg-line absolute top-2 bottom-2 left-[7px] w-px md:left-[calc(12rem+7px)]"
      >
        <motion.div
          className="from-blue via-pink to-orange h-full w-full origin-top bg-gradient-to-b"
          style={{ scaleY }}
        />
      </div>
      {children}
    </div>
  );
}
