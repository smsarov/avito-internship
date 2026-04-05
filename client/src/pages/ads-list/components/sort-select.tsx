import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAdsListActions } from "../hooks/useAdsListActions";
import { useAdsListState } from "../hooks/useAdsListState";
import { SORT_OPTIONS, type SortKey } from "../constants";

export function SortSelect() {
  const { sort } = useAdsListState();
  const { setSort } = useAdsListActions();

  const handleSortChange = (value: SortKey) => {
    setSort(value);
  };

  return (
    <Select value={sort} onValueChange={handleSortChange}>
      <SelectTrigger
        variant="toolbar"
        className="h-8 ring-4 min-w-[240px] ring-segmented-control-background"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper" className="rounded-lg">
        {SORT_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
