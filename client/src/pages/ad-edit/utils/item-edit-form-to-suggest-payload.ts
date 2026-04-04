import {
  ItemSuggestPayloadSchema,
  type ItemEditFormValues,
  type ItemSuggestPayload,
} from "@/features/ads/schema";

import { stripEmptyParamsForCategory } from "./strip-empty-params";

export function itemEditFormValuesToSuggestPayload(
  values: ItemEditFormValues,
): ItemSuggestPayload {
  const params = stripEmptyParamsForCategory(values.category, values.params);
  const base = {
    title: values.title,
    ...(values.description?.trim() ? { description: values.description } : {}),
  };

  const candidate =
    values.category === "auto"
      ? { ...base, category: "auto" as const, params }
      : values.category === "real_estate"
        ? { ...base, category: "real_estate" as const, params }
        : { ...base, category: "electronics" as const, params };

  return ItemSuggestPayloadSchema.parse(candidate);
}
