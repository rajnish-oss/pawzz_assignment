"use client";

import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchNearbyProviders, setSelectedProvider } from "@/features/providers/providersSlice";
import SearchBar from "@/components/discovery/SearchBar";
import CategoryFilter from "@/components/discovery/CategoryFilter";
import ProviderCard from "@/components/discovery/ProviderCard";
import MapPanel from "@/components/discovery/MapPanel";
import { Siren, Loader2 } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items, status, activeCategory, searchQuery, selectedProviderId } = useAppSelector(
    (s) => s.providers
  );
  const locationLabel = useAppSelector((s) => s.location.label);

  useEffect(() => {
    dispatch(fetchNearbyProviders());
  }, [dispatch]);

  const filtered = useMemo(() => {
    return items.filter((p) => {
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.address.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [items, activeCategory, searchQuery]);

  return (
    <div className="px-4 pt-6 md:px-8 md:pt-10">
      <section className="mb-6 max-w-2xl">
        <p className="mb-2 text-sm text-ink-soft">
          {locationLabel ? `Showing results near ${locationLabel}` : "Finding services near you…"}
        </p>
        <h1 className="font-display text-3xl font-medium leading-tight text-ink md:text-[2.5rem]">
          Care for every paw and stray, minutes away.
        </h1>
        <p className="mt-3 text-ink-soft">
          Search verified vets, round-the-clock clinics, ambulances and rescue NGOs mapped to
          where you are right now.
        </p>
      </section>

      <Link
        href="/emergency"
        className="mb-6 flex items-center justify-between gap-3 rounded-lg border border-urgent-100 bg-urgent-50 px-4 py-3 transition-colors hover:border-urgent-300 md:max-w-2xl"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-urgent-400 text-paper">
            <Siren size={17} />
          </span>
          <div>
            <p className="text-sm font-medium text-urgent-600">Street accident or pet crisis?</p>
            <p className="text-xs text-urgent-500/80">Get the closest ambulances instantly.</p>
          </div>
        </div>
        <span className="shrink-0 text-sm font-medium text-urgent-600">Open SOS →</span>
      </Link>

      <div className="mb-5 space-y-3 md:max-w-2xl">
        <SearchBar />
        <CategoryFilter />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_440px]">
        <div className="space-y-3 pb-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-ink-soft">
              {status === "loading" ? "Loading…" : `${filtered.length} results`}
            </p>
          </div>

          {status === "loading" && (
            <div className="flex items-center justify-center gap-2 rounded-lg border border-line bg-white py-14 text-ink-soft">
              <Loader2 size={18} className="animate-spin" /> Fetching nearby services…
            </div>
          )}

          {status === "succeeded" && filtered.length === 0 && (
            <div className="rounded-lg border border-dashed border-line bg-white px-6 py-14 text-center">
              <p className="font-display text-lg text-ink">No matches nearby</p>
              <p className="mt-1 text-sm text-ink-soft">
                Try a different category or clear your search to see everything around{" "}
                {locationLabel || "you"}.
              </p>
            </div>
          )}

          {filtered.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              highlighted={selectedProviderId === provider.id}
              onSelect={(id) => dispatch(setSelectedProvider(id))}
            />
          ))}
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-20">
            <MapPanel providers={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
}
