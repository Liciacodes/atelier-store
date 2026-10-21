"use client";

import Link from "next/link";
import { startTransition, useActionState, useState } from "react";
import { addToBag, type AddToBagState } from "@/app/actions";
import { StockStatus } from "@/components/stock-status";
import type { Size } from "@/lib/catalog";

const initial: AddToBagState = { status: "idle" };

export function PurchasePanel({ slug, sizes }: { slug: string; sizes: Size[] }) {
  const [state, action, pending] = useActionState(addToBag, initial);
  const [selected, setSelected] = useState<string | null>(null);

  const sized = sizes.length > 1;
  const total = sizes.reduce((sum, size) => sum + size.stock, 0);
  const soldOut = total === 0;
  const selectedSize = sizes.find((size) => size.label === selected);

  return (
    <form
      // Dispatching from onSubmit (not the action prop) stops React resetting
      // the form afterwards, which would clear the chosen size.
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        startTransition(() => action(data));
      }}
      className="flex flex-col gap-6"
    >
      <input type="hidden" name="slug" value={slug} />

      {/* Stock follows the chosen size once there is one. */}
      {selectedSize ? (
        <StockStatus units={selectedSize.stock} suffix={`Size ${selectedSize.label}`} />
      ) : (
        <StockStatus units={total} />
      )}

      {sized && (
        <fieldset className="relative">
          {/* Floating the legend puts it inside the fieldset's box like normal flow. */}
          <legend className="type-title-xs float-left mb-3">Size</legend>
          <Link href="/client-services/sizing" className="link type-caption absolute top-0 right-0">
            Size guide
          </Link>
          <div className="clear-left grid grid-cols-4 gap-2 sm:grid-cols-5">
            {sizes.map((size) => {
              const out = size.stock <= 0;
              return (
                <label
                  key={size.label}
                  className={`type-caption-strong relative flex h-12 cursor-pointer items-center justify-center rounded-xs border border-divider transition-colors duration-(--duration-fast) hover:border-foreground has-checked:border-foreground has-checked:bg-foreground has-checked:text-background has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus has-disabled:cursor-not-allowed has-disabled:text-muted has-disabled:line-through has-disabled:hover:border-divider`}
                >
                  <input
                    type="radio"
                    name="size"
                    value={size.label}
                    disabled={out}
                    checked={selected === size.label}
                    onChange={() => setSelected(size.label)}
                    className="sr-only"
                  />
                  {size.label}
                  {out && <span className="sr-only">, sold out</span>}
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={soldOut || pending}
        >
          {soldOut ? "Sold out" : pending ? "Adding" : "Add to bag"}
        </button>
        <p
          role="status"
          className={`type-caption min-h-4 ${state.status === "error" ? "text-error" : "text-success"}`}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
