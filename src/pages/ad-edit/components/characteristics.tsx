import { useFormContext, useWatch, type FieldPath } from "react-hook-form";

import {
  FieldSet,
  FieldLegend,
  FieldGroup,
} from "@/components/ui/field";

import { CharacteristicInput } from "./characteristic-input";
import { CharacteristicSelect } from "./characteristic-select";

import { useAdDetailQuery } from "@/features/ads/hooks/useAdDetailQuery";
import { CHARACTERISTIC_FIELDS } from "../constants";

import type { ItemCategory, ItemEditFormValues } from "@/features/ads/schema";

export function Characteristics() {
  const { data: item, isLoading } = useAdDetailQuery();
  const { control } = useFormContext<ItemEditFormValues>();

  const watchedCategory = useWatch({ control, name: "category" }) as
    | ItemCategory
    | undefined;
  const category = watchedCategory ?? item?.category;

  if (isLoading || (item && !watchedCategory)) {
    return <CharacteristicsSkeleton />;
  }

  if (!category) return null;

  const fields = CHARACTERISTIC_FIELDS[category];

  return (
    <FieldSet className="w-[456px]">
      <FieldLegend>Характеристики</FieldLegend>
      <FieldGroup>
        {fields.map((field) => {
          const fieldPath =
            `params.${field.key}` as FieldPath<ItemEditFormValues>;

          if (field.inputType === "select") {
            return (
              <CharacteristicSelect
                key={`${category}-${field.key}`}
                name={fieldPath}
                label={field.label}
                placeholder={field.placeholder}
                options={field.options}
                category={category}
                fieldKey={field.key}
              />
            );
          }

          return (
            <CharacteristicInput
              key={`${category}-${field.key}`}
              name={fieldPath}
              label={field.label}
              placeholder={field.placeholder}
              inputType={field.inputType}
            />
          );
        })}
      </FieldGroup>
    </FieldSet>
  );
}

function CharacteristicsSkeleton() {
  return (
    <FieldSet className="w-[456px]">
      <FieldLegend>Характеристики</FieldLegend>
      <FieldGroup>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="h-5 w-20 rounded bg-muted animate-pulse" />
            <div className="h-8 w-full rounded-lg bg-muted animate-pulse" />
          </div>
        ))}
      </FieldGroup>
    </FieldSet>
  );
}
