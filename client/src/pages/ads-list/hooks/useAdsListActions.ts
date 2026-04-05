import { useShallow } from "zustand/react/shallow";

import { useAdsListStore } from "../state/store";

export function useAdsListActions() {
  return useAdsListStore(
    useShallow((s) => ({
      setSearch: s.setSearch,
      setSort: s.setSort,
      toggleCategory: s.toggleCategory,
      setRevisionOnly: s.setRevisionOnly,
      setPage: s.setPage,
      setView: s.setView,
      resetFilters: s.resetFilters,
    })),
  );
}
