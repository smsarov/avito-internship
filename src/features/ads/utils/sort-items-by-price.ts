export function sortItemsByPrice<T extends { price: number | null }>(
  items: T[],
  direction: "asc" | "desc",
  page: number,
  itemsPerPage: number,
): T[] {
  return [...items]
    .sort((a, b) => {
      const pa = a.price ?? 0;
      const pb = b.price ?? 0;
      return direction === "asc" ? pa - pb : pb - pa;
    })
    .slice((page - 1) * itemsPerPage, page * itemsPerPage);
}
