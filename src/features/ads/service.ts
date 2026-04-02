import { http } from "@/lib/axios";

import {
  ItemsListResponseSchema,
  ItemDetailSchema,
  type ItemsListParams,
  type ItemsListResponse,
  type ItemDetail,
  type ItemEditPayload,
} from "./schema";

const queryKeys = {
  all: ["items"] as const,
  list: (params: ItemsListParams) => ["items", "list", params] as const,
  detail: (id: string) => ["items", "detail", id] as const,
};

async function fetchItems(params: ItemsListParams): Promise<ItemsListResponse> {
  const { categories, ...rest } = params;
  const { data } = await http.get("/items", {
    params: {
      ...rest,
      ...(categories?.length ? { categories: categories.join(",") } : {}),
    },
  });

  const result = ItemsListResponseSchema.safeParse(data);

  if (!result.success) {
    throw result.error;
  }

  return result.data;
}

async function fetchItemById(id: string): Promise<ItemDetail> {
  const { data } = await http.get(`/items/${id}`);
  return ItemDetailSchema.parse(data);
}

async function updateItem(id: string, payload: ItemEditPayload) {
  const response = await http.put<{ success: boolean; error?: string }>(
    `/items/${id}`,
    payload,
  );
  return response.data.success;
}

export const adsService = {
  queryKeys,
  fetchItems,
  fetchItemById,
  updateItem,
};
