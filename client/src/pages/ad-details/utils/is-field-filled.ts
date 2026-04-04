export function isFieldFilled(value: unknown): boolean {
  return value !== undefined && value !== null && value !== "";
}
