export function formatDateCuba(dateString?: string | null): string {
  if (!dateString) return "Fecha no disponible";

  const date = new Date(dateString);

  // Convertir a la zona horaria de Cuba (America/Havana)
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/Havana",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formatter = new Intl.DateTimeFormat("es-ES", options);
  const parts = formatter.formatToParts(date);

  const day = parts.find(p => p.type === "day")?.value ?? "";
  const month = parts.find(p => p.type === "month")?.value ?? "";
  const year = parts.find(p => p.type === "year")?.value ?? "";
  const hour = parts.find(p => p.type === "hour")?.value ?? "";
  const minute = parts.find(p => p.type === "minute")?.value ?? "";
  const dayPeriod = parts.find(p => p.type === "dayPeriod")?.value.toLowerCase() ?? "";

  return `${day}/${month}/${year} - ${hour}:${minute} ${dayPeriod}`;
}
