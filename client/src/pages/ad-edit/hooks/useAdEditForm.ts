import { useEffect, useMemo } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAdDetailQuery } from "@/features/ads/hooks/useAdDetailQuery";
import { ItemEditSchema, type ItemEditFormValues } from "@/features/ads/schema";

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

  useEffect(() => {
    const sub = methods.watch((_, { name }) => {
      if (name !== "category" || !valuesFromServer) return;

      methods.setValue("params", {}, {
        shouldValidate: true,
        shouldDirty: true,
      });
      methods.clearErrors("params");
    });
    return () => sub.unsubscribe();
  }, [methods, valuesFromServer]);

  return { methods, isLoading, isError };
}
