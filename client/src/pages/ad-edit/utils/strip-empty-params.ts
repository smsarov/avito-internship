import type { ItemCategory, ItemEditFormValues } from "@/features/ads/schema";

import { paramKeysForCategory } from "../constants";

export function stripEmptyParams(
  params: ItemEditFormValues["params"] | undefined,
): ItemEditFormValues["params"] {
  const out: Record<string, unknown> = {};
  for (const [key, raw] of Object.entries(params ?? {})) {
    if (raw === undefined || raw === null || raw === "") continue;
    if (typeof raw === "number" && !Number.isFinite(raw)) continue;
    const v = typeof raw === "string" ? raw.trim() : raw;
    if (v === "") continue;
    out[key] = v;
  }
  return out as ItemEditFormValues["params"];
}

export function stripEmptyParamsForCategory(
  category: ItemCategory,
  params: ItemEditFormValues["params"] | undefined,
): ItemEditFormValues["params"] {
  const allowed = new Set(paramKeysForCategory(category));
  const stripped = stripEmptyParams(params);
  return Object.fromEntries(
    Object.entries(stripped).filter(([k]) => allowed.has(k)),
  ) as ItemEditFormValues["params"];
}
