'use client';

import { useEffect, useState } from 'react';

type Tema = 'light' | 'dark';

export function ThemeToggle() {
  const [tema, setTema] = useState<Tema>('light');
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    const salvo = (localStorage.getItem('tema') as Tema | null);
    const sistema: Tema = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const inicial = salvo ?? sistema;
    setTema(inicial);
    document.documentElement.classList.toggle('dark', inicial === 'dark');
    setMontado(true);
  }, []);

  function alternar() {
    const novo: Tema = tema === 'dark' ? 'light' : 'dark';
    setTema(novo);
    localStorage.setItem('tema', novo);
    document.documentElement.classList.toggle('dark', novo === 'dark');
  }

  if (!montado) {
    return <span className="p-2 block w-9 h-9" aria-hidden="true" />;
  }

  return (
    <button
      onClick={alternar}
      className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
      aria-label={tema === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
    >
      {tema === 'dark' ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
