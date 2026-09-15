"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  BadgeCheck,
  Clock,
  PawPrint,
  Navigation2,
  Loader2,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchNearbyProviders } from "@/features/providers/providersSlice";
import { CATEGORY_META } from "@/lib/mockData";
import { ProviderThumb } from "@/components/discovery/providerVisuals";
import Rating from "@/components/ui/Rating";
import Badge from "@/components/ui/Badge";
import ReviewsList from "@/components/booking/ReviewsList";
import BookingPanel from "@/components/booking/BookingPanel";

const SPECIES_LABEL: Record<string, string> = {
  dog: "Dogs",
  cat: "Cats",
  bird: "Birds",
  exotic: "Exotic pets",
  livestock: "Livestock",
};

export default function ProviderDetailPage() {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((s) => s.providers);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchNearbyProviders());
    }
  }, [items.length, dispatch]);

  const provider = items.find((p) => p.id === params.id);

  if (status === "loading" || (status !== "succeeded" && !provider)) {
    return (
      <div className="flex items-center justify-center gap-2 px-4 py-24 text-ink-soft">
        <Loader2 size={18} className="animate-spin" /> Loading provider…
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="px-4 py-16 text-center md:px-8">
        <p className="font-display text-lg text-ink">We couldn&apos;t find that provider</p>
        <Link href="/" className="mt-2 inline-block text-sm font-medium text-brand-600 hover:underline">
          Back to discovery
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 md:px-8 md:pt-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink"
        >
          <ArrowLeft size={15} /> Back to discovery
        </Link>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <div className="flex gap-4">
              <ProviderThumb provider={provider} className="h-20 w-20 md:h-24 md:w-24" iconSize={34} />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-medium text-ink md:text-3xl">
                    {provider.name}
                  </h1>
                  {provider.verified && (
                    <BadgeCheck size={20} className="text-brand-500" aria-label="Verified provider" />
                  )}
                </div>
                <p className="mt-1 text-sm text-ink-soft">{CATEGORY_META[provider.category].label}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Rating value={provider.rating} count={provider.reviewCount} />
                  <Badge tone={provider.openNow ? "brand" : "neutral"}>
                    {provider.openNow ? "Open now" : "Closed"}
                  </Badge>
                  {provider.is24x7 && <Badge tone="amber">24/7</Badge>}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-line bg-white p-5 shadow-card">
              <h2 className="font-display text-base font-medium text-ink">About</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{provider.aboutText}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {provider.tags.map((tag) => (
                  <Badge key={tag} tone="neutral">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-line bg-white p-5 shadow-card">
                <h2 className="flex items-center gap-1.5 font-display text-base font-medium text-ink">
                  <Clock size={15} /> Operating hours
                </h2>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {provider.hours.map((h) => (
                    <li
                      key={h.day}
                      className={`flex items-center justify-between ${
                        h.isToday ? "font-medium text-ink" : "text-ink-soft"
                      }`}
                    >
                      <span>{h.day}</span>
                      <span>
                        {h.open} – {h.close}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-line bg-white p-5 shadow-card">
                <h2 className="flex items-center gap-1.5 font-display text-base font-medium text-ink">
                  <PawPrint size={15} /> Species handled
                </h2>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {provider.speciesHandled.map((s) => (
                    <Badge key={s} tone="brand">
                      {SPECIES_LABEL[s]}
                    </Badge>
                  ))}
                </div>
                <h2 className="mt-4 flex items-center gap-1.5 font-display text-base font-medium text-ink">
                  <MapPin size={15} /> Location
                </h2>
                <p className="mt-1.5 text-sm text-ink-soft">{provider.address}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${provider.lat},${provider.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:underline"
                >
                  <Navigation2 size={13} /> Get directions
                </a>
              </div>
            </div>

            <div className="rounded-lg border border-line bg-white p-5 shadow-card">
              <h2 className="font-display text-base font-medium text-ink">
                Reviews ({provider.reviewCount})
              </h2>
              <div className="mt-4">
                <ReviewsList reviews={provider.reviews} />
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-20 lg:self-start">
            <BookingPanel provider={provider} />
          </div>
        </div>
      </div>
    </div>
  );
}
