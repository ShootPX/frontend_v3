"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { navItems, type NavItem } from "@/content/header-nav";
import { HeaderAuthArea } from "./Header.AuthArea";
import { useLiveTools } from "./useLiveTools";

export function Header() {
  const [openNav, setOpenNav] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const liveTools = useLiveTools();

  // The Tools dropdown lists the live tools from the catalog, not marketing copy.
  const items: NavItem[] = navItems.map((n) =>
    n.id === "tools" && liveTools
      ? {
          ...n,
          items: liveTools.map((t) => ({
            name: t.displayName,
            desc: t.description ?? "",
            href: "/#tools",
            badge: null,
          })),
        }
      : n,
  );

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (openNav && navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenNav(null);
      }
    }
    document.addEventListener("click", handleOutsideClick, true);
    return () => document.removeEventListener("click", handleOutsideClick, true);
  }, [openNav]);

  // Lock page scroll behind the phone menu, and close it if the viewport grows
  // to the desktop layout.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = prev;
      mq.removeEventListener("change", onChange);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileSection(null);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-5 py-3.5">
        <Link href="/#top" className="flex-none">
          <Logo />
        </Link>

        <nav ref={navRef} className="hidden min-w-0 flex-1 justify-center lg:flex">
          <div className="flex items-center gap-1 rounded-full border border-border bg-surface p-1.5">
            {items.map((n) => {
              const isOpen = openNav === n.id && !!n.items;
              return (
                <div key={n.id} className="relative">
                  {n.items ? (
                    <>
                      <button
                        onClick={() => setOpenNav((cur) => (cur === n.id ? null : n.id))}
                        className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                          isOpen ? "bg-surface-2 text-text" : "text-muted hover:bg-surface-2 hover:text-text"
                        }`}
                      >
                        {n.label}
                        {isOpen ? (
                          <ChevronUp size={11} className="text-accent" />
                        ) : (
                          <ChevronDown size={11} className="text-dim" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="animate-drop absolute left-1/2 top-[calc(100%+12px)] min-w-[280px] -translate-x-1/2 rounded-2xl border border-border-strong bg-surface p-2.5 shadow-2xl shadow-black/75">
                          {n.items.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="flex gap-2.5 rounded-lg p-2.5 hover:bg-surface-2"
                              onClick={() => setOpenNav(null)}
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                              <span className="min-w-0 flex-1">
                                <span className="flex items-center gap-2 text-sm font-medium">
                                  {sub.name}
                                  {sub.badge && (
                                    <span className="rounded-full bg-accent px-1.5 py-0.5 font-mono text-[9px] tracking-wide text-accent-ink">
                                      {sub.badge}
                                    </span>
                                  )}
                                </span>
                                <span className="mt-0.5 block text-xs leading-relaxed text-dim">{sub.desc}</span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={n.href}
                      className="block whitespace-nowrap rounded-full px-4 py-2.5 text-sm text-muted hover:bg-surface-2 hover:text-text"
                    >
                      {n.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        <div className="ml-auto flex flex-none items-center gap-3.5">
          <Link
            href="/#start"
            className="hidden whitespace-nowrap font-mono text-[11.5px] tracking-wide text-muted sm:inline"
          >
            BOOK DEMO
          </Link>
          <HeaderAuthArea />
          <button
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="-mr-1.5 flex h-10 w-10 items-center justify-center rounded-full text-text hover:bg-surface-2 lg:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          aria-label="Mobile"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-b border-border bg-bg px-5 pb-6 pt-2 lg:hidden"
        >
          {items.map((n) => {
            const open = mobileSection === n.id;
            return (
              <div key={n.id} className="border-b border-border last:border-b-0">
                {n.items ? (
                  <>
                    <button
                      onClick={() => setMobileSection(open ? null : n.id)}
                      aria-expanded={open}
                      className="flex min-h-12 w-full items-center justify-between py-3 text-left text-base font-medium"
                    >
                      {n.label}
                      <ChevronDown size={16} className={`text-dim transition-transform ${open ? "rotate-180 text-accent" : ""}`} />
                    </button>
                    {open && (
                      <div className="flex flex-col gap-1 pb-3">
                        {n.items.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={closeMenu}
                            className="flex gap-2.5 rounded-lg p-2.5 active:bg-surface-2"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                            <span className="min-w-0 flex-1">
                              <span className="flex items-center gap-2 text-sm font-medium">
                                {sub.name}
                                {sub.badge && (
                                  <span className="rounded-full bg-accent px-1.5 py-0.5 font-mono text-[9px] tracking-wide text-accent-ink">
                                    {sub.badge}
                                  </span>
                                )}
                              </span>
                              {sub.desc && <span className="mt-0.5 block text-xs leading-relaxed text-dim">{sub.desc}</span>}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={n.href} onClick={closeMenu} className="flex min-h-12 items-center py-3 text-base font-medium">
                    {n.label}
                  </Link>
                )}
              </div>
            );
          })}
          <Link
            href="/#start"
            onClick={closeMenu}
            className="mt-5 flex min-h-12 items-center justify-center rounded-full border border-border-strong text-sm font-medium"
          >
            Book a demo
          </Link>
        </nav>
      )}
    </header>
  );
}
