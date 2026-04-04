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

  const listClassName = isGrid
    ? "grid justify-between grid-cols-[repeat(auto-fill,200px)] w-full gap-3 list-none p-0 m-0"
    : "flex flex-col w-full gap-y-3 list-none p-0 m-0";

  return (
    <>
      {isError && (
        <div role="alert" className="w-full rounded-lg bg-danger/10 px-4 py-3">
          <Typography.P className="text-danger-foreground">
            Не удалось загрузить объявления. Попробуйте обновить страницу.
          </Typography.P>
        </div>
      )}

      <ul className={listClassName}>
        {isLoading &&
          Array.from({ length: itemsPerPage }).map((_, i) => (
            <li key={i} className={isGrid ? undefined : "w-full"}>
              <CardSkeleton variant={variant} />
            </li>
          ))}

        {!isLoading &&
          data?.items.slice(0, itemsPerPage).map((item) => (
            <li key={item.id} className={isGrid ? undefined : "w-full"}>
              <Card variant={variant} item={item} />
            </li>
          ))}

        {!isLoading && !isError && data?.items.length === 0 && (
          <li className="w-full list-none text-center">
            <div role="status">
              <Typography.P className="text-muted-foreground">
                Объявления не найдены
              </Typography.P>
            </div>
          </li>
        )}
      </ul>
    </>
  );
}
