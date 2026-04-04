import type {
  ItemCategory,
  AutoItemParams,
  RealEstateItemParams,
  ElectronicsItemParams,
} from "./schema";

export const MAX_DESCRIPTION_LENGTH = 1000;

const AUTO_PARAM_LABELS: Record<keyof AutoItemParams, string> = {
  brand: "Марка",
  model: "Модель",
  yearOfManufacture: "Год выпуска",
  transmission: "Коробка передач",
  mileage: "Пробег",
  enginePower: "Мощность двигателя",
};

const REAL_ESTATE_PARAM_LABELS: Record<keyof RealEstateItemParams, string> = {
  type: "Тип",
  address: "Адрес",
  area: "Площадь",
  floor: "Этаж",
};

const ELECTRONICS_PARAM_LABELS: Record<keyof ElectronicsItemParams, string> = {
  type: "Тип",
  brand: "Бренд",
  model: "Модель",
  condition: "Состояние",
  color: "Цвет",
};

export const PARAM_LABELS: Record<ItemCategory, Record<string, string>> = {
  auto: AUTO_PARAM_LABELS,
  real_estate: REAL_ESTATE_PARAM_LABELS,
  electronics: ELECTRONICS_PARAM_LABELS,
};

export const TRANSMISSION_OPTIONS: Record<
  NonNullable<AutoItemParams["transmission"]>,
  string
> = {
  automatic: "Автомат",
  manual: "Механика",
};

export const REAL_ESTATE_TYPE_OPTIONS: Record<
  NonNullable<RealEstateItemParams["type"]>,
  string
> = {
  flat: "Квартира",
  house: "Дом",
  room: "Комната",
};

export const ELECTRONICS_TYPE_OPTIONS: Record<
  NonNullable<ElectronicsItemParams["type"]>,
  string
> = {
  phone: "Телефон",
  laptop: "Ноутбук",
  misc: "Прочее",
};

export const CONDITION_OPTIONS: Record<
  NonNullable<ElectronicsItemParams["condition"]>,
  string
> = {
  new: "Новое",
  used: "Б/У",
};

export const VALUE_LABELS: Record<string, Record<string, string>> = {
  transmission: TRANSMISSION_OPTIONS,
  type: { ...REAL_ESTATE_TYPE_OPTIONS, ...ELECTRONICS_TYPE_OPTIONS },
  condition: CONDITION_OPTIONS,
};

export function formatParamValue(key: string, value: unknown): string {
  const labels = VALUE_LABELS[key];
  if (labels && typeof value === "string" && value in labels) {
    return labels[value];
  }

  return String(value);
}
