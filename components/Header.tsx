'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { CATEGORIAS_LISTA } from '@/lib/categorias';
import clsx from 'clsx';

export function Header() {
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-surface-dark/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="container flex items-center justify-between h-16">
        <Logo />

        <nav aria-label="Editorias" className="hidden md:flex items-center gap-1">
          {CATEGORIAS_LISTA.map((cat) => {
            const href = `/${cat.slug}`;
            const ativo = pathname === href;
            return (
              <Link
                key={cat.slug}
                href={href}
                className={clsx(
                  'relative px-3 py-2 text-sm font-medium transition-colors',
                  ativo
                    ? 'text-brand-700 dark:text-brand-300'
                    : 'text-slate-700 dark:text-slate-300 hover:text-brand-700 dark:hover:text-brand-300',
                )}
              >
                {cat.nome}
                {ativo && (
                  <span
                    className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full"
                    style={{ backgroundColor: cat.cor }}
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setBuscaAberta((v) => !v)}
            className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Abrir busca"
            aria-expanded={buscaAberta}
          >
            <IconBusca />
          </button>
          <ThemeToggle />
          <button
            onClick={() => setMenuAberto((v) => !v)}
            className="md:hidden p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
          >
            {menuAberto ? <IconFechar /> : <IconMenu />}
          </button>
        </div>
      </div>

      {buscaAberta && (
        <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark">
          <form action="/busca" method="get" className="container py-3 flex gap-2">
            <input
              name="q"
              type="search"
              required
              autoFocus
              placeholder="Buscar notícias..."
              className="flex-1 px-4 py-2 rounded-md bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 text-ink-light dark:text-ink-dark"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-brand-700 hover:bg-brand-600 text-white font-medium transition-colors"
            >
              Buscar
            </button>
          </form>
        </div>
      )}

      {menuAberto && (
        <nav aria-label="Menu mobile" className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark">
          <ul className="container py-2">
            {CATEGORIAS_LISTA.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/${cat.slug}`}
                  onClick={() => setMenuAberto(false)}
                  className="flex items-center justify-between py-3 px-1 text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1 h-6 rounded-sm" style={{ backgroundColor: cat.cor }} aria-hidden="true" />
                    {cat.nome}
                  </span>
                  <IconChevron />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function IconMenu() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}

function IconFechar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
    </svg>
  );
}

function IconBusca() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function IconChevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
