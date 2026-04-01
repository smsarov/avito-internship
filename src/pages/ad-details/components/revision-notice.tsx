import { Typography } from "@/components/ui/typography";
import { Notification } from "@/components/notification";

import { getMissingFields } from "../utils/get-missing-fields";

import type { ItemDetail } from "@/features/ads/schema";

type RevisionNoticeProps = {
  item: ItemDetail;
};

export function RevisionNotice({ item }: RevisionNoticeProps) {
  const missingFields = getMissingFields(item);

  if (missingFields.length === 0) return null;

  return (
    <Notification variant="warning" showIcon className="w-[480px] md:w-full">
      <Notification.Title>Требуются доработки</Notification.Title>
      <Notification.Content>
        {missingFields.length > 0 && (
          <>
            <Typography.P className="text-inherit">
              У объявления не заполнены поля:
            </Typography.P>
            <ul className="list-disc list-inside ml-2">
              {missingFields.map((field) => (
                <li key={field}>{field}</li>
              ))}
            </ul>
          </>
        )}
      </Notification.Content>
    </Notification>
  );
}
