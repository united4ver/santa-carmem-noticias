import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'noticia',
  title: 'Notícia',
  type: 'document',
  groups: [
    { name: 'principal', title: 'Principal', default: true },
    { name: 'midia', title: 'Mídia' },
    { name: 'metadados', title: 'Metadados' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      group: 'principal',
      validation: (r) => r.required().min(10).max(140).warning('Títulos de 40 a 80 caracteres performam melhor.'),
    }),
    defineField({
      name: 'subtitulo',
      title: 'Subtítulo (linha fina)',
      type: 'string',
      group: 'principal',
      validation: (r) => r.max(200),
    }),
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      group: 'principal',
      options: { source: 'titulo', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'categoria',
      title: 'Editoria',
      type: 'reference',
      to: [{ type: 'categoria' }],
      group: 'principal',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'resumo',
      title: 'Resumo (chamada)',
      type: 'text',
      rows: 3,
      group: 'principal',
      description: 'Texto curto usado nos cards e no compartilhamento.',
      validation: (r) => r.max(300),
    }),
    defineField({
      name: 'imagemPrincipal',
      title: 'Imagem principal',
      type: 'image',
      group: 'midia',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          description: 'Descrição da imagem para acessibilidade e SEO.',
          validation: (r) => r.required().error('Descreva a imagem para leitores de tela.'),
        }),
        defineField({ name: 'creditos', title: 'Créditos', type: 'string' }),
      ],
    }),
    defineField({
      name: 'corpo',
      title: 'Corpo da matéria',
      type: 'array',
      group: 'principal',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Parágrafo', value: 'normal' },
            { title: 'Intertítulo', value: 'h2' },
            { title: 'Subtítulo', value: 'h3' },
            { title: 'Citação', value: 'blockquote' },
          ],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Texto alternativo', validation: (r) => r.required() }),
            defineField({ name: 'creditos', type: 'string', title: 'Créditos' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'autor',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'autor' }],
      group: 'metadados',
    }),
    defineField({
      name: 'publicadoEm',
      title: 'Publicado em',
      type: 'datetime',
      group: 'metadados',
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'atualizadoEm',
      title: 'Atualizado em',
      type: 'datetime',
      group: 'metadados',
    }),
    defineField({
      name: 'destaque',
      title: 'Destacar na home?',
      type: 'boolean',
      group: 'metadados',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'metadados',
    }),
    defineField({
      name: 'seoTitulo',
      title: 'Título para SEO',
      type: 'string',
      group: 'seo',
      description: 'Se vazio, usa o título principal.',
    }),
    defineField({
      name: 'seoDescricao',
      title: 'Descrição para SEO',
      type: 'text',
      rows: 2,
      group: 'seo',
      validation: (r) => r.max(160),
    }),
  ],
  orderings: [
    {
      title: 'Mais recentes',
      name: 'publicadoEm_desc',
      by: [{ field: 'publicadoEm', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'titulo',
      categoria: 'categoria.nome',
      media: 'imagemPrincipal',
      data: 'publicadoEm',
    },
    prepare({ title, categoria, media, data }) {
      return {
        title,
        subtitle: [categoria, data ? new Date(data).toLocaleDateString('pt-BR') : ''].filter(Boolean).join(' · '),
        media,
      };
    },
  },
});
