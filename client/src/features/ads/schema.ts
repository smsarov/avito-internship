import { z } from "zod";

export const ItemCategorySchema = z.enum(["auto", "real_estate", "electronics"]);

export type ItemCategory = z.infer<typeof ItemCategorySchema>;

export const CATEGORY_LABELS: Record<ItemCategory, string> = {
  auto: "Авто",
  real_estate: "Недвижимость",
  electronics: "Электроника",
};

export const AutoItemParamsSchema = z.object({
  brand: z.string().optional(),
  model: z.string().optional(),
  yearOfManufacture: z.coerce.number().optional(),
  transmission: z.enum(["automatic", "manual"]).optional(),
  mileage: z.coerce.number().optional(),
  enginePower: z.coerce.number().optional(),
});

export const RealEstateItemParamsSchema = z.object({
  type: z.enum(["flat", "house", "room"]).optional(),
  address: z.string().optional(),
  area: z.coerce.number().optional(),
  floor: z.coerce.number().optional(),
});

export const ElectronicsItemParamsSchema = z.object({
  type: z.enum(["phone", "laptop", "misc"]).optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  condition: z.enum(["new", "used"]).optional(),
  color: z.string().optional(),
});

export type AutoItemParams = z.infer<typeof AutoItemParamsSchema>;
export type RealEstateItemParams = z.infer<typeof RealEstateItemParamsSchema>;
export type ElectronicsItemParams = z.infer<typeof ElectronicsItemParamsSchema>;

export const AdListItemSchema = z.object({
  id: z.coerce.string(),
  category: ItemCategorySchema,
  title: z.coerce.string(),
  price: z.coerce.number().nullable(),
  needsRevision: z.coerce.boolean(),
});

export type AdListItem = z.infer<typeof AdListItemSchema>;

export const ItemsListResponseSchema = z.object({
  items: z.array(AdListItemSchema),
  total: z.coerce.number(),
});

export type ItemsListResponse = z.infer<typeof ItemsListResponseSchema>;

const ItemBaseSchema = z.object({
  id: z.coerce.string(),
  title: z.coerce.string(),
  description: z.coerce.string().optional(),
  price: z.coerce.number().nullable(),
  createdAt: z.coerce.string(),
  updatedAt: z.coerce.string(),
  needsRevision: z.coerce.boolean(),
});

export const ItemDetailSchema = z.discriminatedUnion("category", [
  ItemBaseSchema.extend({
    category: z.literal("auto"),
    params: AutoItemParamsSchema,
  }),
  ItemBaseSchema.extend({
    category: z.literal("real_estate"),
    params: RealEstateItemParamsSchema,
  }),
  ItemBaseSchema.extend({
    category: z.literal("electronics"),
    params: ElectronicsItemParamsSchema,
  }),
]);

export type ItemDetail = z.infer<typeof ItemDetailSchema>;

export type ItemsListParams = {
  q?: string;
  limit?: number;
  skip?: number;
  categories?: ItemCategory[];
  needsRevision?: boolean;
  sortColumn?: "title" | "createdAt";
  sortDirection?: "asc" | "desc";
};

export const MAX_DESCRIPTION_LENGTH = 1000;

const ItemEditBaseSchema = z.object({
  title: z.string().min(1, "Название должно быть заполнено"),
  price: z.coerce.number("Пожалуйста, введите число").min(0, "Цена должна быть неотрицательной").nullable(),
  description: z.string().max(MAX_DESCRIPTION_LENGTH, `Описание не должно превышать ${MAX_DESCRIPTION_LENGTH} символов`).optional(),
});

export const ItemEditSchema = z.discriminatedUnion("category", [
  ItemEditBaseSchema.extend({
    category: z.literal("auto"),
    params: AutoItemParamsSchema.partial(),
  }),
  ItemEditBaseSchema.extend({
    category: z.literal("real_estate"),
    params: RealEstateItemParamsSchema.partial(),
  }),
  ItemEditBaseSchema.extend({
    category: z.literal("electronics"),
    params: ElectronicsItemParamsSchema.partial(),
  }),
]);

export type ItemEditPayload = z.infer<typeof ItemEditSchema>;

export const ItemSuggestPayloadSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
  })
  .and(
    z.discriminatedUnion("category", [
      z.object({
        category: z.literal("auto"),
        params: AutoItemParamsSchema.partial(),
      }),
      z.object({
        category: z.literal("real_estate"),
        params: RealEstateItemParamsSchema.partial(),
      }),
      z.object({
        category: z.literal("electronics"),
        params: ElectronicsItemParamsSchema.partial(),
      }),
    ]),
  );

export type ItemSuggestPayload = z.infer<typeof ItemSuggestPayloadSchema>;

export const AiPriceResponseSchema = z.object({ price: z.number() });
export const AiDescriptionResponseSchema = z.object({ description: z.string() });

export type ItemEditFormValues = {
  category: ItemCategory;
  title: string;
  description?: string;
  price: number | null;
  params: Partial<AutoItemParams & RealEstateItemParams & ElectronicsItemParams>;
};
