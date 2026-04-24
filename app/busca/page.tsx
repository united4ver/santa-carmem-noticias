import { NoticiaCard } from '@/components/NoticiaCard';
import { buscarNoticias } from '@/lib/data';

export const metadata = { title: 'Busca' };
export const dynamic = 'force-dynamic';

interface Props {
  searchParams: { q?: string };
}

export default async function PaginaBusca({ searchParams }: Props) {
  const termo = (searchParams.q || '').trim();
  const resultados = termo ? await buscarNoticias(termo) : [];

  return (
    <div className="container py-6 md:py-10">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-ink-light dark:text-ink-dark">
          Busca
        </h1>
        {termo && (
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Resultados para <strong>"{termo}"</strong> — {resultados.length} {resultados.length === 1 ? 'notícia encontrada' : 'notícias encontradas'}
          </p>
        )}

        <form action="/busca" method="get" className="mt-5 flex gap-2 max-w-2xl">
          <input
            name="q"
            type="search"
            defaultValue={termo}
            required
            placeholder="Buscar notícias..."
            className="flex-1 px-4 py-2.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 focus:outline-none text-ink-light dark:text-ink-dark"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-md bg-brand-700 hover:bg-brand-600 text-white font-medium transition-colors"
          >
            Buscar
          </button>
        </form>
      </header>

      {!termo ? (
        <p className="text-slate-500 dark:text-slate-400">Digite um termo para buscar notícias.</p>
      ) : resultados.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">
          Nenhuma notícia encontrada com esse termo. Tente palavras-chave diferentes.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resultados.map((n) => (
            <NoticiaCard key={n._id} noticia={n} />
          ))}
        </div>
      )}
    </div>
  );
}
