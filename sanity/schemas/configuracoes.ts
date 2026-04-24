import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'configuracoes',
  title: 'Configurações do site',
  type: 'document',
  // Singleton — só deve existir uma instância
  fields: [
    defineField({ name: 'nome', title: 'Nome do portal', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      fields: [defineField({ name: 'alt', type: 'string', title: 'Texto alternativo' })],
    }),
    defineField({ name: 'telefone', title: 'Telefone de contato', type: 'string' }),
    defineField({ name: 'email', title: 'E-mail de contato', type: 'string' }),
    defineField({ name: 'endereco', title: 'Endereço', type: 'string' }),
    defineField({
      name: 'redes',
      title: 'Redes sociais',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'whatsapp', title: 'WhatsApp', type: 'string' }),
        defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
      ],
    }),
  ],
});
