import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";

import { Header } from "./components/header";
import { Content } from "./components/content";

import { useAdDetailQuery } from "./hooks/useAdDetailQuery";

export function AdDetailsPage() {
  const { data: item, isError, error } = useAdDetailQuery();

  if (error) console.log(error);

  if (isError) {
    return (
      <div className="w-full rounded-lg bg-destructive/10 px-4 py-3">
        <Typography.P className="text-destructive">
          Не удалось загрузить объявление. Попробуйте обновить страницу.
        </Typography.P>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <Header item={item} />
      <Separator className="bg-separator-line" />
      <Content item={item} />
    </div>
  );
}
