import { Controller, useFormContext, useWatch } from "react-hook-form";

import { Markdown } from "@/components/markdown";
import { FieldSet, Field, FieldLegend } from "@/components/ui/field";
import { Typography } from "@/components/ui/typography";

import { AsyncPopoverButton } from "@/components/async-popover-button";

import {
  MAX_DESCRIPTION_LENGTH,
  type ItemEditFormValues,
} from "@/features/ads/schema";
import { useAdDetailQuery } from "@/features/ads/hooks/useAdDetailQuery";

import { useAiDescriptionMutation } from "../hooks/useAiDescriptionMutation";

import { cn } from "@/lib/utils";

export function Description() {
  const { isLoading } = useAdDetailQuery();
  const { setValue, control } = useFormContext<ItemEditFormValues>();
  const { mutateAsync: getAiDescription } = useAiDescriptionMutation();

  const description = useWatch({ control, name: "description" });
  const descriptionLength = description?.length ?? 0;

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <FieldSet className="max-w-[942px]">
      <FieldLegend>Описание</FieldLegend>
      <Field className="gap-2">
        <div className="relative">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Markdown
                value={field.value ?? ""}
                onMarkdownChange={field.onChange}
                onBlur={field.onBlur}
                readOnly={false}
                placeholder="Введите описание"
                variant="field"
                aria-invalid={
                  descriptionLength > MAX_DESCRIPTION_LENGTH ? true : undefined
                }
              />
            )}
          />
          <Typography.P
            className={cn(
              "text-foreground/25 absolute bottom-0 right-0 translate-y-full",
              descriptionLength > MAX_DESCRIPTION_LENGTH &&
                "text-danger-foreground",
            )}
          >
            {descriptionLength} / {MAX_DESCRIPTION_LENGTH}
          </Typography.P>
        </div>
        <AsyncPopoverButton
          label={
            descriptionLength === 0 ? "Придумать описание" : "Улучшить описание"
          }
          onClick={getAiDescription}
          onApply={(result) =>
            setValue("description", result, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        />
      </Field>
    </FieldSet>
  );
}

function Skeleton() {
  return (
    <FieldSet>
      <FieldLegend>Описание</FieldLegend>
      <div className="max-w-[942px] h-16 rounded-lg bg-muted animate-pulse" />
    </FieldSet>
  );
}
