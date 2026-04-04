import * as React from "react";
import { Popover as PopoverPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

const PopoverVariantContext = React.createContext<"default" | "danger">(
  "default",
);

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  variant = "default",
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content> & {
  variant?: "default" | "danger";
}) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverVariantContext.Provider value={variant}>
        <PopoverPrimitive.Content
          data-slot="popover-content"
          data-variant={variant}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            "z-50 flex w-72 origin-[--radix-popover-content-transform-origin] flex-col gap-2 rounded-xs p-2 text-sm shadow-[0_2px_8px_0_--theme(--color-foreground/15%)] outline-hidden duration-100",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            "data-[variant=default]:bg-popover data-[variant=default]:text-popover-foreground",
            "data-[variant=danger]:bg-danger-secondary data-[variant=danger]:text-popover-foreground",
            className,
          )}
          {...props}
        >
          {children}
          <PopoverPrimitive.Arrow
            className={cn(
              variant === "default" && "fill-popover",
              variant === "danger" && "fill-danger-secondary",
            )}
            width={12}
            height={6}
          />
        </PopoverPrimitive.Content>
      </PopoverVariantContext.Provider>
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5 text-sm", className)}
      {...props}
    />
  );
}

function PopoverTitle({ className, ...props }: React.ComponentProps<"h2">) {
  const variant = React.useContext(PopoverVariantContext);
  return (
    <div
      data-slot="popover-title"
      className={cn(
        "text-foreground-secondary font-medium text-xs leading-4 tracking-[0.4px]",
        variant === "danger" && "text-danger-foreground-secondary",
        className,
      )}
      {...props}
    />
  );
}

function PopoverDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="popover-description"
      className={cn(
        "font-normal text-xs tracking-[0.4px] leading-4",
        className,
      )}
      {...props}
    />
  );
}

export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
};
