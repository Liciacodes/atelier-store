// Kept apart from the catalogue so client components can import it cheaply.

export type StockState = "in-stock" | "low-stock" | "out-of-stock";

/** At or below this many units we show "Only N left". */
export const LOW_STOCK_THRESHOLD = 3;

export function stockState(units: number): StockState {
  if (units <= 0) return "out-of-stock";
  if (units <= LOW_STOCK_THRESHOLD) return "low-stock";
  return "in-stock";
}

export function stockLabel(units: number) {
  const state = stockState(units);
  if (state === "out-of-stock") return "Sold out";
  if (state === "low-stock") return `Only ${units} left`;
  return "In stock";
}
