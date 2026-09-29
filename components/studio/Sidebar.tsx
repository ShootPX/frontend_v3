"use client";

import { LogoMark } from "@/components/ui/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { studioNavItems } from "./Sidebar.nav-items";
import { useAuth } from "@/lib/auth/AuthContext";

function isActive(pathname: string, href: string) {
  return href === "/studio" ? pathname === "/studio" : pathname.startsWith(href);
}

export function Sidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { profile } = useAuth();

  const label = profile?.name || profile?.email || "Account";

  if (!open) {
    return (
      <div className="flex w-[76px] flex-none flex-col items-center gap-3.5 overflow-auto border-r border-border bg-bg py-4">
        <button onClick={() => setOpen(true)} title="Expand sidebar" className="flex-none">
          <LogoMark size={26} />
        </button>
        <div className="flex w-full flex-col items-center gap-0.5">
          {studioNavItems.map((n) => {
            const active = isActive(pathname, n.href);
            const Icon = n.icon;
            return (
              <Link
                key={n.id}
                href={n.href}
                title={n.label}
                className={`flex w-16 flex-col items-center gap-1 py-1.5 ${
                  active ? "border-b-2 border-accent bg-surface" : "hover:bg-bg-alt"
                }`}
              >
                <Icon size={17} className={active ? "text-accent" : "text-muted"} />
                <span className={`text-[9px] leading-tight ${active ? "font-semibold text-accent" : "text-dim"}`}>
                  {n.label}
                </span>
              </Link>
            );
          })}
        </div>
        <button
          onClick={() => router.push("/studio/settings")}
          title={label}
          className="mt-auto flex-none"
        >
          <Avatar
            src={profile?.avatarUrl}
            name={label}
            sizes="36px"
            className="h-9 w-9 border border-border-strong text-[11px] font-medium hover:border-accent"
          />
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-[180px] flex-none flex-col gap-5 overflow-auto border-r border-border bg-bg px-3.5 py-4">
      <div className="flex items-center gap-2.5">
        <Link href="/studio" aria-label="ShootPX home" className="flex items-center gap-2.5">
          <LogoMark size={26} />
          <span className="font-heading text-[17px] font-bold tracking-tight">ShootPX</span>
        </Link>
        <button
          onClick={() => setOpen(false)}
          title="Collapse sidebar"
          className="ml-auto border border-border p-1 text-dim hover:text-text"
        >
          <ChevronLeft size={13} />
        </button>
      </div>

      <div className="flex flex-col gap-px">
        {studioNavItems.map((n) => {
          const active = isActive(pathname, n.href);
          const Icon = n.icon;
          return (
            <Link
              key={n.id}
              href={n.href}
              className={`flex items-center gap-2.5 border-l-2 px-2.5 py-2 ${
                active
                  ? "border-accent bg-surface text-text"
                  : "border-transparent text-muted hover:bg-bg-alt hover:text-text"
              }`}
            >
              <Icon size={17} className={active ? "opacity-100" : "opacity-75"} />
              <span className="text-[13.5px] font-medium">{n.label}</span>
            </Link>
          );
        })}
      </div>

      <button
        onClick={() => router.push("/studio/settings")}
        className="mt-auto flex items-center gap-2.5 border border-border p-3 text-left hover:bg-surface"
      >
        <Avatar
          src={profile?.avatarUrl}
          name={label}
          sizes="32px"
          className="h-8 w-8 border border-border-strong bg-surface text-[11px] font-medium"
        />
        <span className="min-w-0 flex-1 break-words text-[13px] font-medium leading-tight" title={label}>
          {label}
        </span>
      </button>
    </div>
  );
}
