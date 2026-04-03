import type { ItemsListParams } from "./schema";

export const queryKeys = {
  list: (params: ItemsListParams) => ["items", "list", params] as const,
  detail: (id: string) => ["items", "detail", id] as const,
};
