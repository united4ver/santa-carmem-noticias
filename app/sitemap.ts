import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/data';
import { CATEGORIAS_LISTA } from '@/lib/categorias';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santacarmemnoticias.com.br';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();
  const agora = new Date();

  const paginasEstaticas: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: agora, changeFrequency: 'hourly', priority: 1 },
    { url: `${siteUrl}/sobre`, lastModified: agora, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${siteUrl}/expediente`, lastModified: agora, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/privacidade`, lastModified: agora, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/termos`, lastModified: agora, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const paginasCategoria: MetadataRoute.Sitemap = CATEGORIAS_LISTA.map((c) => ({
    url: `${siteUrl}/${c.slug}`,
    lastModified: agora,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const paginasNoticia: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${siteUrl}/noticia/${slug}`,
    lastModified: agora,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...paginasEstaticas, ...paginasCategoria, ...paginasNoticia];
}
