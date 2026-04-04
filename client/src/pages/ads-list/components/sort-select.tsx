import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAdsListDispatch, useAdsListState } from "../state";
import { SORT_OPTIONS, type SortKey } from "../constants";

export function SortSelect() {
  const { sort } = useAdsListState();
  const dispatch = useAdsListDispatch();

  const handleSortChange = (value: SortKey) => {
    dispatch({ type: "SET_SORT", payload: value });
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
