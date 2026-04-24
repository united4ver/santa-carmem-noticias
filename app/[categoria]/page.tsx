import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { NoticiaCard } from '@/components/NoticiaCard';
import { getCategoria, CATEGORIAS_LISTA } from '@/lib/categorias';
import { getNoticiasPorCategoria } from '@/lib/data';

export const revalidate = 60;

interface Props {
  params: { categoria: string };
  searchParams: { p?: string };
}

export async function generateStaticParams() {
  return CATEGORIAS_LISTA.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const info = getCategoria(params.categoria);
  if (!info) return {};
  return {
    title: info.nome,
    description: info.descricao,
    alternates: { canonical: `/${info.slug}` },
  };
}

const POR_PAGINA = 12;

export default async function PaginaCategoria({ params, searchParams }: Props) {
  const info = getCategoria(params.categoria);
  if (!info) notFound();

  const pagina = Math.max(1, parseInt(searchParams.p || '1', 10));
  const { noticias, total } = await getNoticiasPorCategoria(info.slug, pagina, POR_PAGINA);
  const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));

  return (
    <div className="container py-6 md:py-10">
      <header className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <span className="inline-block w-1.5 h-8 rounded-sm" style={{ backgroundColor: info.cor }} aria-hidden="true" />
          <h1 className="text-3xl md:text-4xl font-bold text-ink-light dark:text-ink-dark">{info.nome}</h1>
        </div>
        <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl">{info.descricao}</p>
      </header>

      {noticias.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">Nenhuma notícia publicada nesta editoria ainda.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticias.map((n) => (
              <NoticiaCard key={n._id} noticia={n} />
            ))}
          </div>

          {totalPaginas > 1 && (
            <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Paginação">
              {pagina > 1 && (
                <Link
                  href={`/${info.slug}?p=${pagina - 1}`}
                  className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  ← Anterior
                </Link>
              )}
              <span className="text-sm text-slate-600 dark:text-slate-400 px-3">
                Página {pagina} de {totalPaginas}
              </span>
              {pagina < totalPaginas && (
                <Link
                  href={`/${info.slug}?p=${pagina + 1}`}
                  className="px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Próxima →
                </Link>
              )}
            </nav>
          )}
        </>
      )}
    </div>
  );
}
