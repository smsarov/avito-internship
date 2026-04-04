import { Typography } from "@/components/ui/typography";

import { PARAM_LABELS, formatParamValue } from "../constants";
import { isFieldFilled } from "../utils/is-field-filled";

import type { ItemDetail } from "@/features/ads/schema";

type CharacteristicsProps = {
  item?: ItemDetail;
};

export function Characteristics({ item }: CharacteristicsProps) {
  if (!item) return <Skeleton />;

  const labels = PARAM_LABELS[item.category];
  const params = item.params as Record<string, unknown>;

  const filled = Object.entries(labels).filter(([key]) =>
    isFieldFilled(params[key]),
  );

  if (filled.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <Typography.H2 className="leading-[28px] font-normal">
        Характеристики
      </Typography.H2>
      <div className="grid grid-cols-[148px_auto] gap-x-3 gap-y-2 w-fit">
        {filled.map(([key, label]) => (
          <div key={key} className="contents">
            <Typography.P className="text-base leading-[140%] opacity-45 font-semibold">
              {label}
            </Typography.P>
            <Typography.P className="text-base leading-[140%] font-normal">
              {formatParamValue(key, params[key])}
            </Typography.P>
          </div>
        ))}
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="h-7 w-40 rounded-lg bg-muted" />
      <div className="grid grid-cols-[148px_auto] gap-x-3 gap-y-2 w-fit">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="contents">
            <div className="h-5 w-24 rounded bg-muted" />
            <div className="h-5 w-32 rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}