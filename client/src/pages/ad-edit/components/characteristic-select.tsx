import { useMemo } from "react";
import { Controller, useFormContext, type FieldPath } from "react-hook-form";

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
  placeholder: string;
  options: { value: string; label: string }[];
  category: ItemCategory;
  fieldKey: string;
};

export function CharacteristicSelect({
  name,
  label,
  placeholder,
  options,
  category,
  fieldKey,
}: CharacteristicSelectProps) {
  const { control } = useFormContext<ItemEditFormValues>();
  const validValues = useMemo(
    () => new Set(options.map((o) => o.value)),
    [options],
  );

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <Controller
        name={name}
        control={control}
        shouldUnregister
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
                <SelectValue placeholder={placeholder} />
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
