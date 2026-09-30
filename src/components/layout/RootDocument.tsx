import type { ReactNode } from 'react';

import { jetbrains, manrope, unbounded } from '@/app/fonts';
import type { Locale } from '@/content';

import '@/app/globals.css';

// Runs before the body content is parsed, so the stored theme applies without a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}})()`;

interface RootDocumentProps {
  locale: Locale;
  children: ReactNode;
}

export function RootDocument({ locale, children }: RootDocumentProps) {
  return (
    <html
      lang={locale}
      data-theme="dark"
      className={`${manrope.variable} ${unbounded.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
