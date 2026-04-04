import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { adsService } from "@/features/ads/service";
import { queryKeys } from "@/features/ads/query-keys";


export function useAdDetailQuery() {
  const { id } = useParams<{ id: string }>();

  return useQuery({
    queryKey: queryKeys.detail(id!),
    queryFn: () => adsService.fetchItemById(id!),
    enabled: !!id,
  });
}
