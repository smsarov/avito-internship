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
    <div className="box-border flex h-8 min-w-[240px] shrink-0 rounded-lg bg-background-secondary p-1">
      <div className="min-h-0 h-full min-w-0 w-full">
        <Select value={sort} onValueChange={handleSortChange}>
          <SelectTrigger variant="toolbar" size="default">
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
      </div>
    </div>
  );
}
