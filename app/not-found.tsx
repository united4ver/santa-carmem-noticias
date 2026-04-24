import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container py-20 text-center">
      <p className="text-sm font-semibold text-brand-700 dark:text-brand-300">Erro 404</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold text-ink-light dark:text-ink-dark">
        Página não encontrada
      </h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-md mx-auto">
        A notícia ou página que você procura pode ter sido removida, ou o endereço está incorreto.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-md bg-brand-700 hover:bg-brand-600 text-white font-medium transition-colors"
        >
          Voltar ao início
        </Link>
        <Link
          href="/busca"
          className="px-5 py-2.5 rounded-md border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Buscar notícias
        </Link>
      </div>
    </div>
  );
}
