import { NextResponse } from 'next/server';
import { getUltimasNoticias } from '@/lib/data';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santacarmemnoticias.com.br';
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Santa Carmem Notícias';

function escape(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function GET() {
  const noticias = await getUltimasNoticias(30);

  const items = noticias.map((n) => {
    const url = `${siteUrl}/noticia/${n.slug}`;
    return `
      <item>
        <title>${escape(n.titulo)}</title>
        <link>${url}</link>
        <guid isPermaLink="true">${url}</guid>
        <pubDate>${new Date(n.publicadoEm).toUTCString()}</pubDate>
        <description>${escape(n.subtitulo || n.resumo || '')}</description>
        <category>${escape(n.categoriaNome || n.categoria)}</category>
      </item>
    `.trim();
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${escape(siteName)}</title>
    <link>${siteUrl}</link>
    <description>Notícias locais de Santa Carmem/MT</description>
    <language>pt-BR</language>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
