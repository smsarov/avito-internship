import GridIcon from "@icons/grid.svg";
import ListIcon from "@icons/list.svg";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { useAdsListDispatch, useAdsListState } from "../state";

export function ViewToggle() {
  const { view } = useAdsListState();
  const dispatch = useAdsListDispatch();

  return (
    <ToggleGroup
      type="single"
      value={view}
      onValueChange={(v) => {
        if (v === "grid" || v === "list")
          dispatch({ type: "SET_VIEW", payload: v });
      }}
      size="sm"
      className="w-full"
      aria-label="Режим отображения"
    >
      <ToggleGroupItem value="grid" aria-label="Сетка">
        <GridIcon className="size-[18px]" aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="Список">
        <ListIcon className="size-[18px]" aria-hidden />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
