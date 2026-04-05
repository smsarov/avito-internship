import SearchIcon from "@icons/search.svg";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { useAdsListActions } from "../hooks/useAdsListActions";
import { useAdsListState } from "../hooks/useAdsListState";

export function Search() {
  const { search } = useAdsListState();
  const { setSearch } = useAdsListActions();

  return (
    <InputGroup className="flex-1 ring-transparent bg-segmented-control-background dark:bg-segmented-control-background placeholder:text-input-placeholder-muted">
      <InputGroupInput
        placeholder="Найти объявление..."
        type="text"
        role="searchbox"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <InputGroupAddon
        align="inline-end"
        className="h-full px-3 py-2 rounded-lg"
      >
        <SearchIcon className="size-3.5 text-foreground" aria-hidden />
      </InputGroupAddon>
    </InputGroup>
  );
}
