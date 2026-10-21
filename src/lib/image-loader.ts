"use client";

import type { ImageLoaderProps } from "next/image";

/*
 * Global next/image loader (next.config.ts `images.loaderFile`).
 * Unsplash is served by imgix, which resizes on its own CDN, so we pass the
 * requested width through instead of proxying full-size originals via
 * /_next/image. Any crop parameters already on the src are kept.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    return url.href;
  }

  // Local files are served as-is; the width param only satisfies next/image.
  return `${src}?w=${width}`;
}
