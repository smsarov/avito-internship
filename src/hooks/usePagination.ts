import { useMemo } from "react";

function buildPageNumbers(
  current: number,
  total: number,
): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  if (left > 2) pages.push("ellipsis");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("ellipsis");
  pages.push(total);

  return pages;
}

type UsePaginationOptions = {
  page: number;
  totalItems: number;
  itemsPerPage: number;
};

export function usePagination({
  page,
  totalItems,
  itemsPerPage,
}: UsePaginationOptions) {
  return useMemo(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumbers =
      totalPages > 1 ? buildPageNumbers(page, totalPages) : [];

    return {
      totalPages,
      pageNumbers,
      hasPrev: page > 1,
      hasNext: page < totalPages,
    };
  }, [page, totalItems, itemsPerPage]);
}
