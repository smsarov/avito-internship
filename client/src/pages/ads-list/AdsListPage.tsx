import { formatDocumentTitle } from "@/constants/page-titles";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

import { Content } from "./components/content";
import { Pagination } from "./components/pagination";
import { Filters } from "./components/filters";
import { Header } from "./components/header";
import { Toolbar } from "./components/toolbar";

import { AdsListProvider } from "./state";

export function AdsListPage() {
  useDocumentTitle(formatDocumentTitle("Мои объявления"));

  return (
    <AdsListProvider>
      <div
        data-page="ads-list"
        className="flex min-h-full flex-col gap-4 bg-background-secondary"
      >
        <Header />
        <Toolbar />

        <div className="flex flex-row items-start gap-6">
          <aside aria-label="Фильтры">
            <Filters />
          </aside>
          <main
            className="flex flex-col w-full gap-2.5 items-start"
            aria-labelledby="ads-list-title"
          >
            <Content />
            <Pagination />
          </main>
        </div>
      </div>
    </AdsListProvider>
  );
}
