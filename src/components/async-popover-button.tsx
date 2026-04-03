import { useState } from "react";

import LampIcon from "@icons/lamp.svg";
import RedoIcon from "@icons/redo.svg";

import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { cn } from "@/lib/utils";

export type AsyncPopoverButtonProps = {
  label: string;
  onClick: () => Promise<string>;
  onApply: (result: string) => void;
};

export function AsyncPopoverButton({
  onClick,
  onApply,
  label,
}: AsyncPopoverButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [result, setResult] = useState<string | null>(null);

  async function handleClick() {
    if (status === "loading") return;
    setStatus("loading");
    setIsOpen(false);
    setResult(null);

    try {
      const result = await onClick();
      setResult(result);
      setIsOpen(true);
      setStatus("success");
    } catch {
      setStatus("error");
      setIsOpen(true);
    }
  }

  function handleApply() {
    if (!result) return;
    onApply(result);
    setResult(null);
    setStatus("idle");
    setIsOpen(false);
  }

  function handleClose() {
    setResult(null);
    setStatus("idle");
    setIsOpen(false);
  }

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <Button
          className="w-[195px] max-w-[195px] px-2"
          type="button"
          variant="warning"
          size="sm"
          onClick={handleClick}
          disabled={status === "loading"}
        >
          {status === "idle" && (
            <>
              <LampIcon className="size-3.5" />
              {label}
            </>
          )}
          {status === "loading" && (
            <>
              <Spinner className="size-3.5" />
              Выполняется запрос
            </>
          )}
          {(status === "success" || status === "error") && (
            <>
              <RedoIcon className="size-3.5" />
              Повторить запрос
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        variant={status === "error" ? "danger" : "default"}
        className="w-[332px]"
      >
        <PopoverHeader>
          <PopoverTitle>
            {status === "success" && "Ответ AI:"}
            {status === "error" && "Произошла ошибка при запросе к AI"}
          </PopoverTitle>
        </PopoverHeader>

        {status === "success" && result !== null && (
          <div
            className={cn(
              "max-h-[min(40vh,320px)] overflow-y-auto overflow-x-hidden",
            )}
          >
            <Markdown
              value={result}
              readOnly
              variant="plain"
              typography="compact"
            />
          </div>
        )}
        {status === "error" && (
          <PopoverDescription>
            Попробуйте повторить запрос или закройте уведомление
          </PopoverDescription>
        )}

        <div className="flex gap-2.5">
          {status === "success" && (
            <Button
              type="button"
              variant="accent"
              size="xs"
              onClick={handleApply}
            >
              Применить
            </Button>
          )}
          <Button
            type="button"
            size="xs"
            variant={status === "success" ? "default" : "danger"}
            onClick={handleClose}
          >
            Закрыть
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
