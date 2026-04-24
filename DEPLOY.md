# Guia de publicação — do zero ao site no ar

Este guia leva o portal do seu computador para o ar em um domínio `.com.br` profissional. Siga as etapas na ordem. Tempo total: entre **1h30 e 3h** se nunca tiver feito antes.

## Visão geral das etapas

1. Instalar o Node.js e rodar o projeto localmente (10 min)
2. Criar conta no GitHub e subir o código (15 min)
3. Criar projeto no Sanity (CMS) (20 min)
4. Criar projeto na Vercel e publicar (15 min)
5. Registrar o domínio no Registro.br (20 min)
6. Apontar o domínio para a Vercel (15 min)
7. Configurar webhook de revalidação (10 min)
8. Cadastrar no Google Search Console e Analytics (20 min)

---

## 1. Instalar o Node.js e rodar o projeto localmente

1. Baixe e instale o Node.js LTS em https://nodejs.org (versão 18 ou superior).
2. Abra o terminal na pasta do projeto.
3. Execute:
   ```bash
   npm install
   npm run dev
   ```
4. Acesse http://localhost:3000. Você deve ver o portal com 10 notícias de exemplo.

Pronto — o site já funciona. As próximas etapas conectam o CMS real e colocam no ar.

---

## 2. Subir o código para o GitHub

