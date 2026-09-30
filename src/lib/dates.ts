import type { Locale, YearMonth } from '@/content/types';

function toDate(value: YearMonth): Date {
  const [year, month] = value.split('-').map(Number);
  return new Date(Date.UTC(year ?? 1970, (month ?? 1) - 1, 1));
}

function formatMonth(value: YearMonth, locale: Locale): string {
  const formatted = new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(toDate(value));
  // Russian short months come out as "дек. 2025 г." — drop the trailing year marker.
  return formatted.replace(/\s?г\.$/, '');
}

export function formatPeriod(
  period: { start: YearMonth; end?: YearMonth },
  locale: Locale,
  presentLabel: string,
): { start: string; end: string } {
  return {
    start: formatMonth(period.start, locale),
    end: period.end ? formatMonth(period.end, locale) : presentLabel,
  };
}

const units = {
  ru: {
    year: { one: 'год', few: 'года', many: 'лет', other: 'года' },
    month: { one: 'мес.', few: 'мес.', many: 'мес.', other: 'мес.' },
  },
  en: {
    year: { one: 'yr', other: 'yrs' },
    month: { one: 'mo', other: 'mos' },
  },
} as const;

function plural(
  count: number,
  locale: Locale,
  forms: Partial<Record<Intl.LDMLPluralRule, string>>,
): string {
  const rule = new Intl.PluralRules(locale).select(count);
  return `${count} ${forms[rule] ?? forms.other ?? ''}`;
}

/** Inclusive duration, counted the way resumes do: Apr 2024 — Dec 2025 is 1 yr 9 mos. */
export function formatDuration(
  period: { start: YearMonth; end?: YearMonth },
  locale: Locale,
  now: Date = new Date(),
): string {
  const start = toDate(period.start);
  const end = period.end ? toDate(period.end) : now;
  const total =
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    (end.getUTCMonth() - start.getUTCMonth());
  const months = Math.max(total + 1, 1);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(plural(years, locale, units[locale].year));
  if (rest > 0) parts.push(plural(rest, locale, units[locale].month));
  return parts.join(' ');
}
