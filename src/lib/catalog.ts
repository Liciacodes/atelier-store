/*
 * Product types and helpers, plus the storefront's editorial content.
 * Products themselves live in the database (src/lib/products.ts reads them).
 * Images are Unsplash photographs (allowed in next.config.ts remotePatterns).
 */

export type Media = {
  src: string;
  alt: string;
};

export type ProductCategory = {
  slug: string;
  name: string;
};

export type Size = {
  label: string;
  stock: number;
};

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  /** Price in minor units (pence). */
  price: number;
  colour: string;
  description: string;
  details: string[];
  /** One entry ("One size") for unsized items. */
  sizes: Size[];
  /** The first image is the listing image. */
  images: Media[];
  badge?: string;
};

export type Collection = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  image: Media;
};

export type Category = {
  slug: string;
  title: string;
  image: Media;
};

// Width, quality and format are added per request by src/lib/image-loader.ts.
export const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

/**
 * A 4:5 detail shot cut from the same photograph: x/y place the focal point
 * (0–1 across and down), zoom magnifies around it.
 */
export const detail = (id: string, x: number, y: number, zoom: number) =>
  `${unsplash(id)}?fit=crop&crop=focalpoint&fp-x=${x}&fp-y=${y}&fp-z=${zoom}&ar=4:5`;

export const CURRENCY = "GBP";

const priceFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: CURRENCY,
  maximumFractionDigits: 0,
});

export function formatPrice(minor: number) {
  return priceFormat.format(minor / 100);
}

export function totalStock(product: Product) {
  return product.sizes.reduce((sum, size) => sum + size.stock, 0);
}

export const navigation = [
  { label: "New In", href: "/new-in" },
  { label: "Women", href: "/women" },
  { label: "Men", href: "/men" },
  { label: "Bags", href: "/bags" },
  { label: "Shoes", href: "/shoes" },
];

export const campaign = {
  eyebrow: "Autumn Winter 2026",
  title: "The Quiet Season",
  description: "Soft tailoring, deep colour and cloth that improves with wear.",
  images: [
    {
      src: unsplash("1571513722275-4b41940f54b8"),
      alt: "Model in an ivory tailored suit holding a red rose",
    },
    {
      src: unsplash("1566174053879-31528523f8ae"),
      alt: "Model in an off-the-shoulder plum velvet gown against a violet wall",
    },
  ],
};

export const featuredCollections: Collection[] = [
  {
    slug: "evening",
    eyebrow: "Women",
    title: "Evening",
    description: "Bias-cut silk and liquid satin for after dark.",
    image: {
      src: unsplash("1595777457583-95e059d581b8"),
      alt: "Model twirling in a flowing red gown in a garden",
    },
  },
  {
    slug: "tailoring",
    eyebrow: "Men",
    title: "Soft Tailoring",
    description: "Unstructured jackets cut in brushed wool and cashmere.",
    image: {
      src: unsplash("1552374196-1ab2a1c593e8"),
      alt: "Man seated in a camel blazer and cream trousers",
    },
  },
];

export const editorial = {
  eyebrow: "The Edit",
  title: "Knitwear",
  description:
    "Undyed wool, hand-finished seams and silhouettes made to be layered all season.",
  href: "/collections/knitwear",
  image: {
    src: unsplash("1558769132-cb1aea458c5e"),
    alt: "Rail of neutral knitwear and dried pampas grass",
  },
};

export const categories: Category[] = [
  {
    slug: "bags",
    title: "Bags",
    image: {
      src: unsplash("1598532163257-ae3c6b2524b6"),
      alt: "Woven tan leather tote with a chain strap",
    },
  },
  {
    slug: "shoes",
    title: "Shoes",
    image: {
      src: unsplash("1614252235316-8c857d38b5f4"),
      alt: "Close-up of polished brown leather lace-up shoes",
    },
  },
  {
    slug: "jewellery",
    title: "Jewellery",
    image: {
      src: unsplash("1535632066927-ab7c9ab60908"),
      alt: "Crystal drop earrings resting on a green leaf",
    },
  },
  {
    slug: "watches",
    title: "Watches",
    image: {
      src: unsplash("1524592094714-0f0654e20314"),
      alt: "Hand holding a minimal watch with a grey leather strap",
    },
  },
];

export const story = {
  eyebrow: "The Atelier",
  title: "Made to be kept",
  description:
    "Every piece is cut and finished in our London workroom, in small runs from cloth we can trace to the mill. Visit the atelier for fittings, alterations and a private view of the new season.",
  href: "/atelier",
  cta: "Book an appointment",
  image: {
    src: unsplash("1441984904996-e0b6ba687e04"),
    alt: "Interior of the Atelier store with garment rails and pendant lights",
  },
};

export const services = [
  {
    title: "Complimentary delivery",
    description: "On all orders, with tracked express shipping.",
    href: "/client-services/delivery",
  },
  {
    title: "Returns",
    description: "Free returns within 30 days of delivery.",
    href: "/client-services/returns",
  },
  {
    title: "Gift wrapping",
    description: "Every order arrives in our signature box.",
    href: "/client-services/gifting",
  },
  {
    title: "Client services",
    description: "Advisers available by phone, email or chat.",
    href: "/client-services",
  },
];

export const footerLinks = [
  {
    title: "Client services",
    links: [
      { label: "Contact us", href: "/client-services" },
      { label: "Delivery", href: "/client-services/delivery" },
      { label: "Returns", href: "/client-services/returns" },
      { label: "Size guide", href: "/client-services/sizing" },
    ],
  },
  {
    title: "The house",
    links: [
      { label: "The atelier", href: "/atelier" },
      { label: "Craftsmanship", href: "/craftsmanship" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/legal/terms" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Cookies", href: "/legal/cookies" },
      { label: "Accessibility", href: "/legal/accessibility" },
    ],
  },
];
