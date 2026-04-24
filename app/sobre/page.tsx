import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Conheça a missão e a história do Santa Carmem Notícias.',
  alternates: { canonical: '/sobre' },
};

export default function PaginaSobre() {
  return (
    <article className="container py-10 max-w-3xl prose-noticia">
      <h1 className="font-sans text-4xl font-bold text-ink-light dark:text-ink-dark mb-6">Sobre nós</h1>

      <p>
        O <strong>Santa Carmem Notícias</strong> é um portal de jornalismo local dedicado a informar
        a população de Santa Carmem, Mato Grosso, e região sobre os assuntos que realmente importam
        para a comunidade: política municipal, segurança pública, agronegócio, esportes, cultura e
        eventos.
      </p>

      <h2>Nossa missão</h2>
      <p>
        Levar informação de qualidade, com apuração responsável, linguagem acessível e respeito ao
        leitor. Acreditamos que um município bem informado é um município mais forte, mais crítico e
        mais engajado.
      </p>

      <h2>Nossos valores</h2>
      <ul>
        <li><strong>Credibilidade:</strong> apuramos antes de publicar, ouvimos os dois lados.</li>
        <li><strong>Proximidade:</strong> pautas locais, linguagem do povo daqui.</li>
        <li><strong>Transparência:</strong> assumimos erros publicamente quando erramos.</li>
        <li><strong>Independência:</strong> não somos porta-voz de ninguém — somos porta-voz da cidade.</li>
      </ul>

      <h2>Entre em contato</h2>
      <p>
        Tem uma pauta, uma denúncia ou uma sugestão? Escreva para{' '}
        <a href="mailto:contato@santacarmemnoticias.com.br">contato@santacarmemnoticias.com.br</a>.
      </p>
    </article>
  );
}
