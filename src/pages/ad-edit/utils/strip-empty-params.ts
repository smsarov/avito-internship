import type { ItemEditFormValues } from "@/features/ads/schema";

function isEmptyValue(value: unknown): boolean {
  if (value === undefined || value === "") return true;
  if (typeof value === "number" && !Number.isFinite(value)) return true;
  return false;
}

export function stripEmptyParams(
  params: ItemEditFormValues["params"],
): ItemEditFormValues["params"] {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => !isEmptyValue(value)),
  );
}
