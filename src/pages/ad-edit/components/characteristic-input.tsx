import { useFormContext, type FieldPath } from "react-hook-form";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import type { ItemEditFormValues } from "@/features/ads/schema";

type CharacteristicInputProps = {
  name: FieldPath<ItemEditFormValues>;
  label: string;
  placeholder: string;
  inputType: "text" | "number";
};

export function CharacteristicInput({
  name,
  label,
  placeholder,
  inputType,
}: CharacteristicInputProps) {
  const { register } = useFormContext<ItemEditFormValues>();

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <Input
        className="placeholder-shown:ring-warning-foreground"
        placeholder={placeholder}
        type={inputType}
        {...register(name, {
          ...(inputType === "number" && { valueAsNumber: true }),
        })}
      />
    </Field>
  );
}
