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

export type AdsListAction =
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_SORT"; payload: SortKey }
  | { type: "TOGGLE_CATEGORY"; payload: ItemCategory }
  | { type: "SET_REVISION_ONLY"; payload: boolean }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_VIEW"; payload: AdsListViewMode }
  | { type: "RESET_FILTERS" };
