import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { FieldSet, FieldLegend } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Typography } from "@/components/ui/typography";

import {
  MAX_DESCRIPTION_LENGTH,
  type ItemEditFormValues,
} from "@/features/ads/schema";
import { useAdDetailQuery } from "@/features/ads/hooks/useAdDetailQuery";

import { cn } from "@/lib/utils";

export function Description() {
  const [count, setCount] = useState(0);
  const { isLoading } = useAdDetailQuery();
  const { register } = useFormContext<ItemEditFormValues>();

  if (isLoading) {
    return (
      <FieldSet>
        <FieldLegend>Описание</FieldLegend>
        <div className="max-w-[942px] h-16 rounded-lg bg-muted animate-pulse" />
      </FieldSet>
    );
  }

  return (
    <FieldSet className="max-w-[942px] relative">
      <FieldLegend>Описание</FieldLegend>
      <Textarea
        className="text-base"
        rows={10}
        placeholder="Введите описание"
        {...register("description", {
          onChange: (e) => setCount(e.target.value.length),
        })}
      />
      <Typography.P
        className={cn(
          "text-foreground/25 absolute bottom-0 right-0 translate-y-full",
          count > MAX_DESCRIPTION_LENGTH && "text-danger-foreground",
        )}
      >
        {count} / {MAX_DESCRIPTION_LENGTH}
      </Typography.P>
    </FieldSet>
  );
}
