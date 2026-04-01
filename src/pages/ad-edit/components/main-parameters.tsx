import { useFormContext, Controller, useWatch } from "react-hook-form";

import {
  Field,
  FieldSet,
  FieldLegend,
  FieldSeparator,
  FieldError,
} from "@/components/ui/field";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { useAdDetailQuery } from "@/features/ads/hooks/useAdDetailQuery";
import {
  CATEGORY_LABELS,
  type ItemEditFormValues,
} from "@/features/ads/schema";

export function MainParameters() {
  const { data: item, isLoading } = useAdDetailQuery();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ItemEditFormValues>();

  const category = useWatch({ control, name: "category" });

  const titleReg = register("title", { required: true, minLength: 1 });
  const priceReg = register("price", {
    required: true,
    valueAsNumber: true,
    min: 0,
  });

  if (isLoading || (item && category === undefined)) {
    return <MainParametersSkeleton />;
  }

  return (
    <>
      <FieldSet>
        <FieldLegend>Категория</FieldLegend>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value != null ? String(field.value) : undefined}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-3xs">
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent className="w-3xs">
                {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FieldSet>

      <FieldSeparator />

      <FieldSet className="w-[456px]">
        <FieldLegend>Название</FieldLegend>
        <Field>
          <Input
            className="peer aria-invalid:ring-accent aria-invalid:not-focus:ring-danger-foreground"
            placeholder="Введите название"
            aria-invalid={!!errors.title}
            {...titleReg}
          />
          {!!errors.title && (
            <FieldError className="peer-focus:hidden">
              {errors.title?.message}
            </FieldError>
          )}
        </Field>
      </FieldSet>

      <FieldSeparator />

      <FieldSet className="w-[456px]">
        <FieldLegend>Цена</FieldLegend>
        <Field>
          <Input
            className="peer aria-invalid:ring-accent aria-invalid:not-focus:ring-danger-foreground"
            placeholder="Введите цену"
            type="number"
            aria-invalid={!!errors.price}
            {...priceReg}
          />
          {!!errors.price && (
            <FieldError className="peer-focus:hidden">
              {errors.price?.message}
            </FieldError>
          )}
        </Field>
      </FieldSet>
    </>
  );
}

function MainParametersSkeleton() {
  return (
    <>
      <FieldSet className="w-3xs">
        <FieldLegend>Категория</FieldLegend>
        <div className="h-8 w-full rounded-lg bg-muted animate-pulse" />
      </FieldSet>
      <FieldSeparator />
      <FieldSet className="w-[456px]">
        <FieldLegend>Название</FieldLegend>
        <div className="h-8 w-full rounded-lg bg-muted animate-pulse" />
      </FieldSet>
      <FieldSeparator />
      <FieldSet className="w-[456px]">
        <FieldLegend>Цена</FieldLegend>
        <div className="h-8 w-full rounded-lg bg-muted animate-pulse" />
      </FieldSet>
    </>
  );
}
