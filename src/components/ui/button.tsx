import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex shrink-0 items-center justify-center gap-2 font-normal whitespace-nowrap outline-none transition-colors disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-background text-foreground/85 ring ring-inset ring-[#D9D9D9] disabled:text-[#D9D9D9] aria-disabled:text-[#D9D9D9]",
        muted: "bg-[#D9D9D9] text-[#5A5A5A]",
        accent: "bg-accent text-background disabled:bg-[#D9D9D9] disabled:text-[#F3F3F3]",
        outline: "bg-background text-accent ring ring-inset ring-accent",
        warning: "bg-warning text-warning-foreground",
        danger: "bg-danger text-foreground/85 ring ring-inset ring-[#D9D9D9]"
      },
      size: {
        default:
          "box-border min-h-[38px] min-w-[38px] rounded-lg px-3 py-2 text-base leading-[1.4] [&_svg:not([class*='size-'])]:size-4",
        sm: "box-border min-h-[32px] min-w-[32px] rounded-lg px-[7px] text-sm leading-[22px] [&_svg:not([class*='size-'])]:size-4",
        xs: "box-border min-h-6 min-w-6 rounded-sm px-[7px] py-0 text-sm leading-[22px] [&_svg:not([class*='size-'])]:size-3.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
