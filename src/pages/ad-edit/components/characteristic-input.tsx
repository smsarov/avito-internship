import { useFormContext, type FieldPath } from "react-hook-form";

import {
  Field,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import type { ItemEditFormValues } from "@/features/ads/schema";

type CharacteristicInputProps = {
  name: FieldPath<ItemEditFormValues>;
  label: string;
  inputType: "text" | "number";
};

export function CharacteristicInput({
  name,
  label,
  inputType,
}: CharacteristicInputProps) {
  const { register } = useFormContext<ItemEditFormValues>();

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <Input
        className="placeholder-shown:ring-warning-foreground"
        placeholder={`Введите ${label.toLowerCase()}`}
        type={inputType}
        {...register(name, {
          ...(inputType === "number" && { valueAsNumber: true }),
        })}
      />
    </Field>
  );
}
