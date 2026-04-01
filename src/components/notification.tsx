import WarningIcon from "@icons/warning.svg";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const notificationVariants = cva(
  "group flex flex-row items-start h-fit shadow-[0_3px_6px_-4px_rgba(0,0,0,0.12),0_6px_16px_0_rgba(0,0,0,0.08),0_9px_28px_8px_rgba(0,0,0,0.05)]",
  {
    variants: {
      variant: {
        warning: "bg-warning",
        danger: "bg-danger",
      },
      size: {
        default: "px-4 py-3 rounded-lg gap-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const icons = {
  warning: WarningIcon,
};

type NotificationProps = VariantProps<typeof notificationVariants> &
  React.ComponentProps<"div"> & {
    showIcon?: boolean;
  };

export function Notification({
  className,
  variant,
  size = "default",
  showIcon = false,
  children,
  ...props
}: NotificationProps) {
  const Icon = variant ? icons[variant as keyof typeof icons] : null;

  return (
    <div
      data-size={size}
      data-variant={variant}
      className={cn(notificationVariants({ variant, size }), className)}
      {...props}
    >
      {showIcon && Icon && (
        <Icon
          className="shrink-0 mt-0.5 group-data-[size=default]:size-4.5"
          aria-hidden="true"
        />
      )}

      <div className="flex flex-col gap-1 flex-1">{children}</div>
    </div>
  );
}

Notification.Title = function NotificationTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "font-semibold text-[#1E1E1E]",
        "group-data-[size=default]:text-base group-data-[size=default]:leading-[24px]",
        "group-data-[variant=danger]:text-danger-foreground-secondary",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Notification.Content = function NotificationContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "font-normal",
        "group-data-[size=default]:text-sm group-data-[size=default]:leading-[22px]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
