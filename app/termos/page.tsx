import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Regras e condições para uso do portal Santa Carmem Notícias.',
  alternates: { canonical: '/termos' },
};

export default function PaginaTermos() {
  return (
    <article className="container py-10 max-w-3xl prose-noticia">
      <h1 className="font-sans text-4xl font-bold text-ink-light dark:text-ink-dark mb-6">Termos de Uso</h1>

      <h2>1. Aceitação dos termos</h2>
      <p>
        Ao acessar e utilizar o portal Santa Carmem Notícias, você concorda com estes Termos de Uso.
        Caso não concorde, por favor não utilize o site.
      </p>

      <h2>2. Uso do conteúdo</h2>
      <p>
        Todo o conteúdo publicado (textos, fotos, vídeos, elementos gráficos) é de propriedade do
        Santa Carmem Notícias, salvo indicação em contrário. É permitido o compartilhamento em
        redes sociais por meio dos botões do site. Reprodução integral em outros veículos exige
        autorização prévia por escrito.
      </p>

      <h2>3. Responsabilidade</h2>
      <p>
        O portal empenha-se pela precisão das informações, mas não se responsabiliza por decisões
        tomadas com base exclusivamente no conteúdo publicado. Sempre confirme informações sensíveis
        em fontes oficiais.
      </p>

      <h2>4. Links externos</h2>
      <p>
        Matérias podem conter links para sites externos. Não nos responsabilizamos pelo conteúdo,
        práticas de privacidade ou disponibilidade desses sites.
      </p>

      <h2>5. Alterações nos termos</h2>
      <p>
        Podemos atualizar estes Termos a qualquer momento. O uso continuado do portal após as
        alterações implica aceitação dos novos termos.
      </p>

      <h2>6. Foro</h2>
      <p>Fica eleito o foro da Comarca de Sinop/MT para dirimir quaisquer controvérsias.</p>
    </article>
  );
}
