import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { CategoriaBadge } from '@/components/CategoriaBadge';
import { NoticiaImage } from '@/components/NoticiaImage';
import { NoticiaCard } from '@/components/NoticiaCard';
import { CompartilharBotoes } from '@/components/CompartilharBotoes';
import { getNoticiaPorSlug, getRelacionadas, getAllSlugs } from '@/lib/data';
import { formatarDataCurta, formatarData } from '@/lib/formatters';

interface Props {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const noticia = await getNoticiaPorSlug(params.slug);
  if (!noticia) return {};

  const url = `/noticia/${noticia.slug}`;
  const descricao = noticia.seoDescricao || noticia.subtitulo || noticia.resumo || '';

  return {
    title: noticia.seoTitulo || noticia.titulo,
    description: descricao,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: noticia.titulo,
      description: descricao,
      url,
      publishedTime: noticia.publicadoEm,
      modifiedTime: noticia.atualizadoEm,
      authors: noticia.autor?.nome ? [noticia.autor.nome] : undefined,
      tags: noticia.tags,
      images: noticia.imagemUrl ? [{ url: noticia.imagemUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: noticia.titulo,
      description: descricao,
    },
  };
}

const portableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export default async function PaginaNoticia({ params }: Props) {
  const noticia = await getNoticiaPorSlug(params.slug);
  if (!noticia) notFound();

  const relacionadas = await getRelacionadas(noticia.categoria, noticia.slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://santacarmemnoticias.com.br';
  const urlCompleta = `${siteUrl}/noticia/${noticia.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: noticia.titulo,
    description: noticia.subtitulo || noticia.resumo,
    datePublished: noticia.publicadoEm,
    dateModified: noticia.atualizadoEm || noticia.publicadoEm,
    author: noticia.autor?.nome
      ? { '@type': 'Person', name: noticia.autor.nome }
      : { '@type': 'Organization', name: 'Santa Carmem Notícias' },
    publisher: {
      '@type': 'Organization',
      name: 'Santa Carmem Notícias',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
    },
    image: noticia.imagemUrl ? [noticia.imagemUrl] : undefined,
    mainEntityOfPage: urlCompleta,
    articleSection: noticia.categoriaNome,
    keywords: noticia.tags?.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="container py-6 md:py-10 max-w-3xl">
        <nav className="mb-4 text-sm" aria-label="Trilha de navegação">
          <ol className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <li><Link href="/" className="hover:underline">Início</Link></li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/${noticia.categoria}`} className="hover:underline">
                {noticia.categoriaNome || noticia.categoria}
              </Link>
            </li>
          </ol>
        </nav>

        <header className="mb-6">
          <CategoriaBadge categoria={noticia.categoria} size="md" />
          <h1 className="mt-3 font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-ink-light dark:text-ink-dark">
            {noticia.titulo}
          </h1>
          {noticia.subtitulo && (
            <p className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              {noticia.subtitulo}
            </p>
          )}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400 border-t border-b border-slate-200 dark:border-slate-800 py-3">
            {noticia.autor && <span>Por <strong className="text-slate-700 dark:text-slate-300">{noticia.autor.nome}</strong></span>}
            <time dateTime={noticia.publicadoEm} title={formatarData(noticia.publicadoEm)}>
              {formatarDataCurta(noticia.publicadoEm)}
            </time>
          </div>
        </header>

        <figure className="mb-8 -mx-4 md:mx-0">
          <NoticiaImage
            noticia={noticia}
            width={1200}
            height={675}
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="w-full aspect-[16/9] object-cover md:rounded-xl"
          />
          {noticia.imagemPrincipal?.creditos && (
            <figcaption className="mt-2 px-4 md:px-0 text-xs text-slate-500 dark:text-slate-400 italic">
              Foto: {noticia.imagemPrincipal.creditos}
            </figcaption>
          )}
        </figure>

        <div className="prose-noticia">
          {noticia.corpo ? (
            <PortableText value={noticia.corpo} components={portableComponents} />
          ) : (
            <p>{noticia.resumo || 'Conteúdo em breve.'}</p>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <CompartilharBotoes url={urlCompleta} titulo={noticia.titulo} />
        </div>

        {noticia.tags && noticia.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {noticia.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {relacionadas.length > 0 && (
        <section aria-labelledby="relacionadas-titulo" className="container py-10 border-t border-slate-200 dark:border-slate-800">
          <h2 id="relacionadas-titulo" className="text-xl md:text-2xl font-bold text-ink-light dark:text-ink-dark mb-6">
            Leia também
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relacionadas.map((n) => (
              <NoticiaCard key={n._id} noticia={n} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
