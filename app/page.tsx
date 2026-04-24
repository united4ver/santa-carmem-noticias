import { DestaquePrincipal } from '@/components/DestaquePrincipal';
import { NoticiaCard } from '@/components/NoticiaCard';
import { SecaoEditoria } from '@/components/SecaoEditoria';
import { getDestaques, getUltimasNoticias, getNoticiasPorCategoria } from '@/lib/data';
import { CATEGORIAS_LISTA } from '@/lib/categorias';

export const revalidate = 60;

export default async function Home() {
  const [destaques, ultimas, ...porCategoria] = await Promise.all([
    getDestaques(),
    getUltimasNoticias(8),
    ...CATEGORIAS_LISTA.map((c) => getNoticiasPorCategoria(c.slug, 1, 3).then((r) => r.noticias)),
  ]);

  const [principal, ...outrosDestaques] = destaques;

  return (
    <div className="container py-6 md:py-10 space-y-12">
      {/* Hero + destaques secundários */}
      <section aria-label="Principais manchetes" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {principal && (
          <div className="lg:col-span-2">
            <DestaquePrincipal noticia={principal} />
          </div>
        )}
        <aside className="space-y-5">
          <h2 className="text-sm uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
            Em destaque
          </h2>
          <div className="space-y-5">
            {outrosDestaques.slice(0, 4).map((n) => (
              <NoticiaCard key={n._id} noticia={n} variant="horizontal" />
            ))}
          </div>
        </aside>
      </section>

      {/* Últimas notícias */}
      <section aria-labelledby="ultimas-titulo">
        <div className="flex items-end justify-between mb-5">
          <h2 id="ultimas-titulo" className="text-2xl md:text-3xl font-bold text-ink-light dark:text-ink-dark">
            Últimas notícias
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ultimas.map((n) => (
            <NoticiaCard key={n._id} noticia={n} />
          ))}
        </div>
      </section>

      {/* Seções por editoria */}
      {CATEGORIAS_LISTA.map((c, i) => (
        <SecaoEditoria key={c.slug} categoria={c.slug} noticias={porCategoria[i]} />
      ))}
    </div>
  );
}
