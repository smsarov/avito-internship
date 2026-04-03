import { useFormContext, Controller, useWatch } from "react-hook-form";
import ClearIcon from "@icons/clear.svg";
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
import {
  InputGroup,
  InputGroupButton,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { AsyncPopoverButton } from "@/components/async-popover-button";

import { useAdDetailQuery } from "@/features/ads/hooks/useAdDetailQuery";
import { useFieldClear } from "../hooks/useFieldClear";
import { useAiPriceMutation } from "../hooks/useAiPriceMutation";

import {
  CATEGORY_LABELS,
  type ItemEditFormValues,
} from "@/features/ads/schema";

export function MainParameters() {
  const { data: item, isLoading } = useAdDetailQuery();
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<ItemEditFormValues>();

  const { mutateAsync: getAiPrice } = useAiPriceMutation();

  const category = useWatch({ control, name: "category" });

  const handleTitleClear = useFieldClear("title");
  const handlePriceClear = useFieldClear("price");

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
          <InputGroup className="peer has-[[data-slot][aria-invalid=true]]:not(:focus-within):ring-danger-foreground has-[[data-slot][aria-invalid=true]]:focus-within:ring-accent">
            <InputGroupInput
              placeholder="Введите название"
              aria-invalid={!!errors.title}
              required
              {...titleReg}
            />

            <InputGroupAddon align="inline-end">
              <InputGroupButton
                type="button"
                variant="muted"
                className="hover:bg-transparent"
                onClick={handleTitleClear}
              >
                <ClearIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>

          {!!errors.title && (
            <FieldError className="peer-focus-within:hidden">
              {errors.title?.message}
            </FieldError>
          )}
        </Field>
      </FieldSet>

      <FieldSeparator />

      <FieldSet>
        <FieldLegend>Цена</FieldLegend>
        <Field orientation="horizontal" className="gap-6">
          <div>
            <InputGroup className="peer w-[456px] has-[[data-slot][aria-invalid=true]]:not(:focus-within):ring-danger-foreground has-[[data-slot][aria-invalid=true]]:focus-within:ring-accent">
              <InputGroupInput
                placeholder="Введите цену"
                type="number"
                aria-invalid={!!errors.price}
                required
                {...priceReg}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="button"
                  variant="muted"
                  className="hover:bg-transparent"
                  onClick={handlePriceClear}
                >
                  <ClearIcon />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            {!!errors.price && (
              <FieldError className="peer-focus-within:hidden">
                {errors.price?.message}
              </FieldError>
            )}
          </div>
          <AsyncPopoverButton
            label="Узнать рыночную цену"
            onClick={getAiPrice}
            onApply={(result) => setValue("price", Number(result))}
          />
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
        <input required className="hidden" />
        <div className="h-8 w-full rounded-lg bg-muted animate-pulse" />
      </FieldSet>
      <FieldSeparator />
      <FieldSet className="w-[456px]">
        <FieldLegend>Цена</FieldLegend>
        <input required className="hidden" />
        <div className="h-8 w-full rounded-lg bg-muted animate-pulse" />
      </FieldSet>
    </>
  );
}
