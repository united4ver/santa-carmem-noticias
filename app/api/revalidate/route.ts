import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { parseBody } from 'next-sanity/webhook';

/**
 * Endpoint chamado pelo Sanity quando uma notícia é publicada, editada ou removida.
 *
 * Configuração no Sanity:
 *   manage → API → Webhooks → Create
 *   URL: https://SEU_DOMINIO/api/revalidate
 *   Dataset: production
 *   Trigger on: create, update, delete
 *   Secret: mesma string de SANITY_REVALIDATE_SECRET
 */
export async function POST(req: Request) {
  try {
    const { body, isValidSignature } = await parseBody<{ _type?: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: 'Assinatura inválida' }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: 'Corpo inválido' }, { status: 400 });
    }

    revalidateTag('noticias');

    return NextResponse.json({ status: 'ok', revalidated: true, now: Date.now() });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido';
    return NextResponse.json({ message }, { status: 500 });
  }
}
