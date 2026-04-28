/** Внутренний маршрут SPA (начинается с /, не //). */
export function isInternalPromoLink(url: string): boolean {
  const t = url.trim();
  return t.startsWith("/") && !t.startsWith("//");
}
