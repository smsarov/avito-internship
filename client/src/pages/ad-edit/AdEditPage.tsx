import { FormProvider } from "react-hook-form";

import { Typography } from "@/components/ui/typography";
import { FieldSeparator } from "@/components/ui/field";

import { MainParameters } from "./components/main-parameters";
import { Characteristics } from "./components/characteristics";
import { Description } from "./components/description";
import { Buttons } from "./components/buttons";

import { useAdEditForm } from "./hooks/useAdEditForm";
import { useAdEditMutation } from "./hooks/useAdEditMutation";

export function AdEditPage() {
  const { methods, isError } = useAdEditForm();
  const mutation = useAdEditMutation();

  if (isError) {
    return (
      <div className="w-full rounded-lg bg-danger/10 px-4 py-3">
        <Typography.P className="text-danger-foreground">
          Не удалось загрузить объявление. Попробуйте обновить страницу.
        </Typography.P>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(async (data) => {
          await mutation.mutateAsync(data);
        })}
        className="flex flex-col gap-4.5"
      >
        <Typography.H1 className="leading-[40px] font-medium">
          Редактирование объявления
        </Typography.H1>
        <MainParameters />
        <FieldSeparator />
        <Characteristics />
        <FieldSeparator />
        <Description />
        <Buttons />
      </form>
    </FormProvider>
  );
}
