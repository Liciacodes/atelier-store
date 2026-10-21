import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

// Geometric sans with a 100–900 variable axis: thin weights for large type,
// bold for small uppercase titles and CTAs.
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Atelier",
    template: "%s | Atelier",
  },
  description:
    "Ready-to-wear, bags, shoes and accessories, made in small runs in our London atelier.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
