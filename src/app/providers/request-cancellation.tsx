import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { cancelAllRequests } from "@/lib/axios";

import type { PropsWithChildren } from "react";

export function RequestCancellation({ children }: PropsWithChildren) {
  const location = useLocation();

  useEffect(() => {
    return () => {
      cancelAllRequests();
    };
  }, [location.pathname]);

  return children;
}
