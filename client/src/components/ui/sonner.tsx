import { Toaster as Sonner, type ToasterProps } from "sonner";

import SuccessIcon from "@icons/success.svg";
import ErrorIcon from "@icons/error.svg";

const toastClassNames: NonNullable<ToasterProps["toastOptions"]>["classNames"] =
  {
    toast:
      "group/toast relative flex gap-2.5 w-[328px] px-4 py-[9px] rounded-[2px] ring-1 ring-inset text-foreground/85",
    success: "bg-success ring-success-border",
    error: "bg-danger ring-danger-border",

    title: "font-normal text-sm leading-[22px]",
    description: "mt-1.5 font-normal text-sm leading-[22px]",
    content: "flex min-w-0 flex-1 flex-col gap-0.5 pr-7",
    icon: "mt-0.5 shrink-0 [&_svg]:size-4.5",
  };

const Toaster = ({ ...props }: ToasterProps) => {

  return (
    <Sonner
      position="top-right"
      richColors={false}
      className="toaster group"
      icons={{
        success: <SuccessIcon className="text-success-foreground" />,
        error: <ErrorIcon className="text-danger-foreground" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: toastClassNames,
      }}
      {...props}
    />
  );
};

export { Toaster };