1. Crie conta em https://github.com (grátis).
2. Instale o Git (https://git-scm.com/downloads) se ainda não tiver.
3. No terminal, dentro da pasta do projeto:
   ```bash
   git init
   git add .
   git commit -m "Primeiro commit — portal inicial"
   ```
4. No GitHub, clique em **+ → New repository**. Nome: `santa-carmem-noticias`. **Privado** (não público).
5. Cole no terminal os comandos sugeridos pelo GitHub (algo como):
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/santa-carmem-noticias.git
   git branch -M main
   git push -u origin main
   ```

---

## 3. Configurar o CMS (Sanity)

1. Acesse https://sanity.io → **Get started** → crie conta com Google.
2. No painel, clique em **+ Create project**:
   - Nome: `Santa Carmem Notícias`
   - Dataset: `production` (o padrão)
   - Acesso: `Public` (padrão)
3. Vá em **API → Tokens → + Add API token**:
   - Nome: `readonly`
   - Permissão: **Viewer**
   - Copie o token — usaremos no passo 4.
4. Ainda no painel Sanity, copie também o **Project ID** (aparece no topo).
5. Vá em **API → CORS origins → + Add origin**:
   - URL: `http://localhost:3000` · Credentials: sim
   - Adicione depois também seu domínio final (ex.: `https://santacarmemnoticias.com.br`)

6. No seu projeto local, copie `.env.example` para `.env.local` e preencha:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=colar-aqui
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_READ_TOKEN=colar-aqui
   SANITY_REVALIDATE_SECRET=inventar-uma-senha-forte-qualquer
   NEXT_PUBLIC_SITE_URL=https://santacarmemnoticias.com.br
   ```

7. Reinicie `npm run dev`. Acesse http://localhost:3000/admin — você verá o Studio. Faça login.

8. Crie as 4 editorias (Notícia → Criar **Editoria**):
   - Cidade — slug: `cidade`
   - Polícia — slug: `policia`
   - Agronegócio — slug: `agronegocio`
   - Esportes & Eventos — slug: `eventos`

9. Crie um Autor (Redação, por exemplo).

10. Crie algumas notícias de teste.

---

## 4. Publicar na Vercel

1. Acesse https://vercel.com → **Sign up with GitHub**.
2. Clique em **+ New Project**.
3. Importe o repositório `santa-carmem-noticias`.
4. Na tela de configuração:
   - Framework: Next.js (detecta automaticamente)
   - Environment Variables: **cole todas as variáveis do seu `.env.local`** (uma por uma).
5. Clique em **Deploy**. Em 2–3 minutos, seu site estará no ar em `seu-projeto.vercel.app`.
6. Teste: acesse `seu-projeto.vercel.app` e `seu-projeto.vercel.app/admin`.

---

## 5. Registrar o domínio no Registro.br

1. Acesse https://registro.br.
2. Crie conta usando seu CPF.
3. Pesquise o domínio desejado (ex.: `santacarmemnoticias.com.br`).
4. Se disponível, clique em **Registrar**. Custo: R$ 40/ano.
5. Pague via PIX ou cartão.
6. Aguarde até 1 hora para o domínio ficar ativo.

---

## 6. Apontar o domínio para a Vercel

1. No painel da Vercel, projeto → **Settings → Domains → Add**.
2. Digite `santacarmemnoticias.com.br` e confirme.
3. A Vercel mostrará duas instruções de DNS: um registro `A` e/ou `CNAME`.
4. No painel do Registro.br, vá em **Minhas entregas → DNS do domínio**.
5. Configure os seguintes registros conforme orientação da Vercel:
   - Tipo `A`, nome `@`, valor `76.76.21.21`
   - Tipo `CNAME`, nome `www`, valor `cname.vercel-dns.com`
6. Salve. A propagação leva de 10 min a 2 horas.
7. A Vercel gera o certificado SSL automaticamente. Quando o cadeado aparecer, está pronto.

---

## 7. Configurar webhook de revalidação

Isso faz com que, quando você publicar uma notícia no Sanity, o site atualize em até 30 segundos (em vez de precisar rebuild manual).

1. No Sanity (manage.sanity.io) → seu projeto → **API → Webhooks → + Create webhook**:
   - Name: `Revalidar Next.js`
   - URL: `https://santacarmemnoticias.com.br/api/revalidate`
   - Dataset: `production`
   - Trigger on: `Create`, `Update`, `Delete`
   - Filter: `_type == "noticia"`
   - Secret: **cole o mesmo valor de `SANITY_REVALIDATE_SECRET`** do seu `.env.local` e da Vercel.
2. Salve. Teste publicando uma notícia — ela deve aparecer no site em até 30 segundos.

---

## 8. Google Search Console e Analytics

### Search Console (indexação no Google)

1. Acesse https://search.google.com/search-console.
2. Adicione propriedade com o domínio completo.
3. Verifique a propriedade (via DNS, seguindo as instruções).
4. Vá em **Sitemaps** e adicione `https://santacarmemnoticias.com.br/sitemap.xml`.
5. Em 24–72 horas o Google começará a indexar suas notícias.

### Google Analytics (estatísticas)

1. Crie conta em https://analytics.google.com.
2. Crie propriedade GA4.
3. Copie o **Measurement ID** (formato `G-XXXXXXXXXX`).
4. Adicione na Vercel → **Settings → Environment Variables**:
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
5. Faça um redeploy para carregar a variável.

---

## Manutenção contínua

**Para publicar uma notícia** (dia a dia):
1. Acesse `santacarmemnoticias.com.br/admin`.
2. Login → Nova notícia → preencher → Publish.
3. Pronto. A notícia aparece em segundos.

**Para atualizar bibliotecas** (a cada 3 meses, opcional):
```bash
npm outdated
npm update
git commit -am "chore: atualização de dependências"
git push
```
A Vercel faz o deploy automático a cada push.

**Para fazer backup** (automático):
- Sanity mantém histórico de versões de cada documento — basta clicar em "Restore" na interface do Studio.
- O código fica versionado no GitHub.
- Imagens ficam no CDN do Sanity (redundância deles).

---

## Problemas comuns

**"Não consigo fazer login em /admin"** — Você precisa ser convidado como colaborador no painel do Sanity. Acesse `sanity.io/manage` → seu projeto → **Members → Invite**.

**"Publiquei uma notícia mas não aparece no site"** — Verifique: (1) se o campo `publicadoEm` não está no futuro; (2) se o webhook está configurado; (3) logs da Vercel para ver se a revalidação chegou.

**"Meu domínio não funciona"** — Aguarde até 2 horas para propagação de DNS. Use https://dnschecker.org para verificar se os registros já propagaram.

**"Quero trocar o nome do portal"** — Edite as variáveis `NEXT_PUBLIC_SITE_NAME` e `NEXT_PUBLIC_SITE_URL` na Vercel e o arquivo `components/Logo.tsx`. Faça commit e a Vercel faz deploy automático.

---

## Custos esperados

- Vercel: **R$ 0/mês** (plano Hobby cobre facilmente um portal de cidade pequena)
- Sanity: **R$ 0/mês** (plano Free cobre até 20 GB/mês de tráfego e 5 usuários)
- Registro.br: **R$ 40/ano** (aprox. R$ 3,33/mês)
- Google Analytics: **R$ 0**

**Total realista: R$ 3,33/mês** enquanto o tráfego estiver abaixo dos limites gratuitos (o que cobre facilmente o primeiro ano de um portal de cidade).

Boa sorte com o lançamento!
