import Link from 'next/link';
import { NoticiaImage } from './NoticiaImage';
import { CategoriaBadge } from './CategoriaBadge';
import { tempoRelativo } from '@/lib/formatters';
import type { Noticia } from '@/types';

export function DestaquePrincipal({ noticia }: { noticia: Noticia }) {
  const href = `/noticia/${noticia.slug}`;

  return (
    <article className="group relative overflow-hidden rounded-2xl">
      <Link href={href} className="block">
        <NoticiaImage
          noticia={noticia}
          width={1600}
          height={900}
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="aspect-[16/9] object-cover w-full group-hover:scale-[1.02] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 text-white">
          <div className="flex items-center gap-2 mb-3">
            <CategoriaBadge categoria={noticia.categoria} size="md" asLink={false} />
            <span className="text-xs text-white/80">{tempoRelativo(noticia.publicadoEm)}</span>
          </div>
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl">
            {noticia.titulo}
          </h2>
          {noticia.subtitulo && (
            <p className="mt-3 text-base md:text-lg text-white/90 max-w-3xl line-clamp-2">
              {noticia.subtitulo}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
