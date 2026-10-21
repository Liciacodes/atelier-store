import Link from "next/link";

export function SectionHeading({
  id,
  title,
  href,
  linkLabel,
}: {
  id: string;
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 lg:mb-10">
      <h2 id={id} className="type-title-l">
        {title}
      </h2>
      <Link href={href} className="link type-caption shrink-0">
        {linkLabel}
      </Link>
    </div>
  );
}
