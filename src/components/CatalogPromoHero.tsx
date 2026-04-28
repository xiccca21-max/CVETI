import { ArrowUpRight } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { isInternalPromoLink } from "../shop/promoLinks";
import type { ShopPromo } from "../shop/types";

type CatalogPromoHeroProps = {
  promos: readonly ShopPromo[];
};

type PromoTileProps = {
  promo: ShopPromo;
};

function PromoTile({ promo }: PromoTileProps) {
  const url = promo.linkUrl.trim();
  const label = promo.linkLabel.trim() || "Подробнее";
  const hasLink = Boolean(url);

  const inner = (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.5), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="relative z-[1] flex min-h-[7.5rem] flex-col justify-between p-4 md:min-h-[8rem] md:p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="font-heading text-xl font-semibold not-italic leading-tight text-white md:text-2xl">
              {promo.title}
            </h2>
            <p className="mt-1.5 font-body text-xs leading-snug text-white/85 md:text-sm">
              {promo.subtitle}
            </p>
          </div>
          {promo.discountLabel ? (
            <span className="hero-pill-glass-3d shrink-0 rounded-full px-3 py-1 font-body text-xs font-bold text-white">
              {promo.discountLabel}
            </span>
          ) : null}
        </div>
        {hasLink ? (
          <span className="relative z-[1] mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 font-body text-xs font-semibold text-white ring-1 ring-white/25">
            {label}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        ) : (
          <span className="relative z-[1] mt-4 font-body text-[11px] text-white/45">
            Укажите ссылку в админке
          </span>
        )}
      </div>
    </>
  );

  const sharedClass =
    "relative flex min-h-[7.5rem] flex-col overflow-hidden rounded-2xl border border-white/15 shadow-lg outline-none ring-offset-2 ring-offset-slate-900 transition hover:border-white/25 hover:brightness-[1.03] focus-visible:ring-2 focus-visible:ring-white/50 md:min-h-[8rem]";

  const bgStyle = { background: promo.backgroundStyle };

  if (!hasLink) {
    return (
      <article className="snap-start shrink-0 w-[min(100%,20rem)] md:w-[22rem]">
        <div className={sharedClass} style={bgStyle}>
          {inner}
        </div>
      </article>
    );
  }

  if (isInternalPromoLink(url)) {
    return (
      <article className="snap-start shrink-0 w-[min(100%,20rem)] md:w-[22rem]">
        <Link
          to={url}
          className={`${sharedClass} block text-left no-underline`}
          style={bgStyle}
        >
          {inner}
        </Link>
      </article>
    );
  }

  return (
    <article className="snap-start shrink-0 w-[min(100%,20rem)] md:w-[22rem]">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${sharedClass} block text-left`}
        style={bgStyle}
      >
        {inner}
      </a>
    </article>
  );
}

export function CatalogPromoHero({ promos }: CatalogPromoHeroProps) {
  const sorted = useMemo(
    () => [...promos].sort((a, b) => a.sortOrder - b.sortOrder),
    [promos],
  );

  if (sorted.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/20 shadow-[0_16px_48px_rgba(0,0,0,0.25)]"
      aria-label="Акции и предложения"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/[0.06] to-transparent" />
      <div className="relative z-[1] px-4 py-4 md:px-6 md:py-5">
        <p className="font-body text-[11px] font-semibold uppercase tracking-wider text-white/45">
          Скидки и предложения
        </p>
        <div className="mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sorted.map((promo) => (
            <PromoTile key={promo.id} promo={promo} />
          ))}
        </div>
      </div>
    </section>
  );
}
