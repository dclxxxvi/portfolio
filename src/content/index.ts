import { en } from './en';
import { ru } from './ru';
import type { Dictionary, Locale } from './types';

export const locales = ['ru', 'en'] as const satisfies readonly Locale[];
export const defaultLocale: Locale = 'ru';

const dictionaries: Record<Locale, Dictionary> = { ru, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Home path for a locale; the default locale lives at the site root. */
export function localeHome(locale: Locale): string {
  return locale === defaultLocale ? '/' : `/${locale}/`;
}

export type { Dictionary, Locale } from './types';
