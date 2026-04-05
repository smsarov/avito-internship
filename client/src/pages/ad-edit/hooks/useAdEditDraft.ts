import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { useLocalStorage } from "@/hooks/use-local-storage";

import { ItemEditSchema } from "@/features/ads/schema";
import type { ItemDetail, ItemEditFormValues } from "@/features/ads/schema";

import { itemToFormValues } from "../utils/item-to-form-values";

const draftKey = (id: string) => `ad-edit-draft:${id}`;

type AdEditDraftSnapshot = {
  updatedAt: string;
  values: ItemEditFormValues;
};

function serverIsNewer(item: ItemDetail, draft: AdEditDraftSnapshot): boolean {
  return new Date(item.updatedAt) > new Date(draft.updatedAt);
}

export function useAdEditDraft(item: ItemDetail | undefined) {
  const { id } = useParams<{ id: string }>();
  const storage = useLocalStorage();

  const [storageRevision, setStorageRevision] = useState(0);

  const key = id ? draftKey(id) : null;

  useEffect(() => {
    if (!key || !item) return;
    const draft = storage.read<AdEditDraftSnapshot>(key);
    if (!draft?.values) return;
    const staleOrInvalid =
      serverIsNewer(item, draft) || !ItemEditSchema.safeParse(draft.values).success;
    if (staleOrInvalid) {
      storage.clear(key);
      setStorageRevision((n) => n + 1);
    }
  }, [key, item, storage]);

  const formValues = useMemo(() => {
    if (!item) return undefined;
    if (!key) return itemToFormValues(item);
    const draft = storage.read<AdEditDraftSnapshot>(key);
    if (!draft?.values) return itemToFormValues(item);
    if (serverIsNewer(item, draft)) {
      return itemToFormValues(item);
    }
    const parsed = ItemEditSchema.safeParse(draft.values);
    if (!parsed.success) {
      return itemToFormValues(item);
    }
    return parsed.data as ItemEditFormValues;
  }, [item, key, storage, storageRevision]);

  const saveDraft = useCallback(
    (values: ItemEditFormValues) => {
      if (!key) return;
      storage.write<AdEditDraftSnapshot>(key, {
        updatedAt: new Date().toISOString(),
        values,
      });
    },
    [key, storage],
  );

  const clearDraft = useCallback(() => {
    if (!key) return;
    storage.clear(key);
    setStorageRevision((n) => n + 1);
  }, [key, storage]);

  return { formValues, saveDraft, clearDraft };
}
