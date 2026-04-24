import Link from 'next/link';
import { NoticiaCard } from './NoticiaCard';
import { getCategoria, type CategoriaSlug } from '@/lib/categorias';
import type { Noticia } from '@/types';

interface Props {
  categoria: CategoriaSlug;
  noticias: Noticia[];
}

export function SecaoEditoria({ categoria, noticias }: Props) {
  const info = getCategoria(categoria);
  if (!info || noticias.length === 0) return null;

  return (
    <section aria-labelledby={`secao-${categoria}`}>
      <header className="flex items-center justify-between mb-5">
        <h2
          id={`secao-${categoria}`}
          className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-ink-light dark:text-ink-dark"
        >
          <span
            className="inline-block w-1.5 h-7 rounded-sm"
            style={{ backgroundColor: info.cor }}
            aria-hidden="true"
          />
          {info.nome}
        </h2>
        <Link
          href={`/${categoria}`}
          className="text-sm font-medium text-brand-700 dark:text-brand-300 hover:underline"
        >
          Ver todas →
        </Link>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {noticias.slice(0, 3).map((n) => (
          <NoticiaCard key={n._id} noticia={n} />
        ))}
      </div>
    </section>
  );
}
