import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";

import { adsService } from "@/features/ads/service";
import { type ItemEditFormValues } from "@/features/ads/schema";

import { itemEditFormValuesToSuggestPayload } from "../utils/item-edit-form-to-suggest-payload";

export function useAiPriceMutation() {
  const { getValues } = useFormContext<ItemEditFormValues>();

  return useMutation({
    mutationFn: async () => {
      const payload = itemEditFormValuesToSuggestPayload(getValues());
      const price = await adsService.getAiPrice(payload);
      return String(price);
    },
  });
}
