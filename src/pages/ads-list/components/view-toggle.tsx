import GridIcon from "@icons/grid.svg";
import ListIcon from "@icons/list.svg";

import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { useAdsListDispatch, useAdsListState } from "../state";

const toggleItemClass =
  "size-4.5 min-h-4.5 min-w-4.5 shrink-0 cursor-pointer rounded-lg border-0 bg-transparent p-0 shadow-none transition-none hover:bg-transparent hover:text-foreground data-[state=on]:bg-transparent data-[state=on]:text-accent data-[state=off]:text-foreground focus-visible:z-10 focus-visible:ring-0";

export function ViewToggle() {
  const { view } = useAdsListState();
  const dispatch = useAdsListDispatch();

  return (
    <div className="relative box-border flex h-8 w-[72px] shrink-0 items-center rounded-lg bg-segmented-control-background px-2">
      <ToggleGroup
        type="single"
        value={view}
        onValueChange={(v) => {
          if (v === "grid" || v === "list")
            dispatch({ type: "SET_VIEW", payload: v });
        }}
        variant="default"
        size="sm"
        className="flex w-full gap-5 border-0 bg-transparent p-0 shadow-none"
        aria-label="Режим отображения"
      >
        <ToggleGroupItem
          value="grid"
          aria-label="Сетка"
          className={toggleItemClass}
        >
          <GridIcon className="size-[18px]" aria-hidden />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="list"
          aria-label="Список"
          className={toggleItemClass}
        >
          <ListIcon className="size-[18px]" aria-hidden />
        </ToggleGroupItem>
      </ToggleGroup>
      <Separator
        orientation="vertical"
        className="pointer-events-none absolute top-[3px] left-1/2 h-[26px] w-[2px] -translate-x-1/2 bg-background"
      />
    </div>
  );
}
