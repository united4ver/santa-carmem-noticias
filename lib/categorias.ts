export type CategoriaSlug = 'cidade' | 'policia' | 'agronegocio' | 'eventos';

export interface CategoriaInfo {
  slug: CategoriaSlug;
  nome: string;
  cor: string;         // HEX
  corClass: string;    // Tailwind class (bg-editoria-*)
  descricao: string;
}

export const CATEGORIAS: Record<CategoriaSlug, CategoriaInfo> = {
  cidade: {
    slug: 'cidade',
    nome: 'Cidade',
    cor: '#1F4E79',
    corClass: 'bg-editoria-cidade',
    descricao: 'Política municipal, prefeitura, câmara e administração pública.',
  },
  policia: {
    slug: 'policia',
    nome: 'Polícia',
    cor: '#C0392B',
    corClass: 'bg-editoria-policia',
    descricao: 'Segurança pública, ocorrências policiais e trânsito.',
  },
  agronegocio: {
    slug: 'agronegocio',
    nome: 'Agronegócio',
    cor: '#2E7D32',
    corClass: 'bg-editoria-agro',
    descricao: 'Safras, cotações, cooperativas, pecuária e clima.',
  },
  eventos: {
    slug: 'eventos',
    nome: 'Esportes & Eventos',
    cor: '#E67E22',
    corClass: 'bg-editoria-eventos',
    descricao: 'Esportes, cultura, festas e acontecimentos da cidade.',
  },
};

export const CATEGORIAS_LISTA = Object.values(CATEGORIAS);

export function getCategoria(slug: string): CategoriaInfo | undefined {
  return (CATEGORIAS as Record<string, CategoriaInfo>)[slug];
}
