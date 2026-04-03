import SearchIcon from "@icons/search.svg";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { useAdsListDispatch, useAdsListState } from "../state";

export function Search() {
  const { search } = useAdsListState();
  const dispatch = useAdsListDispatch();

  return (
    <InputGroup className="flex-1 ring-transparent bg-background-secondary placeholder:text-input-placeholder-muted">
      <InputGroupInput
        placeholder="Найти объявление..."
        type="text"
        role="searchbox"
        value={search}
        onChange={(e) =>
          dispatch({ type: "SET_SEARCH", payload: e.target.value })
        }
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
