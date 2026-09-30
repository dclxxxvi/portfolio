'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CopyButtonProps {
  value: string;
  label: string;
  copiedLabel: string;
}

export function CopyButton({ value, label, copiedLabel }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard access can be denied; the mailto link next to the button still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? copiedLabel : label}
      title={copied ? copiedLabel : label}
      className="border-line text-muted hover:border-line-strong hover:text-fg relative z-10 grid size-9 shrink-0 place-items-center rounded-full border transition-colors"
    >
      {copied ? <Check className="size-4 text-green-400" /> : <Copy className="size-4" />}
      <span aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ''}
      </span>
    </button>
  );
}
