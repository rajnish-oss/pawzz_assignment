"use client";

import Link from "next/link";
import { Phone, Navigation2, BadgeCheck, MapPin } from "lucide-react";
import { Provider } from "@/lib/types";
import { CATEGORY_META } from "@/lib/mockData";
import { ProviderThumb } from "./providerVisuals";
import Badge from "@/components/ui/Badge";
import Rating from "@/components/ui/Rating";

export default function ProviderCard({
  provider,
  highlighted = false,
  onSelect,
}: {
  provider: Provider;
  highlighted?: boolean;
  onSelect?: (id: string) => void;
}) {
  return (
    <div
      onMouseEnter={() => onSelect?.(provider.id)}
      className={`group flex gap-4 rounded-lg border bg-white p-4 shadow-card transition-colors ${
        highlighted ? "border-brand-400 ring-1 ring-brand-200" : "border-line"
      }`}
    >
      <ProviderThumb provider={provider} />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link href={`/provider/${provider.id}`} className="block">
              <h3 className="truncate font-display text-base font-medium text-ink group-hover:text-brand-600">
                {provider.name}
              </h3>
            </Link>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-soft">
              <span>{CATEGORY_META[provider.category].label}</span>
              <span aria-hidden>•</span>
              <span className="inline-flex items-center gap-0.5">
                <MapPin size={12} /> {provider.distanceKm} km away
              </span>
            </div>
          </div>
          {provider.verified && (
            <BadgeCheck size={18} className="mt-0.5 shrink-0 text-brand-500" aria-label="Verified provider" />
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Rating value={provider.rating} count={provider.reviewCount} />
          <Badge tone={provider.openNow ? "brand" : "neutral"}>
            {provider.openNow ? "Open now" : "Closed"}
          </Badge>
          {provider.is24x7 && <Badge tone="amber">24/7</Badge>}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <a
            href={`tel:${provider.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 rounded-md bg-brand-500 px-3 py-1.5 text-xs font-medium text-paper transition-colors hover:bg-brand-600"
          >
            <Phone size={13} /> Call
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${provider.lat},${provider.lng}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-brand-300 hover:text-ink"
          >
            <Navigation2 size={13} /> Directions
          </a>
          <Link
            href={`/provider/${provider.id}`}
            className="ml-auto text-xs font-medium text-brand-600 hover:underline"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}
