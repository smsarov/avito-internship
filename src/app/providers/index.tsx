import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "@/lib/queryClient";

import type { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <TooltipProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
