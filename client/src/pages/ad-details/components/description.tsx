import { Markdown } from "@/components/markdown";
import { Typography } from "@/components/ui/typography";

type DescriptionProps = {
  description?: string;
  isLoading?: boolean;
};

export function Description({ description, isLoading }: DescriptionProps) {
  if (isLoading) return <Skeleton />;

  const isEmpty = !description;

  return (
    <section
      className="flex min-w-0 w-full max-w-[480px] flex-col gap-4 md:max-w-none"
      aria-labelledby="ad-description-heading"
    >
      <Typography.H2
        id="ad-description-heading"
        className="leading-[22px] font-medium"
      >
        Описание
      </Typography.H2>
      {isEmpty ? (
        <Typography.P className="text-base leading-[140%] font-normal">
          Отсутствует
        </Typography.P>
      ) : (
        <Markdown value={description ?? ""} readOnly variant="plain" />
      )}
    </section>
  );
}

function Skeleton() {
  return (
    <div className="flex min-w-0 w-full max-w-[480px] flex-col gap-4 animate-pulse md:max-w-none">
      <div className="h-6 w-28 rounded-lg bg-muted" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-3/4 rounded bg-muted" />
        <div className="h-4 w-1/2 rounded bg-muted" />
      </div>
    </div>
  );
}
