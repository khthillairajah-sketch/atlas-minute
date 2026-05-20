export function normalizeDate(input: string | Date) {
  return new Date(input).toISOString().split("T")[0];
}