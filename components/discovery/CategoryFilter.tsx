"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setActiveCategory } from "@/features/providers/providersSlice";
import { CATEGORY_META } from "@/lib/mockData";
import { ProviderCategory } from "@/lib/types";
import { CATEGORY_ICON } from "./providerVisuals";
import { LayoutGrid } from "lucide-react";

const CATEGORIES: (ProviderCategory | "all")[] = ["all", "vet", "clinic24", "ambulance", "ngo"];

export default function CategoryFilter() {
  const dispatch = useAppDispatch();
  const active = useAppSelector((s) => s.providers.activeCategory);

  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
      {CATEGORIES.map((cat) => {
        const isActive = active === cat;
        const label = cat === "all" ? "All services" : CATEGORY_META[cat].shortLabel;
        const Icon = cat === "all" ? LayoutGrid : CATEGORY_ICON[cat];
        return (
          <button
            key={cat}
            onClick={() => dispatch(setActiveCategory(cat))}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-colors ${
              isActive
                ? "border-brand-500 bg-brand-500 text-paper"
                : "border-line bg-white text-ink-soft hover:border-brand-300 hover:text-ink"
            }`}
          >
            <Icon size={15} strokeWidth={2} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
