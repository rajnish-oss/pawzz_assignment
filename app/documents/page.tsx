"use client";

import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchDocuments, setPetFilter } from "@/features/documents/documentsSlice";
import UploadDropzone from "@/components/documents/UploadDropzone";
import HealthTimeline from "@/components/documents/HealthTimeline";
import { Loader2 } from "lucide-react";

export default function DocumentsPage() {
  const dispatch = useAppDispatch();
  const { items, status, activePetFilter } = useAppSelector((s) => s.documents);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  const pets = useMemo(() => Array.from(new Set(items.map((d) => d.petName))), [items]);

  const filtered = useMemo(
    () => (activePetFilter === "all" ? items : items.filter((d) => d.petName === activePetFilter)),
    [items, activePetFilter]
  );

  return (
    <div className="px-4 pt-6 md:px-8 md:pt-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-2xl font-medium text-ink md:text-3xl">
          Health records
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Upload messy paperwork — vaccination cards, handwritten prescriptions, lab reports —
          and the AI turns it into a clean, searchable timeline.
        </p>

        <div className="mt-5">
          <UploadDropzone />
        </div>

        {pets.length > 0 && (
          <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto">
            <button
              onClick={() => dispatch(setPetFilter("all"))}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                activePetFilter === "all"
                  ? "border-brand-500 bg-brand-500 text-paper"
                  : "border-line bg-white text-ink-soft hover:border-brand-300"
              }`}
            >
              All pets
            </button>
            {pets.map((pet) => (
              <button
                key={pet}
                onClick={() => dispatch(setPetFilter(pet))}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  activePetFilter === pet
                    ? "border-brand-500 bg-brand-500 text-paper"
                    : "border-line bg-white text-ink-soft hover:border-brand-300"
                }`}
              >
                {pet}
              </button>
            ))}
          </div>
        )}

        <div className="mt-6">
          {status === "loading" ? (
            <div className="flex items-center justify-center gap-2 rounded-lg border border-line bg-white py-14 text-ink-soft">
              <Loader2 size={18} className="animate-spin" /> Loading health records…
            </div>
          ) : (
            <HealthTimeline documents={filtered} />
          )}
        </div>
      </div>
    </div>
  );
}
