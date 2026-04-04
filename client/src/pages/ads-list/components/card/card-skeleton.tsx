import { cn } from "@/lib/utils";

import styles from "./style.module.css";
import type { CardVariant } from "./types";

export function CardSkeleton({ variant }: { variant: CardVariant }) {
  return (
    <div
      className={cn(
        styles[variant],
        styles.skeleton,
        "rounded-[16px] bg-muted animate-pulse",
      )}
    />
  );
}
