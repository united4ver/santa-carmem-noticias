import Link from 'next/link';
import { getCategoria, type CategoriaSlug } from '@/lib/categorias';
import clsx from 'clsx';

interface Props {
  categoria: CategoriaSlug | string;
  size?: 'sm' | 'md';
  asLink?: boolean;
}

export function CategoriaBadge({ categoria, size = 'sm', asLink = true }: Props) {
  const info = getCategoria(categoria);
  if (!info) return null;

  const base = clsx(
    'inline-flex items-center font-semibold uppercase tracking-wide text-white rounded',
    size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1',
    info.corClass,
  );

  if (!asLink) return <span className={base}>{info.nome}</span>;

  return (
    <Link href={`/${info.slug}`} className={clsx(base, 'hover:opacity-90 transition-opacity')}>
      {info.nome}
    </Link>
  );
}
