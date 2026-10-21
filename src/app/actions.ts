"use server";

import { getProduct, getStockLevel } from "@/lib/products";

export type AddToBagState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function addToBag(
  _previous: AddToBagState,
  formData: FormData,
): Promise<AddToBagState> {
  const product = await getProduct(String(formData.get("slug") ?? ""));
  if (!product) {
    return { status: "error", message: "This piece is no longer available." };
  }

  const sized = product.sizes.length > 1;
  const label = sized ? formData.get("size") : product.sizes[0]?.label;
  // The cached product may be minutes old, so check the live count.
  const size = typeof label === "string" ? await getStockLevel(product.slug, label) : undefined;

  if (!size) {
    return { status: "error", message: "Select a size." };
  }
  if (size.quantity <= 0) {
    return {
      status: "error",
      message: sized ? `Size ${size.label} is sold out.` : "This piece is sold out.",
    };
  }

  // TODO: write to the shopper's bag once carts exist in src/db/schema.ts.
  return {
    status: "success",
    message: sized ? `Added to your bag in size ${size.label}.` : "Added to your bag.",
  };
}

export type SubscribeState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(
  _previous: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!EMAIL.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }

  // TODO: store the address once a newsletter table exists in src/db/schema.ts.
  return { status: "success", message: "Thank you. You're on the list." };
}
