"use client";

import Link from "next/link";
import { useRef } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { navigation } from "@/lib/catalog";

const secondary = [
  { label: "The atelier", href: "/atelier" },
  { label: "Client services", href: "/client-services" },
  { label: "Account", href: "/account" },
];

/*
 * Slide-in drawer built on the Popover API, so opening, Escape and
 * light-dismiss work without JS. The client boundary is only here to close
 * the drawer after a client-side navigation.
 */
export function MobileMenu() {
  const panel = useRef<HTMLDivElement>(null);
  const close = () => panel.current?.hidePopover();

  return (
    <>
      <button
        type="button"
        popoverTarget="mobile-menu"
        className="-ml-2 inline-flex size-10 items-center justify-center lg:hidden"
        aria-label="Open menu"
      >
        <MenuIcon />
      </button>

      <div
        ref={panel}
        id="mobile-menu"
        popover="auto"
        className="fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-full max-w-sm overflow-y-auto bg-background p-0 text-foreground backdrop:bg-backdrop"
      >
        <div className="flex h-header items-center justify-between px-gutter">
          <span className="type-title-s">Menu</span>
          <button
            type="button"
            popoverTarget="mobile-menu"
            popoverTargetAction="hide"
            className="-mr-2 inline-flex size-10 items-center justify-center"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        <nav aria-label="Mobile" className="px-gutter pt-6 pb-10">
          <ul className="flex flex-col gap-4">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="type-title-l" onClick={close}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <hr className="divider my-8" />

          <ul className="flex flex-col gap-3">
            {secondary.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="type-caption link-quiet" onClick={close}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
