import Link from 'next/link';
import { Logo } from './Logo';
import { CATEGORIAS_LISTA } from '@/lib/categorias';

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Portal de notícias dedicado à cidade de Santa Carmem, Mato Grosso. Informação local com
              credibilidade, cobrindo política municipal, segurança, agronegócio e cultura.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-ink-light dark:text-ink-dark">Editorias</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {CATEGORIAS_LISTA.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}`}
                    className="text-slate-600 dark:text-slate-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                  >
                    {cat.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-ink-light dark:text-ink-dark">Institucional</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/sobre" className="text-slate-600 dark:text-slate-400 hover:text-brand-700 dark:hover:text-brand-300">Sobre</Link></li>
              <li><Link href="/expediente" className="text-slate-600 dark:text-slate-400 hover:text-brand-700 dark:hover:text-brand-300">Expediente</Link></li>
              <li><Link href="/privacidade" className="text-slate-600 dark:text-slate-400 hover:text-brand-700 dark:hover:text-brand-300">Política de Privacidade</Link></li>
              <li><Link href="/termos" className="text-slate-600 dark:text-slate-400 hover:text-brand-700 dark:hover:text-brand-300">Termos de Uso</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            © {ano} Santa Carmem Notícias. Todos os direitos reservados.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Santa Carmem — Mato Grosso — Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
