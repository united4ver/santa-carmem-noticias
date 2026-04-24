import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'categoria',
  title: 'Editoria',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'nome', maxLength: 60 },
      validation: (r) => r.required(),
      description: 'Use: cidade, policia, agronegocio ou eventos.',
    }),
    defineField({
      name: 'cor',
      title: 'Cor (HEX)',
      type: 'string',
      description: 'Ex.: #1F4E79',
      validation: (r) => r.regex(/^#[0-9A-Fa-f]{6}$/, { name: 'cor hex', invert: false }),
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'nome', subtitle: 'slug.current' },
  },
});
