"use client"

import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    orientation?: "horizontal" | "vertical"
  }
>({
  size: "default",
  variant: "default",
  orientation: "horizontal",
})

function ToggleGroup({
  className,
  size,
  orientation = "horizontal",
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    orientation?: "horizontal" | "vertical"
  }) {

  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-size={size}
      data-orientation={orientation}
      className={cn(
        "group/toggle-group h-8 px-2 gap-[21px] bg-segmented-control-background flex flex-row items-center rounded-lg data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-vertical:flex-col data-vertical:items-stretch",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{ size, orientation }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(
        "shrink-0 focus:z-10 focus-visible:z-10  data-[variant=default]:group-data-[orientation=horizontal]/toggle-group:not-last:relative data-[variant=default]:group-data-[orientation=horizontal]/toggle-group:not-last:after:pointer-events-none data-[variant=default]:group-data-[orientation=horizontal]/toggle-group:not-last:after:absolute  data-[variant=default]:group-data-[orientation=horizontal]/toggle-group:not-last:after:left-full data-[variant=default]:group-data-[orientation=horizontal]/toggle-group:not-last:after:ml-2.5 data-[variant=default]:group-data-[orientation=horizontal]/toggle-group:not-last:after:h-[26px] data-[variant=default]:group-data-[orientation=horizontal]/toggle-group:not-last:after:w-[2px] data-[variant=default]:group-data-[orientation=horizontal]/toggle-group:not-last:after:-translate-x-1/2 data-[variant=default]:group-data-[orientation=horizontal]/toggle-group:not-last:after:bg-background data-[variant=default]:group-data-[orientation=horizontal]/toggle-group:not-last:after:content-['']",
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
