type FlowerMarqueeProps = {
  items: readonly string[];
};

export function FlowerMarquee({ items }: FlowerMarqueeProps) {
  if (items.length === 0) return null;

  return (
    <div className="marquee-bar-glass-3d w-full">
      <div className="marquee-scroll-track">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16"
          >
            {items.map((name) => (
              <li
                key={`${copy}-${name}`}
                className="font-heading text-2xl not-italic tracking-tight text-white md:text-3xl"
              >
                {name}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
