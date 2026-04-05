import { RevisionNotice } from "./revision-notice";
import { Characteristics } from "./characteristics";
import { Description } from "./description";

import defaultImageSrc from "@/assets/images/default.png";
import type { ItemDetail } from "@/features/ads/schema";

type ContentProps = {
  item?: ItemDetail;
};

export function Content({ item }: ContentProps) {
  const isLoading = !item;

  return (
    <div className="grid w-full min-w-0 grid-cols-1 md:grid-cols-[minmax(0,480px)_minmax(0,512px)] gap-8">
      {isLoading ? (
        <figure className="m-0 w-full max-w-[480px] min-w-0">
          <div className="h-[360px] w-full rounded-lg bg-muted animate-pulse" />
        </figure>
      ) : (
        <figure className="m-0 w-full max-w-[480px] min-w-0">
          <img
            src={defaultImageSrc}
            alt={item.title}
            className="h-[360px] w-full max-w-[480px] object-contain object-top"
          />
        </figure>
      )}
      <section
        className="flex min-w-0 flex-col gap-8"
        aria-label="Детали объявления"
      >
        {!isLoading && item && <RevisionNotice item={item} />}
        <Characteristics item={item} />
      </section>
      <Description description={item?.description} isLoading={isLoading} />
    </div>
  );
}
