import { useEffect, useMemo, useRef } from "react";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAdDetailQuery } from "@/features/ads/hooks/useAdDetailQuery";
import { ItemEditSchema, type ItemCategory, type ItemEditFormValues } from "@/features/ads/schema";

import { itemToFormValues } from "../utils/item-to-form-values";

export function useAdEditForm() {
  const { data: item, isLoading, isError } = useAdDetailQuery();

  const valuesFromServer = useMemo(
    () => (item ? itemToFormValues(item) : undefined),
    [item],
  );

  const methods = useForm<ItemEditFormValues>({
    resolver: zodResolver(ItemEditSchema) as Resolver<ItemEditFormValues>,
    mode: "onChange",
    values: valuesFromServer,
  });

  const category = useWatch({ control: methods.control, name: "category" });
  const prevCategoryRef = useRef<ItemCategory | undefined>(undefined);

  useEffect(() => {
    prevCategoryRef.current = undefined;
  }, [item?.id]);

  useEffect(() => {
    if (category === undefined) return;

    if (prevCategoryRef.current === undefined) {
      prevCategoryRef.current = category;
      return;
    }

    if (prevCategoryRef.current !== category) {
      methods.setValue("params", {}, {
        shouldValidate: true,
        shouldDirty: true,
      });
      prevCategoryRef.current = category;
    }
  }, [category, methods]);

  return { methods, isLoading, isError };
}
