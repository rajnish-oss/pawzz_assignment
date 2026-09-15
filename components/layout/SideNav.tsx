"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Siren, FileStack, CalendarCheck2, PawPrint } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Discover", icon: Compass },
  { href: "/emergency", label: "Emergency", icon: Siren },
  { href: "/documents", label: "Health Records", icon: FileStack },
  { href: "/bookings", label: "My Bookings", icon: CalendarCheck2 },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-[220px] flex-col border-r border-line bg-paper px-5 py-6 md:flex">
      <Link href="/" className="mb-9 flex items-center gap-2 px-1">
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-500 text-paper">
          <PawPrint size={18} strokeWidth={2.25} />
        </span>
        <span className="font-display text-lg font-medium text-ink">Pawzz</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-brand-500 text-paper"
                  : "text-ink-soft hover:bg-paper-dim hover:text-ink"
              }`}
            >
              <Icon size={18} strokeWidth={2} />
              <span className={active ? "font-medium" : ""}>{label}</span>
            </Link>
          );
        })}
      </nav>

      <Link
        href="/emergency"
        className="mt-4 flex items-center justify-center gap-2 rounded-md bg-urgent-400 px-3 py-3 text-sm font-medium text-paper shadow-card transition-colors hover:bg-urgent-500"
      >
        <Siren size={16} />
        SOS
      </Link>
    </aside>
  );
}
