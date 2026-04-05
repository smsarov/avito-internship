import { useNavigate, useParams } from "react-router-dom";
import { useFormContext, useFormState } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { routes } from "@/constants/routes";
import type { ItemEditFormValues } from "@/features/ads/schema";

import { useAdEditDraft } from "../hooks/useAdEditDraft";

export function Buttons() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { clearDraft } = useAdEditDraft(undefined);

  const { control } = useFormContext<ItemEditFormValues>();
  const { isValid, isSubmitting } = useFormState({ control });

  return (
    <div className="flex gap-2.5 mt-4">
      <Button variant="accent" disabled={!isValid || isSubmitting}>
        {isSubmitting ? "Сохранение…" : "Сохранить"}
      </Button>
      <Button
        type="button"
        variant="muted"
        onClick={() => {
          clearDraft();
          navigate(routes.adDetails(id!));
        }}
      >
        Отменить
      </Button>
    </div>
  );
}
