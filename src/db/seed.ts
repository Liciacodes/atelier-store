/*
 * Loads the sample catalogue into the database: `npm run db:seed`.
 * Safe to re-run: categories and products are upserted by slug and each
 * product's stock rows are replaced.
 */
import { eq } from "drizzle-orm";
import { detail, unsplash, type Media, type Size } from "../lib/catalog";
import { db } from "./index";
import { categories, products, productStock } from "./schema";

type SeedProduct = {
  slug: string;
  name: string;
  category: string;
  price: number;
  colour: string;
  description: string;
  details: string[];
  sizes: Size[];
  images: Media[];
  badge?: string;
};

const seedCategories = [
  { slug: "ready-to-wear", name: "Ready-to-wear" },
  { slug: "bags", name: "Bags" },
  { slug: "shoes", name: "Shoes" },
  { slug: "accessories", name: "Accessories" },
];

const BOMBER = "1591047139829-d91aecb6caea";
const TOP_HANDLE = "1594223274512-ad4803739b7c";
const ANKLE_BOOT = "1531310197839-ccf54634509e";
const PONCHO = "1434389677669-e08b4cac3105";
const BIKER = "1520975954732-35dd22299614";
const SUNGLASSES = "1511499767150-a48a237f0083";
const SNEAKER = "1603808033192-082d6919d3e1";
const TROUSER = "1594633312681-425c7b97ccd1";

