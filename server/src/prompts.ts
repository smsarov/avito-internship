import type { ItemSuggestIn } from './validation.ts';

function serializeParams(params: Record<string, unknown>): string {
  return Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');
}

export function buildDescriptionPrompt(item: ItemSuggestIn): string {
  const params = serializeParams(item.params as Record<string, unknown>);
  const existing = item.description ? `Текущее описание: «${item.description}». Улучши его.` : 'Описание отсутствует — придумай с нуля.';

  return (
    `Ты помощник продавца на Авито. Напиши продающее описание объявления на русском языке. ` +
    `Отвечай только текстом описания, без заголовков и пояснений. Не более 1000 символов.\n\n` +
    `Название: ${item.title}\n` +
    `Категория: ${item.category}\n` +
    `Характеристики: ${params || 'не указаны'}\n` +
    existing
  );
}

export function buildPricePrompt(item: ItemSuggestIn): string {
  const params = serializeParams(item.params as Record<string, unknown>);

  return (
    `Ты помощник продавца на Авито. Оцени рыночную стоимость товара в рублях. ` +
    `Отвечай только числом без пробелов, символов валюты и пояснений.\n\n` +
    `Название: ${item.title}\n` +
    `Категория: ${item.category}\n` +
    `Характеристики: ${params || 'не указаны'}`
  );
}
