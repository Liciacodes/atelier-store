import Image from "next/image";
import type { Media } from "@/lib/catalog";

/*
 * Mobile: a swipeable, snap-scrolling strip with a frame counter.
 * md+: the strip becomes a grid, lead image full width, details in pairs.
 * CSS only, so the page stays a server component.
 */
export function ProductGallery({ images, name }: { images: Media[]; name: string }) {
  return (
    <div
      role="region"
      aria-label={`${name} images`}
      tabIndex={0}
      className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] md:grid md:grid-cols-2 md:gap-(--grid-gap-x) md:overflow-visible [&::-webkit-scrollbar]:hidden"
    >
      {images.map((image, index) => (
        <div
          key={image.src}
          className={`media-product w-full shrink-0 snap-start ${index === 0 ? "md:col-span-2" : ""}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload={index === 0}
            sizes={
              index === 0
                ? "(min-width: 64rem) 58vw, 100vw"
                : "(min-width: 64rem) 29vw, (min-width: 48rem) 50vw, 100vw"
            }
            // Styled photographs rather than cut-outs; see ProductCard.
            style={{ objectFit: "cover" }}
          />
          {images.length > 1 && (
            <span
              aria-hidden="true"
              className="type-detail absolute right-3 bottom-3 bg-background px-1.5 py-0.5 md:hidden"
            >
              {index + 1} / {images.length}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