const seedProducts: SeedProduct[] = [
  {
    slug: "suede-bomber-jacket",
    name: "Suede bomber jacket",
    category: "ready-to-wear",
    price: 189000,
    colour: "Cognac",
    badge: "New",
    description:
      "A relaxed bomber cut from washed goat suede with a soft hand. Rib-knit collar, cuffs and hem keep the shape close, while dropped shoulders give room to layer over knitwear.",
    details: [
      "100% goat suede; lining 100% cupro",
      "Two-way metal zip, welt pockets",
      "Relaxed fit; take your usual size",
      "Specialist leather clean only",
      "Made in Italy",
    ],
    sizes: [
      { label: "XS", stock: 2 },
      { label: "S", stock: 0 },
      { label: "M", stock: 5 },
      { label: "L", stock: 4 },
      { label: "XL", stock: 1 },
    ],
    images: [
      { src: unsplash(BOMBER), alt: "Cognac suede bomber jacket on a hanger" },
      { src: detail(BOMBER, 0.5, 0.35, 2.5), alt: "Rib-knit collar and zip of the bomber jacket" },
      { src: detail(BOMBER, 0.62, 0.8, 2.2), alt: "Ribbed hem and pocket of the bomber jacket" },
    ],
  },
  {
    slug: "grained-top-handle-bag",
    name: "Grained top-handle bag",
    category: "bags",
    price: 245000,
    colour: "Teal",
    badge: "New",
    description:
      "A structured top-handle bag in pebble-grain calf leather, closed with a polished push-lock. Sized to carry the essentials, with a detachable strap for wearing across the body.",
    details: [
      "Grained calf leather; lambskin lining",
      "Gold-finish push-lock",
      "Detachable, adjustable shoulder strap",
      "W 24 × H 19 × D 11 cm",
      "Made in Italy",
    ],
    sizes: [{ label: "One size", stock: 2 }],
    images: [
      { src: unsplash(TOP_HANDLE), alt: "Teal grained leather top-handle bag on a black stool beside a plant" },
      { src: detail(TOP_HANDLE, 0.55, 0.7, 2.4), alt: "Gold push-lock on the top-handle bag" },
      { src: detail(TOP_HANDLE, 0.7, 0.32, 2.2), alt: "Rolled leather handle of the bag" },
    ],
  },
  {
    slug: "block-heel-ankle-boot",
    name: "Block-heel ankle boot",
    category: "shoes",
    price: 79000,
    colour: "Tan",
    description:
      "A slim ankle boot in hand-burnished calf leather on a stacked 50 mm block heel. The almond toe and inside zip keep the line clean under trousers or a midi skirt.",
    details: [
      "Calf leather upper; leather lining and sole",
      "Stacked leather heel, 50 mm",
      "Inside zip fastening",
      "Runs true to size",
      "Made in Spain",
    ],
    sizes: [
      { label: "36", stock: 0 },
      { label: "37", stock: 3 },
      { label: "38", stock: 4 },
      { label: "39", stock: 2 },
      { label: "40", stock: 0 },
    ],
    images: [
      { src: unsplash(ANKLE_BOOT), alt: "Model in black trousers and tan block-heel ankle boots" },
      { src: detail(ANKLE_BOOT, 0.75, 0.82, 2.4), alt: "Stacked block heel and inside zip of the boot" },
      { src: detail(ANKLE_BOOT, 0.25, 0.42, 2.4), alt: "Burnished leather shaft of the boot" },
    ],
  },
  {
    slug: "fringed-knit-poncho",
    name: "Fringed knit poncho",
    category: "ready-to-wear",
    price: 98000,
    colour: "Ecru",
    badge: "Exclusive",
    description:
      "An open-stitch poncho hand-knitted from undyed cotton and alpaca, finished with a long fringed hem. Wear it loose over a slip dress or belted over tailoring.",
    details: [
      "70% cotton, 30% alpaca",
      "Hand-knitted; each piece varies slightly",
      "Hand wash cold, dry flat",
      "Made in Peru",
    ],
    sizes: [{ label: "One size", stock: 9 }],
    images: [
      { src: unsplash(PONCHO), alt: "Ecru open-knit poncho with fringed hem on a hanger" },
      { src: detail(PONCHO, 0.5, 0.45, 2.5), alt: "Open-stitch texture of the knit poncho" },
      { src: detail(PONCHO, 0.5, 0.82, 2.4), alt: "Fringed hem of the knit poncho" },
    ],
  },
  {
    slug: "leather-biker-jacket",
    name: "Leather biker jacket",
    category: "ready-to-wear",
    price: 320000,
    colour: "Black",
    description:
      "Our signature biker, cut from vegetable-tanned lambskin that softens and creases with wear. Asymmetric zip, notched lapels and a belted hem, with quilted shoulder panels.",
    details: [
      "100% lambskin; lining 100% cotton",
      "Asymmetric front zip, zipped cuffs",
      "Close fit; size up for layering",
      "Specialist leather clean only",
      "Made in England",
    ],
    sizes: [
      { label: "46", stock: 1 },
      { label: "48", stock: 3 },
      { label: "50", stock: 0 },
      { label: "52", stock: 2 },
    ],
    images: [
      { src: unsplash(BIKER), alt: "Model crouching on a steel beam in a black leather biker jacket" },
      { src: detail(BIKER, 0.62, 0.42, 2.4), alt: "Asymmetric zip and lapel of the leather biker jacket" },
      { src: detail(BIKER, 0.78, 0.56, 2.6), alt: "Zipped pocket and sleeve of the leather biker jacket" },
    ],
  },
  {
    slug: "round-metal-sunglasses",
    name: "Round metal sunglasses",
    category: "accessories",
    price: 42000,
    colour: "Gold / bottle green",
    badge: "New",
    description:
      "Fine round frames in brushed gold-tone titanium with bottle-green mineral lenses. Adjustable nose pads and sprung hinges for a light, secure fit.",
    details: [
      "Titanium frame; mineral glass lenses",
      "100% UVA/UVB protection, category 3",
      "Lens 49 mm, bridge 21 mm, temple 145 mm",
      "Supplied with a leather case",
      "Made in Japan",
    ],
    sizes: [{ label: "One size", stock: 14 }],
    images: [
      { src: unsplash(SUNGLASSES), alt: "Round gold-frame sunglasses with green lenses" },
      { src: detail(SUNGLASSES, 0.35, 0.5, 2.6), alt: "Green mineral lens of the round sunglasses" },
      { src: detail(SUNGLASSES, 0.68, 0.45, 2.8), alt: "Gold bridge and hinge of the sunglasses" },
    ],
  },
  {
    slug: "suede-low-top-sneaker",
    name: "Suede low-top sneaker",
    category: "shoes",
    price: 65000,
    colour: "Sand / white",
    description:
      "A clean low-top pairing a brushed suede toe with pebbled white leather, on a stitched natural rubber cupsole. Leather-lined, with a padded collar and waxed cotton laces.",
    details: [
      "Calf suede and leather upper; leather lining",
      "Natural rubber cupsole, stitched",
      "Runs large; we recommend half a size down",
      "Made in Portugal",
    ],
    sizes: [
      { label: "40", stock: 0 },
      { label: "41", stock: 0 },
      { label: "42", stock: 0 },
      { label: "43", stock: 0 },
      { label: "44", stock: 0 },
    ],
    images: [
      { src: unsplash(SNEAKER), alt: "Sand suede and white leather low-top sneakers on an orange set" },
      { src: detail(SNEAKER, 0.4, 0.62, 2.2), alt: "Suede toe and stitched sole of the sneaker" },
      { src: detail(SNEAKER, 0.7, 0.6, 2.6), alt: "Pebbled leather heel and collar of the sneaker" },
    ],
  },
  {
    slug: "silk-cuffed-trouser",
    name: "Silk cuffed trouser",
    category: "ready-to-wear",
    price: 112000,
    colour: "Blush",
    description:
      "A fluid trouser in sand-washed silk with a soft gathered waist and elasticated cuffs. Pleats at the front give a full leg that tapers to the ankle.",
    details: [
      "100% silk",
      "Concealed side zip, front pleats",
      "Relaxed fit through the leg",
      "Dry clean only",
      "Made in Italy",
    ],
    sizes: [
      { label: "36", stock: 4 },
      { label: "38", stock: 6 },
      { label: "40", stock: 0 },
      { label: "42", stock: 1 },
    ],
    images: [
      { src: unsplash(TROUSER), alt: "Model wearing blush silk trousers with cuffed ankles" },
      { src: detail(TROUSER, 0.5, 0.8, 2.4), alt: "Gathered ankle cuff of the silk trouser" },
      { src: detail(TROUSER, 0.5, 0.25, 2.2), alt: "Pleated waist of the silk trouser" },
    ],
  },
];

