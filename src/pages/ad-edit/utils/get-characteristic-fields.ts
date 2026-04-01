import {
  PARAM_LABELS,
  CATEGORY_SELECT_OPTIONS,
  NUMERIC_PARAM_KEYS,
} from "@/features/ads/constants";
import type { ItemCategory } from "@/features/ads/schema";

type SelectCharacteristicField = {
  key: string;
  label: string;
  inputType: "select";
  options: { value: string; label: string }[];
};

type InputCharacteristicField = {
  key: string;
  label: string;
  inputType: "text" | "number";
};

export type CharacteristicField =
  | SelectCharacteristicField
  | InputCharacteristicField;

export function getCharacteristicFields(
  category: ItemCategory,
): CharacteristicField[] {
  const labels = PARAM_LABELS[category];
  const selectOptions = CATEGORY_SELECT_OPTIONS[category];

  return Object.entries(labels).map(([key, label]) => {
    const options = selectOptions[key];

    if (options) {
      return {
        key,
        label,
        inputType: "select" as const,
        options: Object.entries(options).map(([value, optLabel]) => ({
          value,
          label: optLabel,
        })),
      };
    }

    return {
      key,
      label,
      inputType: NUMERIC_PARAM_KEYS.includes(key)
        ? ("number" as const)
        : ("text" as const),
    };
  });
}
