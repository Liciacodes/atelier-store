import Link from "next/link";
import { AccountIcon, BagIcon, SearchIcon } from "@/components/icons";
import { MobileMenu } from "@/components/mobile-menu";
import { navigation } from "@/lib/catalog";

export function SiteHeader() {
  return (
    <>
      <div className="inverse">
        <p className="container-page type-detail py-2 text-center uppercase">
          Complimentary delivery and returns on every order
        </p>
      </div>

      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container-page grid h-header grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex items-center">
            <MobileMenu />
            <nav aria-label="Main" className="max-lg:hidden">
              <ul className="flex gap-6">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="type-caption-strong link-quiet">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <Link href="/" className="type-title-m tracking-[0.2em]" aria-label="Atelier, home">
            Atelier
          </Link>

          <div className="-mr-2 flex items-center justify-end">
            <Link
              href="/search"
              className="inline-flex size-10 items-center justify-center"
              aria-label="Search"
            >
              <SearchIcon />
            </Link>
            <Link
              href="/account"
              className="inline-flex size-10 items-center justify-center max-md:hidden"
              aria-label="Account"
            >
              <AccountIcon />
            </Link>
            <Link
              href="/bag"
              className="inline-flex size-10 items-center justify-center"
              aria-label="Shopping bag"
            >
              <BagIcon />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
