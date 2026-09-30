'use client';

import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useState, type MouseEvent } from 'react';

import { localeHome, type Dictionary, type Locale } from '@/content';
import { asset } from '@/lib/assets';
import { cn } from '@/lib/cn';

import { ThemeToggle } from './ThemeToggle';

const sectionIds = ['about', 'experience', 'skills', 'education', 'contact'] as const;

interface HeaderProps {
  locale: Locale;
  nav: Dictionary['nav'];
  ui: Dictionary['ui'];
}

function useActiveSection(): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A section counts as active while it crosses the upper-middle band of the viewport.
      { rootMargin: '-35% 0px -60% 0px' },
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Header({ locale, nav, ui }: HeaderProps) {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  const otherLocale: Locale = locale === 'ru' ? 'en' : 'ru';

  // Keep the reader on the same section after switching language.
  function handleLanguageClick(event: MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.hash = window.location.hash;
  }

  const links = sectionIds.map((id) => ({ id, label: nav[id] }));

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled || menuOpen
          ? 'border-line bg-bg/70 border-b backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <a
        href="#main"
        className="bg-bg-elevated sr-only rounded-lg px-4 py-2 focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        {ui.skipToContent}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          <span className="text-gradient">AT</span>
          <span className="text-muted">.dev</span>
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? 'location' : undefined}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm transition-colors',
                    active === link.id ? 'text-fg' : 'text-muted hover:text-fg',
                  )}
                >
                  {active === link.id ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="border-line bg-surface-strong absolute inset-0 -z-10 rounded-full border"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* A plain link: each locale has its own root layout, so this is a full page load anyway. */}
          <a
            href={asset(localeHome(otherLocale))}
            hrefLang={otherLocale}
            lang={otherLocale}
            onClick={handleLanguageClick}
            aria-label={ui.otherLanguageLabel}
            className="border-line bg-surface hover:border-line-strong grid h-10 place-items-center rounded-full border px-3 font-mono text-xs font-semibold tracking-wider transition-colors"
          >
            {otherLocale.toUpperCase()}
          </a>
          <ThemeToggle labels={ui} />
          <button
            type="button"
            className="border-line bg-surface grid size-10 place-items-center rounded-full border md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? ui.closeMenu : ui.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 pb-6">
              {links.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * index }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-fg hover:bg-surface-strong block rounded-2xl px-4 py-3 text-lg"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
