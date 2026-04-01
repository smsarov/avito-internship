import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[22px] data-[size=default]:w-[44px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-[state=checked]:bg-accent data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none shrink-0 rounded-[16px] bg-white shadow-[0_2px_4px_0_rgba(0,35,11,0.2)] ring-0 dark:bg-white",
          /* default: absolute thumb, equal 3px inset via left + track-relative calc */
          "group-data-[size=default]/switch:absolute group-data-[size=default]/switch:top-1/2 group-data-[size=default]/switch:size-[18px] group-data-[size=default]/switch:-translate-y-1/2 group-data-[size=default]/switch:transition-[left] group-data-[size=default]/switch:duration-200 group-data-[size=default]/switch:data-[state=unchecked]:left-[2px] group-data-[size=default]/switch:data-[state=checked]:left-[calc(100%-20px)]",
          /* sm: in-flow thumb + translate (narrow track) */
          "group-data-[size=sm]/switch:block group-data-[size=sm]/switch:size-3 group-data-[size=sm]/switch:transition-transform group-data-[size=sm]/switch:duration-200 group-data-[size=sm]/switch:data-[state=unchecked]:translate-x-0 group-data-[size=sm]/switch:data-[state=checked]:translate-x-[calc(100%-2px)]"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
