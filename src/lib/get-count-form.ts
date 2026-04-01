type CountForm = {
  one: string;
  few: string;
  many: string;
};

const pluralRules = new Intl.PluralRules('ru-RU');

export function getCountForm(count: number, forms: CountForm): string {
  const rule = pluralRules.select(count) as keyof CountForm;
  return `${count} ${forms[rule]}`;
}