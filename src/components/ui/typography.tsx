import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

interface TypographyProps extends PropsWithChildren {
  className?: string;
}

function TypographyH1({ children, className }: TypographyProps) {
  return (
    <h1 className={cn("text-3xl font-bold", className)}>{children}</h1>
  );
}

function TypographyH2({ children, className }: TypographyProps) {
  return (
    <h2 className={cn("text-2xl font-semibold", className)}>{children}</h2>
  );
}

function TypographyH3({ children, className }: TypographyProps) {
  return (
    <h3 className={cn("text-lg font-semibold", className)}>{children}</h3>
  );
}

function TypographyH4({ children, className }: TypographyProps) {
  return (
    <h4 className={cn("text-base font-medium", className)}>{children}</h4>
  );
}

function TypographyP({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-sm", className)}>{children}</p>
  );
}

function TypographySmall({ children, className }: TypographyProps) {
  return (
    <span className={cn("text-xs", className)}>{children}</span>
  );
}

export const Typography = {
  H1: TypographyH1,
  H2: TypographyH2,
  H3: TypographyH3,
  H4: TypographyH4,
  P: TypographyP,
  Small: TypographySmall,
};
