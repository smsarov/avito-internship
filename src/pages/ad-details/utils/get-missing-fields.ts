import { PARAM_LABELS } from "../constants";
import { isFieldFilled } from "./is-field-filled";
import type { ItemDetail } from "@/features/ads/schema";

export function getMissingFields(item: ItemDetail): string[] {
  const labels = PARAM_LABELS[item.category];
  const params = item.params as Record<string, unknown>;

  const missingParams = Object.entries(labels)
    .filter(([key]) => !isFieldFilled(params[key]))
    .map(([, label]) => label);

  if (!isFieldFilled(item.description)) {
    missingParams.push("Описание");
  }

  return missingParams;
}
