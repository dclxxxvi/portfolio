import type { Metadata, Viewport } from 'next';

import { getDictionary, localeHome, locales, type Locale } from '@/content';
import { site } from '@/content/site';

export function buildMetadata(locale: Locale): Metadata {
  const { meta } = getDictionary(locale);
  const path = localeHome(locale);

  return {
    metadataBase: new URL(`${site.url}/`),
    title: meta.title,
    description: meta.description,
    authors: [{ name: 'Aleksandr Tikhonov', url: site.url }],
    alternates: {
      canonical: `.${path}`,
      languages: Object.fromEntries(locales.map((l) => [l, `.${localeHome(l)}`])),
    },
    openGraph: {
      type: 'profile',
      locale: meta.ogLocale,
      url: `.${path}`,
      title: meta.title,
      description: meta.description,
      images: [{ url: './og.png', width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['./og.png'],
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#070919' },
    { media: '(prefers-color-scheme: light)', color: '#f6f4fb' },
  ],
};
