import type { ItemEditFormValues } from "@/features/ads/schema";
import { useFormContext, useWatch, type FieldPath } from "react-hook-form";

export function useFieldClear(name: FieldPath<ItemEditFormValues>) {
  const { setValue, control } = useFormContext<ItemEditFormValues>();
  const value = useWatch({
    control,
    name: name as FieldPath<ItemEditFormValues>,
  });

  return () => {
    if (value !== undefined) {
      setValue(name, typeof value === "number" ? undefined : "", {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  };
}
