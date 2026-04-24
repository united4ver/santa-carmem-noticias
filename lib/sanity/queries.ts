// Queries GROQ para buscar conteúdo do Sanity.
// Todas usam projeções tipadas que casam com os tipos em /types/index.ts.

export const noticiaCardFragment = `
  _id,
  titulo,
  subtitulo,
  "slug": slug.current,
  "categoria": categoria->slug.current,
  "categoriaNome": categoria->nome,
  imagemPrincipal,
  resumo,
  publicadoEm,
  destaque,
  "autor": autor->{_id, nome, "slug": slug.current, foto}
`;

export const ultimasNoticiasQuery = `
  *[_type == "noticia" && publicadoEm < now()] | order(publicadoEm desc) [0...$limite] {
    ${noticiaCardFragment}
  }
`;

export const destaquesQuery = `
  *[_type == "noticia" && destaque == true && publicadoEm < now()]
    | order(publicadoEm desc) [0...5] {
    ${noticiaCardFragment}
  }
`;

export const noticiasPorCategoriaQuery = `
  *[_type == "noticia" && categoria->slug.current == $categoria && publicadoEm < now()]
    | order(publicadoEm desc) [$inicio...$fim] {
    ${noticiaCardFragment}
  }
`;

export const totalPorCategoriaQuery = `
  count(*[_type == "noticia" && categoria->slug.current == $categoria && publicadoEm < now()])
`;

export const noticiaPorSlugQuery = `
  *[_type == "noticia" && slug.current == $slug][0] {
    _id,
    titulo,
    subtitulo,
    "slug": slug.current,
    "categoria": categoria->slug.current,
    "categoriaNome": categoria->nome,
    imagemPrincipal,
    corpo,
    resumo,
    publicadoEm,
    atualizadoEm,
    tags,
    seoTitulo,
    seoDescricao,
    "autor": autor->{_id, nome, "slug": slug.current, bio, foto}
  }
`;

export const noticiasRelacionadasQuery = `
  *[_type == "noticia"
      && categoria->slug.current == $categoria
      && slug.current != $slug
      && publicadoEm < now()]
    | order(publicadoEm desc) [0...3] {
    ${noticiaCardFragment}
  }
`;

export const buscaQuery = `
  *[_type == "noticia" && publicadoEm < now() && (
    titulo match $termo || subtitulo match $termo || resumo match $termo
  )] | order(publicadoEm desc) [0...30] {
    ${noticiaCardFragment}
  }
`;

export const slugsNoticiasQuery = `
  *[_type == "noticia" && defined(slug.current)][].slug.current
`;

export const configuracoesQuery = `
  *[_type == "configuracoes"][0] {
    nome,
    logo,
    telefone,
    email,
    endereco,
    redes
  }
`;
