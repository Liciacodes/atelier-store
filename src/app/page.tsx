import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { ImageOverlay } from "@/components/image-overlay";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import {
  campaign,
  categories,
  editorial,
  featuredCollections,
  services,
  story,
} from "@/lib/catalog";
import { getNewArrivals } from "@/lib/products";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Intro />
      <NewArrivals />
      <FeaturedCollections />
      <EditorialBanner />
      <ShopByCategory />
      <Story />
      <Services />
    </main>
  );
}

function Hero() {
  const [first, second] = campaign.images;

  return (
    <section aria-labelledby="hero-title" className="relative">
      {/* Diptych from md: two portrait frames side by side, one on mobile. */}
      <div className="grid h-[calc(100svh-var(--header-height)-1.75rem)] max-h-256 min-h-136 md:grid-cols-2">
        <div className="relative bg-surface">
          <Image
            src={first.src}
            alt={first.alt}
            fill
            preload
            sizes="(min-width: 48rem) 50vw, 100vw"
            className="object-cover object-[50%_20%]"
          />
        </div>
        <div className="relative bg-surface max-md:hidden">
          <Image
            src={second.src}
            alt={second.alt}
            fill
            sizes="50vw"
            className="object-cover object-[50%_25%]"
          />
        </div>
      </div>

      <ImageOverlay className="items-end">
        <div className="container-page flex flex-col items-center gap-6 pb-12 text-center lg:pb-16">
          <p className="type-title-xs">{campaign.eyebrow}</p>
          <h1 id="hero-title" className="type-display max-w-[14ch]">
            {campaign.title}
          </h1>
          <p className="type-body max-w-md">{campaign.description}</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/women" className="btn btn-secondary btn-block-mobile">
              Shop women
            </Link>
            <Link href="/men" className="btn btn-secondary btn-block-mobile">
              Shop men
            </Link>
          </div>
        </div>
      </ImageOverlay>
    </section>
  );
}

function Intro() {
  return (
    <section className="container-prose section text-center">
      <p className="type-lead text-balance">
        Clothes made slowly, in small runs, from cloth we can trace to the mill. Designed for the
        season, kept for years.
      </p>
      <Link href="/collections/autumn-winter-2026" className="link type-caption mt-8 inline-block">
        Discover the collection
      </Link>
    </section>
  );
}

async function NewArrivals() {
  const newArrivals = await getNewArrivals();

  return (
    <section aria-labelledby="new-in-title" className="container-page pb-section">
      <SectionHeading id="new-in-title" title="New In" href="/new-in" linkLabel="View all" />
      <div className="grid-products">
        {newArrivals.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}

function FeaturedCollections() {
  return (
    <section aria-label="Featured collections" className="container-bleed pb-section">
      <div className="grid-split">
        {featuredCollections.map((collection) => (
          <article key={collection.slug} className="group relative aspect-portrait overflow-hidden bg-surface">
            <Image
              src={collection.image.src}
              alt={collection.image.alt}
              fill
              sizes="(min-width: 48rem) 50vw, 100vw"
              className="object-cover transition-transform duration-(--duration-slow) ease-editorial group-hover:scale-[1.02]"
            />
            <ImageOverlay className="items-end">
              <div className="flex w-full flex-col items-start gap-3 p-6 lg:p-10">
                <p className="type-title-xs">{collection.eyebrow}</p>
                <h2 className="type-title-xl">
                  <Link href={`/collections/${collection.slug}`} className="after:absolute after:inset-0">
                    {collection.title}
                  </Link>
                </h2>
                <p className="type-body max-w-sm">{collection.description}</p>
                <span className="type-caption-strong mt-2 inline-flex items-center gap-2 uppercase">
                  Discover
                  <ArrowIcon className="size-4 transition-transform duration-(--duration-slow) ease-editorial group-hover:translate-x-1" />
                </span>
              </div>
            </ImageOverlay>
          </article>
        ))}
      </div>
    </section>
  );
}

function EditorialBanner() {
  return (
    <section aria-labelledby="editorial-title" className="media-hero">
      <Image
        src={editorial.image.src}
        alt={editorial.image.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* Text sits left-centre from lg, so the scrim runs from the left there. */}
      <ImageOverlay className="items-end lg:items-center lg:bg-linear-to-r">
        <div className="container-page flex flex-col items-start gap-4 pb-12 lg:pb-0">
          <p className="type-title-xs">{editorial.eyebrow}</p>
          <h2 id="editorial-title" className="type-title-xxl">
            {editorial.title}
          </h2>
          <p className="type-body max-w-sm">{editorial.description}</p>
          <Link href={editorial.href} className="btn btn-secondary btn-block-mobile mt-2">
            Shop the edit
          </Link>
        </div>
      </ImageOverlay>
    </section>
  );
}

function ShopByCategory() {
  return (
    <section aria-labelledby="category-title" className="container-page section">
      <SectionHeading id="category-title" title="Shop by category" href="/shop" linkLabel="Shop all" />
      <ul className="grid grid-cols-2 gap-x-(--grid-gap-x) gap-y-8 lg:grid-cols-4">
        {categories.map((category) => (
          <li key={category.slug} className="group relative">
            <div className="relative aspect-product overflow-hidden bg-surface-image">
              <Image
                src={category.image.src}
                alt=""
                fill
                sizes="(min-width: 64rem) 25vw, 50vw"
                className="object-cover transition-transform duration-(--duration-slow) ease-editorial group-hover:scale-[1.03]"
              />
            </div>
            <Link
              href={`/${category.slug}`}
              className="type-title-s mt-3 inline-block after:absolute after:inset-0"
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Story() {
  return (
    <section aria-labelledby="story-title" className="container-bleed pb-section">
      <div className="grid-split items-center">
        <div className="relative aspect-product overflow-hidden bg-surface md:aspect-portrait">
          <Image
            src={story.image.src}
            alt={story.image.alt}
            fill
            sizes="(min-width: 48rem) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-start gap-6 px-(--gutter) py-10 md:py-0 lg:px-16 xl:px-24">
          <p className="type-title-xs">{story.eyebrow}</p>
          <h2 id="story-title" className="type-title-xl">
            {story.title}
          </h2>
          <p className="type-body max-w-md text-muted">{story.description}</p>
          <Link href={story.href} className="btn btn-primary btn-block-mobile">
            {story.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section aria-labelledby="services-title" className="bg-surface">
      <div className="container-page section">
        <h2 id="services-title" className="sr-only">
          Our services
        </h2>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.href} className="flex flex-col gap-2">
              <h3 className="type-title-xs">{service.title}</h3>
              <p className="type-caption text-muted">{service.description}</p>
              <Link href={service.href} className="link type-caption mt-1 self-start">
                Learn more
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
