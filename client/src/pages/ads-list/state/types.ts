import type { ItemCategory } from "@/features/ads/schema";
import type { AdsListViewMode, SortKey } from "../constants";

export type AdsListState = {
  search: string;
  sort: SortKey;
  categories: Record<ItemCategory, boolean>;
  revisionOnly: boolean;
  page: number;
  view: AdsListViewMode;
};
