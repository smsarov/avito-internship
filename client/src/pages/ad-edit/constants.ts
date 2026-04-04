import type {
  ItemCategory,
  AutoItemParams,
  RealEstateItemParams,
  ElectronicsItemParams,
} from "@/features/ads/schema";

type InputField<K extends string> = {
  key: K;
  label: string;
  placeholder: string;
  inputType: "text" | "number";
};

type SelectField<K extends string> = {
  key: K;
  label: string;
  placeholder: string;
  inputType: "select";
  options: { value: string; label: string }[];
};

export type CharacteristicField<K extends string = string> =
  | InputField<K>
  | SelectField<K>;

type CategoryParamsMap = {
  auto: AutoItemParams;
  real_estate: RealEstateItemParams;
  electronics: ElectronicsItemParams;
};

type CharacteristicFieldsConfig = {
  [C in ItemCategory]: CharacteristicField<
    keyof CategoryParamsMap[C] & string
  >[];
};

export const CHARACTERISTIC_FIELDS: CharacteristicFieldsConfig = {
  auto: [
    {
      key: "brand",
      label: "Марка",
      placeholder: "Введите марку",
      inputType: "text",
    },
    {
      key: "model",
      label: "Модель",
      placeholder: "Введите модель",
      inputType: "text",
    },
    {
      key: "yearOfManufacture",
      label: "Год выпуска",
      placeholder: "Введите год выпуска",
      inputType: "number",
    },
    {
      key: "transmission",
      label: "Коробка передач",
      placeholder: "Выберите коробку передач",
      inputType: "select",
      options: [
        { value: "automatic", label: "Автомат" },
        { value: "manual", label: "Механика" },
      ],
    },
    {
      key: "mileage",
      label: "Пробег",
      placeholder: "Введите пробег",
      inputType: "number",
    },
    {
      key: "enginePower",
      label: "Мощность двигателя",
      placeholder: "Введите мощность двигателя",
      inputType: "number",
    },
  ],
  real_estate: [
    {
      key: "type",
      label: "Тип недвижимости",
      placeholder: "Выберите тип недвижимости",
      inputType: "select",
      options: [
        { value: "flat", label: "Квартира" },
        { value: "house", label: "Дом" },
        { value: "room", label: "Комната" },
      ],
    },
    {
      key: "address",
      label: "Адрес",
      placeholder: "Введите адрес",
      inputType: "text",
    },
    {
      key: "area",
      label: "Площадь",
      placeholder: "Введите площадь",
      inputType: "number",
    },
    {
      key: "floor",
      label: "Этаж",
      placeholder: "Введите этаж",
      inputType: "number",
    },
  ],
  electronics: [
    {
      key: "type",
      label: "Тип",
      placeholder: "Выберите тип",
      inputType: "select",
      options: [
        { value: "phone", label: "Телефон" },
        { value: "laptop", label: "Ноутбук" },
        { value: "misc", label: "Прочее" },
      ],
    },
    {
      key: "brand",
      label: "Марка",
      placeholder: "Введите марку",
      inputType: "text",
    },
    {
      key: "model",
      label: "Модель",
      placeholder: "Введите модель",
      inputType: "text",
    },
    {
      key: "condition",
      label: "Состояние",
      placeholder: "Выберите состояние",
      inputType: "select",
      options: [
        { value: "new", label: "Новое" },
        { value: "used", label: "Б/У" },
      ],
    },
    {
      key: "color",
      label: "Цвет",
      placeholder: "Введите цвет",
      inputType: "text",
    },
  ],
};
