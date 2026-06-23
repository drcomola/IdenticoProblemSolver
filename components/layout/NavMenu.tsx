"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { Icon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";
import { LanguageSelector } from "./LanguageSelector";

export type NavItem = { label: string; href: string; icon: ReactNode };
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

  useEffect(() => {
    setOpenDesktop(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-16 items-center justify-between gap-4 py-2">
      <Link href={homeHref} className="flex min-w-0 items-center gap-2.5" aria-label={brandName}>
        <Logo tone="light" priority className="h-12 w-auto shrink-0" />
        <span className="flex min-w-0 flex-col leading-none">
          <span className="truncate font-display text-base font-semibold text-teal-deep sm:text-lg">
            {brandName}
          </span>
          <span className="hidden text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-teal sm:block">
            {brandTagline}
          </span>
        </span>
      </Link>

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
                className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-ink/[0.68] transition-all duration-300 hover:bg-teal-deep/5 hover:text-teal-deep"
              >
                {group.label}
                <Icon
                  name="chevron"
                  className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>

              {open ? (
                <div className="absolute left-0 top-full z-50 pt-2">
                  <div className="w-80 overflow-hidden rounded-xl border border-titanium/60 bg-canvas/[0.96] p-2 shadow-panel backdrop-blur-xl">
                    <Link
                      href={group.href}
                      className="mb-1 flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-teal-deep hover:bg-teal-deep/5"
                    >
                      {group.label}
                      <span aria-hidden>-&gt;</span>
                    </Link>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink/[0.78] transition-colors hover:bg-teal-deep/5 hover:text-teal-deep"
                          >
                            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-titanium/70 bg-canvas/90 text-teal-deep shadow-[0_1px_4px_rgba(15,76,92,0.07)] transition-colors group-hover:border-aqua/50 group-hover:bg-aqua/[0.07] group-hover:text-teal [&_svg]:h-[22px] [&_svg]:w-[22px]">
                              {item.icon}
                            </span>
                            <span className="min-w-0">{item.label}</span>
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

      <div className="flex shrink-0 items-center gap-3">
        <div className="hidden sm:block">
          <LanguageSelector current={locale} ariaLabel={langAria} />
        </div>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-titanium/60 bg-white/70 text-teal-deep transition-colors hover:border-aqua/70 lg:hidden"
        >
          <Icon name={mobileOpen ? "close" : "menu"} className="h-5 w-5" />
        </button>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-titanium/55 bg-canvas/[0.98] shadow-panel backdrop-blur-xl lg:hidden">
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
                      ? "bg-teal-deep text-canvas shadow-glow"
                      : "border border-titanium/60 bg-white/70 text-ink/70"
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
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold text-teal-deep"
                    >
                      {group.label}
                      <span aria-hidden>-&gt;</span>
                    </Link>
                  </li>
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-ink/80 hover:bg-teal-deep/5"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-md border border-titanium/70 bg-canvas/90 text-teal-deep shadow-[0_1px_4px_rgba(15,76,92,0.07)] [&_svg]:h-6 [&_svg]:w-6">
                          {item.icon}
                        </span>
                        <span className="min-w-0">{item.label}</span>
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
