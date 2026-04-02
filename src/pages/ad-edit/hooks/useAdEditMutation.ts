import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { adsService } from "@/features/ads/service";
import {
  type ItemDetail,
  type ItemEditFormValues,
  type ItemEditPayload,
} from "@/features/ads/schema";

import { stripEmptyParams } from "../utils/strip-empty-params";
import { routes } from "@/constants/routes";


export function useAdEditMutation() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formValues: ItemEditFormValues) => {
      const payload: ItemEditPayload = {
        ...formValues,
        params: stripEmptyParams(formValues.params),
      } as ItemEditPayload;
      return adsService.updateItem(id!, payload);
    },
    onSuccess: (_, formValues) => {
      const queryKey = adsService.queryKeys.detail(id!);
      const cached = queryClient.getQueryData<ItemDetail>(queryKey);

      if (cached) {
        queryClient.setQueryData<ItemDetail>(queryKey, {
          ...cached,
          title: formValues.title,
          description: formValues.description,
          price: formValues.price,
          params: stripEmptyParams(formValues.params),
        } as ItemDetail);
      }

      queryClient.invalidateQueries({ queryKey });
      toast.success("Объявление успешно сохранено");
      navigate(routes.adDetails(id!));
    },
    onError: () => {
      toast.error("Не удалось сохранить объявление", {
        description:
          "При попытке сохранить изменения произошла ошибка. Попробуйте ещё раз или зайдите позже.",
      });
    },
  });
}
