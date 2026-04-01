import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { adsService } from "@/features/ads/service";
import type { ItemCategory } from "@/features/ads/schema";

import { buildServerParams } from "@/features/ads/utils/build-server-params";
import { sortItemsByPrice } from "@/features/ads/utils/sort-items-by-price";

import { useDebounce } from "@/hooks/useDebounce";

import { useAdsListState } from "../state";
import { getItemsPerPage, SORT_OPTIONS } from "../constants";

export function useAdsListQuery() {
  const { search, sort, categories, revisionOnly, page, view } =
    useAdsListState();
  const debouncedSearch = useDebounce(search, 400);

  const isPriceSort = sort === "price_asc" || sort === "price_desc";
  const itemsPerPage = getItemsPerPage(view);

  const activeCategories = (Object.keys(categories) as ItemCategory[]).filter(
    (key) => categories[key],
  );

  const option = SORT_OPTIONS.find((option) => option.value === sort)!;

  const serverParams = buildServerParams({
    search: debouncedSearch,
    activeCategories,
    revisionOnly,
    page,
    itemsPerPage,
    sortColumn: option.serverColumn,
    sortDirection: option.serverDir,
    isClientSort: isPriceSort,
  });

  return useQuery({
    queryKey: adsService.queryKeys.list(serverParams),
    queryFn: () => adsService.fetchItems(serverParams),
    select: isPriceSort
      ? (data) => ({
          total: data.total,
          items: sortItemsByPrice(
            data.items,
            sort === "price_asc" ? "asc" : "desc",
            page,
            itemsPerPage,
          ),
        })
      : undefined,
    placeholderData: keepPreviousData,
  });
}
