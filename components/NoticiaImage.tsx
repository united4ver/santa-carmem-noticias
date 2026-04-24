import Image from 'next/image';
import { urlForImage } from '@/lib/sanity/image';
import type { Noticia } from '@/types';

interface Props {
  noticia: Noticia;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function NoticiaImage({ noticia, width, height, priority, className, sizes }: Props) {
  const alt = noticia.imagemPrincipal?.alt || noticia.titulo;

  let src: string | null = noticia.imagemUrl ?? null;
  if (!src && noticia.imagemPrincipal) {
    src = urlForImage(noticia.imagemPrincipal).width(width).height(height).fit('crop').auto('format').url();
  }

  if (!src) {
    return (
      <div
        className={`bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 ${className ?? ''}`}
        style={{ aspectRatio: `${width}/${height}` }}
      >
        <span className="text-xs">Sem imagem</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes || '(min-width: 1024px) 50vw, 100vw'}
      className={className}
    />
  );
}
