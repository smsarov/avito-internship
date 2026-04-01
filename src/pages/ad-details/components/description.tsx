import { Typography } from "@/components/ui/typography";

type DescriptionProps = {
  description?: string;
  isLoading?: boolean;
};

export function Description({ description, isLoading }: DescriptionProps) {
  if (isLoading) return <Skeleton />;

  const isEmpty = !description;

  return (
    <div className="flex flex-col gap-4 w-[480px] md:w-full">
      <Typography.H2 className="leading-[22px] font-medium">
        Описание
      </Typography.H2>
      <Typography.Small className="text-base leading-[140%] font-normal">
        {isEmpty ? "Отсутствует" : description}
      </Typography.Small>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="flex flex-col gap-4 w-[480px] md:w-full animate-pulse">
      <div className="h-6 w-28 rounded-lg bg-muted" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-3/4 rounded bg-muted" />
        <div className="h-4 w-1/2 rounded bg-muted" />
      </div>
    </div>
  );
}