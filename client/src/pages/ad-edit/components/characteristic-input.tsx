import ClearIcon from "@icons/clear.svg";
import { Controller, useFormContext, type FieldPath } from "react-hook-form";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupButton,
  InputGroupAddon,
} from "@/components/ui/input-group";

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
  const { control } = useFormContext<ItemEditFormValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>{label}</FieldLabel>
          <InputGroup className="has-[input:placeholder-shown]:ring-warning-foreground">
            <InputGroupInput
              placeholder={placeholder}
              type={inputType}
              value={
                field.value === undefined || field.value === null
                  ? ""
                  : inputType === "number"
                    ? String(field.value)
                    : String(field.value)
              }
              onBlur={field.onBlur}
              onChange={(e) => {
                if (inputType === "number") {
                  const raw = e.target.value;
                  field.onChange(raw === "" ? undefined : Number(raw));
                } else {
                  field.onChange(e.target.value);
                }
              }}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                type="button"
                variant="muted"
                className="hover:bg-transparent"
                onClick={() =>
                  field.onChange(inputType === "number" ? undefined : "")
                }
              >
                <ClearIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          {fieldState.error?.message != null && (
            <FieldError>{String(fieldState.error.message)}</FieldError>
          )}
        </Field>
      )}
    />
  );
}
