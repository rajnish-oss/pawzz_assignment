"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Siren, FileStack, CalendarCheck2 } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Discover", icon: Compass },
  { href: "/documents", label: "Records", icon: FileStack },
  { href: "/emergency", label: "SOS", icon: Siren, isCenter: true },
  { href: "/bookings", label: "Bookings", icon: CalendarCheck2 },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon, isCenter }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          if (isCenter) {
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-1"
                aria-label="Emergency SOS"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full shadow-floating transition-transform ${
                    active ? "bg-urgent-500" : "bg-urgent-400"
                  } -translate-y-3`}
                >
                  <Icon size={22} className="text-paper" strokeWidth={2.25} />
                </span>
                <span className="-mt-2 text-[11px] font-medium text-urgent-500">{label}</span>
              </Link>
            );
          }
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 px-2 py-1"
            >
              <Icon
                size={21}
                strokeWidth={active ? 2.4 : 1.8}
                className={active ? "text-brand-500" : "text-ink-soft"}
              />
              <span className={`text-[11px] ${active ? "font-medium text-brand-500" : "text-ink-soft"}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
