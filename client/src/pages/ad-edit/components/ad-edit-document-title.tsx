import { useFormContext, useWatch } from "react-hook-form";

import { useAdDetailQuery } from "@/features/ads/hooks/useAdDetailQuery";
import type { ItemEditFormValues } from "@/features/ads/schema";
import { formatDocumentTitle } from "@/constants/page-titles";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function AdEditDocumentTitle() {
  const { data: item } = useAdDetailQuery();
  const { control } = useFormContext<ItemEditFormValues>();
  const title = useWatch({ control, name: "title" });
  const label = title?.trim() || item?.title || "Объявление";
  useDocumentTitle(formatDocumentTitle(`Редактирование: ${label}`));
  return null;
}
