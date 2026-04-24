import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'banner',
  title: 'Banner / Anúncio',
  type: 'document',
  fields: [
    defineField({ name: 'titulo', title: 'Título interno', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'imagem',
      title: 'Imagem',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
      fields: [defineField({ name: 'alt', type: 'string', title: 'Texto alternativo' })],
    }),
    defineField({ name: 'link', title: 'Link de destino', type: 'url', validation: (r) => r.required() }),
    defineField({
      name: 'posicao',
      title: 'Posição',
      type: 'string',
      options: {
        list: [
          { title: 'Topo da home', value: 'topo' },
          { title: 'Meio da home', value: 'meio' },
          { title: 'Lateral', value: 'lateral' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'inicio', title: 'Início da exibição', type: 'datetime' }),
    defineField({ name: 'fim', title: 'Fim da exibição', type: 'datetime' }),
    defineField({ name: 'ativo', title: 'Ativo', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'titulo', subtitle: 'posicao', media: 'imagem' },
  },
});
