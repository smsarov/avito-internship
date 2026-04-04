import type { ItemCategory } from "@/features/ads/schema";

export type AdsListViewMode = "grid" | "list";

export const GRID_ITEMS_PER_PAGE = 10;
export const LIST_ITEMS_PER_PAGE = 4;

export function getItemsPerPage(view: AdsListViewMode): number {
  return view === "grid" ? GRID_ITEMS_PER_PAGE : LIST_ITEMS_PER_PAGE;
}

export const SORT_OPTIONS = [
  {
    value: "date_desc",
    label: "По новизне (сначала новые)",
    serverColumn: "createdAt" as const,
    serverDir: "desc" as const,
  },
  {
    value: "date_asc",
    label: "По новизне (сначала старые)",
    serverColumn: "createdAt" as const,
    serverDir: "asc" as const,
  },
  {
    value: "title_asc",
    label: "По названию (А → Я)",
    serverColumn: "title" as const,
    serverDir: "asc" as const,
  },
  {
    value: "title_desc",
    label: "По названию (Я → А)",
    serverColumn: "title" as const,
    serverDir: "desc" as const,
  },
  {
    value: "price_asc",
    label: "По цене (сначала дешевле)",
    serverColumn: null,
    serverDir: null,
  },
  {
    value: "price_desc",
    label: "По цене (сначала дороже)",
    serverColumn: null,
    serverDir: null,
  },
] as const;

export type SortKey = (typeof SORT_OPTIONS)[number]["value"];

export const CATEGORY_OPTIONS: { id: ItemCategory; label: string }[] = [
  { id: "auto", label: "Авто" },
  { id: "electronics", label: "Электроника" },
  { id: "real_estate", label: "Недвижимость" },
];
