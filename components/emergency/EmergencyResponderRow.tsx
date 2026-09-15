"use client";

import { Phone, Navigation2, Clock3 } from "lucide-react";
import { Provider } from "@/lib/types";
import { CATEGORY_META } from "@/lib/mockData";
import { ProviderThumb } from "@/components/discovery/providerVisuals";
import Badge from "@/components/ui/Badge";

export default function EmergencyResponderRow({
  provider,
  rank,
}: {
  provider: Provider;
  rank: number;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-line bg-white p-3.5 shadow-card sm:gap-4">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-urgent-50 font-display text-sm font-medium text-urgent-600">
        {rank}
      </div>

      <ProviderThumb provider={provider} className="h-14 w-14" iconSize={22} />

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-display text-sm font-medium text-ink sm:text-base">
          {provider.name}
        </h3>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-soft">
          <span>{CATEGORY_META[provider.category].label}</span>
          <span aria-hidden>•</span>
          <span>{provider.distanceKm} km away</span>
          {provider.ambulanceEta && (
            <>
              <span aria-hidden>•</span>
              <span className="inline-flex items-center gap-0.5 font-medium text-urgent-600">
                <Clock3 size={12} /> ~{provider.ambulanceEta} min
              </span>
            </>
          )}
        </div>
        {provider.hasTraumaCenter && (
          <div className="mt-1.5">
            <Badge tone="urgent">Trauma-ready</Badge>
          </div>
        )}
      </div>

      <div className="flex shrink-0 flex-col gap-1.5 sm:flex-row">
        <a
          href={`tel:${provider.phone.replace(/\s/g, "")}`}
          className="flex items-center justify-center gap-1.5 rounded-md bg-urgent-400 px-3 py-2 text-xs font-medium text-paper transition-colors hover:bg-urgent-500"
        >
          <Phone size={13} /> Call
        </a>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${provider.lat},${provider.lng}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-md border border-line px-3 py-2 text-xs font-medium text-ink-soft transition-colors hover:border-brand-300 hover:text-ink"
        >
          <Navigation2 size={13} /> Directions
        </a>
      </div>
    </div>
  );
}
