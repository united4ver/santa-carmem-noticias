import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Expediente',
  description: 'Equipe, política editorial e informações de contato do Santa Carmem Notícias.',
  alternates: { canonical: '/expediente' },
};

export default function PaginaExpediente() {
  return (
    <article className="container py-10 max-w-3xl prose-noticia">
      <h1 className="font-sans text-4xl font-bold text-ink-light dark:text-ink-dark mb-6">Expediente</h1>

      <h2>Diretor Responsável</h2>
      <p>[Nome a definir]</p>

      <h2>Equipe editorial</h2>
      <ul>
        <li>Redação (a completar)</li>
        <li>Fotografia (a completar)</li>
      </ul>

      <h2>Política editorial</h2>
      <p>
        Todas as matérias publicadas no Santa Carmem Notícias passam por processo de apuração,
        revisão e checagem. Em casos envolvendo acusações, sempre buscamos ouvir todas as partes
        antes da publicação. Correções, quando necessárias, são feitas de forma transparente e
        sinalizadas ao final da matéria.
      </p>

      <h2>Correções</h2>
      <p>
        Identificou um erro em alguma matéria? Escreva para{' '}
        <a href="mailto:correcoes@santacarmemnoticias.com.br">correcoes@santacarmemnoticias.com.br</a>
        {' '}com o link da notícia e a informação que precisa ser corrigida.
      </p>

      <h2>Anunciar no portal</h2>
      <p>
        Para anúncios e publieditoriais, escreva para{' '}
        <a href="mailto:comercial@santacarmemnoticias.com.br">comercial@santacarmemnoticias.com.br</a>.
      </p>

      <h2>Endereço</h2>
      <p>Santa Carmem — Mato Grosso — Brasil</p>
    </article>
  );
}
