import {
  Pagination as BasePagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";

import { useAdsListQuery } from "../hooks/useAdsListQuery";
import { useAdsListDispatch, useAdsListState } from "../state";

import { getItemsPerPage } from "../constants";

export function Pagination() {
  const { data: { total = 0 } = {}, isFetching } = useAdsListQuery();

  const { page, view } = useAdsListState();
  const dispatch = useAdsListDispatch();

  const { totalPages, pageNumbers, hasPrev, hasNext } = usePagination({
    page,
    totalItems: total,
    itemsPerPage: getItemsPerPage(view),
  });

  const handlePageChange = (page: number) => {
    dispatch({ type: "SET_PAGE", payload: page });
  };

  const handlePreviousPage = () => {
    if (hasPrev) dispatch({ type: "SET_PAGE", payload: page - 1 });
  };

  const handleNextPage = () => {
    if (hasNext) dispatch({ type: "SET_PAGE", payload: page + 1 });
  };

  if (totalPages <= 1) return null;

  return (
    <div className={isFetching ? "opacity-60" : ""}>
      <BasePagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              text=""
              aria-disabled={!hasPrev}
              className={
                !hasPrev ? "pointer-events-none" : "cursor-pointer"
              }
              onClick={(e) => {
                e.preventDefault();
                handlePreviousPage();
              }}
            />
          </PaginationItem>

          {pageNumbers.map((num, idx) =>
            num === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={num}>
                <PaginationLink
                  isActive={num === page}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(num);
                  }}
                >
                  {num}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              text=""
              aria-disabled={!hasNext}
              className={
                !hasNext ? "pointer-events-none" : "cursor-pointer"
              }
              onClick={(e) => {
                e.preventDefault();
                handleNextPage();
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </BasePagination>
    </div>
  );
}
