import { PARAM_LABELS, VALUE_LABELS } from "@/features/ads/constants";

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
      label: PARAM_LABELS.auto.brand,
      placeholder: "Введите марку",
      inputType: "text",
    },
    {
      key: "model",
      label: PARAM_LABELS.auto.model,
      placeholder: "Введите модель",
      inputType: "text",
    },
    {
      key: "yearOfManufacture",
      label: PARAM_LABELS.auto.yearOfManufacture,
      placeholder: "Введите год выпуска",
      inputType: "number",
    },
    {
      key: "transmission",
      label: PARAM_LABELS.auto.transmission,
      placeholder: "Выберите коробку передач",
      inputType: "select",
      options: [
        { value: "automatic", label: VALUE_LABELS.transmission.automatic },
        { value: "manual", label: VALUE_LABELS.transmission.manual },
      ],
    },
    {
      key: "mileage",
      label: PARAM_LABELS.auto.mileage,
      placeholder: "Введите пробег",
      inputType: "number",
    },
    {
      key: "enginePower",
      label: PARAM_LABELS.auto.enginePower,
      placeholder: "Введите мощность двигателя",
      inputType: "number",
    },
  ],
  real_estate: [
    {
      key: "type",
      label: PARAM_LABELS.real_estate.type,
      placeholder: "Выберите тип недвижимости",
      inputType: "select",
      options: [
        { value: "flat", label: VALUE_LABELS.type.flat },
        { value: "house", label: VALUE_LABELS.type.house },
        { value: "room", label: VALUE_LABELS.type.room },
      ],
    },
    {
      key: "address",
      label: PARAM_LABELS.real_estate.address,
      placeholder: "Введите адрес",
      inputType: "text",
    },
    {
      key: "area",
      label: PARAM_LABELS.real_estate.area,
      placeholder: "Введите площадь",
      inputType: "number",
    },
    {
      key: "floor",
      label: PARAM_LABELS.real_estate.floor,
      placeholder: "Введите этаж",
      inputType: "number",
    },
  ],
  electronics: [
    {
      key: "type",
      label: PARAM_LABELS.electronics.type,
      placeholder: "Выберите тип",
      inputType: "select",
      options: [
        { value: "phone", label: VALUE_LABELS.type.phone },
        { value: "laptop", label: VALUE_LABELS.type.laptop },
        { value: "misc", label: VALUE_LABELS.type.misc },
      ],
    },
    {
      key: "brand",
      label: PARAM_LABELS.electronics.brand,
      placeholder: "Введите бренд",
      inputType: "text",
    },
    {
      key: "model",
      label: PARAM_LABELS.electronics.model,
      placeholder: "Введите модель",
      inputType: "text",
    },
    {
      key: "condition",
      label: PARAM_LABELS.electronics.condition,
      placeholder: "Выберите состояние",
      inputType: "select",
      options: [
        { value: "new", label: VALUE_LABELS.condition.new },
        { value: "used", label: VALUE_LABELS.condition.used },
      ],
    },
    {
      key: "color",
      label: PARAM_LABELS.electronics.color,
      placeholder: "Введите цвет",
      inputType: "text",
    },
  ],
};

export function paramKeysForCategory(category: ItemCategory): string[] {
  return CHARACTERISTIC_FIELDS[category].map((f) => f.key);
}
