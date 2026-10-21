import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { footerLinks } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="inverse">
      <div className="container-page section grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex max-w-md flex-col gap-4">
          <h2 className="type-title-s">Join the list</h2>
          <p className="type-body text-muted">
            New collections, private views and stories from the workroom. No more than twice a
            month.
          </p>
          <NewsletterForm />
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3">
          {footerLinks.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="type-title-xs mb-4">{group.title}</h2>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="type-caption link-quiet text-muted hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="container-page pb-6">
        {/* Full-width wordmark; textLength stretches it to the column at any size. */}
        <svg viewBox="0 0 1000 150" className="block w-full" role="img" aria-label="Atelier">
          <text
            x="0"
            y="138"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fill="currentColor"
            className="font-sans"
            style={{ fontSize: 180, fontWeight: 200, letterSpacing: "-0.02em" }}
          >
            ATELIER
          </text>
        </svg>
        <hr className="divider mt-6 mb-4" />
        <p className="type-detail text-muted uppercase">© Atelier. All rights reserved.</p>
      </div>
    </footer>
  );
}
