import { Search } from "./search";
import { SortSelect } from "./sort-select";
import { ViewToggle } from "./view-toggle";

export function Toolbar() {
  return (
    <div className="flex flex-row items-center gap-6 p-3 bg-background rounded-lg">
      <Search />
      <div className="flex flex-row items-center gap-4">
        <ViewToggle />
        <SortSelect />
      </div>
    </div>
  );
}
