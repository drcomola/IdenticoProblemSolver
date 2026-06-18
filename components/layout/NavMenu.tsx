"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { Icon, type IconName } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";
import { LanguageSelector } from "./LanguageSelector";

export type NavItem = { label: string; href: string; iconName: IconName };
export type NavGroup = {
  key: string;
  label: string;
  href: string;
  items: NavItem[];
};

/** Full header navigation: brand, two journey dropdowns, language, mobile menu. */
export function NavMenu({
  brandName,
  brandTagline,
  homeHref,
  groups,
  locale,
  langAria,
}: {
  brandName: string;
  brandTagline: string;
  homeHref: string;
  groups: NavGroup[];
  locale: Locale;
  langAria: string;
}) {
  const [openDesktop, setOpenDesktop] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(groups[0]?.key ?? null);
  const pathname = usePathname();

  // Close menus on route change.
  useEffect(() => {
    setOpenDesktop(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-16 items-center justify-between gap-4">
      <Link href={homeHref} className="flex items-center gap-2.5" aria-label={brandName}>
        <Logo tone="light" priority className="h-11 w-auto shrink-0" />
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-semibold tracking-tightish text-teal-deep">
            {brandName}
          </span>
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-aqua">
            {brandTagline}
          </span>
        </span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden items-center gap-1 lg:flex" aria-label={brandName}>
        {groups.map((group) => {
          const open = openDesktop === group.key;
          return (
            <div
              key={group.key}
              className="relative"
              onMouseEnter={() => setOpenDesktop(group.key)}
              onMouseLeave={() => setOpenDesktop((k) => (k === group.key ? null : k))}
            >
              <button
                type="button"
                aria-expanded={open}
                aria-haspopup="true"
                onClick={() => setOpenDesktop(open ? null : group.key)}
                className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-ink/75 transition-colors hover:text-teal-deep"
              >
                {group.label}
                <Icon
                  name="chevron"
                  className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>

              {open ? (
                <div className="absolute left-0 top-full z-50 pt-2">
                  <div className="w-72 overflow-hidden rounded-2xl border border-titanium/60 bg-canvas/95 p-2 shadow-[0_24px_60px_-30px_rgba(15,76,92,0.55)] backdrop-blur-md">
                    <Link
                      href={group.href}
                      className="mb-1 flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-teal-deep hover:bg-teal-deep/5"
                    >
                      {group.label}
                      <span aria-hidden>→</span>
                    </Link>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink/80 transition-colors hover:bg-aqua/10 hover:text-teal-deep"
                          >
                            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-deep/6 text-teal-deep transition-colors group-hover:bg-aqua/20">
                              <Icon name={item.iconName} className="h-[22px] w-[22px]" />
                            </span>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <div className="hidden sm:block">
          <LanguageSelector current={locale} ariaLabel={langAria} />
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-titanium/60 text-teal-deep lg:hidden"
        >
          <Icon name={mobileOpen ? "close" : "menu"} className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile panel */}
      {mobileOpen ? (
        <div className="fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-titanium/60 bg-canvas shadow-[0_24px_70px_-30px_rgba(15,76,92,0.65)] lg:hidden">
          <div className="container-px py-6">
            <div className="flex gap-2">
              {groups.map((group) => (
                <button
                  key={group.key}
                  type="button"
                  onClick={() => setMobileGroup(group.key)}
                  aria-pressed={mobileGroup === group.key}
                  className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    mobileGroup === group.key
                      ? "bg-teal-deep text-canvas"
                      : "border border-titanium/60 text-ink/70"
                  }`}
                >
                  {group.label}
                </button>
              ))}
            </div>

            {groups
              .filter((g) => g.key === mobileGroup)
              .map((group) => (
                <ul key={group.key} className="mt-5 space-y-1">
                  <li>
                    <Link
                      href={group.href}
                      className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-teal-deep"
                    >
                      {group.label}
                      <span aria-hidden>→</span>
                    </Link>
                  </li>
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-ink/80 hover:bg-aqua/10"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-deep/6 text-teal-deep">
                          <Icon name={item.iconName} className="h-6 w-6" />
                        </span>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}

            <div className="mt-6 border-t border-titanium/60 pt-5">
              <LanguageSelector current={locale} ariaLabel={langAria} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
