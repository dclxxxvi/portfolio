export type Locale = 'ru' | 'en';

/** Year and month, e.g. `2024-04`. */
export type YearMonth = `${number}-${number}`;

export interface Stat {
  /** The counter animates from `from` to `to`, so improvements can count down. */
  from: number;
  to: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  teaser: string;
  problem: string;
  solution: string[];
  result: string;
}

export interface Job {
  id: string;
  company: string;
  role: string;
  period: { start: YearMonth; end?: YearMonth };
  location: string;
  domain: string;
  badge?: string;
  summary: string;
  metrics: { value: string; label: string }[];
  achievements: string[];
  stack: string[];
  cases: CaseStudy[];
}

export interface SkillGroup {
  id: string;
  name: string;
  items: string[];
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    ogLocale: string;
  };
  nav: {
    about: string;
    experience: string;
    skills: string;
    education: string;
    contact: string;
  };
  ui: {
    switchToLight: string;
    switchToDark: string;
    languageName: string;
    otherLanguageLabel: string;
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    status: string;
    greeting: string;
    name: string;
    role: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: Stat[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    facts: { label: string; value: string }[];
    photoAlt: string;
  };
  experience: {
    eyebrow: string;
    title: string;
    lead: string;
    present: string;
    achievementsLabel: string;
    stackLabel: string;
    casesLabel: string;
    problemLabel: string;
    solutionLabel: string;
    resultLabel: string;
    showCase: string;
    hideCase: string;
    jobs: Job[];
  };
  skills: {
    eyebrow: string;
    title: string;
    groups: SkillGroup[];
    languages: string;
  };
  education: {
    eyebrow: string;
    title: string;
    items: { title: string; org: string; year: string; primary?: boolean }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    email: string;
    telegram: string;
    github: string;
    copy: string;
    copied: string;
  };
  footer: {
    builtWith: string;
    source: string;
  };
}
