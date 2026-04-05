import { useShallow } from "zustand/react/shallow";

import { useAdsListStore } from "../state/store";
import type { AdsListState } from "../state/types";

export function useAdsListState(): AdsListState {
  return useAdsListStore(
    useShallow((s) => ({
      search: s.search,
      sort: s.sort,
      categories: s.categories,
      revisionOnly: s.revisionOnly,
      page: s.page,
      view: s.view,
    })),
  );
}
