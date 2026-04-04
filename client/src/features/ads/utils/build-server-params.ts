import type { ItemCategory, ItemsListParams } from "../schema";

type BuildServerParamsOptions = {
  search: string;
  activeCategories: ItemCategory[];
  revisionOnly: boolean;
  page: number;
  itemsPerPage: number;
  sortColumn: "title" | "createdAt" | null;
  sortDirection: "asc" | "desc" | null;
  isClientSort: boolean;
};

export function buildServerParams(
  options: BuildServerParamsOptions,
): ItemsListParams {
  const {
    search,
    activeCategories,
    revisionOnly,
    page,
    itemsPerPage,
    sortColumn,
    sortDirection,
    isClientSort,
  } = options;

  return {
    ...(search ? { q: search } : {}),
    ...(revisionOnly ? { needsRevision: true } : {}),
    ...(activeCategories.length ? { categories: activeCategories } : {}),
    limit: isClientSort ? 9999 : itemsPerPage,
    skip: isClientSort ? 0 : (page - 1) * itemsPerPage,
    ...(sortColumn ? { sortColumn } : {}),
    ...(sortDirection ? { sortDirection } : {}),
  };
}
