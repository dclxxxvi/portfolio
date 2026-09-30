import type { ReactNode } from 'react';

import { RootDocument } from '@/components/layout/RootDocument';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata('en');
export { viewport } from '@/lib/metadata';

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
