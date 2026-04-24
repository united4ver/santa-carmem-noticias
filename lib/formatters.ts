import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatarData(iso: string): string {
  try {
    return format(new Date(iso), "d 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch {
    return '';
  }
}

export function formatarDataCurta(iso: string): string {
  try {
    return format(new Date(iso), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  } catch {
    return '';
  }
}

export function tempoRelativo(iso: string): string {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true, locale: ptBR });
  } catch {
    return '';
  }
}

export function tempoLeitura(caracteres: number): string {
  const palavrasPorMinuto = 200;
  const palavras = caracteres / 5;
  const minutos = Math.max(1, Math.round(palavras / palavrasPorMinuto));
  return `${minutos} min de leitura`;
}

export function truncar(texto: string, max: number): string {
  if (texto.length <= max) return texto;
  return texto.slice(0, max - 1).trim() + '…';
}
