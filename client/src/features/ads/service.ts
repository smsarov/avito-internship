import { http } from "@/lib/axios";

import {
  ItemsListResponseSchema,
  ItemDetailSchema,
  AiPriceResponseSchema,
  AiDescriptionResponseSchema,
  type ItemsListParams,
  type ItemsListResponse,
  type ItemDetail,
  type ItemEditPayload,
  type ItemSuggestPayload,
} from "./schema";

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

async function getAiPrice(payload: ItemSuggestPayload): Promise<number> {
  const { data } = await http.post("/items/suggestions/price", payload);
  const result = AiPriceResponseSchema.safeParse(data);

  if (!result.success) {
    throw result.error;
  }

  return result.data.price;
}

async function getAiDescription(payload: ItemSuggestPayload): Promise<string> {
  const { data } = await http.post("/items/suggestions/description", payload);
  const result = AiDescriptionResponseSchema.safeParse(data);

  if (!result.success) {
    throw result.error;
  }

  return result.data.description;
}

export const adsService = {
  fetchItems,
  fetchItemById,
  updateItem,
  getAiPrice,
  getAiDescription,
};
