import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'autor',
  title: 'Autor',
  type: 'document',
  fields: [
    defineField({ name: 'nome', title: 'Nome', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'nome', maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'bio', title: 'Biografia curta', type: 'text', rows: 3 }),
    defineField({
      name: 'foto',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Texto alternativo' })],
    }),
    defineField({ name: 'email', title: 'E-mail', type: 'string' }),
  ],
  preview: { select: { title: 'nome', media: 'foto' } },
});
