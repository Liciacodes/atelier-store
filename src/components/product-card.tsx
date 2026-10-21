import Image from "next/image";
import Link from "next/link";
import { formatPrice, totalStock, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  const [image] = product.images;
  const soldOut = totalStock(product) === 0;
  const badge = soldOut ? "Sold out" : product.badge;

  return (
    <article className="group relative">
      <div className="media-product">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 64rem) 25vw, (min-width: 48rem) 33vw, 50vw"
          // Sample shots are styled photographs, not cut-outs, so fill the frame.
          style={{ objectFit: "cover" }}
          className="transition-transform duration-(--duration-slow) ease-editorial group-hover:scale-[1.03]"
        />
        {badge && (
          <span className="type-detail absolute top-3 left-3 bg-background px-1.5 py-0.5 uppercase">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-col gap-1 pr-2">
        <p className="type-detail text-muted uppercase">{product.category.name}</p>
        <h3 className="type-caption-strong">
          {/* Stretched link: the whole card is the hit area. */}
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <p className={`type-caption ${soldOut ? "text-muted" : ""}`}>{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
