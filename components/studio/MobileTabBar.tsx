"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { studioNavItems } from "./Sidebar.nav-items";

function isActive(pathname: string, href: string) {
  return href === "/studio" ? pathname === "/studio" : pathname.startsWith(href);
}

/** Phone-only bottom navigation; the sidebar takes over from `md` up. */
export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Studio"
      className="flex flex-none border-t border-border bg-bg pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      {studioNavItems.map((n) => {
        const active = isActive(pathname, n.href);
        const Icon = n.icon;
        return (
          <Link
            key={n.id}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={`relative flex min-h-14 flex-1 flex-col items-center justify-center gap-1 ${
              active ? "text-accent" : "text-dim active:text-text"
            }`}
          >
            {active && <span className="absolute inset-x-6 top-0 h-0.5 bg-accent" />}
            <Icon size={21} strokeWidth={active ? 2.25 : 1.75} />
            <span className={`text-[10.5px] leading-none ${active ? "font-semibold" : "font-medium"}`}>{n.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
