import { useEffect } from "react";
import { useForm, type Resolver, useFormState, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDebounce } from "@/hooks/useDebounce";
import { useAdDetailQuery } from "@/features/ads/hooks/useAdDetailQuery";
import { ItemEditSchema, type ItemEditFormValues } from "@/features/ads/schema";

import { useAdEditDraft } from "./useAdEditDraft";

export function useAdEditForm() {
  const { data: item, isLoading, isError } = useAdDetailQuery();
  const { formValues, saveDraft } = useAdEditDraft(item);

  const methods = useForm<ItemEditFormValues>({
    resolver: zodResolver(ItemEditSchema, undefined, {
      raw: true,
    }) as Resolver<ItemEditFormValues>,
    mode: "onChange",
    values: formValues,
  });

  const { control } = methods;
  const { isDirty } = useFormState({ control });
  const watchedValues = useWatch({ control });
  const debouncedValues = useDebounce(watchedValues, 400);

  useEffect(() => {
    if (!item || !isDirty || debouncedValues == null) return;
    const parsed = ItemEditSchema.safeParse(debouncedValues);
    if (!parsed.success) return;
    saveDraft(parsed.data as ItemEditFormValues);
  }, [debouncedValues, item, isDirty, saveDraft]);

  return { methods, isLoading, isError };
}
