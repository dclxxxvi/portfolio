import { GithubIcon } from '@/components/ui/BrandIcons';
import type { Dictionary } from '@/content';
import { site } from '@/content/site';

export function Footer({ footer, name }: { footer: Dictionary['footer']; name: string }) {
  return (
    <footer className="border-line border-t">
      <div className="text-muted mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm sm:flex-row sm:px-6">
        <p>
          © {new Date().getFullYear()} {name}
        </p>
        <p className="font-mono text-xs">{footer.builtWith}</p>
        <a
          href={site.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="hover:text-fg inline-flex items-center gap-2 transition-colors"
        >
          <GithubIcon className="size-4" />
          {footer.source}
        </a>
      </div>
    </footer>
  );
}
