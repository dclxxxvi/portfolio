import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'border-line bg-surface text-muted hover:border-line-strong hover:text-fg inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs transition-colors',
        className,
      )}
    >
      {children}
    </span>
  );
}
