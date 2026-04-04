import ClearIcon from "@icons/clear.svg";
import { useFormContext, type FieldPath } from "react-hook-form";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupButton,
  InputGroupAddon,
} from "@/components/ui/input-group";

import { useFieldClear } from "@/pages/ad-edit/hooks/useFieldClear";

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
  const handleClear = useFieldClear(name);

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <InputGroup className="has-[input:placeholder-shown]:ring-warning-foreground">
        <InputGroupInput
          placeholder={placeholder}
          type={inputType}
          {...register(name, {
            ...(inputType === "number" && { valueAsNumber: true }),
          })}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            variant="muted"
            className="hover:bg-transparent"
            onClick={handleClear}
          >
            <ClearIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
