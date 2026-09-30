import type { MetadataRoute } from 'next';

import { localeHome, locales } from '@/content';
import { site } from '@/content/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${site.url}${localeHome(locale)}`,
    changeFrequency: 'monthly',
    priority: locale === 'ru' ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${localeHome(l)}`])),
    },
  }));
}
