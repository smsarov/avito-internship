import type { ItemDetail, ItemEditFormValues } from "@/features/ads/schema";

export function itemToFormValues(item: ItemDetail): ItemEditFormValues {
  return {
    category: item.category,
    title: item.title,
    description: item.description ?? "",
    price: item.price,
    params: item.params as ItemEditFormValues["params"],
  };
}
