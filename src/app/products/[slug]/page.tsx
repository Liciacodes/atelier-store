import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { PlusIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { PurchasePanel } from "@/components/purchase-panel";
import { SectionHeading } from "@/components/section-heading";
import { CURRENCY, formatPrice, totalStock, type Product } from "@/lib/catalog";
import { getProduct, getProductSlugs, getRelatedProducts } from "@/lib/products";

// Cache Components needs at least one param; every product in the database is prerendered.
export async function generateStaticParams() {
  return (await getProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return {};

  const [image] = product.images;
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: `${image.src}?w=1200&q=80`, alt: image.alt }],
    },
  };
}

export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  // Reading params suspends, so the page shell stays static and client
  // navigations can show the skeleton instantly while the product streams in.
  return (
    <main className="flex-1">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductDetail params={params} />
      </Suspense>
    </main>
  );
}

async function ProductDetail({ params }: { params: PageProps<"/products/[slug]">["params"] }) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();

  const category = product.category.name;
  const related = await getRelatedProducts(product);

  return (
    <>
      <JsonLd product={product} />

      <div className="grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:pl-(--gutter-bleed)">
        <ProductGallery images={product.images} name={product.name} />

        <div className="container-page py-8 lg:sticky lg:top-header lg:self-start lg:py-12">
          <nav aria-label="Breadcrumb">
            <ol className="type-caption flex flex-wrap items-center gap-2 text-muted">
              <li>
                <Link href="/" className="link-quiet">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/${product.category.slug}`} className="link-quiet">
                  {category}
                </Link>
              </li>
            </ol>
          </nav>

          <div className="mt-6 flex flex-col gap-3 lg:mt-10">
            <p className="type-title-xs text-muted">
              {category}
              {product.badge && <span className="text-foreground"> · {product.badge}</span>}
            </p>
            <h1 className="type-title-l">{product.name}</h1>
            <p className="type-body">{formatPrice(product.price)}</p>
          </div>

          <p className="type-caption mt-6">
            Colour <span className="text-muted">{product.colour}</span>
          </p>

          <div className="mt-6">
            <PurchasePanel slug={product.slug} sizes={product.sizes} />
          </div>

          <ul className="type-caption mt-4 flex flex-col gap-1 text-muted">
            <li>Complimentary delivery and returns</li>
            <li>Every order arrives in our signature box</li>
          </ul>

          <div className="mt-10 border-t">
            <Disclosure title="Description" open>
              <p>{product.description}</p>
            </Disclosure>
            <Disclosure title="Details and care">
              <ul className="flex list-disc flex-col gap-1 pl-5">
                {product.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </Disclosure>
            <Disclosure title="Delivery and returns">
              <p>
                Complimentary tracked express delivery on every order, usually within 2–3 working
                days. Return unworn pieces within 30 days for a full refund.{" "}
                <Link href="/client-services/returns" className="link">
                  Returns policy
                </Link>
              </p>
            </Disclosure>
          </div>
        </div>
      </div>

      <section aria-labelledby="related-title" className="container-page section">
        <SectionHeading
          id="related-title"
          title="You may also like"
          href={`/${product.category.slug}`}
          linkLabel={`Shop ${category.toLowerCase()}`}
        />
        <div className="grid-products">
          {related.map((piece) => (
            <ProductCard key={piece.slug} product={piece} />
          ))}
        </div>
      </section>
    </>
  );
}

/** Mirrors the product layout so nothing shifts when content arrives. */
function ProductSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading product">
      <div className="grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:pl-(--gutter-bleed)">
        <div className="media-product" />
        <div className="container-page flex flex-col gap-4 py-8 lg:py-12">
          <div className="h-4 w-32 bg-surface" />
          <div className="mt-6 h-3 w-24 bg-surface lg:mt-10" />
          <div className="h-8 w-3/4 bg-surface" />
          <div className="h-5 w-20 bg-surface" />
          <div className="mt-6 h-12 w-full bg-surface" />
          <div className="h-12 w-full bg-surface" />
        </div>
      </div>
    </div>
  );
}

function Disclosure({
  title,
  open,
  children,
}: {
  title: string;
  open?: boolean;
  children: ReactNode;
}) {
  return (
    <details open={open} className="group border-b">
      <summary className="type-title-xs flex h-14 cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
        {title}
        <PlusIcon className="size-4 transition-transform duration-(--duration-fast) ease-editorial group-open:rotate-45" />
      </summary>
      <div className="type-body pb-6 text-muted">{children}</div>
    </details>
  );
}

function JsonLd({ product }: { product: Product }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => image.src),
    category: product.category.name,
    color: product.colour,
    offers: {
      "@type": "Offer",
      price: (product.price / 100).toFixed(2),
      priceCurrency: CURRENCY,
      availability:
        totalStock(product) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so catalogue text can't close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
