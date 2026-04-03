import { Link } from "react-router-dom";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import {
  Card as BaseCard,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import { Price } from "@/components/price";

import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, type AdListItem } from "@/features/ads/schema";
import { routes } from "@/constants/routes";

import defaultImageSrc from "@/assets/images/default.png";
import styles from "./style.module.css";
import type { CardVariant } from "./types";

type CardProps = {
  variant: CardVariant;
  item: AdListItem;
};

export function Card({ variant, item }: CardProps) {
  const { id, category, title, price, needsRevision } = item;

  return (
    <Link to={routes.adDetails(String(id))}>
      <BaseCard
        className={cn(
          styles.card,
          "gap-0 rounded-[16px] bg-background p-0",
          variant === "vertical" && styles.vertical,
          variant === "vertical" && "h-[268px] w-[200px]",
          variant === "horizontal" && styles.horizontal,
          variant === "horizontal" && "flex w-full flex-row",
        )}
      >
        <CardHeader
          className={cn(
            "p-0",
            variant === "vertical" && "w-full",
            variant === "horizontal" && "flex flex-col w-[180px] shrink-0",
          )}
        >
          <img
            src={defaultImageSrc}
            alt=""
            className={cn(styles.image, "object-cover rounded-lg")}
          />
        </CardHeader>
        <CardContent
          className={cn(
            variant === "vertical" &&
              "relative flex w-full flex-col gap-1 p-4 pt-[22px]",
            variant === "horizontal" &&
              "relative flex w-full flex-col gap-1 pl-6 pt-4",
          )}
        >
          {variant === "vertical" && (
            <Badge
              variant="default"
              className="absolute left-4 top-0 z-20 -translate-y-1/2 px-3 py-0"
            >
              {CATEGORY_LABELS[category]}
            </Badge>
          )}
          {variant === "horizontal" && (
            <Typography.P className="font-normal text-metadata-caption">
              {CATEGORY_LABELS[category]}
            </Typography.P>
          )}
          <Typography.H4 className="font-normal leading-[24px] line-clamp-1">
            {title}
          </Typography.H4>
          <Price
            price={price}
            className="font-medium text-base leading-[22px] text-foreground/45"
          />
          {needsRevision && (
            <Badge variant="warning">
              <div className="size-1.5 rounded-full bg-current" />
              Требует доработок
            </Badge>
          )}
        </CardContent>
      </BaseCard>
    </Link>
  );
}
