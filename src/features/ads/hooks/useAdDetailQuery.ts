import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { adsService } from "@/features/ads/service";

export function useAdDetailQuery() {
  const { id } = useParams<{ id: string }>();

  return useQuery({
    queryKey: adsService.queryKeys.detail(id!),
    queryFn: () => adsService.fetchItemById(id!),
    enabled: !!id,
  });
}
