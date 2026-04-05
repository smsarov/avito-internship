import { create } from "zustand";

import type { ItemCategory } from "@/features/ads/schema";

import type { AdsListViewMode, SortKey } from "../constants";
import { initialCategories, initialState } from "./initial-state";
import type { AdsListState } from "./types";

export type AdsListStore = AdsListState & {
  setSearch: (search: string) => void;
  setSort: (sort: SortKey) => void;
  toggleCategory: (category: ItemCategory) => void;
  setRevisionOnly: (value: boolean) => void;
  setPage: (page: number) => void;
  setView: (view: AdsListViewMode) => void;
  resetFilters: () => void;
};

export const useAdsListStore = create<AdsListStore>((set) => ({
  ...initialState,

  setSearch: (search) => set({ search, page: 1 }),

  setSort: (sort) => set({ sort, page: 1 }),

  toggleCategory: (category) =>
    set((state) => ({
      categories: {
        ...state.categories,
        [category]: !state.categories[category],
      },
      page: 1,
    })),

  setRevisionOnly: (revisionOnly) => set({ revisionOnly, page: 1 }),

  setPage: (page) => set({ page }),

  setView: (view) => set({ view, page: 1 }),

  resetFilters: () =>
    set({
      categories: initialCategories,
      revisionOnly: false,
      page: 1,
    }),
}));
