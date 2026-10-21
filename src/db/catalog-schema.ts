import { relations, sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import type { Media } from "@/lib/catalog";

export const categories = pgTable("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: text().notNull().unique(),
  name: text().notNull(),
  position: integer().notNull().default(0),
});

export const products = pgTable(
  "products",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    slug: text().notNull().unique(),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    name: text().notNull(),
    description: text().notNull(),
    colour: text().notNull(),
    /** Price in minor units (pence). */
    price: integer().notNull(),
    details: text().array().notNull().default(sql`'{}'::text[]`),
    /** Ordered; the first image is the listing image. */
    images: jsonb().$type<Media[]>().notNull(),
    badge: text(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("products_category_id_idx").on(table.categoryId),
    check("products_price_non_negative", sql`${table.price} >= 0`),
  ],
);

/** One row per size; unsized pieces have a single "One size" row. */
export const productStock = pgTable(
  "product_stock",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    label: text().notNull(),
    quantity: integer().notNull().default(0),
    position: integer().notNull(),
  },
  (table) => [
    unique("product_stock_product_label_unique").on(table.productId, table.label),
    check("product_stock_quantity_non_negative", sql`${table.quantity} >= 0`),
  ],
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  stock: many(productStock),
}));

export const productStockRelations = relations(productStock, ({ one }) => ({
  product: one(products, { fields: [productStock.productId], references: [products.id] }),
}));
