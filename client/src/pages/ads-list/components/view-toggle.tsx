import GridIcon from "@icons/grid.svg";
import ListIcon from "@icons/list.svg";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { useAdsListActions } from "../hooks/useAdsListActions";
import { useAdsListState } from "../hooks/useAdsListState";

export function ViewToggle() {
  const { view } = useAdsListState();
  const { setView } = useAdsListActions();

  return (
    <ToggleGroup
      type="single"
      value={view}
      onValueChange={(v) => {
        if (v === "grid" || v === "list") setView(v);
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
