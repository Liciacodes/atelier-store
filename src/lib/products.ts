/*
 * Catalogue reads for the storefront. Reads are cached ("use cache") so pages
 * still prerender; anything tagged "products" can be refreshed with
 * updateTag/revalidateTag after a write.
 */
import { and, asc, desc, eq, ne, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import { categories, products, productStock } from "@/db/schema";
import type { Product } from "@/lib/catalog";

const withRelations = {
  category: true as const,
  stock: { orderBy: [asc(productStock.position)] },
};

type ProductRow = typeof products.$inferSelect & {
  category: typeof categories.$inferSelect;
  stock: (typeof productStock.$inferSelect)[];
};

/** Shape a row like the storefront's Product: plain and serialisable. */
function toProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    category: { slug: row.category.slug, name: row.category.name },
    price: row.price,
    colour: row.colour,
    description: row.description,
    details: row.details,
    sizes: row.stock.map((size) => ({ label: size.label, stock: size.quantity })),
    images: row.images,
    ...(row.badge && { badge: row.badge }),
  };
}

export async function getProductSlugs() {
  "use cache";
  cacheTag("products");
  cacheLife("minutes");

  const rows = await db.select({ slug: products.slug }).from(products);
  return rows.map((row) => row.slug);
}

export async function getProduct(slug: string) {
  "use cache";
  cacheTag("products", `product:${slug}`);
  cacheLife("minutes");

  const row = await db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: withRelations,
  });
  return row && toProduct(row);
}

export async function getNewArrivals(limit = 8) {
  "use cache";
  cacheTag("products");
  cacheLife("minutes");

  const rows = await db.query.products.findMany({
    with: withRelations,
    orderBy: [desc(products.createdAt)],
    limit,
  });
  return rows.map(toProduct);
}

/** Same-category pieces first, then the rest of the catalogue. */
export async function getRelatedProducts(product: Product, limit = 4) {
  "use cache";
  cacheTag("products");
  cacheLife("minutes");

  // Looked up separately: relational queries alias every column to the root
  // table, which would break a correlated subquery on categories.
  const [category] = await db
    .select({ id: categories.id })
    .from(categories)
    .where(eq(categories.slug, product.category.slug));

  const rows = await db.query.products.findMany({
    where: ne(products.slug, product.slug),
    with: withRelations,
    orderBy: (fields) => [
      desc(sql`${fields.categoryId} = ${category?.id ?? null}`),
      desc(fields.createdAt),
    ],
    limit,
  });
  return rows.map(toProduct);
}

/** Live stock for one size, uncached, so purchases never see a stale count. */
export async function getStockLevel(slug: string, label: string) {
  const [row] = await db
    .select({ label: productStock.label, quantity: productStock.quantity })
    .from(productStock)
    .innerJoin(products, eq(productStock.productId, products.id))
    .where(and(eq(products.slug, slug), eq(productStock.label, label)));
  return row;
}
