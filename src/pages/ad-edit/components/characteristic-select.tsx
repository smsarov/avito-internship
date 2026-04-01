import { useEffect, useMemo } from "react";
import { Controller, useFormContext, useWatch, type FieldPath } from "react-hook-form";

import {
  Field,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import type { ItemCategory, ItemEditFormValues } from "@/features/ads/schema";

type CharacteristicSelectProps = {
  name: FieldPath<ItemEditFormValues>;
  label: string;
  options: { value: string; label: string }[];
  category: ItemCategory;
  fieldKey: string;
};

export function CharacteristicSelect({
  name,
  label,
  options,
  category,
  fieldKey,
}: CharacteristicSelectProps) {
  const { control, setValue } = useFormContext<ItemEditFormValues>();
  const validValues = useMemo(
    () => new Set(options.map((o) => o.value)),
    [options],
  );

  const watched = useWatch({ control, name });
  useEffect(() => {
    if (watched == null || watched === "") return;
    if (!validValues.has(String(watched))) {
      setValue(name, undefined, { shouldValidate: true });
    }
  }, [category, name, setValue, validValues, watched]);

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectValue =
            field.value != null &&
            field.value !== "" &&
            validValues.has(String(field.value))
              ? String(field.value)
              : undefined;

          return (
            <Select
              key={`${category}-${fieldKey}`}
              value={selectValue}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="data-placeholder:not-focus:ring-warning-foreground">
                <SelectValue
                  placeholder={`Выберите ${label.toLowerCase()}`}
                />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }}
      />
    </Field>
  );
}
