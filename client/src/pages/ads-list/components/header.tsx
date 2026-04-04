import { Typography } from "@/components/ui/typography";

import { useAdsListQuery } from "../hooks/useAdsListQuery";
import { getCountForm } from "@/lib/get-count-form";

const forms = {
  one: "объявление",
  few: "объявления",
  many: "объявлений",
};

export function Header() {
  const { data: { total = -1 } = {} } = useAdsListQuery();

  return (
    <header className="py-3 px-2">
      <Typography.H2 id="ads-list-title" className="font-medium leading-[28px]">
        Мои объявления
      </Typography.H2>
      <Typography.H3 className="text-muted-foreground font-light leading-[22px] h-[22px]">
        {total >= 0 && getCountForm(total, forms)}
        {total < 0 && (
          <span className="inline-block h-[22px] w-32 animate-pulse rounded bg-muted" />
        )}
      </Typography.H3>
    </header>
  );
}
