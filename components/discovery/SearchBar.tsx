"use client";

import { Search, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSearchQuery } from "@/features/providers/providersSlice";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((s) => s.providers.searchQuery);

  return (
    <div className="flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-3 shadow-card">
      <Search size={18} className="shrink-0 text-ink-soft" />
      <input
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        placeholder="Search clinics, ambulances, NGOs, or a service…"
        className="w-full bg-transparent text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none"
      />
      {searchQuery && (
        <button
          onClick={() => dispatch(setSearchQuery(""))}
          className="text-ink-soft hover:text-ink"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
