import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { adsService } from "@/features/ads/service";
import {
  type ItemEditFormValues,
  type ItemEditPayload,
} from "@/features/ads/schema";
import { routes } from "@/constants/routes";

export function useAdEditMutation() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ItemEditFormValues) =>
      adsService.updateItem(id!, payload as ItemEditPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adsService.queryKeys.detail(id!),
      });
      navigate(routes.adDetails(id!));
    },
  });
}
