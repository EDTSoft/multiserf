export function formatCurrency(
  value?: number,
  currency: string = "USD"
): string {
  if (value === undefined || value === null) return "-";

  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}
