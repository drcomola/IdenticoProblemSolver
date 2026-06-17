import Link from "next/link";
import Image from "next/image";
import { PremiumPlaceholder } from "./PremiumPlaceholder";

/**
 * Clinical-case card. With `href` + `imageSrc` it renders a real, clickable case
 * (next/image). Without them it falls back to a category placeholder — Phase rule:
 * no fabricated cases, only the layout shell until real documentation exists.
 */
export function CaseCard({
  category,
  imageLabel,
  title,
  href,
  imageSrc,
  imageAlt,
  beforeImageSrc,
  afterImageSrc,
  beforeImageAlt,
  afterImageAlt,
  beforeLabel = "Prima",
  afterLabel = "Dopo",
}: {
  category: string;
  imageLabel: string;
  title?: string;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
  beforeImageSrc?: string;
  afterImageSrc?: string;
  beforeImageAlt?: string;
  afterImageAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const media = beforeImageSrc && afterImageSrc ? (
    <div className="grid aspect-[4/3] w-full grid-cols-2 bg-night">
      <div className="relative min-w-0 border-r border-canvas/70">
        <Image
          src={beforeImageSrc}
          alt={beforeImageAlt ?? `Prima - ${title ?? category}`}
          fill
          className="object-cover"
          sizes="(max-width:768px) 50vw, 175px"
        />
        <span className="absolute left-2 top-2 rounded-full bg-night/70 px-2.5 py-1 text-[11px] font-medium text-canvas">
          {beforeLabel}
        </span>
      </div>
      <div className="relative min-w-0">
        <Image
          src={afterImageSrc}
          alt={afterImageAlt ?? `Dopo - ${title ?? category}`}
          fill
          className="object-cover"
          sizes="(max-width:768px) 50vw, 175px"
        />
        <span className="absolute right-2 top-2 rounded-full bg-night/70 px-2.5 py-1 text-[11px] font-medium text-canvas">
          {afterLabel}
        </span>
      </div>
    </div>
  ) : imageSrc ? (
    <div className="relative aspect-[4/3] w-full">
      <Image
        src={imageSrc}
        alt={imageAlt ?? title ?? category}
        fill
        className="object-cover"
        sizes="(max-width:768px) 100vw, 350px"
      />
    </div>
  ) : (
    <PremiumPlaceholder label={imageLabel} ratio="4 / 3" className="rounded-b-none" />
  );

  const inner = (
    <article className="overflow-hidden rounded-2xl border border-titanium/60 bg-white transition-all duration-300 group-hover:-translate-y-1 group-hover:border-aqua/50">
      {media}
      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-aqua">
          {category}
        </p>
        {title ? (
          <h3 className="mt-1 text-base font-semibold text-teal-deep">{title}</h3>
        ) : null}
      </div>
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="group block">
        {inner}
      </Link>
    );
  }
  return inner;
}
