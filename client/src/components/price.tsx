import { Typography } from "./ui/typography";

function formatPrice(price: number): string {
  return `${price.toLocaleString("ru-RU")} ₽`;
}

type PriceProps = {
  price: number | null;
  className?: string;
  emptyText?: string;
};

export function Price({
  price,
  className,
  emptyText = "Цена не указана",
}: PriceProps) {
  return (
    <Typography.P className={className}>
      {price === null ? emptyText : formatPrice(price)}
    </Typography.P>
  );
}
