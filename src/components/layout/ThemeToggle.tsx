'use client';

import { Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { setTheme, useTheme, type Theme } from '@/lib/useTheme';

interface ThemeToggleProps {
  labels: { switchToLight: string; switchToDark: string };
}

export function ThemeToggle({ labels }: ThemeToggleProps) {
  const theme = useTheme();
  const next: Theme = theme === 'dark' ? 'light' : 'dark';

  function toggle() {
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={next === 'light' ? labels.switchToLight : labels.switchToDark}
      className="border-line bg-surface text-fg hover:border-line-strong relative grid size-10 place-items-center overflow-hidden rounded-full border transition-colors"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.25 }}
        >
          {theme === 'dark' ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
