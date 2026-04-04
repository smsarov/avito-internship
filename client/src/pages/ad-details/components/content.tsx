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
    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,480px)_minmax(0,512px)] gap-8 w-fit">
      {isLoading ? (
        <div className="w-[480px] h-[360px] rounded-lg bg-muted animate-pulse" />
      ) : (
        <img
          src={defaultImageSrc}
          alt={item.title}
          className="w-[480px] h-[360px] object-contain object-top"
        />
      )}
      <div className="flex flex-col gap-8">
        {!isLoading && <RevisionNotice item={item} />}
        <Characteristics item={item} />
      </div>
      <Description description={item?.description} isLoading={isLoading} />
    </div>
  );
}
