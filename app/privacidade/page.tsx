import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como o Santa Carmem Notícias coleta e trata dados pessoais (LGPD).',
  alternates: { canonical: '/privacidade' },
};

export default function PaginaPrivacidade() {
  return (
    <article className="container py-10 max-w-3xl prose-noticia">
      <h1 className="font-sans text-4xl font-bold text-ink-light dark:text-ink-dark mb-6">
        Política de Privacidade
      </h1>
      <p className="text-sm text-slate-500">Última atualização: [data de vigência]</p>

      <h2>1. Quem somos</h2>
      <p>
        O Santa Carmem Notícias é um portal jornalístico dedicado à cidade de Santa Carmem/MT. Esta
        política descreve quais dados coletamos e como os utilizamos, em conformidade com a Lei Geral
        de Proteção de Dados (Lei nº 13.709/2018).
      </p>

      <h2>2. Quais dados coletamos</h2>
      <ul>
        <li><strong>Dados de navegação:</strong> páginas visitadas, tempo de leitura, dispositivo e localização aproximada (via Google Analytics, quando o cookie é aceito).</li>
        <li><strong>Contato voluntário:</strong> quando você nos escreve por e-mail, armazenamos a mensagem e seu endereço para responder.</li>
      </ul>
      <p>Não coletamos CPF, endereço físico ou qualquer dado sensível.</p>

      <h2>3. Como utilizamos os dados</h2>
      <ul>
        <li>Entender quais conteúdos interessam ao público e melhorar nossa cobertura.</li>
        <li>Responder a mensagens recebidas.</li>
        <li>Cumprir obrigações legais, quando aplicável.</li>
      </ul>

      <h2>4. Cookies</h2>
      <p>
        Utilizamos cookies essenciais (para manter suas preferências, como o tema claro/escuro) e
        cookies analíticos (Google Analytics). Você pode recusar o uso de cookies analíticos no
        banner exibido ao acessar o site pela primeira vez.
      </p>

      <h2>5. Seus direitos (art. 18 da LGPD)</h2>
      <p>Você pode solicitar, a qualquer momento:</p>
      <ul>
        <li>Confirmação da existência de tratamento;</li>
        <li>Acesso aos seus dados;</li>
        <li>Correção de dados incorretos;</li>
        <li>Anonimização, bloqueio ou eliminação;</li>
        <li>Portabilidade;</li>
        <li>Revogação do consentimento.</li>
      </ul>
      <p>
        Para exercer esses direitos, escreva para{' '}
        <a href="mailto:privacidade@santacarmemnoticias.com.br">privacidade@santacarmemnoticias.com.br</a>.
      </p>

      <h2>6. Compartilhamento</h2>
      <p>
        Não vendemos, alugamos ou compartilhamos seus dados com terceiros, exceto com o Google
        Analytics (quando o cookie analítico é aceito), que atua como operador.
      </p>

      <h2>7. Segurança</h2>
      <p>
        Adotamos medidas técnicas e organizacionais para proteger os dados coletados: conexão
        criptografada (HTTPS), cabeçalhos de segurança, e acesso restrito a sistemas administrativos.
      </p>

      <h2>8. Alterações</h2>
      <p>
        Esta política pode ser atualizada. Mudanças relevantes serão sinalizadas na página inicial
        ou por e-mail, quando cabível.
      </p>
    </article>
  );
}
