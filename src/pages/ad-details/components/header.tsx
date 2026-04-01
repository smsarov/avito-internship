import { Link } from "react-router-dom";

import { Typography } from "@/components/ui/typography";
import { Price } from "@/components/price";
import { Button } from "@/components/ui/button";

import { formatDate } from "@/lib/format-date";
import { routes } from "@/constants/routes";

import EditIcon from "@icons/edit.svg";
import type { ItemDetail } from "@/features/ads/schema";

type HeaderProps = {
  item?: ItemDetail;
};

export function Header({ item }: HeaderProps) {
  if (!item) return <Skeleton />;

  const wasEdited = item.updatedAt !== item.createdAt;

  return (
    <header className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col md:flex-row justify-between">
        <Typography.H1 className="font-medium leading-10">
          {item.title}
        </Typography.H1>
        <Price price={item.price} className="font-medium text-3xl leading-10" />
      </div>
      <div className="w-full flex flex-col gap-2 md:gap-0 md:flex-row justify-between items-start">
        <Button variant="accent" asChild>
          <Link to={routes.adEdit(String(item.id))}>
            Редактировать <EditIcon className="size-4.5" />
          </Link>
        </Button>
        <div className="flex flex-col gap-1 items-start md:items-end text-[#848388]">
          <Typography.P className="text-md">
            Опубликовано: {formatDate(item.createdAt)}
          </Typography.P>
          {wasEdited && (
            <Typography.P className="text-md">
              Отредактировано: {formatDate(item.updatedAt)}
            </Typography.P>
          )}
        </div>
      </div>
    </header>
  );
}

function Skeleton() {
  return (
    <header className="w-full flex flex-col gap-4 animate-pulse">
      <div className="w-full flex flex-col md:flex-row justify-between">
        <div className="h-10 w-80 rounded-lg bg-muted" />
        <div className="h-10 w-40 rounded-lg bg-muted" />
      </div>
      <div className="w-full flex flex-col gap-2 md:gap-0 md:flex-row justify-between items-start">
        <div className="h-9 w-44 rounded-lg bg-muted" />
        <div className="flex flex-col gap-1 items-start md:items-end">
          <div className="h-4 w-52 rounded bg-muted" />
        </div>
      </div>
    </header>
  );
}