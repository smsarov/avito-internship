import type { ItemCategory } from "@/features/ads/schema";
import type { AdsListState } from "./types";

export const initialCategories: Record<ItemCategory, boolean> = {
  auto: false,
  real_estate: false,
  electronics: false,
};

export const initialState: AdsListState = {
  search: "",
  sort: "date_desc",
  categories: initialCategories,
  revisionOnly: false,
  page: 1,
  view: "grid",
};
