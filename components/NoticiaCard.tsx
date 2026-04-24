import Link from 'next/link';
import { NoticiaImage } from './NoticiaImage';
import { CategoriaBadge } from './CategoriaBadge';
import { tempoRelativo } from '@/lib/formatters';
import type { Noticia } from '@/types';

interface Props {
  noticia: Noticia;
  variant?: 'default' | 'compact' | 'horizontal';
  priority?: boolean;
}

export function NoticiaCard({ noticia, variant = 'default', priority }: Props) {
  const href = `/noticia/${noticia.slug}`;

  if (variant === 'compact') {
    return (
      <article className="group border-b border-slate-200 dark:border-slate-800 pb-3 last:border-0 last:pb-0">
        <CategoriaBadge categoria={noticia.categoria} />
        <h3 className="mt-2 font-semibold leading-snug text-ink-light dark:text-ink-dark group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors">
          <Link href={href}>{noticia.titulo}</Link>
        </h3>
        <time className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
          {tempoRelativo(noticia.publicadoEm)}
        </time>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className="group grid grid-cols-[120px_1fr] gap-4 items-start">
        <Link href={href} className="overflow-hidden rounded-md">
          <NoticiaImage
            noticia={noticia}
            width={240}
            height={160}
            className="aspect-[3/2] object-cover w-full group-hover:scale-105 transition-transform duration-300"
            sizes="120px"
          />
        </Link>
        <div>
          <CategoriaBadge categoria={noticia.categoria} />
          <h3 className="mt-1.5 font-semibold leading-snug text-sm md:text-base text-ink-light dark:text-ink-dark group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors">
            <Link href={href}>{noticia.titulo}</Link>
          </h3>
          <time className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
            {tempoRelativo(noticia.publicadoEm)}
          </time>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col">
      <Link href={href} className="overflow-hidden rounded-lg">
        <NoticiaImage
          noticia={noticia}
          width={600}
          height={400}
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[3/2] object-cover w-full group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="mt-3">
        <CategoriaBadge categoria={noticia.categoria} />
        <h3 className="mt-2 font-bold text-lg leading-tight text-ink-light dark:text-ink-dark group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors">
          <Link href={href}>{noticia.titulo}</Link>
        </h3>
        {noticia.subtitulo && (
          <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
            {noticia.subtitulo}
          </p>
        )}
        <time className="mt-2 block text-xs text-slate-500 dark:text-slate-500">
          {tempoRelativo(noticia.publicadoEm)}
        </time>
      </div>
    </article>
  );
}
