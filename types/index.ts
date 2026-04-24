import type { PortableTextBlock } from '@portabletext/types';
import type { CategoriaSlug } from '@/lib/categorias';

export interface Autor {
  _id: string;
  nome: string;
  slug: string;
  bio?: string;
  foto?: { asset: { _ref: string }; alt?: string };
}

export interface ImagemSanity {
  asset: { _ref: string };
  alt?: string;
  creditos?: string;
}

export interface Noticia {
  _id: string;
  titulo: string;
  subtitulo?: string;
  slug: string;
  categoria: CategoriaSlug;
  categoriaNome?: string;
  imagemPrincipal?: ImagemSanity;
  imagemUrl?: string;            // URL direta (para fallback mock)
  corpo?: PortableTextBlock[];
  resumo?: string;
  autor?: Autor;
  publicadoEm: string;
  atualizadoEm?: string;
  destaque?: boolean;
  tags?: string[];
  seoTitulo?: string;
  seoDescricao?: string;
}

export interface Banner {
  _id: string;
  titulo: string;
  imagem: ImagemSanity;
  link: string;
  posicao: 'topo' | 'meio' | 'lateral';
  inicio: string;
  fim: string;
  ativo: boolean;
}

export interface Configuracoes {
  nome: string;
  logo?: ImagemSanity;
  telefone?: string;
  email?: string;
  endereco?: string;
  redes?: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
    youtube?: string;
  };
}
