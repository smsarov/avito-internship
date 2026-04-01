import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card as BaseCard,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Typography } from "@/components/ui/typography";

import { useAdsListDispatch, useAdsListState } from "../state";
import { CATEGORY_OPTIONS } from "../constants";

import type { ItemCategory } from "@/features/ads/schema";

export function Filters() {
  const { categories, revisionOnly } = useAdsListState();
  const dispatch = useAdsListDispatch();

  const hasActiveFilters =
    Object.values(categories).some(Boolean) || revisionOnly;

  const handleCategoryChange = (category: ItemCategory) => () => {
    dispatch({ type: "TOGGLE_CATEGORY", payload: category });
  };

  const handleRevisionOnlyChange = (value: boolean) => {
    dispatch({ type: "SET_REVISION_ONLY", payload: value });
  };

  const handleResetFilters = () => {
    dispatch({ type: "RESET_FILTERS" });
  };

  return (
    <div className="flex w-3xs shrink-0 flex-col gap-3">
      <BaseCard className="p-4 gap-2.5 rounded-lg">
        <CardHeader className="px-0 py-0">
          <Typography.H4 className="font-medium leading-[24px]">
            Фильтры
          </Typography.H4>
        </CardHeader>
        <CardContent className="flex flex-col gap-2.5 px-0">
          <Accordion
            type="single"
            collapsible
            defaultValue="category"
            className="pb-0 gap-2.5"
          >
            <AccordionItem value="category">
              <AccordionTrigger className="py-0">
                <Typography.P className="font-normal leading-[22px]">
                  Категория
                </Typography.P>
              </AccordionTrigger>
              <AccordionContent className="py-2">
                <div className="flex flex-col gap-2">
                  {CATEGORY_OPTIONS.map(({ id, label }) => (
                    <div key={id} className="flex items-center gap-2">
                      <Checkbox
                        id={`ads-filter-category-${id}`}
                        checked={categories[id]}
                        onCheckedChange={handleCategoryChange(id)}
                      />
                      <Label htmlFor={`ads-filter-category-${id}`}>
                        <Typography.P className="font-normal leading-[22px]">
                          {label}
                        </Typography.P>
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-3 bg-background px-0 py-2.5 pb-4">
          <Typography.P className="font-semibold leading-[1.4]">
            Только требующие доработок
          </Typography.P>
          <Switch
            checked={revisionOnly}
            onCheckedChange={handleRevisionOnlyChange}
            aria-label="Только требующие доработок"
          />
        </CardFooter>
      </BaseCard>
      <Button
        type="button"
        variant="default"
        className="w-full p-3 ring-0"
        onClick={handleResetFilters}
        disabled={!hasActiveFilters}
      >
        <Typography.P className="font-normal leading-[17px]">
          Сбросить фильтры
        </Typography.P>
      </Button>
    </div>
  );
}
