import { stockLabel, stockState, type StockState } from "@/lib/stock";

const dot: Record<StockState, string> = {
  "in-stock": "bg-success",
  "low-stock": "bg-warning",
  "out-of-stock": "bg-muted",
};

/** Dot plus label; `suffix` adds context such as the selected size. */
export function StockStatus({ units, suffix }: { units: number; suffix?: string }) {
  return (
    <p className="type-caption flex items-center gap-2">
      <span aria-hidden="true" className={`size-1.5 rounded-full ${dot[stockState(units)]}`} />
      {stockLabel(units)}
      {suffix && <span className="text-muted">{suffix}</span>}
    </p>
  );
}
