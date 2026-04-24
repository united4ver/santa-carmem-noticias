'use client';

import { useState } from 'react';

interface Props {
  url: string;
  titulo: string;
}

export function CompartilharBotoes({ url, titulo }: Props) {
  const [copiado, setCopiado] = useState(false);

  const mensagem = encodeURIComponent(`${titulo}\n${url}`);
  const urlEnc = encodeURIComponent(url);
  const titEnc = encodeURIComponent(titulo);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // silently ignore
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Compartilhar:</span>

      <a
        href={`https://wa.me/?text=${mensagem}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#25D366] hover:opacity-90 text-white text-sm font-medium transition-opacity"
        aria-label="Compartilhar no WhatsApp"
      >
        <IconWhats /> WhatsApp
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${urlEnc}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#1877F2] hover:opacity-90 text-white text-sm font-medium transition-opacity"
        aria-label="Compartilhar no Facebook"
      >
        <IconFace /> Facebook
      </a>

      <a
        href={`https://twitter.com/intent/tweet?url=${urlEnc}&text=${titEnc}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black hover:opacity-80 text-white text-sm font-medium transition-opacity"
        aria-label="Compartilhar no X (antigo Twitter)"
      >
        <IconX /> X
      </a>

      <button
        onClick={copiar}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <IconLink /> {copiado ? 'Copiado!' : 'Copiar link'}
      </button>
    </div>
  );
}

function IconWhats() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7 0 1.6 1.2 3.1 1.3 3.3.2.2 2.3 3.5 5.6 4.9 3.3 1.4 3.3.9 3.9.9.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.3c1.4.8 3 1.3 4.7 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>;
}
function IconFace() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7C18.3 21.1 22 17 22 12z"/></svg>;
}
function IconX() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2h3.4l-7.4 8.4L23.7 22h-6.8l-5.3-6.9L5.5 22H2.1l7.9-9-7.5-11h7L14.3 8 18.9 2z"/></svg>;
}
function IconLink() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.5.7l3-3a5 5 0 0 0-7-7l-1.6 1.6M14 11a5 5 0 0 0-7.5-.7l-3 3a5 5 0 0 0 7 7l1.6-1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
