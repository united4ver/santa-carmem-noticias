'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const CHAVE = 'cookie-consent';

export function CookieBanner() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CHAVE)) setVisivel(true);
  }, []);

  function aceitar() {
    localStorage.setItem(CHAVE, 'accepted');
    setVisivel(false);
  }

  function recusar() {
    localStorage.setItem(CHAVE, 'rejected');
    setVisivel(false);
  }

  if (!visivel) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimento de cookies"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl rounded-xl p-4 animate-fade-in"
    >
      <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
        Usamos cookies para melhorar sua experiência e analisar o tráfego do site. Ao continuar, você
        concorda com nossa{' '}
        <Link href="/privacidade" className="text-brand-700 dark:text-brand-300 underline font-medium">
          Política de Privacidade
        </Link>
        .
      </p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={aceitar}
          className="flex-1 px-3 py-2 rounded-md bg-brand-700 hover:bg-brand-600 text-white text-sm font-medium transition-colors"
        >
          Aceitar
        </button>
        <button
          onClick={recusar}
          className="px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Recusar
        </button>
      </div>
    </div>
  );
}
