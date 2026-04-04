import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Toggle as TogglePrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "group/toggle inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 rounded-lg text-sm font-medium whitespace-nowrap outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-0 bg-transparent text-foreground shadow-none transition-none hover:bg-transparent hover:text-foreground data-[state=off]:text-foreground data-[state=on]:bg-transparent data-[state=on]:text-accent focus-visible:z-10 focus-visible:border-transparent focus-visible:ring-0 aria-pressed:bg-transparent",
        outline:
          "border border-input bg-transparent shadow-sm transition-all hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted data-[state=on]:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4",
      },
      size: {
        default:
          "h-8 min-w-8 px-2 [&_svg:not([class*='size-'])]:size-4",
        sm: "size-4.5 min-h-4.5 min-w-4.5 p-0 [&_svg:not([class*='size-'])]:size-[18px]",
        lg: "h-9 min-w-9 px-2.5 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
