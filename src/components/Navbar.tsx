import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Главная", href: "#" },
  { label: "Каталог", href: "#" },
  { label: "Букеты", href: "#" },
  { label: "Опт", href: "#" },
  { label: "Контакты", href: "#" },
] as const;

export function Navbar() {
  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16">
      <div className="relative mx-auto flex h-16 max-w-[1920px] items-center">
        <a
          href="#"
          aria-label="ЦВЕТИ — на главную"
          className="header-logo-3d relative z-10 inline-flex shrink-0 items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.18)]"
        >
          <img
            src="/logo-flower.png"
            alt=""
            className="relative z-[1] h-12 w-12 shrink-0 object-contain brightness-0 invert"
            width={48}
            height={48}
          />
          <span className="relative z-[1] font-heading text-xl font-semibold not-italic tracking-tight text-white md:text-2xl">
            ЦВЕТИ
          </span>
        </a>

        <nav
          className="header-nav-glass-3d absolute left-1/2 hidden -translate-x-1/2 flex-row items-center gap-1 rounded-full px-2 py-1.5 lg:flex"
          aria-label="Основное меню"
        >
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="relative z-[1] rounded-full px-3 py-2 font-body text-sm font-medium text-foreground/90 transition hover:text-foreground"
            >
              {label}
            </a>
          ))}
          <a
            href="https://vk.com/optmarket_cveti"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-[1] ml-1 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 font-body text-sm font-medium text-black shadow-[0_2px_8px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,1)] transition hover:shadow-[0_4px_14px_rgba(0,0,0,0.18)]"
          >
            Заказ в ВК
            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
          </a>
        </nav>
      </div>
    </header>
  );
}
