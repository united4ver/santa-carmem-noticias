# Santa Carmem Notícias

Portal de notícias locais da cidade de Santa Carmem, Mato Grosso.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Sanity CMS · Vercel

## Visão rápida

- Site público estático (SEO, performance e segurança).
- Painel de administração embutido em `/admin` (Sanity Studio com login Google/2FA).
- Fallback automático para dados de exemplo quando o Sanity ainda não está configurado — roda localmente sem nenhuma variável de ambiente.
- Quatro editorias: Cidade, Polícia, Agronegócio, Esportes & Eventos.
- Tema claro/escuro, busca, RSS, sitemap automático, banner LGPD.

## Estrutura de pastas

```
santa-carmem-noticias/
├── app/                    # Rotas (App Router do Next.js)
│   ├── [categoria]/        # Página de editoria (/cidade, /policia, ...)
│   ├── noticia/[slug]/     # Página de notícia individual
│   ├── admin/[[...tool]]/  # Sanity Studio embutido
│   ├── api/revalidate/     # Webhook de revalidação (Sanity → Next)
│   ├── busca/              # Página de busca
│   ├── sobre/              # Institucional
│   ├── expediente/
│   ├── privacidade/        # LGPD
│   ├── termos/
│   ├── rss.xml/            # Feed RSS
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── layout.tsx
│   └── page.tsx            # Home
├── components/             # Componentes React reutilizáveis
├── lib/                    # Lógica (data, formatadores, categorias)
│   ├── sanity/             # Cliente e queries do Sanity
│   ├── categorias.ts
│   ├── data.ts             # Camada de dados com fallback mock
│   ├── formatters.ts
│   └── mock-data.ts        # Notícias de exemplo (sem Sanity)
├── sanity/
│   └── schemas/            # Modelos de conteúdo (notícia, autor, categoria...)
├── types/                  # Tipos TypeScript
├── sanity.config.ts
├── next.config.js
├── tailwind.config.ts
└── package.json
```

## Requisitos

- Node.js 18.17 ou superior
- Conta no Sanity (grátis) — apenas para uso com conteúdo real
- Conta na Vercel (grátis) — para deploy

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000. O site carrega imediatamente com as 10 notícias de exemplo do `lib/mock-data.ts`. Nenhuma variável de ambiente é necessária para o primeiro teste.

## Conectando ao Sanity (conteúdo real)

Siga o guia completo em [DEPLOY.md](./DEPLOY.md), especialmente a seção **"3. Configurar o CMS (Sanity)"**.

Resumo:

1. Crie projeto em https://sanity.io/manage (grátis).
2. Copie `Project ID` e `Dataset`.
3. Copie `.env.example` para `.env.local` e preencha.
4. `npm run dev` — acesse `/admin` para publicar.

## Scripts

| Comando           | O que faz                                    |
|-------------------|----------------------------------------------|
| `npm run dev`     | Servidor de desenvolvimento em localhost:3000 |
| `npm run build`   | Build de produção                            |
| `npm start`       | Servidor de produção (após `build`)           |
| `npm run lint`    | ESLint                                        |
| `npm run typecheck` | Verifica tipos TypeScript sem gerar build   |

## Publicando uma notícia

1. Acesse `seudominio.com/admin` (ou `localhost:3000/admin` em dev).
2. Faça login (Google ou e-mail). Apenas administradores convidados no painel do Sanity conseguem entrar.
3. Clique em **Notícia → Criar novo**.
4. Preencha título, subtítulo, categoria, imagem principal, corpo.
5. Clique em **Publish**. Em ~30 segundos a notícia aparece no site público.

## Segurança

- Site estático (pré-renderizado): sem banco de dados exposto publicamente.
- HTTPS obrigatório (SSL automático da Vercel).
- Cabeçalhos de segurança configurados em `next.config.js` (HSTS, X-Frame-Options, X-Content-Type-Options, Permissions-Policy, Referrer-Policy).
- Autenticação do admin delegada ao Sanity: Google OAuth, 2FA opcional, sessões com expiração.
- `/admin` bloqueado em `robots.txt` (não indexado).

## Próximos passos sugeridos

Depois do portal no ar:

- Newsletter semanal (Resend + plano grátis até 3.000 envios/mês).
- Integração com WhatsApp Business para alertas urgentes.
- Classificados locais (módulo adicional de schema).
- Espaço para publieditoriais de comerciantes da cidade.

## Licença

Código proprietário. Uso interno do portal Santa Carmem Notícias.
