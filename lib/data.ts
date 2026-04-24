/**
 * Camada de dados com fallback automático para mock.
 * Se o Sanity estiver configurado (.env.local preenchido), usa Sanity.
 * Caso contrário, usa NOTICIAS_MOCK para o site rodar out-of-the-box.
 */

import { sanityClient, isSanityConfigured } from '@/lib/sanity/client';
import {
  ultimasNoticiasQuery,
  destaquesQuery,
  noticiasPorCategoriaQuery,
  totalPorCategoriaQuery,
  noticiaPorSlugQuery,
  noticiasRelacionadasQuery,
  buscaQuery,
  slugsNoticiasQuery,
} from '@/lib/sanity/queries';
import { NOTICIAS_MOCK } from '@/lib/mock-data';
import type { Noticia } from '@/types';

const tagsRevalidation = ['noticias'];

async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!sanityClient) return null;
  return sanityClient.fetch<T>(query, params, { next: { revalidate: 60, tags: tagsRevalidation } });
}

export async function getUltimasNoticias(limite = 12): Promise<Noticia[]> {
  if (isSanityConfigured) {
    const data = await sanityFetch<Noticia[]>(ultimasNoticiasQuery, { limite });
    if (data && data.length) return data;
  }
  return NOTICIAS_MOCK.slice(0, limite);
}

export async function getDestaques(): Promise<Noticia[]> {
  if (isSanityConfigured) {
    const data = await sanityFetch<Noticia[]>(destaquesQuery);
    if (data && data.length) return data;
  }
  return NOTICIAS_MOCK.filter((n) => n.destaque);
}

export async function getNoticiasPorCategoria(
  categoria: string,
  pagina = 1,
  porPagina = 12,
): Promise<{ noticias: Noticia[]; total: number }> {
  const inicio = (pagina - 1) * porPagina;
  const fim = inicio + porPagina;

  if (isSanityConfigured) {
    const [noticias, total] = await Promise.all([
      sanityFetch<Noticia[]>(noticiasPorCategoriaQuery, { categoria, inicio, fim }),
      sanityFetch<number>(totalPorCategoriaQuery, { categoria }),
    ]);
    if (noticias && noticias.length) return { noticias, total: total ?? noticias.length };
  }

  const filtradas = NOTICIAS_MOCK.filter((n) => n.categoria === categoria);
  return { noticias: filtradas.slice(inicio, fim), total: filtradas.length };
}

export async function getNoticiaPorSlug(slug: string): Promise<Noticia | null> {
  if (isSanityConfigured) {
    const data = await sanityFetch<Noticia>(noticiaPorSlugQuery, { slug });
    if (data) return data;
  }
  return NOTICIAS_MOCK.find((n) => n.slug === slug) ?? null;
}

export async function getRelacionadas(categoria: string, slug: string): Promise<Noticia[]> {
  if (isSanityConfigured) {
    const data = await sanityFetch<Noticia[]>(noticiasRelacionadasQuery, { categoria, slug });
    if (data && data.length) return data;
  }
  return NOTICIAS_MOCK.filter((n) => n.categoria === categoria && n.slug !== slug).slice(0, 3);
}

export async function buscarNoticias(termo: string): Promise<Noticia[]> {
  const termoNormalizado = termo.trim();
  if (!termoNormalizado) return [];

  if (isSanityConfigured) {
    const data = await sanityFetch<Noticia[]>(buscaQuery, { termo: `${termoNormalizado}*` });
    if (data) return data;
  }

  const t = termoNormalizado.toLowerCase();
  return NOTICIAS_MOCK.filter(
    (n) =>
      n.titulo.toLowerCase().includes(t) ||
      (n.subtitulo?.toLowerCase().includes(t) ?? false) ||
      (n.resumo?.toLowerCase().includes(t) ?? false),
  );
}

export async function getAllSlugs(): Promise<string[]> {
  if (isSanityConfigured) {
    const data = await sanityFetch<string[]>(slugsNoticiasQuery);
    if (data) return data;
  }
  return NOTICIAS_MOCK.map((n) => n.slug);
}
