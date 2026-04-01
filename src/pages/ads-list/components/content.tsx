import { Typography } from "@/components/ui/typography";

import { Card, CardSkeleton } from "./card";

import { getItemsPerPage } from "../constants";

import { useAdsListState } from "../state";
import { useAdsListQuery } from "../hooks/useAdsListQuery";

export function Content() {
  const { view } = useAdsListState();
  const { data, isLoading, isError } = useAdsListQuery();

  const isGrid = view === "grid";
  const itemsPerPage = getItemsPerPage(view);
  const variant = isGrid ? "vertical" : "horizontal";

  return (
    <>
      {isError && (
        <div className="w-full rounded-lg bg-destructive/10 px-4 py-3">
          <Typography.P className="text-destructive">
            Не удалось загрузить объявления. Попробуйте обновить страницу.
          </Typography.P>
        </div>
      )}

      <div
        className={
          isGrid
            ? "grid justify-between grid-cols-[repeat(auto-fill,200px)] w-full gap-3"
            : "flex flex-col w-full gap-y-3"
        }
      >
        {isLoading &&
          Array.from({ length: itemsPerPage }).map((_, i) => (
            <CardSkeleton key={i} variant={variant} />
          ))}

        {!isLoading &&
          data?.items
            .slice(0, itemsPerPage)
            .map((item) => (
              <Card key={item.id} variant={variant} item={item} />
            ))}

        {!isLoading && !isError && data?.items.length === 0 && (
          <div className="w-full py-10 text-center">
            <Typography.P className="text-muted-foreground">
              Объявления не найдены
            </Typography.P>
          </div>
        )}
      </div>
    </>
  );
}