async function seed() {
  const categoryIds = new Map<string, number>();
  for (const [position, category] of seedCategories.entries()) {
    const [row] = await db
      .insert(categories)
      .values({ ...category, position })
      .onConflictDoUpdate({
        target: categories.slug,
        set: { name: category.name, position },
      })
      .returning({ id: categories.id });
    categoryIds.set(category.slug, row.id);
  }

  // Listed newest first, so step created_at back to keep the "New In" order.
  const now = Date.now();
  for (const [index, { category, sizes, ...product }] of seedProducts.entries()) {
    const categoryId = categoryIds.get(category);
    if (categoryId === undefined) throw new Error(`Unknown category "${category}"`);

    const values = {
      ...product,
      badge: product.badge ?? null,
      categoryId,
      createdAt: new Date(now - index * 60_000),
    };
    const [row] = await db
      .insert(products)
      .values(values)
      .onConflictDoUpdate({ target: products.slug, set: values })
      .returning({ id: products.id });

    await db.delete(productStock).where(eq(productStock.productId, row.id));
    await db.insert(productStock).values(
      sizes.map((size, position) => ({
        productId: row.id,
        label: size.label,
        quantity: size.stock,
        position,
      })),
    );
  }

  console.log(`Seeded ${seedCategories.length} categories and ${seedProducts.length} products.`);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
